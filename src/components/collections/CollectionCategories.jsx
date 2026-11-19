/**
 * <CollectionCategories /> — "Shop by Category" for the Collections page only.
 *
 * Editorial layout: an introduction on the left and a 3 × 2 grid of arch-topped
 * category cards on the right (stacked, 2 per row, on phones). It is a separate
 * component from the Home page's <CategoryGrid />, and every class is prefixed
 * `coll-cats` so nothing here can leak into Home or other Collection sections.
 *
 * Data comes straight from the catalogue's `categories` list (name, slug,
 * image); links use the same `/collections/:slug` routes as before.
 *
 * @param {object} props
 * @param {Array}  props.categories  list of { name, slug, image } from data/catalog.js
 */
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes.js";
import "../../styles/collection-categories.css";

// Display order follows the editorial layout (top row, then bottom row).
// Any category not listed here is still shown, after these.
const DISPLAY_ORDER = ["rugs", "curtains", "throws", "table-linen", "bath-mats", "cushions"];

function orderCategories(categories) {
  const rank = (slug) => {
    const i = DISPLAY_ORDER.indexOf(slug);
    return i === -1 ? DISPLAY_ORDER.length : i;
  };
  return [...categories].sort((a, b) => rank(a.slug) - rank(b.slug));
}

/* Soft botanical sprig — decorative only. */
const Sprig = () => (
  <svg className="coll-cats__sprig" viewBox="0 0 120 150" aria-hidden="true" focusable="false">
    <path d="M62 148 C60 112 66 76 84 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <g fill="currentColor">
      <path d="M84 22 C92 36 90 52 82 62 C76 48 78 34 84 22Z" />
      <path d="M70 70 C58 62 48 62 38 66 C46 78 60 82 70 70Z" />
      <path d="M73 56 C84 50 92 46 102 48 C98 62 84 66 73 56Z" />
      <path d="M65 100 C53 94 44 94 34 98 C42 110 56 114 65 100Z" />
      <path d="M68 86 C79 80 87 77 97 79 C93 92 79 96 68 86Z" />
    </g>
  </svg>
);

export default function CollectionCategories({ categories }) {
  const items = orderCategories(categories);

  return (
    <section className="coll-cats" aria-labelledby="coll-cats-title">
      <div className="coll-cats__intro">
        <p className="coll-cats__label">Shop by Category</p>
        <h2 id="coll-cats-title" className="coll-cats__title">
          Shop by Category
        </h2>
        <p className="coll-cats__text">Explore our timeless collection of handcrafted textiles.</p>
        <Link to={ROUTES.shop} className="button primary coll-cats__cta">
          Explore All
          <ArrowRight aria-hidden="true" />
        </Link>
        <Sprig />
      </div>

      <ul className="coll-cats__grid">
        {items.map((category) => (
          <li key={category.slug}>
            <Link
              to={`${ROUTES.collections}/${category.slug}`}
              className="coll-cats__card"
              aria-label={`Shop ${category.name}`}
            >
              <span className="coll-cats__media">
                <img
                  src={category.image}
                  alt=""
                  width="480"
                  height="560"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </span>
              <span className="coll-cats__name">{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
