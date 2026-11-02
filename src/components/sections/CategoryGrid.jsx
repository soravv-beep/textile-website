/**
 * <CategoryGrid /> — the full-bleed, four-column "shop by category" band.
 *
 * Edge-to-edge columns with no gutter (a 1px light hairline separates them),
 * each one a photo that zooms on hover and names itself at the bottom. The
 * painted heading floats across all four columns from the absolutely
 * positioned <HeadingOverlay />, which ignores the pointer so the columns stay
 * clickable.
 *
 * Responsive: 4 columns on desktop, 2×2 from tablet down to phone.
 *
 * @param {object} props
 * @param {Array} props.categories  list of { slug, name, to, image, alt }
 */
import CategoryCard from "./CategoryCard.jsx";
import HeadingOverlay from "./HeadingOverlay.jsx";
import Reveal from "../../animations/Reveal.jsx";

export default function CategoryGrid({ categories }) {
  return (
    <Reveal
      as="section"
      from="fade"
      className="cat-showcase"
      aria-labelledby="cat-heading"
    >
      <div className="cat-grid">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
      <HeadingOverlay id="cat-heading" />
    </Reveal>
  );
}
