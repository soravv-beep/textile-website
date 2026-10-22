/**
 * Checkout — WovenHaat (Dev 3 / Manav Chotai)
 * Step 1: Shipping  →  Step 2: Payment method
 *   COD: place order immediately
 *   Online → sub-step: Card / UPI / Net Banking / Wallets
 *     Card: card details form
 *     UPI: QR code + VPA input
 *     Net Banking: bank dropdown + account form
 *     Wallets: wallet selector (Paytm, PhonePe, Amazon Pay, GPay)
 * Step 3: Confirmation with order ID + ETA
 */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useOrders } from "../context/OrdersContext.jsx";
import { ROUTES } from "../constants/routes.js";
import { Button, Container } from "../components/ui/index.js";
import PageMeta from "../components/PageMeta.jsx";

const SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;
const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Delhi","Jammu & Kashmir","Ladakh","Puducherry","Chandigarh","Dadra & Nagar Haveli",
];

const BANKS = [
  "State Bank of India","HDFC Bank","ICICI Bank","Axis Bank","Kotak Mahindra Bank",
  "Punjab National Bank","Bank of Baroda","Canara Bank","Union Bank of India","IDBI Bank",
  "Yes Bank","IndusInd Bank","Federal Bank","South Indian Bank","Karnataka Bank",
];

/* ── Step indicator ── */
const STEPS = ["Shipping", "Payment", "Confirmation"];

function StepIndicator({ current }) {
  return (
    <ol className="co-steps">
      {STEPS.map((label, idx) => {
        const state = idx < current ? "done" : idx === current ? "active" : "pending";
        return (
          <li key={label} className={`co-step co-step--${state}`}>
            <span className="co-step__num">
              {idx < current ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : idx + 1}
            </span>
            <span className="co-step__label">{label}</span>
            {idx < STEPS.length - 1 && <span className="co-step__line" />}
          </li>
        );
      })}
    </ol>
  );
}

