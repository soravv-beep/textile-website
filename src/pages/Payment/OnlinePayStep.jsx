import { useState } from "react";
import { Button } from "../../components/ui/index.js";

const SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;
const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const BANKS = [
  "State Bank of India","HDFC Bank","ICICI Bank","Axis Bank","Kotak Mahindra Bank",
  "Punjab National Bank","Bank of Baroda","Canara Bank","Union Bank of India","IDBI Bank",
  "Yes Bank","IndusInd Bank","Federal Bank","South Indian Bank","Karnataka Bank",
];

const WALLETS = [
  { id: "paytm", name: "Paytm" },
  { id: "phonepe", name: "PhonePe" },
  { id: "amazonpay", name: "Amazon Pay" },
  { id: "gpay", name: "Google Pay" },
];

const ONLINE_OPTS = [
  { id: "card", name: "Debit / Credit Card", desc: "Visa, Mastercard, RuPay, Amex" },
  { id: "upi",  name: "UPI",                 desc: "GPay, PhonePe, Paytm, BHIM" },
  { id: "netbanking", name: "Net Banking",   desc: "All major Indian banks" },
  { id: "wallets",    name: "Wallets",        desc: "Paytm, PhonePe, Amazon Pay" },
];

function Field({ id, label, value, onChange, error, type = "text", placeholder, ...rest }) {
  return (
    <div className="co-field">
      <label htmlFor={id} className="co-field__label">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`co-field__input${error ? " co-field__input--err" : ""}`}
        {...rest}
      />
      {error && <p className="co-field__err" role="alert">{error}</p>}
    </div>
  );
}

function SelectField({ id, label, value, onChange, error, options = [], placeholder }) {
  return (
    <div className="co-field">
      <label htmlFor={id} className="co-field__label">{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`co-field__input co-field__select${error ? " co-field__input--err" : ""}`}
      >
        <option value="">{placeholder || "Select..."}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {error && <p className="co-field__err" role="alert">{error}</p>}
    </div>
  );
}

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
export default function OnlinePayStep({ items, onBack, onSuccess, loading, setLoading }) {
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

