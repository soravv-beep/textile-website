import { memo } from "react";
import "./ProductCardSkeleton.css";

const ProductCardSkeleton = memo(() => (
  <article className="product-card skeleton" aria-hidden="true">
    <div className="skeleton-image" />
    <div className="skeleton-body">
      <div className="skeleton-line skeleton-category" />
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-rating" />
      <div className="skeleton-line skeleton-price" />
      <div className="skeleton-line skeleton-discount" />
    </div>
  </article>
));

ProductCardSkeleton.displayName = "ProductCardSkeleton";
export default ProductCardSkeleton;