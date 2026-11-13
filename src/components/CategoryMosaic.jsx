// src/components/CategoryMosaic.jsx
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/* --------------------------------------------------------------
   Default data – 5 categories, each with its own background image.
   Replace the `image` values with any URL / public‑folder path you like.
   -------------------------------------------------------------- */
const defaultCategories = [
  {
    id: "rugs",
    title: "Rugs",
    image: "/product-images-v2/jaipur-handwoven-cotton-rug-room-image.jpg",
    href: "/collections/rugs",
    colSpan: 2,
    rowSpan: 2,
  },
  {
    id: "cushions",
    title: "Cushions",
    image: "/product-images-v2/malwa-textured-cushion.jpg",
    href: "/collections/cushions",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "throws",
    title: "Throws",
    image: "/product-images-v2/kutch-handwoven-throw.jpg",
    href: "/collections/throws",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    id: "bath-mats",
    title: "Bath Mats",
    image: "/product-images-v2/dhurrie-bath-mat.jpg",
    href: "/collections/bath-mats",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    id: "table-linen",
    title: "Table Linen",
    image: "/product-images-v2/sanganeri-table-runner.webp",
    href: "/collections/table-linen",
    colSpan: 1,
    rowSpan: 1,
  },
];

/* --------------------------------------------------------------
   CategoryMosaic – pure functional component, fully Tailwind‑styled
   -------------------------------------------------------------- */
const CategoryMosaic = ({ items = defaultCategories, className = "" }) => (
  <section
    className={`grid gap-4 grid-cols-1 md:grid-cols-3 ${className}`}
    aria-label="Shop by category"
  >
    {items.map((cat) => (
      <Link
        key={cat.id}
        to={cat.href}
        className="relative block aspect-[4/5] md:aspect-auto overflow-hidden rounded-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        style={{
          gridColumn: `span ${cat.colSpan ?? 1}`,
          gridRow: `span ${cat.rowSpan ?? 1}`,
        }}
      >
        {/* background image (zoom on hover) */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url("${cat.image}")` }}
          aria-hidden="true"
        />

        {/* dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* category title (bottom‑left) */}
        <div className="absolute left-4 bottom-4 text-white font-bold uppercase tracking-wide text-lg sm:text-xl">
          {cat.title}
        </div>
      </Link>
    ))}
  </section>
);

CategoryMosaic.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      colSpan: PropTypes.oneOf([1, 2, 3]),
      rowSpan: PropTypes.oneOf([1, 2]),
    })
  ),
  className: PropTypes.string,
};

CategoryMosaic.defaultProps = {
  items: defaultCategories,
  className: "",
};

export default CategoryMosaic;