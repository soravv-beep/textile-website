import ProductCard from "./ProductCard.jsx";
import ProductCardSkeleton from "./ProductCardSkeleton.jsx";
import "./ProductLoading.css";

export default function ProductGrid({ products, list, loading = false, pendingItems = [], revealFrom = Infinity, wishlist = new Set(), onWish, addToCart, notify }) {
  const items = products ?? list ?? [];
  const combined = [...items, ...pendingItems];
  return (
    <div className="product-grid" role="list" aria-busy={loading || pendingItems.length > 0}>
      {combined.map((product, index) => {
        const pending = index >= items.length;
        const reveal = !pending && index >= revealFrom;
        return (
          <div key={product.id} role="listitem" className={`product-grid-item${pending ? " product-grid-pending" : ""}${reveal ? " product-grid-reveal" : ""}`}
            style={reveal ? { "--card-delay": `${Math.min((index - revealFrom) * 40, 200)}ms` } : undefined}>
            <div className="product-grid-content" aria-hidden={pending ? "true" : "false"} inert={pending ? "true" : undefined}>
              <ProductCard product={product} wished={wishlist.has(product.id)} onWish={onWish} addToCart={addToCart} notify={notify} />
            </div>
            {pending && <ProductCardSkeleton />}
          </div>
        );
      })}
      {loading && !pendingItems.length && Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={`skeleton-${i}`} />)}
    </div>
  );
}
