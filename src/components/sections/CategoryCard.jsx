/**
 * <CategoryCard /> — one full-bleed column of <CategoryGrid />.
 *
 * The photo fills the column edge to edge, a soft scrim keeps the label
 * readable at the bottom, and hovering zooms the photo while lifting the
 * label. The whole column is the link, so there is only one tab stop.
 *
 * @param {object} props
 * @param {object} props.category  { slug, name, to, image, alt } from src/data/categories.js
 */
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  const { name, to, image, alt } = category;

  return (
    <Link className="cat-card" to={to} aria-label={`Shop ${name}`} data-cursor="Shop">
      <img
        className="cat-card__img"
        src={image}
        alt={alt}
        width="600"
        height="750"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
      {/* Bottom-up darkening so the white label stays legible on any photo. */}
      <span className="cat-card__scrim" aria-hidden="true" />
      <span className="cat-card__label">{name}</span>
    </Link>
  );
}
