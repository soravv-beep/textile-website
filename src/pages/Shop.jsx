/**
 * Shop page (Dev 2) — every product with search, filters, sorting and reset.
 * The navbar search sends ?q=…; the original shop link format ?search=… also works.
 */
import { useSearchParams } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";
import Breadcrumb from "../components/shop/Breadcrumb.jsx";
import ProductBrowser from "../components/shop/ProductBrowser.jsx";
import { products } from "../data/catalog.js";

export default function Shop() {
  const [params] = useSearchParams();
  const search = params.get("q") || params.get("search") || "";

  return (
    <div className="shop-scope">
      <PageMeta
        title="Shop Handwoven Textiles | WovenHaat"
        description="Handwoven rugs, cushion covers, throws, bath mats, table linen and curtains from artisan clusters across India."
      />
      <div className="page-main shell">
        <Breadcrumb items={["Shop"]} />
        <div className="page-title-row">
          <div>
            <p className="kicker">Woven for living</p>
            <h1>Shop handwoven textiles</h1>
            <p>Considered texture for every room, made in small batches.</p>
          </div>
          <span>{products.length} products</span>
        </div>
        <ProductBrowser list={products} initialSearch={search} />
      </div>
    </div>
  );
}
