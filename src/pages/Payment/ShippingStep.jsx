import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useAddress } from "../../context/AddressContext.jsx";
import { Button } from "../../components/ui/index.js";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Delhi","Jammu & Kashmir","Ladakh","Puducherry","Chandigarh","Dadra & Nagar Haveli",
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

export default function ShippingStep({ onNext, defaultValues }) {
  const { user } = useAuth();
  const { addresses } = useAddress();

  /* Pre-fill from: selected saved address → defaultValues → user name */
  const [selectedAddrId, setSelectedAddrId] = useState(() => {
    if (addresses.length > 0) {
      const def = addresses.find((a) => a.isDefault) || addresses[0];
      return def.id;
    }
    return "manual";
  });

  const buildFromAddr = (addr) => ({
    fullName: addr.fullName || user?.name || "",
    phone:    addr.phone    || "",
    address1: addr.address1 || "",
    address2: addr.address2 || "",
    city:     addr.city     || "",
    state:    addr.state    || "",
    pincode:  addr.pincode  || "",
  });

  const [f, setF] = useState(() => {
    if (defaultValues) return defaultValues;
    if (addresses.length > 0) {
      const def = addresses.find((a) => a.isDefault) || addresses[0];
      return buildFromAddr(def);
    }
    return { fullName: user?.name || "", phone: "", address1: "", address2: "", city: "", state: "", pincode: "" };
  });

  const [errors, setErrors] = useState({});
  const [showManual, setShowManual] = useState(addresses.length === 0);

  const handlePickAddr = (addr) => {
    if (addr === "manual") {
      setSelectedAddrId("manual");
      setShowManual(true);
      setF({ fullName: user?.name || "", phone: "", address1: "", address2: "", city: "", state: "", pincode: "" });
    } else {
      setSelectedAddrId(addr.id);
      setShowManual(false);
      setF(buildFromAddr(addr));
    }
  };

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

      {/* ── Saved address picker ── */}
      {addresses.length > 0 && (
        <div className="co-saved-addrs">
          <p className="co-saved-addrs__label">Deliver to a saved address</p>
          <div className="co-saved-addrs__list">
            {addresses.map((addr) => (
              <label
                key={addr.id}
                className={`co-saved-addr-card${selectedAddrId === addr.id ? " is-selected" : ""}`}
                htmlFor={`ship-addr-${addr.id}`}
              >
                <input
                  type="radio"
                  id={`ship-addr-${addr.id}`}
                  name="saved-address"
                  value={addr.id}
                  checked={selectedAddrId === addr.id}
                  onChange={() => handlePickAddr(addr)}
                  className="co-saved-addr-card__radio"
                />
                <div className="co-saved-addr-card__body">
                  <div className="co-saved-addr-card__top">
                    <span className="co-saved-addr-card__label">{addr.label}</span>
                    {addr.isDefault && <span className="co-saved-addr-card__badge">Default</span>}
                  </div>
                  <p className="co-saved-addr-card__name">{addr.fullName} · {addr.phone}</p>
                  <p className="co-saved-addr-card__line">
                    {addr.address1}{addr.address2 ? `, ${addr.address2}` : ""}, {addr.city}, {addr.state} – {addr.pincode}
                  </p>
                </div>
              </label>
            ))}

            {/* "Enter new address" option */}
            <label
              className={`co-saved-addr-card co-saved-addr-card--new${selectedAddrId === "manual" ? " is-selected" : ""}`}
              htmlFor="ship-addr-manual"
            >
              <input
                type="radio"
                id="ship-addr-manual"
                name="saved-address"
                value="manual"
                checked={selectedAddrId === "manual"}
                onChange={() => handlePickAddr("manual")}
                className="co-saved-addr-card__radio"
              />
              <div className="co-saved-addr-card__body">
                <span className="co-saved-addr-card__label">+ Enter a new address</span>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* ── Manual form (shown when "new address" is selected or no saved addresses) ── */}
      {(showManual || addresses.length === 0) && (
        <>
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
        </>
      )}

      <Button type="submit" size="lg" id="checkout-shipping-next">Continue to Payment</Button>
    </form>
  );
}

