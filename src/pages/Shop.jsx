/**
 * Shop page (Dev 2) — every product with search, filters, sorting and reset.
 * The navbar search sends ?q=…; the original shop link format ?search=… also works.
 */
import { useSearchParams } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";
import Breadcrumb from "../components/shop/Breadcrumb.jsx";
import ProductBrowser from "../components/shop/ProductBrowser.jsx";
import ProductGrid from "../components/product/ProductGrid.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import Newsletter from "../components/sections/Newsletter.jsx";
import { products } from "../data/catalog.js";
import { useShop } from "../context/shopContext.js";

export default function Shop() {
  const [params] = useSearchParams();
  const search = params.get("q") || params.get("search") || "";
  const category = params.get("category") || "";
  const material = params.get("material") || "";
  const color = params.get("color") || "";
  const size = params.get("size") || "";
  const type = params.get("type") || params.get("sub") || "";
  const style = params.get("style") || "";
  const price = params.get("price") || "";
  const rating = params.get("rating") || "";
  const sort = params.get("sort") || "";

  const initialFilters = {};
  if (category) initialFilters.category = category;
  if (material) initialFilters.material = material;
  if (color) initialFilters.color = color;
  if (size) initialFilters.size = size;
  if (type) initialFilters.type = type;
  if (style) initialFilters.style = style;
  if (price) initialFilters.price = price;
  if (rating) initialFilters.rating = rating;
  if (sort) initialFilters.sort = sort;

  const { cards, cardHandlers } = useShop();

  // Filter sale products dynamically from existing product data
  const saleProducts = products.filter(
    (p) => p.oldPrice && p.oldPrice > p.price && p.badge === "Sale"
  );

  return (
    <div className="shop-scope">
      <PageMeta
        title="Shop Handwoven Textiles | WovenHaat"
        description="Handwoven rugs, cushion covers, throws, bath mats, table linen and curtains from artisan clusters across India."
      />
      <div className="page-main shell">
        
        <div className="page-title-row">
          <div>
            <p className="kicker">Woven for living</p>
            <h1>Shop handwoven textiles</h1>
            <p>Considered texture for every room, made in small batches.</p>
          </div>
          <span>{products.length} products</span>
        </div>
        <ProductBrowser list={products} initialSearch={search} initialFilters={initialFilters} />
      </div>

      {saleProducts.length > 0 && (
        <section className="section sale-section">
          <div className="shell">
            <SectionHeading label="Special offers" title="Products on Sale" />
            <p className="sale-subtitle">Discover our handwoven favourites at special prices.</p>
            <ProductGrid
              products={cards(saleProducts)}
              {...cardHandlers}
              flip
            />
          </div>
        </section>
      )}

      <Newsletter />
    </div>
  );
}
