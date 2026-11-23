/**
 * Compare page — side-by-side comparison of the products picked with the
 * Compare button on product cards.
 *
 * The selection itself lives in ShopProvider (`compare`, `toggleCompare`,
 * `clearCompare`); this page only reads it, so the Compare button, the floating
 * CompareBar and this page can never disagree. Only attributes that exist in
 * the catalogue data are shown — nothing is invented.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Star, X } from "lucide-react";

import PageMeta from "../components/PageMeta.jsx";
import { ROUTES, productPath } from "../constants/routes.js";
import { categories, products } from "../data/catalog.js";
import { useShop } from "../context/shopContext.js";
import { formatINR } from "../utils/format.js";
import { getUnitPrice } from "../utils/shop.js";
import "../styles/compare.css";

const MAX_SLOTS = 3;
const productById = new Map(products.map((product) => [product.id, product]));

/** Plain text rows: label + how to read the value from a product. */
const TEXT_ROWS = [
  { key: "category", label: "Category", get: (p) => p.category },
  { key: "type", label: "Type", get: (p) => p.productType },
  { key: "material", label: "Material", get: (p) => p.fabric?.material || p.material },
  { key: "color", label: "Colour", get: (p) => p.color },
  { key: "style", label: "Style", get: (p) => p.style },
  { key: "weave", label: "Weave", get: (p) => p.fabric?.weave },
  { key: "pile", label: "Pile", get: (p) => p.fabric?.pile },
  { key: "weight", label: "Weight", get: (p) => p.fabric?.weight },
  { key: "care", label: "Care", get: (p) => p.fabric?.care },
  { key: "description", label: "About", get: (p) => p.description }
];

/** Three arch-topped category photos for the empty state (existing assets). */
const EMPTY_IMAGES = ["rugs", "throws", "cushions"]
  .map((slug) => categories.find((c) => c.slug === slug))
  .filter(Boolean);

function EmptyCompare() {
  return (
    <div className="cmp-empty">
      <div className="cmp-empty__art" aria-hidden="true">
        {EMPTY_IMAGES.map((c) => (
          <img key={c.slug} src={c.image} alt="" loading="lazy" decoding="async" />
        ))}
      </div>
      <h2 className="cmp-empty__title">Compare your favorite pieces</h2>
      <p className="cmp-empty__text">
        Choose up to {MAX_SLOTS} products with the Compare button on any product card and see their materials, sizes,
        prices and care side by side.
      </p>
      <Link to={ROUTES.shop} className="button primary">
        Explore Products
      </Link>
    </div>
  );
}

