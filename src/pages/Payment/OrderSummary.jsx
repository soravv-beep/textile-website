import { lineKey } from "../../context/CartContext.jsx";

const SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;
const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const DEFAULT_FALLBACK_IMG = "/product-images-v2/sanganeri-table-runner.webp";

export default function OrderSummary({ items }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  return (
    <aside className="co-sidebar">
      <h2 className="co-sidebar__title">Your Order</h2>
      <ul className="co-sidebar__items">
        {items.map((i) => {
          const imgSrc = i.image || DEFAULT_FALLBACK_IMG;
          return (
            <li key={lineKey(i)} className="co-sidebar__item">
              <div className="co-sidebar__thumb">
                <img
                  src={imgSrc}
                  alt={i.name}
                  onError={(e) => {
                    if (e.target.src !== DEFAULT_FALLBACK_IMG) {
                      e.target.src = DEFAULT_FALLBACK_IMG;
                    }
                  }}
                />
                <span className="co-sidebar__qty">{i.qty}</span>
              </div>
              <div className="co-sidebar__info">
                <p className="co-sidebar__name">{i.name}</p>
                {i.variant && <p className="co-sidebar__var">{i.variant}</p>}
                {i.size && <p className="co-sidebar__var">Size: {i.size}</p>}
              </div>
              <span className="co-sidebar__price">{fmt(i.price * i.qty)}</span>
            </li>
          );
        })}
      </ul>
      <div className="co-sidebar__divider" />
      <div className="co-sidebar__line"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
      <div className="co-sidebar__line">
        <span>Shipping</span>
        <span>{shipping === 0 ? <span className="co-sidebar__free">FREE</span> : fmt(shipping)}</span>
      </div>
      <div className="co-sidebar__line co-sidebar__line--total"><span>Total</span><span>{fmt(total)}</span></div>
      <div className="co-sidebar__trust">
        <span>SSL Secured Checkout</span>
        <span>100% Authentic Products</span>
      </div>
    </aside>
  );
}

