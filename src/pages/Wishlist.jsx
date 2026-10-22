/**
 * Wishlist Page — WovenHaat (Dev 3 / Manav Chotai)
 * Realistic dummy products · Auth guard on cart add · No emojis · SVG icons
 */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { ROUTES } from "../constants/routes.js";
import { Button, Container } from "../components/ui/index.js";
import PageMeta from "../components/PageMeta.jsx";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

/* Realistic dummy wishlist items */
const DEMO_WISHLIST = [
  {
    slug: "jaipuri-block-print-bedsheet",
    name: "Jaipuri Block Print Bedsheet — King",
    variant: "Rust & White / 100x108 inches",
    price: 2799,
    stock: 12,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&auto=format&fit=crop",
  },
  {
    slug: "kashmiri-pashmina-stole-natural",
    name: "Kashmiri Pashmina Stole — Natural Ivory",
    variant: "Natural Ivory / 28x80 inches",
    price: 4499,
    stock: 4,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&auto=format&fit=crop",
  },
  {
    slug: "hand-tufted-wool-rug-terracotta",
    name: "Hand-Tufted Wool Rug — Terracotta",
    variant: "Terracotta / 4x6 ft",
    price: 6199,
    stock: 6,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop",
  },
  {
    slug: "pochampally-ikat-cushion-covers",
    name: "Pochampally Ikat Cushion Covers (Set of 2)",
    variant: "Indigo & Gold / 18x18 inches",
    price: 1249,
    stock: 0,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop",
  },
  {
    slug: "khadi-linen-curtain-panel",
    name: "Khadi Linen Curtain Panel",
    variant: "Off-White / 54x96 inches",
    price: 1899,
    stock: 9,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
  },
  {
    slug: "rajasthani-mirror-work-clutch",
    name: "Rajasthani Mirror Work Evening Clutch",
    variant: "Multicolour / 10x5 inches",
    price: 799,
    stock: 15,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop",
  },
];

/* ── Close icon ── */
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

/* ── Bag icon ── */
function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}

/* ── Wishlist card ── */
function WishlistCard({ item, onMoveToCart, onRemove }) {
  return (
    <motion.div
      className="wl-card"
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.26 }}
    >
      <button className="wl-card__remove" onClick={() => onRemove(item.slug)} aria-label={`Remove ${item.name} from wishlist`}>
        <CloseIcon />
      </button>
      <Link to={`/product/${item.slug}`} className="wl-card__img-wrap">
        {item.image
          ? <img src={item.image} alt={item.name} loading="lazy" className="wl-card__img" />
          : <div className="wl-card__img-ph">–</div>
        }
        {item.stock === 0 && <div className="wl-card__oos-overlay">Out of Stock</div>}
      </Link>
      <div className="wl-card__body">
        <Link to={`/product/${item.slug}`} className="wl-card__name">{item.name}</Link>
        {item.variant && <p className="wl-card__variant">{item.variant}</p>}
        <div className="wl-card__footer">
          <p className="wl-card__price">{fmt(item.price)}</p>
          {item.stock > 0 && item.stock <= 5 && (
            <span className="wl-card__low-stock">Only {item.stock} left</span>
          )}
        </div>
        <button
          className="wl-card__cta"
          onClick={() => onMoveToCart(item)}
          disabled={item.stock === 0}
          id={`wl-cart-${item.slug}`}
        >
          <BagIcon />
          {item.stock === 0 ? "Out of Stock" : "Move to Cart"}
        </button>
      </div>
    </motion.div>
  );
}

/* ── Empty state ── */
function EmptyWishlist() {
  return (
    <motion.div
      className="wl-empty"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="wl-empty__icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </div>
      <h2 className="wl-empty__title">Your wishlist is empty</h2>
      <p className="wl-empty__sub">Save the pieces you love and come back to them later.</p>
      <Button as={Link} to={ROUTES.shop} arrow id="wl-explore-btn">Explore the Shop</Button>
    </motion.div>
  );
}