export default function Compare() {
  const { compare, toggleCompare, clearCompare, addToCart } = useShop();
  const [diffOnly, setDiffOnly] = useState(false);
  const [sizeById, setSizeById] = useState({});

  const items = useMemo(() => compare.map((id) => productById.get(id)).filter(Boolean), [compare]);
  const sizeOf = (product) => sizeById[product.id] || product.sizes[0];
  const emptySlots = Math.max(0, MAX_SLOTS - items.length);

  // Rows with no data at all are dropped; with "differences only" identical rows are too.
  const textRows = TEXT_ROWS.map((row) => ({ ...row, values: items.map((p) => row.get(p) || "") })).filter((row) => {
    if (!row.values.some(Boolean)) return false;
    if (diffOnly && items.length > 1 && new Set(row.values).size === 1) return false;
    return true;
  });
  const hasRatings = items.some((p) => p.rating);
  const hasSizes = items.some((p) => p.sizes?.length);
  // Keeps the empty "Add Product" column running down every row (a cell can't span thead → tbody).
  const fill = Array.from({ length: emptySlots }, (_, i) => <td key={`fill-${i}`} className="cmp__fill" aria-hidden="true" />);

  return (
    <div className="shop-scope">
      <PageMeta
        title="Compare Products | WovenHaat"
        description="Compare handwoven rugs, throws, cushions and more side by side."
      />
      <div className="page-main shell">
        <div className="page-title-row">
          <div>
            <p className="kicker">Side by side</p>
            <h1>Compare products</h1>
            <p>See materials, sizes and prices together before you decide.</p>
          </div>
          {items.length > 0 && (
            <span>
              {items.length} of {MAX_SLOTS} selected
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyCompare />
        ) : (
          <section className="cmp" aria-label="Product comparison">
            <div className="cmp__toolbar">
              <label className="cmp__toggle">
                <input type="checkbox" checked={diffOnly} onChange={(e) => setDiffOnly(e.target.checked)} />
                Show differences only
              </label>
              <button type="button" className="cmp__clear" onClick={clearCompare}>
                Clear all
              </button>
            </div>

            <div className="cmp__scroll">
              <table className="cmp__table">
                <caption className="visually-hidden">Comparison of {items.map((p) => p.name).join(", ")}</caption>
                <thead>
                  <tr>
                    <td className="cmp__corner" />
                    {items.map((p) => (
                      <th key={p.id} scope="col" className="cmp__head">
                        <button
                          type="button"
                          className="cmp__remove"
                          onClick={() => toggleCompare(p)}
                          aria-label={`Remove ${p.name} from comparison`}
                        >
                          <X aria-hidden="true" /> Remove
                        </button>
                        <Link to={productPath(p.slug)} className="cmp__media" tabIndex={-1} aria-hidden="true">
                          <img src={p.image} alt="" loading="lazy" decoding="async" />
                        </Link>
                        <span className="cmp__cat">{p.category}</span>
                        <Link to={productPath(p.slug)} className="cmp__name">
                          {p.name}
                        </Link>
                      </th>
                    ))}
                    {Array.from({ length: emptySlots }, (_, i) => (
                      <td key={`slot-${i}`} className="cmp__slot">
                        <Link to={ROUTES.shop} className="cmp__add">
                          <span className="cmp__add-icon" aria-hidden="true">
                            <Plus />
                          </span>
                          <strong>Add Product</strong>
                          <small>Pick another piece from the shop. Your comparison is kept.</small>
                        </Link>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Price</th>
                    {items.map((p) => {
                      const size = sizeOf(p);
                      const price = getUnitPrice(p, size);
                      const wasPrice = size === p.sizes[0] && p.oldPrice > price ? p.oldPrice : null;
                      return (
                        <td key={p.id} className="cmp__price">
                          {price === null ? (
                            "—"
                          ) : (
                            <>
                              <strong>{formatINR(price)}</strong>
                              {wasPrice && <s>{formatINR(wasPrice)}</s>}
                            </>
                          )}
                        </td>
                      );
                    })}
                    {fill}
                  </tr>
                  {hasRatings && (
                    <tr>
                      <th scope="row">Rating</th>
                      {items.map((p) => (
                        <td key={p.id}>
                          {p.rating ? (
                            <span className="cmp__rating">
                              <Star aria-hidden="true" /> {p.rating}
                              {p.reviews ? <small>({p.reviews} reviews)</small> : null}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                      ))}
                      {fill}
                    </tr>
                  )}
                  {hasSizes && (
                    <tr>
                      <th scope="row">Size</th>
                      {items.map((p) => (
                        <td key={p.id}>
                          {p.sizes.length > 1 ? (
                            <select
                              className="cmp__select"
                              value={sizeOf(p)}
                              aria-label={`Size for ${p.name}`}
                              onChange={(e) => setSizeById((cur) => ({ ...cur, [p.id]: e.target.value }))}
                            >
                              {p.sizes.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          ) : (
                            p.sizes[0] || "—"
                          )}
                        </td>
                      ))}
                      {fill}
                    </tr>
                  )}
                  {textRows.map((row) => (
                    <tr key={row.key}>
                      <th scope="row">{row.label}</th>
                      {row.values.map((value, i) => (
                        <td key={items[i].id} className={row.key === "description" || row.key === "care" ? "cmp__long" : ""}>
                          {value || "—"}
                        </td>
                      ))}
                      {fill}
                    </tr>
                  ))}
                  <tr className="cmp__actions">
                    <th scope="row" className="visually-hidden">
                      Actions
                    </th>
                    {items.map((p) => (
                      <td key={p.id}>
                        <button type="button" className="cmp-btn cmp-btn--primary" onClick={() => addToCart(p, 1, sizeOf(p))}>
                          Add to Cart
                        </button>
                        <Link to={productPath(p.slug)} className="cmp-btn cmp-btn--secondary">
                          View Product
                        </Link>
                      </td>
                    ))}
                    {fill}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
