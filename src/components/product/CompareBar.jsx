import { X } from "lucide-react";
import AppLink from "../common/AppLink.jsx";
import { products } from "../../data/storeData.js";
import { useStore } from "../../context/StoreContext.js";

export default function CompareBar({ lifted, clear }) {
  const { compare, toggleCompare } = useStore();
  if (!compare.length) return null;
  const items = products.filter((p) => compare.includes(p.id));
  return (
    <div className={`compare-bar ${lifted ? "lifted" : ""}`} role="region" aria-label="Product comparison">
      <div className="compare-items">
        {items.map((p) => (
          <span key={p.id}><img src={p.image} alt="" />{p.name}<button onClick={() => toggleCompare(p)} aria-label={`Remove ${p.name}`}><X /></button></span>
        ))}
      </div>
      <div className="compare-actions">
        <button className="text-link" onClick={clear}>Clear</button>
        <AppLink to="/compare" className="button primary">Compare ({compare.length})</AppLink>
      </div>
    </div>
  );
}
