/**
 * Account Page — WovenHaat (Dev 3 / Manav Chotai)
 * - Wishlist tab shows real items from WishlistContext (shared with /wishlist page)
 * - Addresses tab reads/writes from AddressContext (shared with Checkout)
 * - Add Address modal is fully functional
 * - Drawer on all screen sizes
 */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useOrders } from "../context/OrdersContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAddress } from "../context/AddressContext.jsx";
import { ROUTES } from "../constants/routes.js";
import { Container } from "../components/ui/index.js";
import PageMeta from "../components/PageMeta.jsx";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const STATUS_LABEL = {
  pending: "Pending", confirmed: "Confirmed", processing: "Processing",
  shipped: "Shipped", delivered: "Delivered", cancelled: "Cancelled",
};
const STATUS_COLOR = {
  pending: "#e8a400", confirmed: "#2d6bcf", processing: "#9c27b0",
  shipped: "#0097a7", delivered: "#2e7d32", cancelled: "#c62828",
};

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
  "Puducherry","Chandigarh","Dadra & Nagar Haveli",
];

/* ── SVG icon set ── */
const Icons = {
  Profile: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>
    </svg>
  ),
  Orders: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 3v4M16 3v4M2 11h20"/>
    </svg>
  ),
  Wishlist: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Addresses: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
    </svg>
  ),
  Payment: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
    </svg>
  ),
  Logout: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Edit: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Trash: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Cart: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  Heart: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Menu: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Close: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Star: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};

const TABS = [
  { id: "profile",   label: "Profile",         Icon: Icons.Profile },
  { id: "orders",    label: "Orders",          Icon: Icons.Orders },
  { id: "wishlist",  label: "Wishlist",        Icon: Icons.Wishlist },
  { id: "addresses", label: "Addresses",       Icon: Icons.Addresses },
  { id: "payment",   label: "Payment Methods", Icon: Icons.Payment },
];

/* ────────────────────────────────────────────
   Address Form Modal (Add / Edit)
──────────────────────────────────────────── */
const EMPTY_ADDR = { label: "Home", fullName: "", phone: "", address1: "", address2: "", city: "", state: "", pincode: "", isDefault: false };