/* ── Sidebar ── */
function MiniSummary({ items }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  return (
    <aside className="co-sidebar">
      <h2 className="co-sidebar__title">Your Order</h2>
      <ul className="co-sidebar__items">
        {items.map((i) => (
          <li key={i.slug} className="co-sidebar__item">
            <div className="co-sidebar__thumb">
              {i.image ? <img src={i.image} alt={i.name} /> : <span>–</span>}
              <span className="co-sidebar__qty">{i.qty}</span>
            </div>
            <div className="co-sidebar__info">
              <p className="co-sidebar__name">{i.name}</p>
              {i.variant && <p className="co-sidebar__var">{i.variant}</p>}
            </div>
            <span className="co-sidebar__price">{fmt(i.price * i.qty)}</span>
          </li>
        ))}
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

/* ── Form helpers ── */
function Field({ id, label, value, onChange, error, type = "text", placeholder, ...rest }) {
  return (
    <div className="co-field">
      <label htmlFor={id} className="co-field__label">{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
        className={`co-field__input${error ? " co-field__input--err" : ""}`} {...rest} />
      {error && <p className="co-field__err" role="alert">{error}</p>}
    </div>
  );
}

function SelectField({ id, label, value, onChange, error, options = [], placeholder }) {
  return (
    <div className="co-field">
      <label htmlFor={id} className="co-field__label">{label}</label>
      <select id={id} value={value} onChange={onChange}
        className={`co-field__input co-field__select${error ? " co-field__input--err" : ""}`}>
        <option value="">{placeholder || "Select..."}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p className="co-field__err" role="alert">{error}</p>}
    </div>
  );
}

/* ── Step 1: Shipping ── */
function ShippingStep({ onNext, defaultValues }) {
  const { user } = useAuth();
  const [f, setF] = useState({
    fullName:  defaultValues?.fullName  || user?.name || "",
    phone:     defaultValues?.phone     || "",
    address1:  defaultValues?.address1  || "",
    address2:  defaultValues?.address2  || "",
    city:      defaultValues?.city      || "",
    state:     defaultValues?.state     || "",
    pincode:   defaultValues?.pincode   || "",
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => {
    setF((x) => ({ ...x, [key]: e.target.value }));
    setErrors((x) => ({ ...x, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!f.fullName) e.fullName = "Full name is required.";
    if (!f.phone || !/^\d{10}$/.test(f.phone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit number.";
    if (!f.address1) e.address1 = "Address is required.";
    if (!f.city) e.city = "City is required.";
    if (!f.state) e.state = "State is required.";
    if (!f.pincode || !/^\d{6}$/.test(f.pincode)) e.pincode = "Enter a valid 6-digit PIN.";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onNext(f);
  };

  return (
    <form className="co-form" onSubmit={handleSubmit} noValidate id="shipping-form">
      <h2 className="co-form__title">Shipping Address</h2>
      <p className="co-form__sub">Where should we deliver your order?</p>
      <div className="co-form__row">
        <Field id="co-name" label="Full name" value={f.fullName} onChange={set("fullName")} error={errors.fullName}
          placeholder="e.g. Manav Chotai" autoComplete="name" required />
        <Field id="co-phone" label="Mobile number" type="tel" value={f.phone} onChange={set("phone")}
          error={errors.phone} placeholder="e.g. 9876543210" autoComplete="tel" required />
      </div>
      <Field id="co-addr1" label="Address line 1" value={f.address1} onChange={set("address1")}
        error={errors.address1} placeholder="e.g. 14, Sector 29, HSIDC Industrial Area" autoComplete="address-line1" required />
      <Field id="co-addr2" label="Address line 2 (optional)" value={f.address2} onChange={set("address2")}
        placeholder="Landmark, apartment no." autoComplete="address-line2" />
      <div className="co-form__row co-form__row--3">
        <Field id="co-city" label="City" value={f.city} onChange={set("city")} error={errors.city}
          placeholder="e.g. Panipat" autoComplete="address-level2" required />
        <SelectField id="co-state" label="State" value={f.state} onChange={set("state")}
          error={errors.state} options={INDIAN_STATES} placeholder="Select state" />
        <Field id="co-pin" label="PIN code" value={f.pincode} onChange={set("pincode")} error={errors.pincode}
          placeholder="e.g. 132103" autoComplete="postal-code" inputMode="numeric" maxLength={6} required />
      </div>
      <Button type="submit" size="lg" id="checkout-shipping-next">Continue to Payment</Button>
    </form>
  );
}

/* ── Step 2a: Choose method ── */
function PaymentMethodStep({ shipping, items, onBack, onCOD, onOnline }) {
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

/* ── Step 2b: Online sub-method ── */
/* Card form */
function CardForm({ onPay, onBack, loading }) {
  const [f, setF] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => { setF((x) => ({ ...x, [k]: e.target.value })); setErrors((x) => ({ ...x, [k]: "" })); };
  const validate = () => {
    const e = {};
    if (!f.name) e.name = "Cardholder name required.";
    if (!f.number || f.number.replace(/\s/g, "").length < 16) e.number = "Enter valid 16-digit card number.";
    if (!f.expiry || !/^\d{2}\/\d{2}$/.test(f.expiry)) e.expiry = "Format: MM/YY";
    if (!f.cvv || f.cvv.length < 3) e.cvv = "Enter 3 or 4 digit CVV.";
    return e;
  };
  const handle = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onPay("card");
  };
  const fmtCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const fmtExpiry = (v) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d; };
  return (
    <form onSubmit={handle} noValidate className="online-sub-form">
      <h3 className="online-sub-form__title">Debit / Credit Card</h3>
      <Field id="card-name" label="Cardholder Name" value={f.name} onChange={set("name")} error={errors.name} placeholder="e.g. Manav Chotai" autoComplete="cc-name" />
      <Field id="card-num" label="Card Number" value={f.number} onChange={(e) => setF((x) => ({ ...x, number: fmtCard(e.target.value) }))}
        error={errors.number} placeholder="1234 5678 9012 3456" inputMode="numeric" autoComplete="cc-number" />
      <div className="co-form__row">
        <Field id="card-exp" label="Expiry (MM/YY)" value={f.expiry} onChange={(e) => setF((x) => ({ ...x, expiry: fmtExpiry(e.target.value) }))}
          error={errors.expiry} placeholder="e.g. 08/26" inputMode="numeric" autoComplete="cc-exp" />
        <Field id="card-cvv" label="CVV" value={f.cvv} onChange={set("cvv")} error={errors.cvv}
          placeholder="e.g. 123" inputMode="numeric" maxLength={4} type="password" autoComplete="cc-csc" />
      </div>
      <div className="co-form__actions">
        <Button variant="outline" type="button" onClick={onBack}>Back</Button>
        <Button type="submit" size="lg" loading={loading} id="card-pay-btn">Pay Now</Button>
      </div>
    </form>
  );
}

/* UPI form */
function UPIForm({ total, onPay, onBack, loading }) {
  const [vpa, setVpa] = useState("");
  const [err, setErr] = useState("");
  const handle = (ev) => {
    ev.preventDefault();
    if (!vpa || !vpa.includes("@")) { setErr("Enter a valid UPI ID (e.g. name@upi)."); return; }
    onPay("upi");
  };
  return (
    <form onSubmit={handle} noValidate className="online-sub-form">
      <h3 className="online-sub-form__title">UPI Payment</h3>
      <div className="upi-qr">
        {/* Dummy QR — styled box */}
        <div className="upi-qr__box">
          <div className="upi-qr__inner">
            <div className="upi-qr__grid">
              {Array.from({ length: 49 }).map((_, i) => (
                <div key={i} className="upi-qr__cell" style={{ background: Math.random() > 0.45 ? "#222" : "#fff" }} />
              ))}
            </div>
          </div>
          <p className="upi-qr__label">Scan with any UPI app</p>
          <p className="upi-qr__amount">{fmt(total)}</p>
        </div>
      </div>
      <p className="upi-or">— or enter UPI ID —</p>
      <div className="co-field">
        <label htmlFor="upi-id" className="co-field__label">Your UPI ID</label>
        <input id="upi-id" type="text" className={`co-field__input${err ? " co-field__input--err" : ""}`}
          value={vpa} onChange={(e) => { setVpa(e.target.value); setErr(""); }}
          placeholder="e.g. manav@upi or 9876543210@paytm" />
        {err && <p className="co-field__err" role="alert">{err}</p>}
      </div>
      <div className="co-form__actions">
        <Button variant="outline" type="button" onClick={onBack}>Back</Button>
        <Button type="submit" size="lg" loading={loading} id="upi-pay-btn">Verify & Pay</Button>
      </div>
    </form>
  );
}

/* Net Banking form */
function NetBankingForm({ onPay, onBack, loading }) {
  const [bank, setBank] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [errors, setErrors] = useState({});
  const handle = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!bank) e.bank = "Please select a bank.";
    if (!accountNo || accountNo.length < 9) e.accountNo = "Enter valid account number.";
    if (!ifsc || !/^[A-Z]{4}0\w{6}$/i.test(ifsc)) e.ifsc = "Enter valid IFSC code (e.g. SBIN0001234).";
    if (Object.keys(e).length) { setErrors(e); return; }
    onPay("netbanking");
  };
  return (
    <form onSubmit={handle} noValidate className="online-sub-form">
      <h3 className="online-sub-form__title">Net Banking</h3>
      <SelectField id="nb-bank" label="Select Bank" value={bank} onChange={(e) => { setBank(e.target.value); setErrors((x) => ({ ...x, bank: "" })); }}
        error={errors.bank} options={BANKS} placeholder="Choose your bank" />
      <Field id="nb-acc" label="Account Number" value={accountNo} onChange={(e) => { setAccountNo(e.target.value); setErrors((x) => ({ ...x, accountNo: "" })); }}
        error={errors.accountNo} placeholder="e.g. 40123456789" inputMode="numeric" />
      <Field id="nb-ifsc" label="IFSC Code" value={ifsc} onChange={(e) => { setIfsc(e.target.value.toUpperCase()); setErrors((x) => ({ ...x, ifsc: "" })); }}
        error={errors.ifsc} placeholder="e.g. SBIN0001234" maxLength={11} />
      <div className="co-form__actions">
        <Button variant="outline" type="button" onClick={onBack}>Back</Button>
        <Button type="submit" size="lg" loading={loading} id="nb-pay-btn">Proceed to Pay</Button>
      </div>
    </form>
  );
}

/* Wallets form */
const WALLETS = [
  { id: "paytm", name: "Paytm" },
  { id: "phonepe", name: "PhonePe" },
  { id: "amazonpay", name: "Amazon Pay" },
  { id: "gpay", name: "Google Pay" },
];

function WalletsForm({ onPay, onBack, loading }) {
  const [sel, setSel] = useState("");
  const [err, setErr] = useState("");
  const handle = () => {
    if (!sel) { setErr("Please select a wallet."); return; }
    onPay("wallet");
  };
  return (
    <div className="online-sub-form">
      <h3 className="online-sub-form__title">Wallets</h3>
      <div className="wallet-grid">
        {WALLETS.map((w) => (
          <button
            key={w.id}
            type="button"
            className={`wallet-btn${sel === w.id ? " is-sel" : ""}`}
            onClick={() => { setSel(w.id); setErr(""); }}
            id={`wallet-${w.id}`}
          >
            {w.name}
          </button>
        ))}
      </div>
      {err && <p className="co-field__err" role="alert">{err}</p>}
      <p className="wallet-note">You will be redirected to {sel ? WALLETS.find((w) => w.id === sel)?.name : "your selected wallet"} to complete the payment.</p>
      <div className="co-form__actions">
        <Button variant="outline" type="button" onClick={onBack}>Back</Button>
        <Button onClick={handle} size="lg" loading={loading} disabled={!sel} id="wallet-pay-btn">
          {sel ? `Pay with ${WALLETS.find((w) => w.id === sel)?.name}` : "Select Wallet"}
        </Button>
      </div>
    </div>
  );
}

/* Online sub-method router */
const ONLINE_OPTS = [
  { id: "card", name: "Debit / Credit Card", desc: "Visa, Mastercard, RuPay, Amex" },
  { id: "upi",  name: "UPI",                 desc: "GPay, PhonePe, Paytm, BHIM" },
  { id: "netbanking", name: "Net Banking",   desc: "All major Indian banks" },
  { id: "wallets",    name: "Wallets",        desc: "Paytm, PhonePe, Amazon Pay" },
];

function OnlinePayStep({ items, onBack, onSuccess, loading, setLoading }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;
  const [subMethod, setSubMethod] = useState(null);

  const handlePay = (method) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(method, { total, subtotal, shippingCost });
    }, 1200);
  };

  if (subMethod === "card")       return <CardForm onPay={handlePay} onBack={() => setSubMethod(null)} loading={loading} />;
  if (subMethod === "upi")        return <UPIForm total={total} onPay={handlePay} onBack={() => setSubMethod(null)} loading={loading} />;
  if (subMethod === "netbanking") return <NetBankingForm onPay={handlePay} onBack={() => setSubMethod(null)} loading={loading} />;
  if (subMethod === "wallets")    return <WalletsForm onPay={handlePay} onBack={() => setSubMethod(null)} loading={loading} />;

  return (
    <div className="co-form" id="online-pay-form">
      <h2 className="co-form__title">Pay Online</h2>
      <p className="co-form__sub">Select your preferred payment method</p>
      <div className="co-method-cards">
        {ONLINE_OPTS.map((opt) => (
          <button key={opt.id} className="co-method-card" onClick={() => setSubMethod(opt.id)} id={`online-${opt.id}`}>
            <div className="co-method-card__info">
              <span className="co-method-card__name">{opt.name}</span>
              <span className="co-method-card__desc">{opt.desc}</span>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        ))}
      </div>
      <div className="co-form__actions">
        <Button variant="outline" onClick={onBack} id="online-back">Back</Button>
      </div>
      <p className="co-secure-note">Secured by Razorpay · 256-bit SSL</p>
    </div>
  );
}

/* ── Step 3: Confirmation ── */
function ConfirmationStep({ order }) {
  return (
    <motion.div className="co-confirm" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }}>
      <div className="co-confirm__check">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h2 className="co-confirm__title">Order Confirmed!</h2>
      <p className="co-confirm__id">Order ID: <strong>{order.id}</strong></p>
      <p className="co-confirm__text">
        Thank you! Your handwoven treasures are being prepared and will be shipped shortly.
      </p>
      {order.estimatedDelivery && (
        <div className="co-confirm__eta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span>
            Estimated delivery:{" "}
            <strong>
              {new Date(order.estimatedDelivery).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </strong>
          </span>
        </div>
      )}
      <div className="co-confirm__actions">
        <Button as={Link} to={ROUTES.orders} id="checkout-view-orders">Track My Order</Button>
        <Button as={Link} to={ROUTES.shop} variant="outline" id="checkout-continue-shopping">Continue Shopping</Button>
      </div>
    </motion.div>
  );
}

/* ── Main ── */
export default function CheckoutPage() {
  const { items, count, clear } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0=shipping, 1=method, 2=online, 3=confirm
  const [shippingData, setShippingData] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (count === 0 && step < 3) navigate(ROUTES.cart, { replace: true });
  }, [count, step, navigate]);

  const handleShippingDone = (data) => { setShippingData(data); setStep(1); };

  const handlePaymentSuccess = (method, paymentData) => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const order = placeOrder({
      items: [...items],
      shippingAddress: shippingData,
      paymentMethod: method,
      subtotal,
      shippingCost,
      total: subtotal + shippingCost,
    });
    clear();
    setPlacedOrder(order);
    setStep(3);
  };

  const handleCOD = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handlePaymentSuccess("cod", {});
    }, 600);
  };

  const stepIndex = step === 3 ? 2 : step > 1 ? 1 : step;

  return (
    <>
      <PageMeta title="Checkout — WovenHaat" description="Secure checkout. Pay online or cash on delivery." />
      <div className="co-page">
        <Container>
          <StepIndicator current={stepIndex} />
          <div className="co-layout">
            <div className="co-main">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.22 }}
                >
                  {step === 0 && (
                    <ShippingStep onNext={handleShippingDone} defaultValues={shippingData} />
                  )}
                  {step === 1 && (
                    <PaymentMethodStep
                      shipping={shippingData}
                      items={items}
                      onBack={() => setStep(0)}
                      onCOD={handleCOD}
                      onOnline={() => setStep(2)}
                    />
                  )}
                  {step === 2 && (
                    <OnlinePayStep
                      items={items}
                      onBack={() => setStep(1)}
                      onSuccess={handlePaymentSuccess}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  )}
                  {step === 3 && placedOrder && (
                    <ConfirmationStep order={placedOrder} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            {step < 3 && <MiniSummary items={items} />}
          </div>
        </Container>
      </div>

      <style>{`
        .co-page { min-height: 100vh; padding-top: calc(var(--nav-height) + var(--sp-7)); padding-bottom: var(--sp-8); background: var(--color-bg); }
        .co-steps { display: flex; align-items: center; justify-content: center; list-style: none; margin: 0 0 var(--sp-7); padding: 0; }
        .co-step { display: flex; align-items: center; gap: var(--sp-2); font-size: 0.875rem; color: var(--color-muted); font-weight: 500; }
        .co-step--done { color: var(--color-success); }
        .co-step--active { color: var(--color-primary); font-weight: 700; }
        .co-step__num { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; background: var(--color-bg); border: 2px solid currentColor; flex-shrink: 0; }
        .co-step--done .co-step__num { background: var(--color-success); color: #fff; border-color: var(--color-success); }
        .co-step--active .co-step__num { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
        .co-step__line { flex: 1; min-width: 48px; height: 2px; background: var(--color-border); margin: 0 var(--sp-2); }
        @media(max-width:480px) { .co-step__label { display: none; } }
        .co-layout { display: grid; grid-template-columns: 1fr 320px; gap: var(--sp-7); align-items: start; }
        @media(max-width:880px) { .co-layout { grid-template-columns: 1fr; } }
        .co-sidebar { background: var(--color-surface); border: 1.5px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--sp-5); position: sticky; top: calc(var(--nav-height) + var(--sp-4)); box-shadow: var(--shadow); }
        .co-sidebar__title { font-family: var(--font-heading); font-size: 1.1rem; margin: 0 0 var(--sp-4); color: var(--color-text); padding-bottom: var(--sp-3); border-bottom: 1px solid var(--color-border); }
        .co-sidebar__items { list-style: none; margin: 0 0 var(--sp-4); padding: 0; display: flex; flex-direction: column; gap: var(--sp-3); }
        .co-sidebar__item { display: flex; align-items: center; gap: var(--sp-3); }
        .co-sidebar__thumb { position: relative; width: 48px; height: 48px; border-radius: var(--radius-sm); overflow: hidden; background: var(--color-bg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .co-sidebar__thumb img { width: 100%; height: 100%; object-fit: cover; }
        .co-sidebar__qty { position: absolute; top: -6px; right: -6px; background: var(--color-primary); color: #fff; font-size: 0.65rem; font-weight: 700; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .co-sidebar__info { flex: 1; min-width: 0; }
        .co-sidebar__name { font-size: 0.85rem; font-weight: 600; color: var(--color-text); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .co-sidebar__var { font-size: 0.75rem; color: var(--color-muted); margin: 0; }
        .co-sidebar__price { font-size: 0.9rem; font-weight: 700; color: var(--color-text); white-space: nowrap; flex-shrink: 0; }
        .co-sidebar__divider { height: 1px; background: var(--color-border); margin: var(--sp-3) 0; }
        .co-sidebar__line { display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--color-text); margin-bottom: var(--sp-2); }
        .co-sidebar__line--total { font-weight: 700; font-size: 1rem; border-top: 1.5px solid var(--color-border); padding-top: var(--sp-3); margin-top: var(--sp-2); }
        .co-sidebar__free { color: var(--color-success); font-weight: 700; }
        .co-sidebar__trust { display: flex; flex-direction: column; gap: 4px; margin-top: var(--sp-4); padding-top: var(--sp-3); border-top: 1px solid var(--color-border); font-size: 0.78rem; color: var(--color-muted); }
        .co-form { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--sp-7); display: flex; flex-direction: column; gap: var(--sp-4); box-shadow: var(--shadow); }
        @media(max-width:600px) { .co-form { padding: var(--sp-5); } }
        .co-form__title { font-family: var(--font-heading); font-size: 1.6rem; margin: 0; color: var(--color-text); }
        .co-form__sub { color: var(--color-muted); margin: 0; font-size: 0.9rem; }
        .co-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); }
        .co-form__row--3 { grid-template-columns: 1fr 1fr 1fr; }
        @media(max-width:600px) { .co-form__row, .co-form__row--3 { grid-template-columns: 1fr; } }
        .co-form__actions { display: flex; gap: var(--sp-3); align-items: center; flex-wrap: wrap; }
        .co-field { display: flex; flex-direction: column; gap: var(--sp-1); }
        .co-field__label { font-size: 0.88rem; font-weight: 600; color: var(--color-text); }
        .co-field__input { border: 1.5px solid var(--color-border); border-radius: var(--radius-sm); padding: var(--sp-3) var(--sp-4); font-size: 0.9rem; font-family: var(--font-body); color: var(--color-text); background: var(--color-bg); transition: border-color 0.2s, box-shadow 0.2s; box-sizing: border-box; width: 100%; }
        .co-field__input:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(200,66,31,.12); }
        .co-field__input::placeholder { color: #b0a898; }
        .co-field__select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23888'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; background-size: 18px; padding-right: 36px; }
        .co-field__input--err { border-color: var(--color-error); }
        .co-field__err { font-size: 0.78rem; color: var(--color-error); margin: 0; }
        .co-addr-review { display: flex; align-items: flex-start; gap: var(--sp-3); background: #f7f3ee; border-radius: var(--radius-sm); padding: var(--sp-3) var(--sp-4); flex-wrap: wrap; }
        .co-addr-review__label { font-size: 0.75rem; font-weight: 700; color: var(--color-muted); margin: 0 0 2px; text-transform: uppercase; letter-spacing: 0.05em; }
        .co-addr-review__val { font-size: 0.88rem; color: var(--color-text); margin: 0; }
        .co-addr-review__change { background: none; border: none; color: var(--color-primary); cursor: pointer; font-size: 0.82rem; text-decoration: underline; padding: 0; margin-left: auto; }
        .co-pay-total { display: flex; justify-content: space-between; align-items: center; background: var(--color-bg); border-radius: var(--radius-sm); padding: var(--sp-3) var(--sp-4); font-size: 0.95rem; color: var(--color-muted); }
        .co-pay-total__amt { font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; color: var(--color-primary); }
        .co-method-cards { display: flex; flex-direction: column; gap: var(--sp-3); }
        .co-method-card { display: flex; align-items: center; gap: var(--sp-4); border: 1.5px solid var(--color-border); border-radius: var(--radius); padding: var(--sp-4); cursor: pointer; background: var(--color-surface); transition: border-color 0.2s, box-shadow 0.2s; text-align: left; }
        .co-method-card:hover { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(200,66,31,.08); }
        .co-method-card__icon { color: var(--color-primary); flex-shrink: 0; }
        .co-method-card__info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .co-method-card__name { font-weight: 700; font-size: 0.98rem; color: var(--color-text); }
        .co-method-card__desc { font-size: 0.82rem; color: var(--color-muted); }
        .co-secure-note { font-size: 0.78rem; color: var(--color-muted); text-align: center; margin: 0; }
        .online-sub-form { display: flex; flex-direction: column; gap: var(--sp-4); }
        .online-sub-form__title { font-family: var(--font-heading); font-size: 1.3rem; margin: 0; color: var(--color-text); }
        .upi-qr { display: flex; justify-content: center; }
        .upi-qr__box { display: flex; flex-direction: column; align-items: center; gap: var(--sp-3); }
        .upi-qr__inner { padding: 10px; background: #fff; border: 2px solid var(--color-border); border-radius: var(--radius-sm); }
        .upi-qr__grid { display: grid; grid-template-columns: repeat(7, 24px); gap: 2px; }
        .upi-qr__cell { width: 24px; height: 24px; }
        .upi-qr__label { font-size: 0.82rem; color: var(--color-muted); margin: 0; }
        .upi-qr__amount { font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: var(--color-primary); margin: 0; }
        .upi-or { text-align: center; font-size: 0.82rem; color: var(--color-muted); margin: 0; }
        .wallet-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
        .wallet-btn { padding: var(--sp-4); border: 2px solid var(--color-border); border-radius: var(--radius); background: var(--color-surface); font-size: 0.95rem; font-weight: 600; color: var(--color-text); cursor: pointer; transition: border-color 0.2s, background 0.2s; }
        .wallet-btn:hover { border-color: var(--color-primary); }
        .wallet-btn.is-sel { border-color: var(--color-primary); background: #fdf2ef; color: var(--color-primary); }
        .wallet-note { font-size: 0.82rem; color: var(--color-muted); margin: 0; }
        .co-confirm { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--sp-8) var(--sp-7); text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--sp-4); box-shadow: var(--shadow-lg); }
        .co-confirm__check { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, var(--color-success), #3a9f62); color: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(76,122,90,.3); }
        .co-confirm__title { font-family: var(--font-heading); font-size: 2rem; margin: 0; color: var(--color-text); }
        .co-confirm__id { background: var(--color-bg); border-radius: var(--radius-sm); padding: var(--sp-2) var(--sp-4); font-size: 0.95rem; color: var(--color-muted); margin: 0; }
        .co-confirm__text { color: var(--color-muted); max-width: 420px; margin: 0; line-height: 1.7; }
        .co-confirm__eta { display: flex; align-items: center; gap: var(--sp-2); font-size: 0.95rem; color: var(--color-text); background: #f4f9fc; border: 1px solid #b8dde8; border-radius: var(--radius-sm); padding: var(--sp-3) var(--sp-4); }
        .co-confirm__actions { display: flex; gap: var(--sp-3); flex-wrap: wrap; justify-content: center; margin-top: var(--sp-3); }
      `}</style>
    </>
  );
}