/**
 * Orders / Order Tracking — WovenHaat (Dev 3 / Manav Chotai)
 * No emojis · SVG icons · Expandable accordion · Status timeline
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useOrders } from "../context/OrdersContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { ROUTES } from "../constants/routes.js";
import { Button, Container } from "../components/ui/index.js";
import PageMeta from "../components/PageMeta.jsx";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const STATUS_CONFIG = {
  pending:    { color: "#e8a400", bg: "#fff8e1", label: "Pending"    },
  confirmed:  { color: "#2d6bcf", bg: "#e3f0ff", label: "Confirmed"  },
  processing: { color: "#9c27b0", bg: "#f3e5f5", label: "Processing" },
  shipped:    { color: "#0097a7", bg: "#e0f7fa", label: "Shipped"    },
  delivered:  { color: "#2e7d32", bg: "#e8f5e9", label: "Delivered"  },
  cancelled:  { color: "#c62828", bg: "#ffebee", label: "Cancelled"  },
};

const TIMELINE_STEPS = ["pending", "confirmed", "processing", "shipped", "delivered"];

/* ── Icons ── */
function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 4.5v9L12 20l-9-4.5v-9L12 2z"/><polyline points="12 20 12 11"/><line x1="3" y1="6.5" x2="21" y2="6.5"/>
    </svg>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || { color: "#888", bg: "#eee", label: status };
  return (
    <span className="ord-badge" style={{ background: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  );
}

function Timeline({ status }) {
  if (status === "cancelled") {
    return <p className="ord-timeline__cancelled">This order was cancelled.</p>;
  }
  const currentIdx = TIMELINE_STEPS.indexOf(status);
  return (
    <ol className="ord-timeline">
      {TIMELINE_STEPS.map((step, idx) => {
        const cfg = STATUS_CONFIG[step];
        const done = idx <= currentIdx;
        return (
          <li key={step} className={`ord-tl-step${done ? " ord-tl-step--done" : ""}`}>
            <span className="ord-tl-step__dot" style={done ? { background: cfg.color, borderColor: cfg.color } : {}}>
              {done && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </span>
            <span className="ord-tl-step__label">{cfg.label}</span>
            {idx < TIMELINE_STEPS.length - 1 && (
              <span className="ord-tl-step__line" style={done && idx < currentIdx ? { background: cfg.color } : {}} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function OrderCard({ order, onReorder }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="ord-card" layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="ord-card__head">
        <div className="ord-card__meta">
          <span className="ord-card__id">Order #{order.id}</span>
          <span className="ord-card__date">
            {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>
        <div className="ord-card__right">
          <StatusBadge status={order.status} />
          <span className="ord-card__total">{fmt(order.total)}</span>
          <button
            className="ord-card__toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle order details"
          >
            <span style={{ display: "inline-block", transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>
              <ChevronDownIcon />
            </span>
          </button>
        </div>
      </div>

      <p className="ord-card__preview">
        {order.items.map((i) => i.name).slice(0, 2).join(", ")}
        {order.items.length > 2 ? ` +${order.items.length - 2} more` : ""}
        {" · "}
        {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
      </p>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="ord-card__details"
          >
            <div className="ord-card__details-inner">
              <Timeline status={order.status} />

              <div className="ord-items">
                <h4 className="ord-items__title">Items Ordered</h4>
                <ul className="ord-items__list">
                  {order.items.map((item) => (
                    <li key={item.slug} className="ord-item">
                      <div className="ord-item__thumb">
                        {item.image ? <img src={item.image} alt={item.name} /> : <span>–</span>}
                      </div>
                      <div className="ord-item__info">
                        <p className="ord-item__name">{item.name}</p>
                        {item.variant && <p className="ord-item__var">{item.variant}</p>}
                        <p className="ord-item__meta">Qty: {item.qty} · {fmt(item.price)} each</p>
                      </div>
                      <span className="ord-item__total">{fmt(item.price * item.qty)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ord-summary">
                <div className="ord-summary__line"><span>Subtotal</span><span>{fmt(order.subtotal)}</span></div>
                <div className="ord-summary__line">
                  <span>Shipping</span>
                  <span>{order.shippingCost === 0 ? <span className="ord-summary__free">FREE</span> : fmt(order.shippingCost)}</span>
                </div>
                <div className="ord-summary__line ord-summary__line--total"><span>Total</span><span>{fmt(order.total)}</span></div>
              </div>

              {order.shippingAddress && (
                <div className="ord-addr">
                  <h4 className="ord-addr__title">Shipping Address</h4>
                  <p className="ord-addr__val">
                    {order.shippingAddress.fullName} · {order.shippingAddress.address1}
                    {order.shippingAddress.address2 ? `, ${order.shippingAddress.address2}` : ""},{" "}
                    {order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pincode}
                  </p>
                </div>
              )}

              {order.estimatedDelivery && order.status !== "cancelled" && (
                <div className="ord-eta">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Estimated delivery: <strong>{new Date(order.estimatedDelivery).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong></span>
                </div>
              )}

              <div className="ord-card__actions">
                {order.status === "delivered" && (
                  <Button onClick={() => onReorder(order.items)} variant="outline" size="sm" id={`reorder-${order.id}`}>Re-order</Button>
                )}
                {["pending", "confirmed"].includes(order.status) && (
                  <button className="ord-cancel-btn" id={`cancel-${order.id}`}>Cancel Order</button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function OrdersPage() {
  const { orders } = useOrders();
  const { addItem } = useCart();
  const [filter, setFilter] = useState("all");

  const FILTERS = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];
  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const handleReorder = (items) => items.forEach((i) => addItem(i, i.qty || 1));

  return (
    <>
      <PageMeta title="My Orders — WovenHaat" description="Track and manage your WovenHaat orders." />
      <div className="ord-page">
        <Container>
          <div className="ord-head">
            <h1 className="ord-head__title">My Orders</h1>
            {orders.length > 0 && (
              <p className="ord-head__count">{orders.length} total order{orders.length !== 1 ? "s" : ""}</p>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="ord-empty">
              <div className="ord-empty__icon"><PackageIcon /></div>
              <h2 className="ord-empty__title">No orders yet</h2>
              <p className="ord-empty__sub">Once you place an order, you can track it here.</p>
              <Button as={Link} to={ROUTES.shop} arrow id="orders-shop-btn">Start Shopping</Button>
            </div>
          ) : (
            <>
              <div className="ord-filters" role="group" aria-label="Filter orders">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    className={`ord-filter${filter === f ? " is-active" : ""}`}
                    onClick={() => setFilter(f)}
                    id={`ord-filter-${f}`}
                  >
                    {f === "all" ? "All" : (STATUS_CONFIG[f]?.label || f)}
                  </button>
                ))}
              </div>

              <div className="ord-list">
                <AnimatePresence>
                  {filtered.length === 0 ? (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ord-none">
                      No {filter} orders found.
                    </motion.p>
                  ) : (
                    [...filtered].reverse().map((o) => (
                      <OrderCard key={o.id} order={o} onReorder={handleReorder} />
                    ))
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </Container>
      </div>

      <style>{`
        .ord-page { min-height: 100vh; padding-top: calc(var(--nav-height) + var(--sp-7)); padding-bottom: var(--sp-8); background: var(--color-bg); }
        .ord-head { margin-bottom: var(--sp-5); }
        .ord-head__title { font-family: var(--font-heading); font-size: clamp(1.8rem,4vw,2.6rem); margin: 0; color: var(--color-text); }
        .ord-head__count { font-size: 0.9rem; color: var(--color-muted); margin: 4px 0 0; }
        .ord-filters { display: flex; gap: var(--sp-2); flex-wrap: wrap; margin-bottom: var(--sp-5); }
        .ord-filter { background: var(--color-surface); border: 1.5px solid var(--color-border); border-radius: var(--radius-pill); padding: var(--sp-2) var(--sp-4); font-size: 0.82rem; font-weight: 500; cursor: pointer; color: var(--color-muted); transition: all 0.18s; }
        .ord-filter:hover { border-color: var(--color-primary); color: var(--color-primary); }
        .ord-filter.is-active { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
        .ord-list { display: flex; flex-direction: column; gap: var(--sp-4); }
        .ord-none { color: var(--color-muted); text-align: center; padding: var(--sp-6) 0; }
        .ord-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; transition: box-shadow 0.25s; }
        .ord-card:hover { box-shadow: var(--shadow); }
        .ord-card__head { display: flex; justify-content: space-between; align-items: center; padding: var(--sp-4) var(--sp-5); flex-wrap: wrap; gap: var(--sp-3); }
        .ord-card__meta { display: flex; flex-direction: column; gap: 2px; }
        .ord-card__id { font-weight: 700; font-size: 0.95rem; color: var(--color-text); }
        .ord-card__date { font-size: 0.78rem; color: var(--color-muted); }
        .ord-card__right { display: flex; align-items: center; gap: var(--sp-3); flex-wrap: wrap; }
        .ord-badge { font-size: 0.78rem; font-weight: 700; border-radius: var(--radius-pill); padding: 4px 12px; }
        .ord-card__total { font-family: var(--font-heading); font-weight: 700; color: var(--color-primary); font-size: 1rem; }
        .ord-card__toggle { background: none; border: 1px solid var(--color-border); border-radius: var(--radius-sm); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.18s; color: var(--color-muted); }
        .ord-card__toggle:hover { background: var(--color-bg); }
        .ord-card__preview { font-size: 0.85rem; color: var(--color-muted); padding: 0 var(--sp-5) var(--sp-4); margin: 0; border-bottom: 1px solid var(--color-border); }
        .ord-card__details { overflow: hidden; }
        .ord-card__details-inner { padding: var(--sp-5); display: flex; flex-direction: column; gap: var(--sp-5); }
        .ord-card__actions { display: flex; gap: var(--sp-3); flex-wrap: wrap; }
        .ord-cancel-btn { background: none; border: 1px solid var(--color-error); border-radius: var(--radius-sm); padding: var(--sp-2) var(--sp-4); font-size: 0.85rem; color: var(--color-error); cursor: pointer; transition: background 0.18s; }
        .ord-cancel-btn:hover { background: #fef0ed; }
        .ord-timeline { list-style: none; margin: 0; padding: 0; display: flex; align-items: center; overflow-x: auto; padding-bottom: var(--sp-2); }
        .ord-tl-step { display: flex; align-items: center; flex-shrink: 0; }
        .ord-tl-step__dot { width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--color-border); background: var(--color-bg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.3s, border-color 0.3s; }
        .ord-tl-step__label { font-size: 0.72rem; font-weight: 600; color: var(--color-muted); margin: 0 var(--sp-2); white-space: nowrap; }
        .ord-tl-step--done .ord-tl-step__label { color: var(--color-text); }
        .ord-tl-step__line { flex: 1; min-width: 24px; height: 2px; background: var(--color-border); }
        .ord-timeline__cancelled { color: var(--color-error); font-size: 0.9rem; margin: 0; }
        .ord-items__title, .ord-addr__title { font-size: 0.9rem; font-weight: 700; color: var(--color-text); margin: 0 0 var(--sp-3); }
        .ord-items__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--sp-3); }
        .ord-item { display: flex; align-items: center; gap: var(--sp-3); }
        .ord-item__thumb { width: 48px; height: 48px; border-radius: var(--radius-sm); overflow: hidden; background: var(--color-bg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ord-item__thumb img { width: 100%; height: 100%; object-fit: cover; }
        .ord-item__info { flex: 1; min-width: 0; }
        .ord-item__name { font-size: 0.88rem; font-weight: 600; color: var(--color-text); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ord-item__var { font-size: 0.75rem; color: var(--color-muted); margin: 0; }
        .ord-item__meta { font-size: 0.78rem; color: var(--color-muted); margin: 0; }
        .ord-item__total { font-size: 0.9rem; font-weight: 700; color: var(--color-text); white-space: nowrap; flex-shrink: 0; }
        .ord-summary { display: flex; flex-direction: column; gap: var(--sp-2); background: var(--color-bg); border-radius: var(--radius-sm); padding: var(--sp-3) var(--sp-4); }
        .ord-summary__line { display: flex; justify-content: space-between; font-size: 0.88rem; color: var(--color-muted); }
        .ord-summary__line--total { font-weight: 700; font-size: 0.95rem; color: var(--color-text); border-top: 1px solid var(--color-border); padding-top: var(--sp-2); margin-top: var(--sp-1); }
        .ord-summary__free { color: var(--color-success); font-weight: 700; }
        .ord-addr__val { font-size: 0.88rem; color: var(--color-muted); margin: 0; }
        .ord-eta { display: flex; align-items: center; gap: var(--sp-2); font-size: 0.88rem; color: var(--color-text); background: #f4f9fc; border: 1px solid #b8dde8; border-radius: var(--radius-sm); padding: var(--sp-3) var(--sp-4); }
        .ord-empty { text-align: center; padding: var(--sp-8) var(--sp-4); display: flex; flex-direction: column; align-items: center; gap: var(--sp-4); }
        .ord-empty__icon { color: var(--color-border); }
        .ord-empty__title { font-family: var(--font-heading); font-size: 1.8rem; margin: 0; color: var(--color-text); }
        .ord-empty__sub { color: var(--color-muted); margin: 0; max-width: 360px; line-height: 1.7; }
      `}</style>
    </>
  );
}