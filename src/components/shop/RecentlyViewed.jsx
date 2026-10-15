import SectionHeading from "../ui/SectionHeading.jsx";
import ProductGrid from "../product/ProductGrid.jsx";
import { products } from "../../data/catalog.js";
import { useShop } from "../../context/shopContext.js";

/** Last viewed products (excluding the one on screen), up to four cards. */
export default function RecentlyViewed({ ids, excludeId }) {
  const { cards, cardHandlers } = useShop();
  const list = ids
    .filter((id) => id !== excludeId)
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4);
  if (!list.length) return null;
  return (
    <section className="section">
      <SectionHeading label="Pick up where you left off" title="Recently viewed" />
      <ProductGrid products={cards(list)} {...cardHandlers} />
    </section>
  );
}
