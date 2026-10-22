/**
 * Cart Page — WovenHaat (Dev 3 / Manav Chotai)
 * Dummy products pre-loaded · Auth guard on wishlist save · No emojis
 */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { ROUTES } from "../constants/routes.js";
import { Button, Container } from "../components/ui/index.js";
import PageMeta from "../components/PageMeta.jsx";

const SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;
const PROMO_CODES = { HAAT10: 10, WEAVE20: 20, FIRST15: 15 };
const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

/* Dummy products to pre-populate the cart for demo */
const DEMO_PRODUCTS = [
  {
    slug: "kutchi-embroidered-table-runner",
    name: "Kutchi Embroidered Table Runner",
    variant: "Ivory / 14x72 inches",
    price: 1499,
    qty: 1,
    stock: 8,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop",
  },
  {
    slug: "bhujodi-wool-throw-indigo",
    name: "Bhujodi Wool Throw — Indigo",
    variant: "Indigo Blue / 50x60 inches",
    price: 3249,
    qty: 1,
    stock: 5,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
  },
  {
    slug: "handwoven-jute-placemats-set4",
    name: "Handwoven Jute Placemats (Set of 4)",
    variant: "Natural / 13x18 inches",
    price: 849,
    qty: 2,
    stock: 20,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop",
  },
];

/* ── Heart icon ── */
function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

/* ── Trash icon ── */
function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  );
}

/* ── Promo code ── */
function PromoBox({ onApply, discountPct, code, onRemove }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleApply = () => {
    const upper = input.trim().toUpperCase();
    if (PROMO_CODES[upper] !== undefined) {
      onApply(upper, PROMO_CODES[upper]);
      setError(""); setInput("");
    } else {
      setError("Invalid code. Try HAAT10, WEAVE20 or FIRST15.");
    }
  };

  if (discountPct > 0 && code) return (
    <div className="promo-applied">
      <span><strong>{code}</strong> — {discountPct}% off applied!</span>
      <button className="promo-applied__remove" onClick={onRemove}>Remove</button>
    </div>
  );

  return (
    <div className="promo-box">
      <div className="promo-box__row">
        <input
          className={`promo-box__input${error ? " promo-box__input--err" : ""}`}
          placeholder="e.g. HAAT10 or WEAVE20"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          aria-label="Enter promo code"
          id="promo-input"
        />
        <button className="promo-box__apply" onClick={handleApply} id="promo-apply">Apply</button>
      </div>
      {error && <p className="promo-box__err" role="alert">{error}</p>}
    </div>
  );
}

/* ── Shipping progress ── */
function ShippingProgress({ subtotal }) {
  const pct = Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100);
  const remaining = SHIPPING_THRESHOLD - subtotal;
  return (
    <div className="ship-bar">
      <p className="ship-bar__text">
        {subtotal >= SHIPPING_THRESHOLD
          ? "You qualify for FREE shipping!"
          : `Add ${fmt(remaining)} more for FREE shipping`}
      </p>
      <div className="ship-bar__track">
        <div className="ship-bar__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ── Cart item row ── */
function CartItemRow({ item, onQtyChange, onRemove, onMoveToWishlist, isInWishlist }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="ci-row"
    >
      <Link to={`/product/${item.slug}`} className="ci-row__thumb-link">
        <div className="ci-row__thumb">
          {item.image
            ? <img src={item.image} alt={item.name} loading="lazy" />
            : <span className="ci-row__ph">–</span>}
        </div>
      </Link>
      <div className="ci-row__info">
        <Link to={`/product/${item.slug}`} className="ci-row__name">{item.name}</Link>
        {item.variant && <p className="ci-row__variant">{item.variant}</p>}
        <p className="ci-row__price">{fmt(item.price)}</p>
        <div className="ci-row__actions">
          <button
            className={`ci-row__wl${isInWishlist ? " ci-row__wl--saved" : ""}`}
            onClick={() => onMoveToWishlist(item)}
            title={isInWishlist ? "Remove from wishlist" : "Save to wishlist"}
            id={`cart-wl-${item.slug}`}
          >
            <HeartIcon filled={isInWishlist} />
            {isInWishlist ? "Saved" : "Save for later"}
          </button>
          <button className="ci-row__remove" onClick={() => onRemove(item.slug)} id={`cart-remove-${item.slug}`}>
            <TrashIcon /> Remove
          </button>
        </div>
      </div>
      <div className="ci-row__qty-wrap">
        <div className="ci-row__qty">
          <button
            className="ci-row__qty-btn"
            onClick={() => onQtyChange(item.slug, item.qty - 1)}
            disabled={item.qty <= 1}
            aria-label="Decrease quantity"
          >–</button>
          <span className="ci-row__qty-num">{item.qty}</span>
          <button
            className="ci-row__qty-btn"
            onClick={() => onQtyChange(item.slug, item.qty + 1)}
            disabled={item.qty >= (item.stock || 99)}
            aria-label="Increase quantity"
          >+</button>
        </div>
        <p className="ci-row__total">{fmt(item.price * item.qty)}</p>
      </div>
    </motion.li>
  );
}

