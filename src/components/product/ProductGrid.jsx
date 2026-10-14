/**
 * <ProductGrid /> — the responsive 4 / 3 / 2 column layout product cards live in.
 *
 * Use it anywhere products are listed (Home, Shop, Collections, Wishlist):
 *
 *   const [items, setItems] = useState([]);
 *   const [loading, setLoading] = useState(true);
 *   ...
 *   <ProductGrid products={items} loading={loading} onAddToCart={addItem} />
 *
 * It owns nothing but layout: data fetching, cart wiring and wishlist
 * persistence belong to the page (Dev 2 / Dev 3 / Dev 4).
 *
 * @param {object} props
 * @param {Array<object>} [props.products=[]] product objects, see src/data/mockProducts.js
 * @param {boolean} [props.loading=false] render skeletons instead of cards
 * @param {number} [props.skeletonCount=8] how many skeletons while loading
 * @param {(id:string, product:object)=>void|Promise<void>} [props.onAddToCart]
 * @param {(id:string)=>void|Promise<void>} [props.onToggleWishlist]
 * @param {React.ReactNode} [props.emptyState] shown when there are no products
 * @param {boolean} [props.tilt=true] pass false inside dense layouts
 * @param {string} [props.className]
 */
import ProductCard from "./ProductCard.jsx";
import ProductCardSkeleton from "./ProductCardSkeleton.jsx";

export default function ProductGrid({
  products = [],
  loading = false,
  skeletonCount = 8,
  onAddToCart,
  onToggleWishlist,
  emptyState = null,
  tilt = true,
  className = ""
}) {
  const gridClass = ["product-grid", className].filter(Boolean).join(" ");

  if (loading) {
    return (
      <div className={gridClass}>
        <ProductCardSkeleton count={skeletonCount} />
      </div>
    );
  }

  if (products.length === 0 && emptyState) {
    return <div className="product-grid__empty">{emptyState}</div>;
  }

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard
          key={product.id ?? product.slug}
          {...product}
          tilt={tilt}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
}