function AddressModal({ initial, onSave, onClose }) {
  const [f, setF] = useState(initial || EMPTY_ADDR);
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setF((x) => ({ ...x, [k]: val }));
    setErrors((x) => ({ ...x, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!f.fullName.trim()) e.fullName = "Full name is required.";
    if (!f.phone.trim() || !/^\d{10}$/.test(f.phone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit number.";
    if (!f.address1.trim()) e.address1 = "Address is required.";
    if (!f.city.trim()) e.city = "City is required.";
    if (!f.state) e.state = "State is required.";
    if (!f.pincode.trim() || !/^\d{6}$/.test(f.pincode)) e.pincode = "Enter a valid 6-digit PIN.";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(f);
  };

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="ac-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Address form">
      <div className="ac-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ac-modal__header">
          <h3 className="ac-modal__title">{initial?.id ? "Edit Address" : "Add New Address"}</h3>
          <button className="ac-drawer__close" onClick={onClose} aria-label="Close"><Icons.Close /></button>
        </div>
        <form className="ac-modal__form" onSubmit={handleSubmit} noValidate>
          {/* Label */}
          <div className="ac-field">
            <label className="ac-field__label">Label</label>
            <div className="ac-addr-label-row">
              {["Home", "Work", "Other"].map((lbl) => (
                <button key={lbl} type="button"
                  className={`ac-addr-label-chip${f.label === lbl ? " is-active" : ""}`}
                  onClick={() => setF((x) => ({ ...x, label: lbl }))}
                >{lbl}</button>
              ))}
            </div>
          </div>

          <div className="ac-modal__row">
            <div className="ac-field">
              <label className="ac-field__label">Full Name *</label>
              <input className={`ac-field__input${errors.fullName ? " ac-field__input--err" : ""}`}
                value={f.fullName} onChange={set("fullName")} placeholder="e.g. Manav Chotai" id="addr-name" />
              {errors.fullName && <p className="ac-field__err">{errors.fullName}</p>}
            </div>
            <div className="ac-field">
              <label className="ac-field__label">Mobile *</label>
              <input className={`ac-field__input${errors.phone ? " ac-field__input--err" : ""}`}
                value={f.phone} onChange={set("phone")} placeholder="10-digit mobile" inputMode="numeric" id="addr-phone" />
              {errors.phone && <p className="ac-field__err">{errors.phone}</p>}
            </div>
          </div>

          <div className="ac-field">
            <label className="ac-field__label">Address Line 1 *</label>
            <input className={`ac-field__input${errors.address1 ? " ac-field__input--err" : ""}`}
              value={f.address1} onChange={set("address1")} placeholder="House / flat / street" id="addr-line1" />
            {errors.address1 && <p className="ac-field__err">{errors.address1}</p>}
          </div>
          <div className="ac-field">
            <label className="ac-field__label">Address Line 2 <span style={{fontWeight:400,color:"var(--color-muted)"}}>(optional)</span></label>
            <input className="ac-field__input" value={f.address2} onChange={set("address2")}
              placeholder="Landmark, apartment no." id="addr-line2" />
          </div>

          <div className="ac-modal__row ac-modal__row--3">
            <div className="ac-field">
              <label className="ac-field__label">City *</label>
              <input className={`ac-field__input${errors.city ? " ac-field__input--err" : ""}`}
                value={f.city} onChange={set("city")} placeholder="e.g. Panipat" id="addr-city" />
              {errors.city && <p className="ac-field__err">{errors.city}</p>}
            </div>
            <div className="ac-field">
              <label className="ac-field__label">State *</label>
              <select className={`ac-field__input ac-field__select${errors.state ? " ac-field__input--err" : ""}`}
                value={f.state} onChange={set("state")} id="addr-state">
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <p className="ac-field__err">{errors.state}</p>}
            </div>
            <div className="ac-field">
              <label className="ac-field__label">PIN Code *</label>
              <input className={`ac-field__input${errors.pincode ? " ac-field__input--err" : ""}`}
                value={f.pincode} onChange={set("pincode")} placeholder="6-digit PIN" inputMode="numeric" maxLength={6} id="addr-pin" />
              {errors.pincode && <p className="ac-field__err">{errors.pincode}</p>}
            </div>
          </div>

          <label className="ac-addr-default-check">
            <input type="checkbox" checked={f.isDefault} onChange={set("isDefault")} id="addr-default" />
            Set as default address
          </label>

          <div className="ac-modal__actions">
            <button type="button" className="ac-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="ac-save-btn" id="addr-save-btn">
              {initial?.id ? "Save Changes" : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Profile Tab
──────────────────────────────────────────── */
/* ── Age calculator ── */
function calcAge(dob) {
  if (!dob) return null;
  const birth = new Date(dob);
  if (isNaN(birth)) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age < 0 ? null : age;
}

function ProfileTab({ user, updateProfile }) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  /* form state */
  const [f, setF] = useState({
    firstName: user?.firstName || (user?.name?.split(" ")[0] || ""),
    lastName:  user?.lastName  || (user?.name?.split(" ").slice(1).join(" ") || ""),
    phone:     user?.phone     || "",
    dob:       user?.dob       || "",
    gender:    user?.gender    || "",
  });
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));

  /* sync if user object changes externally */
  useEffect(() => {
    if (!edit) {
      setF({
        firstName: user?.firstName || (user?.name?.split(" ")[0] || ""),
        lastName:  user?.lastName  || (user?.name?.split(" ").slice(1).join(" ") || ""),
        phone:     user?.phone     || "",
        dob:       user?.dob       || "",
        gender:    user?.gender    || "",
      });
    }
  }, [user, edit]);

  const age = calcAge(f.dob || user?.dob);

  const displayName = [
    user?.firstName || user?.name?.split(" ")[0] || "",
    user?.lastName  || user?.name?.split(" ").slice(1).join(" ") || "",
  ].filter(Boolean).join(" ") || user?.name || "—";

  const avatarInitials = displayName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("") || "U";

  const handleSave = async () => {
    setLoading(true);
    const fullName = [f.firstName.trim(), f.lastName.trim()].filter(Boolean).join(" ");
    await updateProfile({
      name:      fullName || user?.name,
      firstName: f.firstName.trim(),
      lastName:  f.lastName.trim(),
      phone:     f.phone.trim(),
      dob:       f.dob,
      gender:    f.gender,
    });
    setEdit(false);
    setLoading(false);
  };

  const handleCancel = () => {
    setF({
      firstName: user?.firstName || (user?.name?.split(" ")[0] || ""),
      lastName:  user?.lastName  || (user?.name?.split(" ").slice(1).join(" ") || ""),
      phone:     user?.phone     || "",
      dob:       user?.dob       || "",
      gender:    user?.gender    || "",
    });
    setEdit(false);
  };

  return (
    <div className="ac-panel">
      <h2 className="ac-panel__title">Profile</h2>

      {/* ── Avatar + name hero ── */}
      <div className="ac-profile-hero">
        <div className="ac-profile-avatar">{avatarInitials}</div>
        <div className="ac-profile-hero__info">
          <p className="ac-profile-hero__name">{displayName}</p>
          <p className="ac-profile-hero__email">{user?.email || "—"}</p>
          {age !== null && (
            <span className="ac-profile-hero__age">{age} years old</span>
          )}
        </div>
        {!edit && (
          <button className="ac-edit-btn" onClick={() => setEdit(true)} id="account-edit-btn">
            <Icons.Edit /> Edit Profile
          </button>
        )}
      </div>

      {!edit ? (
        /* ── View mode ── */
        <div className="ac-profile-grid">
          <div className="ac-detail-card">
            <span className="ac-detail-card__label">First Name</span>
            <span className="ac-detail-card__value">{user?.firstName || user?.name?.split(" ")[0] || "—"}</span>
          </div>
          <div className="ac-detail-card">
            <span className="ac-detail-card__label">Last Name</span>
            <span className="ac-detail-card__value">{user?.lastName || user?.name?.split(" ").slice(1).join(" ") || "—"}</span>
          </div>
          <div className="ac-detail-card">
            <span className="ac-detail-card__label">Date of Birth</span>
            <span className="ac-detail-card__value">
              {user?.dob
                ? new Date(user.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                : "—"}
            </span>
          </div>
          <div className="ac-detail-card">
            <span className="ac-detail-card__label">Age</span>
            <span className="ac-detail-card__value">
              {calcAge(user?.dob) !== null ? `${calcAge(user?.dob)} years` : "—"}
            </span>
          </div>
          <div className="ac-detail-card">
            <span className="ac-detail-card__label">Gender</span>
            <span className="ac-detail-card__value" style={{ textTransform: "capitalize" }}>
              {user?.gender || "—"}
            </span>
          </div>
          <div className="ac-detail-card">
            <span className="ac-detail-card__label">Mobile</span>
            <span className="ac-detail-card__value">{user?.phone || "—"}</span>
          </div>
          <div className="ac-detail-card ac-detail-card--full">
            <span className="ac-detail-card__label">Email</span>
            <span className="ac-detail-card__value">{user?.email || "—"}</span>
          </div>
        </div>
      ) : (
        /* ── Edit mode ── */
        <div className="ac-edit-form">
          <div className="ac-profile-form-grid">
            {/* Row 1: First / Last name */}
            <div className="ac-field">
              <label className="ac-field__label" htmlFor="pf-fname">First Name</label>
              <input className="ac-field__input" id="pf-fname" value={f.firstName}
                onChange={set("firstName")} placeholder="e.g. Manav" autoComplete="given-name" />
            </div>
            <div className="ac-field">
              <label className="ac-field__label" htmlFor="pf-lname">Last Name</label>
              <input className="ac-field__input" id="pf-lname" value={f.lastName}
                onChange={set("lastName")} placeholder="e.g. Chotai" autoComplete="family-name" />
            </div>

            {/* Row 2: DOB + Age (readonly) */}
            <div className="ac-field">
              <label className="ac-field__label" htmlFor="pf-dob">Date of Birth</label>
              <input className="ac-field__input" id="pf-dob" type="date" value={f.dob}
                onChange={set("dob")} max={new Date().toISOString().split("T")[0]} />
            </div>
            <div className="ac-field">
              <label className="ac-field__label">Age</label>
              <div className="ac-age-display">
                {calcAge(f.dob) !== null
                  ? <><span className="ac-age-display__num">{calcAge(f.dob)}</span><span className="ac-age-display__unit">years</span></>
                  : <span className="ac-age-display__placeholder">Calculated from DOB</span>
                }
              </div>
            </div>

            {/* Row 3: Gender + Phone */}
            <div className="ac-field">
              <label className="ac-field__label" htmlFor="pf-gender">Gender</label>
              <div className="ac-gender-chips" id="pf-gender">
                {["male", "female", "non-binary", "prefer not to say"].map((g) => (
                  <button key={g} type="button"
                    className={`ac-gender-chip${f.gender === g ? " is-active" : ""}`}
                    onClick={() => setF((x) => ({ ...x, gender: g }))}
                    id={`gender-${g.replace(/\s/g, "-")}`}
                  >
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="ac-field">
              <label className="ac-field__label" htmlFor="pf-phone">Mobile</label>
              <input className="ac-field__input" id="pf-phone" value={f.phone}
                onChange={set("phone")} placeholder="e.g. 9876543210" inputMode="numeric" autoComplete="tel" />
            </div>

            {/* Email — readonly */}
            <div className="ac-field ac-field--full">
              <label className="ac-field__label">Email <span style={{ fontWeight: 400, color: "var(--color-muted)", fontSize: "0.8rem" }}>(cannot be changed)</span></label>
              <input className="ac-field__input" value={user?.email || ""} readOnly
                style={{ background: "var(--color-border)", opacity: 0.7, cursor: "not-allowed" }} />
            </div>
          </div>

          <div className="ac-edit-actions">
            <button className="ac-save-btn" onClick={handleSave} disabled={loading} id="profile-save-btn">
              {loading ? "Saving…" : "Save Changes"}
            </button>
            <button className="ac-cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}


/* ────────────────────────────────────────────
   Orders Tab
──────────────────────────────────────────── */
function OrdersTab({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="ac-panel">
        <h2 className="ac-panel__title">My Orders</h2>
        <div className="ac-empty">
          <p className="ac-empty__text">You have not placed any orders yet.</p>
          <Link to={ROUTES.shop} className="ac-empty__cta">Start Shopping</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="ac-panel">
      <h2 className="ac-panel__title">My Orders</h2>
      <div className="ac-orders-list">
        {[...orders].reverse().map((o) => (
          <div key={o.id} className="ac-order-card">
            <div className="ac-order-card__top">
              <span className="ac-order-card__id">Order #{o.id}</span>
              <span className="ac-order-badge" style={{ color: STATUS_COLOR[o.status], background: STATUS_COLOR[o.status] + "18" }}>
                {STATUS_LABEL[o.status] || o.status}
              </span>
            </div>
            <p className="ac-order-card__meta">
              {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              {" · "}{o.items?.length || 0} item{(o.items?.length || 0) !== 1 ? "s" : ""}
              {" · "}{fmt(o.total)}
            </p>
            <Link to={ROUTES.orders} className="ac-order-card__link">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Wishlist Tab — connected to WishlistContext
──────────────────────────────────────────── */
function WishlistTab() {
  const { items, remove } = useWishlist();
  const { addItem: addToCart } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleMoveToCart = (item) => {
    if (!isAuthenticated) { navigate(ROUTES.login); return; }
    addToCart(item, 1);
    remove(item.slug);
  };

  if (items.length === 0) {
    return (
      <div className="ac-panel">
        <h2 className="ac-panel__title">My Wishlist</h2>
        <div className="ac-empty">
          <div style={{ color: "var(--color-border)", marginBottom: "var(--sp-3)" }}>
            <Icons.Wishlist />
          </div>
          <p className="ac-empty__text">Your wishlist is empty. Save items you love!</p>
          <Link to={ROUTES.shop} className="ac-empty__cta">Explore the Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ac-panel">
      <div className="ac-panel__title-row">
        <h2 className="ac-panel__title" style={{ marginBottom: 0, borderBottom: "none", paddingBottom: 0 }}>
          My Wishlist
        </h2>
        <span className="ac-wl-count">{items.length} item{items.length !== 1 ? "s" : ""}</span>
      </div>
      <div className="ac-wl-grid">
        {items.map((item) => (
          <div key={item.slug} className="ac-wl-card">
            <Link to={`/product/${item.slug}`} className="ac-wl-card__img-wrap">
              {item.image
                ? <img src={item.image} alt={item.name} loading="lazy" className="ac-wl-card__img" />
                : <div className="ac-wl-card__img-ph">–</div>
              }
              {item.stock === 0 && <div className="ac-wl-card__oos">Out of Stock</div>}
            </Link>
            <div className="ac-wl-card__body">
              <Link to={`/product/${item.slug}`} className="ac-wl-card__name">{item.name}</Link>
              {item.variant && <p className="ac-wl-card__variant">{item.variant}</p>}
              <div className="ac-wl-card__footer">
                <span className="ac-wl-card__price">{fmt(item.price)}</span>
                {item.stock > 0 && item.stock <= 5 && (
                  <span className="ac-wl-card__low-stock">Only {item.stock} left</span>
                )}
              </div>
              <div className="ac-wl-card__actions">
                <button
                  className="ac-wl-card__cart-btn"
                  onClick={() => handleMoveToCart(item)}
                  disabled={item.stock === 0}
                  id={`wl-cart-${item.slug}`}
                >
                  <Icons.Cart /> {item.stock === 0 ? "Out of Stock" : "Move to Cart"}
                </button>
                <button
                  className="ac-wl-card__remove-btn"
                  onClick={() => remove(item.slug)}
                  aria-label={`Remove ${item.name}`}
                >
                  <Icons.Trash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Addresses Tab — connected to AddressContext
──────────────────────────────────────────── */
function AddressesTab() {
  const { addresses, addAddress, updateAddress, removeAddress, setDefault } = useAddress();
  const [modal, setModal] = useState(null); // null | "add" | address-object (for edit)

  const handleSave = (formData) => {
    if (modal?.id) {
      updateAddress(modal.id, formData);
    } else {
      addAddress(formData);
    }
    setModal(null);
  };

  return (
    <div className="ac-panel">
      <div className="ac-panel__title-row">
        <h2 className="ac-panel__title" style={{ marginBottom: 0, borderBottom: "none", paddingBottom: 0 }}>
          Saved Addresses
        </h2>
        <button className="ac-add-addr-btn" onClick={() => setModal("add")} id="add-address-btn">
          <Icons.Plus /> Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="ac-empty" style={{ paddingTop: "var(--sp-6)" }}>
          <p className="ac-empty__text">No saved addresses yet.</p>
        </div>
      ) : (
        <div className="ac-addr-list">
          {addresses.map((a) => (
            <div key={a.id} className={`ac-addr-card${a.isDefault ? " ac-addr-card--default" : ""}`}>
              <div className="ac-addr-card__top">
                <div className="ac-addr-card__label-row">
                  <span className="ac-addr-card__label">{a.label}</span>
                  {a.isDefault && <span className="ac-addr-card__default-badge">Default</span>}
                </div>
                <div className="ac-addr-card__actions">
                  <button className="ac-addr-card__edit" onClick={() => setModal(a)} title="Edit">
                    <Icons.Edit />
                  </button>
                  <button className="ac-addr-card__del" onClick={() => removeAddress(a.id)} title="Delete">
                    <Icons.Trash />
                  </button>
                </div>
              </div>
              <p className="ac-addr-card__name">{a.fullName} · {a.phone}</p>
              <p className="ac-addr-card__line">
                {a.address1}{a.address2 ? `, ${a.address2}` : ""}, {a.city}, {a.state} – {a.pincode}
              </p>
              {!a.isDefault && (
                <button className="ac-addr-card__set-default" onClick={() => setDefault(a.id)}>
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit modal */}
      {modal && (
        <AddressModal
          initial={modal === "add" ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────
   Payment Methods Tab
──────────────────────────────────────────── */
function PaymentTab() {
  return (
    <div className="ac-panel">
      <h2 className="ac-panel__title">Payment Methods</h2>
      <div className="ac-pay-list">
        <div className="ac-pay-card">
          <span className="ac-pay-card__icon"><Icons.Payment /></span>
          <div>
            <p className="ac-pay-card__name">VISA ending in 4242</p>
            <p className="ac-pay-card__exp">Expires 12/26</p>
          </div>
          <span className="ac-pay-card__default">Default</span>
        </div>
        <button className="ac-addr-add" id="add-payment-btn">+ Add Payment Method</button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Main Page
──────────────────────────────────────────── */
export default function AccountPage() {
  const { user, logout, updateProfile } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setDrawerOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.login, { replace: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":   return <ProfileTab user={user} updateProfile={updateProfile} />;
      case "orders":    return <OrdersTab orders={orders} />;
      case "wishlist":  return <WishlistTab />;
      case "addresses": return <AddressesTab />;
      case "payment":   return <PaymentTab />;
      default:          return <ProfileTab user={user} updateProfile={updateProfile} />;
    }
  };

  const activeLabel = TABS.find((t) => t.id === activeTab)?.label || "Profile";

  return (
    <>
      <PageMeta title="My Account — WovenHaat" description="Manage your profile, orders, addresses and payment methods." />
      <div className="ac-page">
        <Container>
          {/* Top bar — ALL devices */}
          <div className="ac-topbar">
            <button className="ac-drawer-toggle" onClick={() => setDrawerOpen(true)}
              aria-label="Open account menu" aria-expanded={drawerOpen} id="account-drawer-toggle">
              <Icons.Menu />
            </button>
            <div className="ac-topbar__info">
              <span className="ac-topbar__section">My Account</span>
              <span className="ac-topbar__arrow">›</span>
              <span className="ac-topbar__active">{activeLabel}</span>
            </div>
          </div>

          {/* Content */}
          <div className="ac-layout">
            <main className="ac-content">{renderContent()}</main>
          </div>
        </Container>
      </div>

      {/* Drawer overlay */}
      {drawerOpen && (
        <div className="ac-drawer-overlay" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      )}

      {/* Drawer panel */}
      <div className={`ac-drawer${drawerOpen ? " ac-drawer--open" : ""}`}
        role="dialog" aria-modal="true" aria-label="Account menu">
        <div className="ac-drawer__header">
          <span className="ac-drawer__title">My Account</span>
          <button className="ac-drawer__close" onClick={() => setDrawerOpen(false)}
            aria-label="Close" id="account-drawer-close"><Icons.Close /></button>
        </div>

        {user && (
          <div className="ac-drawer__user">
            <div className="ac-drawer__avatar">{(user.name || "U")[0].toUpperCase()}</div>
            <div className="ac-drawer__user-info">
              <p className="ac-drawer__user-name">{user.name || "Guest"}</p>
              <p className="ac-drawer__user-email">{user.email || ""}</p>
            </div>
          </div>
        )}

        <nav className="ac-drawer__nav" aria-label="Account navigation">
          <ul className="ac-sidebar__list">
            {TABS.map(({ id, label, Icon }) => (
              <li key={id}>
                <button
                  className={`ac-nav-item${activeTab === id ? " is-active" : ""}`}
                  onClick={() => { setActiveTab(id); setDrawerOpen(false); }}
                  id={`drawer-tab-${id}`}
                >
                  <span className="ac-nav-item__icon"><Icon /></span>
                  <span>{label}</span>
                </button>
              </li>
            ))}
            <li className="ac-sidebar__list-divider" />
            <li>
              <button className="ac-nav-item ac-nav-item--logout"
                onClick={() => { setDrawerOpen(false); handleLogout(); }} id="drawer-logout-btn">
                <span className="ac-nav-item__icon"><Icons.Logout /></span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
