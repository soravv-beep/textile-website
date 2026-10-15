import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../components/common/Breadcrumb.jsx";
import ProductBrowser from "../components/product/ProductBrowser.jsx";
import { products } from "../data/storeData.js";

export default function ShopPage({ wishlist, onWish, addToCart, notify }) {
  const [params] = useSearchParams();
  const search = params.get("search") || "";
  return (
    <main className="page-main shell">
      <Breadcrumb items={["Shop"]} />
      <div className="page-title-row">
        <div><p className="kicker">Woven for living</p><h1>Shop handwoven textiles</h1><p>Considered texture for every room, made in small batches.</p></div>
        <span>{products.length} products</span>
      </div>
      <ProductBrowser list={products} initialSearch={search} wishlist={wishlist} onWish={onWish} addToCart={addToCart} notify={notify} />
    </main>
  );
}