/* ── Main ── */
export default function WishlistPage() {
  const { items, addItem: addToWl, remove, clear } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [demoLoaded, setDemoLoaded] = useState(false);

  /* Pre-load demo items once */
  useEffect(() => {
    if (!demoLoaded && items.length === 0) {
      DEMO_WISHLIST.forEach((p) => addToWl(p));
      setDemoLoaded(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMoveToCart = (item) => {
    if (!isAuthenticated) {
      navigate(ROUTES.login, { state: { from: ROUTES.wishlist } });
      return;
    }
    addToCart(item, 1);
    remove(item.slug);
  };

  const handleAddAll = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.login, { state: { from: ROUTES.wishlist } });
      return;
    }
    items.filter((i) => i.stock > 0).forEach((i) => addToCart(i, 1));
    clear();
  };

  return (
    <>
      <PageMeta title="Wishlist — WovenHaat" description="Your saved handwoven textile favourites. Move to cart whenever you're ready." />
      <div className="wl-page">
        <Container>
          <div className="wl-head">
            <div>
              <h1 className="wl-head__title">My Wishlist</h1>
              {items.length > 0 && (
                <p className="wl-head__count">{items.length} saved item{items.length !== 1 ? "s" : ""}</p>
              )}
            </div>
            {items.length > 0 && (
              <div className="wl-head__actions">
                <Button onClick={handleAddAll} variant="outline" size="sm" id="wl-add-all-btn">
                  Add All to Cart
                </Button>
                <button className="wl-clear-btn" onClick={clear} id="wl-clear-btn">Clear wishlist</button>
              </div>
            )}
          </div>

          {items.length === 0 ? (
            <EmptyWishlist />
          ) : (
            <div className="wl-grid">
              <AnimatePresence>
                {items.map((item) => (
                  <WishlistCard
                    key={item.slug}
                    item={item}
                    onMoveToCart={handleMoveToCart}
                    onRemove={remove}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </Container>
      </div>

      <style>{`
        .wl-page { min-height: 100vh; padding-top: calc(var(--nav-height) + var(--sp-7)); padding-bottom: var(--sp-8); background: var(--color-bg); }
        .wl-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--sp-6); flex-wrap: wrap; gap: var(--sp-4); }
        .wl-head__title { font-family: var(--font-heading); font-size: clamp(1.8rem,4vw,2.6rem); margin: 0; color: var(--color-text); }
        .wl-head__count { font-size: 0.9rem; color: var(--color-muted); margin: 4px 0 0; }
        .wl-head__actions { display: flex; align-items: center; gap: var(--sp-3); }
        .wl-clear-btn { background: none; border: none; font-size: 0.85rem; color: var(--color-error); cursor: pointer; text-decoration: underline; padding: 0; }
        .wl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--sp-5); }
        .wl-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; position: relative; transition: box-shadow 0.28s, transform 0.28s; }
        .wl-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
        .wl-card__remove { position: absolute; top: 10px; right: 10px; z-index: 2; background: rgba(255,255,255,0.92); border: 1px solid var(--color-border); border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.18s, color 0.18s; }
        .wl-card__remove:hover { background: var(--color-error); color: #fff; border-color: var(--color-error); }
        .wl-card__img-wrap { display: block; aspect-ratio: 1; overflow: hidden; background: var(--color-bg); position: relative; }
        .wl-card__img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
        .wl-card:hover .wl-card__img { transform: scale(1.06); }
        .wl-card__img-ph { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: var(--color-muted); }
        .wl-card__oos-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.05em; }
        .wl-card__body { padding: var(--sp-4); display: flex; flex-direction: column; gap: var(--sp-2); }
        .wl-card__name { font-family: var(--font-heading); font-size: 0.95rem; color: var(--color-text); text-decoration: none; display: block; line-height: 1.35; font-weight: 600; }
        .wl-card__name:hover { color: var(--color-primary); }
        .wl-card__variant { font-size: 0.78rem; color: var(--color-muted); margin: 0; }
        .wl-card__footer { display: flex; align-items: center; gap: var(--sp-3); flex-wrap: wrap; }
        .wl-card__price { font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: var(--color-primary); margin: 0; }
        .wl-card__low-stock { font-size: 0.72rem; font-weight: 700; color: #c0392b; background: #fef0ed; border-radius: var(--radius-pill); padding: 2px 8px; }
        .wl-card__cta { width: 100%; display: flex; align-items: center; justify-content: center; gap: var(--sp-2); background: var(--color-primary); color: #fff; border: none; border-radius: var(--radius-sm); padding: var(--sp-3); font-size: 0.88rem; font-weight: 600; cursor: pointer; transition: background 0.18s; }
        .wl-card__cta:hover:not(:disabled) { background: #a63419; }
        .wl-card__cta:disabled { background: var(--color-border); color: var(--color-muted); cursor: not-allowed; }
        .wl-empty { text-align: center; padding: var(--sp-8) var(--sp-4); display: flex; flex-direction: column; align-items: center; gap: var(--sp-5); max-width: 480px; margin: 0 auto; }
        .wl-empty__icon { color: var(--color-border); }
        .wl-empty__title { font-family: var(--font-heading); font-size: 2rem; margin: 0; color: var(--color-text); }
        .wl-empty__sub { color: var(--color-muted); max-width: 360px; margin: 0; line-height: 1.7; }
      `}</style>
    </>
  );
}