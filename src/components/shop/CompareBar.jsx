import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { products } from "../../data/catalog.js";
import { useShop } from "../../context/shopContext.js";

/** Floating bar listing the products picked with the card's Compare button. */
export default function CompareBar({ clear }) {
  const { compare, toggleCompare } = useShop();
  const { pathname } = useLocation();
  if (!compare.length) return null;
  const lifted = pathname.startsWith("/product/");
  const items = products.filter((p) => compare.includes(p.id));
  return (
    <div className="shop-scope">
      <div className={`compare-bar ${lifted ? "lifted" : ""}`} role="region" aria-label="Product comparison">
        <div className="compare-items">
          {items.map((p) => (
            <span key={p.id}>
              <img src={p.image} alt="" />
              {p.name}
              <button type="button" onClick={() => toggleCompare(p)} aria-label={`Remove ${p.name}`}>
                <X aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
        <div className="compare-actions">
          <button type="button" className="text-link" onClick={clear}>
            Clear
          </button>
          <Link to="/compare" className="button primary">
            Compare ({compare.length})
          </Link>
        </div>
      </div>
    </div>
  );
}
