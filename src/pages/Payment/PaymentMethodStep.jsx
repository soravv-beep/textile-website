import { Button } from "../../components/ui/index.js";

const SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;
const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function PaymentMethodStep({ shipping, items, onBack, onCOD, onOnline }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;

  return (
    <div className="co-form" id="payment-method-form">
      <h2 className="co-form__title">Payment Method</h2>
      <p className="co-form__sub">How would you like to pay?</p>

      <div className="co-addr-review">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
        </svg>
        <div>
          <p className="co-addr-review__label">Delivering to</p>
          <p className="co-addr-review__val">{shipping.fullName} · {shipping.address1}, {shipping.city}, {shipping.state} – {shipping.pincode}</p>
        </div>
        <button onClick={onBack} className="co-addr-review__change" type="button">Change</button>
      </div>

      <div className="co-pay-total">
        <span>Amount to pay</span>
        <span className="co-pay-total__amt">{fmt(total)}</span>
      </div>

      <div className="co-method-cards">
        <button className="co-method-card" onClick={onOnline} id="pay-online-btn">
          <div className="co-method-card__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
            </svg>
          </div>
          <div className="co-method-card__info">
            <span className="co-method-card__name">Pay Online</span>
            <span className="co-method-card__desc">Card, UPI, Net Banking, Wallets</span>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        <button className="co-method-card" onClick={onCOD} id="pay-cod-btn">
          <div className="co-method-card__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div className="co-method-card__info">
            <span className="co-method-card__name">Cash on Delivery</span>
            <span className="co-method-card__desc">Pay when your order arrives · No extra charges</span>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <div className="co-form__actions">
        <Button variant="outline" onClick={onBack} id="checkout-method-back">Back</Button>
      </div>
      <p className="co-secure-note">256-bit SSL encryption — your data is safe</p>
    </div>
  );
}

