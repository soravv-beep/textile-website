import { ArrowLeftRight, Heart, Star, ShoppingBag } from "lucide-react";
import AppLink from "../common/AppLink.jsx";
import { useStore } from "../../context/StoreContext.js";
import { money, getUnitPrice } from "../../utils/format.js";
import { memo, useState, useCallback } from "react";

const ProductCardInner = memo(function ProductCardInner({ product, wished, onWish, priority = false, priceLabel, addToCart, notify }) {
  const { compare, toggleCompare } = useStore();
  const compared = compare.includes(product.id);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;
  const [adding, setAdding] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const defaultSize = product.sizes?.[0];
  const priceAvailable = defaultSize ? getUnitPrice(product, defaultSize) !== null : false;

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    if (adding || !priceAvailable || !defaultSize) return;
    setAdding(true);
    setSizeError(false);
    const success = addToCart(product, 1, defaultSize);
    if (!success) setSizeError(true);
    setTimeout(() => setAdding(false), 800);
  }, [addToCart, product, defaultSize, priceAvailable, adding]);

  return (
    <article className="product-card">
      <div className="product-media">
        <AppLink
          to={`/product/${product.slug}`}
          ariaLabel={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading={priority ? "eager" : "lazy"}
            fetchpriority={priority ? "high" : "auto"}
            width="400"
            height="500"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+";
            }}
          />
          <img
            className="hover-image"
            src={product.altImage}
            alt=""
            loading="lazy"
            width="400"
            height="500"
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+";
            }}
          />
        </AppLink>
        <span className={`product-badge ${product.badge.toLowerCase()}`}>
          {product.badge}
        </span>
        <button
          className={`wish-btn ${wished ? "selected" : ""}`}
          onClick={(e) => { e.stopPropagation(); onWish(product); }}
          aria-label={`${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist`}
        >
          <Heart fill={wished ? "currentColor" : "none"} />
        </button>
        <button
          className={`compare-btn ${compared ? "selected" : ""}`}
          onClick={(e) => { e.stopPropagation(); toggleCompare(product); }}
          aria-pressed={compared}
          aria-label={`Compare ${product.name}`}
        >
          <ArrowLeftRight />
          <span>{compared ? "Added" : "Compare"}</span>
        </button>
      </div>
      <div className="product-info">
        <p className="eyebrow">
          {product.material} · {product.category}
        </p>
        <h3>
          <AppLink to={`/product/${product.slug}`}>{product.name}</AppLink>
        </h3>
        <div className="rating">
          <Star fill="currentColor" />
          <b>{product.rating}</b>
          <span>({product.reviews})</span>
        </div>
        <div className="price">
          <strong>{priceLabel ?? money(product.price)}</strong>
          {product.oldPrice && (
            <>
              <del>{money(product.oldPrice)}</del>
              <em>{discount}% off</em>
            </>
          )}
        </div>
        {addToCart && (
          <button
            className="button primary add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={adding || !priceAvailable || !defaultSize}
            aria-label={priceAvailable ? `Add ${product.name} to cart` : "Price unavailable for this size"}
            aria-busy={adding}
          >
            {adding ? (
              <>
                <span className="btn-spinner" aria-hidden="true" />
                <span>Adding...</span>
              </>
            ) : priceAvailable ? (
              <>
                <ShoppingBag aria-hidden="true" />
                <span>Add to cart</span>
              </>
            ) : (
              <span>Unavailable</span>
            )}
          </button>
        )}
      </div>
    </article>
  );
});

ProductCardInner.displayName = "ProductCard";

export default function ProductCard({ product, wished, onWish, priority = false, priceLabel, addToCart, notify }) {
  return <ProductCardInner product={product} wished={wished} onWish={onWish} priority={priority} priceLabel={priceLabel} addToCart={addToCart} notify={notify} />;
}
