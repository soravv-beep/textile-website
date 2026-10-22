/**
 * Account Page — WovenHaat (Dev 3 / Manav Chotai)
 * Matches reference: logo + sidebar nav with icons, Account Details panel, Edit button
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useOrders } from "../context/OrdersContext.jsx";
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

/* ── SVG icon set (no emojis) ── */
const Icons = {
  Profile: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>
    </svg>
  ),
  Orders: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="4" rx="1"/><path d="M2 11h20M2 17h20"/><rect x="2" y="3" width="20" height="18" rx="2"/>
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
};

const TABS = [
  { id: "profile",   label: "Profile",          Icon: Icons.Profile },
  { id: "orders",    label: "Orders",           Icon: Icons.Orders },
  { id: "wishlist",  label: "Wishlist",         Icon: Icons.Wishlist },
  { id: "addresses", label: "Addresses",        Icon: Icons.Addresses },
  { id: "payment",   label: "Payment Methods",  Icon: Icons.Payment },
];

/* ── Profile Tab ── */
function ProfileTab({ user, updateProfile }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await updateProfile({ name: name.trim(), phone: phone.trim() });
    setEdit(false);
    setLoading(false);
  };

  return (
    <div className="ac-panel">
      <h2 className="ac-panel__title">Account Details</h2>
      {!edit ? (
        <>
          <div className="ac-detail-row">
            <span className="ac-detail-label">Name</span>
            <span className="ac-detail-value">{user?.name || "—"}</span>
          </div>
          <div className="ac-detail-row">
            <span className="ac-detail-label">Email</span>
            <span className="ac-detail-value">{user?.email || "—"}</span>
          </div>
          <div className="ac-detail-row">
            <span className="ac-detail-label">Mobile</span>
            <span className="ac-detail-value">{user?.phone || "+91 98765 43210"}</span>
          </div>
          <button className="ac-edit-btn" onClick={() => setEdit(true)} id="account-edit-btn">
            <Icons.Edit /> Edit
          </button>
        </>
      ) : (
        <div className="ac-edit-form">
          <div className="ac-field">
            <label className="ac-field__label">Name</label>
            <input
              className="ac-field__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Manav Chotai"
              id="profile-name"
            />
          </div>
          <div className="ac-field">
            <label className="ac-field__label">Mobile</label>
            <input
              className="ac-field__input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              id="profile-phone"
            />
          </div>
          <div className="ac-edit-actions">
            <button className="ac-save-btn" onClick={handleSave} disabled={loading} id="profile-save-btn">
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button className="ac-cancel-btn" onClick={() => setEdit(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Orders Tab ── */
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

/* ── Addresses Tab ── */
function AddressesTab({ user }) {
  const saved = user?.addresses || [
    { id: 1, label: "Home", line: "Plot 14, Sector 29, Panipat, Haryana – 132103", isDefault: true },
  ];
  return (
    <div className="ac-panel">
      <h2 className="ac-panel__title">Saved Addresses</h2>
      <div className="ac-addr-list">
        {saved.map((a) => (
          <div key={a.id} className="ac-addr-card">
            <div className="ac-addr-card__top">
              <span className="ac-addr-card__label">{a.label}</span>
              {a.isDefault && <span className="ac-addr-card__default">Default</span>}
            </div>
            <p className="ac-addr-card__line">{a.line}</p>
            <button className="ac-addr-card__edit">Edit</button>
          </div>
        ))}
        <button className="ac-addr-add" id="add-address-btn">+ Add New Address</button>
      </div>
    </div>
  );
}

/* ── Payment Methods Tab ── */
function PaymentTab() {
  return (
    <div className="ac-panel">
      <h2 className="ac-panel__title">Payment Methods</h2>
      <div className="ac-pay-list">
        <div className="ac-pay-card">
          <span className="ac-pay-card__icon">
            <Icons.Payment />
          </span>
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

/* ── Wishlist Tab redirect ── */
function WishlistTab() {
  return (
    <div className="ac-panel">
      <h2 className="ac-panel__title">My Wishlist</h2>
      <div className="ac-empty">
        <p className="ac-empty__text">View and manage your saved items.</p>
        <Link to={ROUTES.wishlist} className="ac-empty__cta">Go to Wishlist</Link>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function AccountPage() {
  const { user, logout, updateProfile } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    logout();
    navigate(ROUTES.login, { replace: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":   return <ProfileTab user={user} updateProfile={updateProfile} />;
      case "orders":    return <OrdersTab orders={orders} />;
      case "wishlist":  return <WishlistTab />;
      case "addresses": return <AddressesTab user={user} />;
      case "payment":   return <PaymentTab />;
      default:          return <ProfileTab user={user} updateProfile={updateProfile} />;
    }
  };

  return (
    <>
      <PageMeta title="My Account — WovenHaat" description="Manage your profile, orders, addresses and payment methods." />
      <div className="ac-page">
        <Container>
          <div className="ac-layout">
            {/* ── Sidebar ── */}
            <aside className="ac-sidebar">
              <div className="ac-sidebar__brand">
                <Link to={ROUTES.home} className="ac-sidebar__logo">WovenHaat</Link>
              </div>
              <nav className="ac-sidebar__nav" aria-label="Account navigation">
                <p className="ac-sidebar__heading">My Account</p>
                <ul className="ac-sidebar__list">
                  {TABS.map(({ id, label, Icon }) => (
                    <li key={id}>
                      <button
                        className={`ac-nav-item${activeTab === id ? " is-active" : ""}`}
                        onClick={() => setActiveTab(id)}
                        id={`account-tab-${id}`}
                      >
                        <span className="ac-nav-item__icon"><Icon /></span>
                        <span>{label}</span>
                      </button>
                    </li>
                  ))}
                  <li>
                    <button className="ac-nav-item ac-nav-item--logout" onClick={handleLogout} id="account-logout-btn">
                      <span className="ac-nav-item__icon"><Icons.Logout /></span>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </aside>

            {/* ── Content ── */}
            <main className="ac-content">
              {renderContent()}
            </main>
          </div>
        </Container>
      </div>

      <style>{`
        .ac-page {
          min-height: 100vh;
          padding-top: calc(var(--nav-height) + var(--sp-6));
          padding-bottom: var(--sp-8);
          background: var(--color-bg);
        }
        .ac-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: var(--sp-6);
          align-items: start;
          min-height: 70vh;
        }
        @media (max-width: 720px) {
          .ac-layout { grid-template-columns: 1fr; }
        }

        /* Sidebar */
        .ac-sidebar {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          position: sticky;
          top: calc(var(--nav-height) + var(--sp-4));
        }
        .ac-sidebar__brand {
          padding: var(--sp-4) var(--sp-5);
          border-bottom: 1px solid var(--color-border);
        }
        .ac-sidebar__logo {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-primary);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: var(--sp-2);
        }
        .ac-sidebar__logo::before {
          content: "";
          display: inline-block;
          width: 20px;
          height: 20px;
          background: var(--color-primary);
          border-radius: 3px;
          flex-shrink: 0;
        }
        .ac-sidebar__heading {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-text);
          padding: var(--sp-4) var(--sp-5) var(--sp-2);
          margin: 0;
        }
        .ac-sidebar__nav { padding-bottom: var(--sp-2); }
        .ac-sidebar__list { list-style: none; margin: 0; padding: 0; }
        .ac-nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: var(--sp-3);
          padding: var(--sp-3) var(--sp-5);
          font-size: 0.9rem;
          color: var(--color-text);
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.18s, color 0.18s;
          border-left: 3px solid transparent;
        }
        .ac-nav-item:hover { background: var(--color-bg); color: var(--color-primary); }
        .ac-nav-item.is-active {
          background: #fdf2ef;
          color: var(--color-primary);
          border-left-color: var(--color-primary);
          font-weight: 600;
        }
        .ac-nav-item__icon { display: flex; align-items: center; color: inherit; }
        .ac-nav-item--logout { color: var(--color-error); }
        .ac-nav-item--logout:hover { background: #fef0ed; }

        /* Content panel */
        .ac-content { min-width: 0; }
        .ac-panel {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--sp-6) var(--sp-7);
        }
        @media (max-width: 600px) { .ac-panel { padding: var(--sp-4) var(--sp-5); } }
        .ac-panel__title {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-text);
          margin: 0 0 var(--sp-5);
          padding-bottom: var(--sp-4);
          border-bottom: 1px solid var(--color-border);
        }

        /* Detail rows */
        .ac-detail-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: var(--sp-4);
        }
        .ac-detail-label {
          font-size: 0.82rem;
          color: var(--color-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .ac-detail-value {
          font-size: 1rem;
          color: var(--color-text);
          font-weight: 500;
        }
        .ac-edit-btn {
          margin-top: var(--sp-3);
          display: inline-flex;
          align-items: center;
          gap: var(--sp-2);
          background: var(--color-primary);
          color: #fff;
          border: none;
          border-radius: var(--radius-pill);
          padding: var(--sp-2) var(--sp-5);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .ac-edit-btn:hover { background: var(--color-primary-dark, #a63419); transform: translateY(-1px); }

        /* Edit form */
        .ac-edit-form { display: flex; flex-direction: column; gap: var(--sp-4); }
        .ac-field { display: flex; flex-direction: column; gap: var(--sp-1); }
        .ac-field__label { font-size: 0.85rem; font-weight: 600; color: var(--color-text); }
        .ac-field__input {
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: var(--sp-3) var(--sp-4);
          font-size: 0.9rem;
          background: var(--color-bg);
          color: var(--color-text);
          transition: border-color 0.2s;
        }
        .ac-field__input:focus { outline: none; border-color: var(--color-primary); }
        .ac-edit-actions { display: flex; gap: var(--sp-3); }
        .ac-save-btn {
          background: var(--color-primary);
          color: #fff;
          border: none;
          border-radius: var(--radius-sm);
          padding: var(--sp-3) var(--sp-5);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .ac-save-btn:hover { background: var(--color-primary-dark, #a63419); }
        .ac-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .ac-cancel-btn {
          background: none;
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: var(--sp-3) var(--sp-5);
          font-size: 0.9rem;
          color: var(--color-muted);
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .ac-cancel-btn:hover { border-color: var(--color-text); color: var(--color-text); }

        /* Orders list */
        .ac-orders-list { display: flex; flex-direction: column; gap: var(--sp-4); }
        .ac-order-card {
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
          padding: var(--sp-4);
          transition: box-shadow 0.2s;
        }
        .ac-order-card:hover { box-shadow: var(--shadow); }
        .ac-order-card__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--sp-2); }
        .ac-order-card__id { font-weight: 700; font-size: 0.92rem; color: var(--color-text); }
        .ac-order-badge { font-size: 0.75rem; font-weight: 700; border-radius: var(--radius-pill); padding: 3px 10px; }
        .ac-order-card__meta { font-size: 0.83rem; color: var(--color-muted); margin: 0 0 var(--sp-2); }
        .ac-order-card__link { font-size: 0.83rem; color: var(--color-primary); text-decoration: none; font-weight: 600; }
        .ac-order-card__link:hover { text-decoration: underline; }

        /* Addresses */
        .ac-addr-list { display: flex; flex-direction: column; gap: var(--sp-3); }
        .ac-addr-card { border: 1px solid var(--color-border); border-radius: var(--radius); padding: var(--sp-4); }
        .ac-addr-card__top { display: flex; align-items: center; gap: var(--sp-3); margin-bottom: var(--sp-2); }
        .ac-addr-card__label { font-weight: 700; font-size: 0.88rem; color: var(--color-text); }
        .ac-addr-card__default { font-size: 0.72rem; font-weight: 700; background: #e8f5e9; color: #2e7d32; border-radius: var(--radius-pill); padding: 2px 8px; }
        .ac-addr-card__line { font-size: 0.88rem; color: var(--color-muted); margin: 0 0 var(--sp-2); }
        .ac-addr-card__edit { background: none; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: var(--sp-1) var(--sp-3); font-size: 0.8rem; color: var(--color-muted); cursor: pointer; }
        .ac-addr-card__edit:hover { border-color: var(--color-primary); color: var(--color-primary); }
        .ac-addr-add {
          width: 100%;
          border: 1.5px dashed var(--color-border);
          border-radius: var(--radius);
          padding: var(--sp-3);
          background: none;
          font-size: 0.88rem;
          color: var(--color-muted);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          text-align: center;
        }
        .ac-addr-add:hover { border-color: var(--color-primary); color: var(--color-primary); }

        /* Payment */
        .ac-pay-list { display: flex; flex-direction: column; gap: var(--sp-3); }
        .ac-pay-card { display: flex; align-items: center; gap: var(--sp-3); border: 1px solid var(--color-border); border-radius: var(--radius); padding: var(--sp-4); }
        .ac-pay-card__icon { color: var(--color-primary); display: flex; }
        .ac-pay-card__name { font-size: 0.9rem; font-weight: 600; color: var(--color-text); margin: 0; }
        .ac-pay-card__exp { font-size: 0.78rem; color: var(--color-muted); margin: 0; }
        .ac-pay-card__default { margin-left: auto; font-size: 0.72rem; font-weight: 700; background: #e8f5e9; color: #2e7d32; border-radius: var(--radius-pill); padding: 2px 8px; }

        /* Empty state */
        .ac-empty { text-align: center; padding: var(--sp-7) 0; display: flex; flex-direction: column; align-items: center; gap: var(--sp-4); }
        .ac-empty__text { color: var(--color-muted); margin: 0; }
        .ac-empty__cta {
          display: inline-block;
          background: var(--color-primary);
          color: #fff;
          border-radius: var(--radius-sm);
          padding: var(--sp-3) var(--sp-5);
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s;
        }
        .ac-empty__cta:hover { background: var(--color-primary-dark, #a63419); }
      `}</style>
    </>
  );
}