/**
 * ⚠️ TEMPORARY STUB — <ProductCardStub />. Dev 2 owns the real card.
 *
 * Home page bestsellers render through this component until Dev 2 ships the
 * production <ProductCard />. Delete this file in that PR and swap the import in
 * src/pages/Home.jsx — the props below are the contract.
 *
 * Card anatomy (matches the planned Dev 2 design):
 *   rounded image, heart wishlist button top-right, "1/10" image counter,
 *   eco badge pill, Playfair name, dashed divider, struck-through price +
 *   ₹ price with Indian digit grouping, terracotta "Add to cart".
 *
 * @param {object} props
 * @param {object} props.product  see src/data/products.js
 * @param {number} [props.index]  0-based position (drives the "n/10" counter)
 * @param {number} [props.total=10] gallery size for the counter
 */
import { useState } from "react";
import { Link } from "react-router-dom";

import { productPath } from "../constants/routes.js";
import { formatINR } from "../utils/format.js";
import { useCart } from "../context/CartContext.jsx";
import Rating from "./ui/Rating.jsx";
import Tag from "./ui/Tag.jsx";

const BADGE_TONES = { best: "tan", new: "coral", sale: "orange" };
const BADGE_TEXT = { best: "Bestseller", new: "New", sale: "Sale" };

export default function ProductCardStub({ product, index = 0, total = 10 }) {
  const [wished, setWished] = useState(false);
  const [pop, setPop] = useState(false);
  const { addItem } = useCart();

  const onWish = () => {
    setWished((value) => !value);
    setPop(true);
    window.setTimeout(() => setPop(false), 420);
  };

  return (
    <article className="card product-card">
      <div className="product-card__media">
        <Link to={productPath(product.slug)} data-cursor="View" aria-label={product.name}>
          <img
            src={product.image}
            alt={product.alt}
            width="500"
            height="500"
            loading="lazy"
            decoding="async"
          />
        </Link>

        <button
          type="button"
          className={`product-card__wish${wished ? " is-wished" : ""}${pop ? " is-popping" : ""}`}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={onWish}
        >
          <svg viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 21s-7.5-4.8-9.5-9A5.4 5.4 0 0 1 12 6.5 5.4 5.4 0 0 1 21.5 12c-2 4.2-9.5 9-9.5 9Z" />
          </svg>
        </button>

        <span className="product-card__counter" aria-hidden="true">
          {index + 1}/{total}
        </span>

        {product.badge && (
          <Tag tone={BADGE_TONES[product.badge]} className="product-card__badge">
            {BADGE_TEXT[product.badge]}
          </Tag>
        )}
        {product.ecoBadge && (
          <span className="product-card__eco" title={`${product.ecoBadge} certified`}>
            {product.ecoBadge}
          </span>
        )}
      </div>

      <div className="card__body">
        <h3 className="product-card__title">
          <Link to={productPath(product.slug)}>{product.name}</Link>
        </h3>
        <Rating value={product.rating} count={product.reviews} />
        <hr className="product-card__divider" />
        <p className="product-card__price">
          <span className="product-card__now">{formatINR(product.price)}</span>
          {product.was && <s>{formatINR(product.was)}</s>}
        </p>
        <button
          type="button"
          className="btn btn-primary btn-sm btn-block"
          onClick={() => addItem(product)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
