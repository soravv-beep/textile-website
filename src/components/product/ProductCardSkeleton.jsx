/**
 * <ProductCardSkeleton /> — loading placeholder with the SAME box dimensions as
 * <ProductCard /> (4/5 media, name lines, footer), so swapping in real data
 * causes no layout shift.
 *
 * @param {object} props
 * @param {boolean} [props.withSale] reserve the sale-strip height too
 * @param {number} [props.count=1] render this many skeletons
 * @param {string} [props.className]
 */
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

function Skeleton() {
  return (
    <div className="pc-card pc-skeleton" aria-hidden="true">
      <div className="pc-card__inner">
        <div className="pc-skeleton__media" />
        <span className="pc-skeleton__pill" />
        <span className="pc-skeleton__line" />
        <span className="pc-skeleton__line pc-skeleton__line--short" />
        <hr className="pc-divider" />
        <div className="pc-skeleton__foot">
          <span className="pc-skeleton__price" />
          <span className="pc-skeleton__button" />
        </div>
      </div>
    </div>
  );
}

export default function ProductCardSkeleton({ withSale = false, count = 1, className = "" }) {
  const reduced = useReducedMotion();
  const items = Array.from({ length: Math.max(1, count) });

  return (
    <>
      {items.map((_, i) => (
        <div
          key={i}
          className={[
            "pc-skeleton-wrap",
            withSale ? "pc-skeleton-wrap--sale" : "",
            reduced ? "is-reduced" : "",
            className
          ]
            .filter(Boolean)
            .join(" ")}
          role="status"
          aria-label="Loading products"
        >
          {withSale && <span className="pc-skeleton__sale" aria-hidden="true" />}
          <Skeleton />
        </div>
      ))}
    </>
  );
}
