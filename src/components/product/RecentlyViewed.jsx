import SectionHeading from "../common/SectionHeading.jsx";
import ProductGrid from "./ProductGrid.jsx";
import { products } from "../../data/storeData.js";

export default function RecentlyViewed({ ids, excludeId, wishlist, onWish }) {
  const list = ids
    .filter((id) => id !== excludeId)
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4);
  if (!list.length) return null;
  return (
    <section className="section">
      <SectionHeading
        kicker="Pick up where you left off"
        title="Recently viewed"
      />
      <ProductGrid list={list} wishlist={wishlist} onWish={onWish} />
    </section>
  );
}