/* ── Empty cart ── */
function EmptyCart() {
  return (
    <motion.div className="cart-empty" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
      <div className="cart-empty__icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      </div>
      <h2 className="cart-empty__title">Your cart is empty</h2>
      <p className="cart-empty__sub">Browse our handwoven collection and find something you love.</p>
      <Button as={Link} to={ROUTES.shop} arrow id="cart-shop-btn">Shop Now</Button>
    </motion.div>
  );
}

/* ── Main ── */
export default function CartPage() {
  const { items, addItem, removeItem, updateQty, clear, count } = useCart();
  const { isAuthenticated } = useAuth();
  const { items: wishlistItems, addItem: addToWishlist, remove: removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const [discountPct, setDiscountPct] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [demoLoaded, setDemoLoaded] = useState(false);

  /* Pre-load demo items once on first mount */
  useEffect(() => {
    if (!demoLoaded && items.length === 0) {
      DEMO_PRODUCTS.forEach((p) => addItem(p, p.qty));
      setDemoLoaded(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = Math.round((subtotal * discountPct) / 100);
  const shippingCost = subtotal - discountAmt >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal - discountAmt + shippingCost;

  const handleMoveToWishlist = (item) => {
    if (!isAuthenticated) { navigate(ROUTES.login, { state: { from: ROUTES.cart } }); return; }
    const inWl = wishlistItems.some((w) => w.slug === item.slug);
    if (inWl) removeFromWishlist(item.slug);
    else { addToWishlist(item); removeItem(item.slug); }
  };

  const isInWishlist = (slug) => wishlistItems.some((w) => w.slug === slug);

  return (
    <>
      <PageMeta title="Cart — WovenHaat" description="Review your handwoven textile selections before checkout." />
      <div className="cart-page">
        <Container>
          <h1 className="cart-page__title">Shopping Cart <span className="cart-page__count">({count})</span></h1>

          {items.length === 0 ? <EmptyCart /> : (
            <div className="cart-layout">
              {/* Items */}
              <div className="cart-items-col">
                <ShippingProgress subtotal={subtotal - discountAmt} />
                <ul className="cart-items-list">
                  <AnimatePresence>
                    {items.map((item) => (
                      <CartItemRow
                        key={item.slug}
                        item={item}
                        onQtyChange={updateQty}
                        onRemove={removeItem}
                        onMoveToWishlist={handleMoveToWishlist}
                        isInWishlist={isInWishlist(item.slug)}
                      />
                    ))}
                  </AnimatePresence>
                </ul>
                <button className="cart-clear-btn" onClick={clear} id="cart-clear">Clear cart</button>
              </div>

              {/* Summary */}
              <aside className="cart-summary">
                <h2 className="cart-summary__title">Order Summary</h2>
                <PromoBox
                  onApply={(code, pct) => { setPromoCode(code); setDiscountPct(pct); }}
                  discountPct={discountPct}
                  code={promoCode}
                  onRemove={() => { setPromoCode(""); setDiscountPct(0); }}
                />
                <div className="cart-summary__lines">
                  <div className="cart-summary__line">
                    <span>Subtotal ({count} items)</span><span>{fmt(subtotal)}</span>
                  </div>
                  {discountAmt > 0 && (
                    <div className="cart-summary__line cart-summary__line--disc">
                      <span>Promo ({promoCode})</span><span>- {fmt(discountAmt)}</span>
                    </div>
                  )}
                  <div className="cart-summary__line">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? <span className="cart-summary__free">FREE</span> : fmt(shippingCost)}</span>
                  </div>
                  <div className="cart-summary__line cart-summary__line--total">
                    <span>Total</span><span>{fmt(total)}</span>
                  </div>
                </div>

                <Button
                  as={Link}
                  to={ROUTES.checkout}
                  block
                  size="lg"
                  id="cart-checkout-btn"
                  style={{ marginTop: "var(--sp-4)" }}
                >
                  Proceed to Checkout
                </Button>

                <div className="cart-summary__trust">
                  <div className="cart-trust-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span>Secure payment</span>
                  </div>
                  <div className="cart-trust-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>Free returns in 15 days</span>
                  </div>
                  <div className="cart-trust-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span>100% authentic crafts</span>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </Container>
      </div>

      <style>{`
        .cart-page { min-height: 100vh; padding-top: calc(var(--nav-height) + var(--sp-7)); padding-bottom: var(--sp-8); background: var(--color-bg); }
        .cart-page__title { font-family: var(--font-heading); font-size: clamp(1.6rem,4vw,2.4rem); margin: 0 0 var(--sp-6); color: var(--color-text); }
        .cart-page__count { font-size: 1.2rem; color: var(--color-muted); font-weight: 400; }
        .cart-layout { display: grid; grid-template-columns: 1fr 340px; gap: var(--sp-7); align-items: start; }
        @media(max-width:880px) { .cart-layout { grid-template-columns: 1fr; } }

        /* Shipping bar */
        .ship-bar { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius); padding: var(--sp-4); margin-bottom: var(--sp-4); }
        .ship-bar__text { font-size: 0.88rem; color: var(--color-text); margin: 0 0 var(--sp-2); font-weight: 500; }
        .ship-bar__track { height: 6px; background: #e8e0d8; border-radius: 99px; overflow: hidden; }
        .ship-bar__fill { height: 100%; background: linear-gradient(90deg, var(--color-primary), #e07a30); border-radius: 99px; transition: width 0.4s; }

        /* Cart items */
        .cart-items-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--sp-4); }
        .ci-row { display: grid; grid-template-columns: 100px 1fr auto; gap: var(--sp-4); align-items: start; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--sp-4); transition: box-shadow 0.2s; }
        .ci-row:hover { box-shadow: var(--shadow); }
        @media(max-width:480px) { .ci-row { grid-template-columns: 72px 1fr; } }
        .ci-row__thumb-link { display: block; }
        .ci-row__thumb { width: 100px; height: 100px; border-radius: var(--radius-sm); overflow: hidden; background: var(--color-bg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ci-row__thumb img { width: 100%; height: 100%; object-fit: cover; }
        .ci-row__ph { font-size: 2rem; color: var(--color-muted); }
        .ci-row__info { display: flex; flex-direction: column; gap: var(--sp-1); }
        .ci-row__name { font-family: var(--font-heading); font-size: 1rem; color: var(--color-text); text-decoration: none; line-height: 1.3; font-weight: 600; }
        .ci-row__name:hover { color: var(--color-primary); }
        .ci-row__variant { font-size: 0.8rem; color: var(--color-muted); margin: 0; }
        .ci-row__price { font-size: 1rem; font-weight: 700; color: var(--color-primary); margin: 0; font-family: var(--font-heading); }
        .ci-row__actions { display: flex; gap: var(--sp-4); margin-top: var(--sp-2); }
        .ci-row__wl, .ci-row__remove { display: inline-flex; align-items: center; gap: 5px; background: none; border: none; font-size: 0.8rem; cursor: pointer; color: var(--color-muted); padding: 0; transition: color 0.18s; }
        .ci-row__wl:hover { color: var(--color-primary); }
        .ci-row__wl--saved { color: var(--color-primary); }
        .ci-row__remove:hover { color: var(--color-error); }
        .ci-row__qty-wrap { display: flex; flex-direction: column; align-items: flex-end; gap: var(--sp-2); }
        .ci-row__qty { display: flex; align-items: center; border: 1.5px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden; }
        .ci-row__qty-btn { width: 32px; height: 32px; background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--color-text); transition: background 0.15s; display: flex; align-items: center; justify-content: center; }
        .ci-row__qty-btn:hover:not(:disabled) { background: var(--color-bg); }
        .ci-row__qty-btn:disabled { color: var(--color-border); cursor: not-allowed; }
        .ci-row__qty-num { min-width: 36px; text-align: center; font-size: 0.95rem; font-weight: 600; color: var(--color-text); }
        .ci-row__total { font-family: var(--font-heading); font-size: 1.05rem; font-weight: 700; color: var(--color-text); margin: 0; }
        .cart-clear-btn { background: none; border: none; color: var(--color-error); font-size: 0.83rem; cursor: pointer; margin-top: var(--sp-3); text-decoration: underline; padding: 0; }

        /* Summary */
        .cart-summary { background: var(--color-surface); border: 1.5px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--sp-5); position: sticky; top: calc(var(--nav-height) + var(--sp-4)); box-shadow: var(--shadow); }
        .cart-summary__title { font-family: var(--font-heading); font-size: 1.15rem; margin: 0 0 var(--sp-4); color: var(--color-text); padding-bottom: var(--sp-3); border-bottom: 1px solid var(--color-border); }
        .cart-summary__lines { display: flex; flex-direction: column; gap: var(--sp-2); margin-top: var(--sp-4); }
        .cart-summary__line { display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--color-text); }
        .cart-summary__line--disc { color: var(--color-success); }
        .cart-summary__line--total { font-weight: 700; font-size: 1rem; border-top: 1.5px solid var(--color-border); padding-top: var(--sp-3); margin-top: var(--sp-1); }
        .cart-summary__free { color: var(--color-success); font-weight: 700; }
        .cart-summary__trust { display: flex; flex-direction: column; gap: var(--sp-2); margin-top: var(--sp-4); padding-top: var(--sp-4); border-top: 1px solid var(--color-border); }
        .cart-trust-item { display: flex; align-items: center; gap: var(--sp-2); font-size: 0.8rem; color: var(--color-muted); }
        .cart-trust-item svg { color: var(--color-success); flex-shrink: 0; }

        /* Promo */
        .promo-box { margin-bottom: 0; }
        .promo-box__row { display: flex; gap: var(--sp-2); }
        .promo-box__input { flex: 1; border: 1.5px solid var(--color-border); border-radius: var(--radius-sm); padding: var(--sp-2) var(--sp-3); font-size: 0.88rem; background: var(--color-bg); color: var(--color-text); }
        .promo-box__input:focus { outline: none; border-color: var(--color-primary); }
        .promo-box__input::placeholder { color: #b0a898; }
        .promo-box__input--err { border-color: var(--color-error); }
        .promo-box__apply { background: var(--color-primary); color: #fff; border: none; border-radius: var(--radius-sm); padding: var(--sp-2) var(--sp-4); font-size: 0.85rem; font-weight: 700; cursor: pointer; white-space: nowrap; transition: background 0.18s; }
        .promo-box__apply:hover { background: #a63419; }
        .promo-box__err { font-size: 0.78rem; color: var(--color-error); margin: var(--sp-1) 0 0; }
        .promo-applied { display: flex; justify-content: space-between; align-items: center; background: #e8f5e9; border: 1px solid #a5d6a7; border-radius: var(--radius-sm); padding: var(--sp-3) var(--sp-4); font-size: 0.88rem; color: #2e7d32; }
        .promo-applied__remove { background: none; border: none; color: var(--color-error); font-size: 0.8rem; cursor: pointer; text-decoration: underline; padding: 0; }

        /* Empty */
        .cart-empty { text-align: center; padding: var(--sp-8) var(--sp-4); max-width: 460px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: var(--sp-5); }
        .cart-empty__icon { color: var(--color-border); }
        .cart-empty__title { font-family: var(--font-heading); font-size: 2rem; margin: 0; color: var(--color-text); }
        .cart-empty__sub { color: var(--color-muted); margin: 0; line-height: 1.7; }
      `}</style>
    </>
  );
}
