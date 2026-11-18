/**
 * Wishlist Page — WovenHaat (Dev 3 / Manav Chotai)
 * "My Wish and Comparison List" style list design matching reference mockup
 * Desktop & Mobile fully responsive list layout with compare toggle, SKU, stock indicator, price discount, and share
 */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useShop } from "../context/shopContext.js";
import { ROUTES } from "../constants/routes.js";
import { Button, Container } from "../components/ui/index.js";
import PageMeta from "../components/PageMeta.jsx";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

/* Realistic demo wishlist items with SKU and local fallback images */
const DEMO_WISHLIST = [
  {
    slug: "jaipuri-block-print-bedsheet",
    id: 101,
    itemNo: "9621285",
    name: "Jaipuri Block Print Bedsheet — King",
    variant: "Rust & White / 100x108 inches",
    price: 2799,
    oldPrice: 3499,
    stock: 12,
    deliveryDays: "4-7 working days",
    image: "/product-images-v2/jaipur-handwoven-cotton-rug.webp",
  },
  {
    slug: "kashmiri-pashmina-stole-natural",
    id: 102,
    itemNo: "9621154",
    name: "Kashmiri Pashmina Stole — Natural Ivory",
    variant: "Natural Ivory / 28x80 inches",
    price: 4499,
    oldPrice: 5999,
    stock: 4,
    deliveryDays: "4-7 working days",
    image: "/product-images-v2/kutch-handwoven-throw.webp",
  },
  {
    slug: "hand-tufted-wool-rug-terracotta",
    id: 103,
    itemNo: "9945440",
    name: "Hand-Tufted Wool Rug — Terracotta",
    variant: "Terracotta / 4x6 ft",
    price: 6199,
    oldPrice: 7299,
    stock: 6,
    deliveryDays: "4-7 working days",
    image: "/product-images-v2/terracotta-wool-blanket.webp",
  },
];

/* ── Close icon ── */
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

/* ── Cart Icon for mobile button ── */
function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );
}

/* ── Share Mail Icon ── */
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

/* ── Wishlist List Row Item ── */
function WishlistRow({ item, onMoveToCart, onRemove }) {
  const itemNumber = item.itemNo || `962${Math.abs(item.name.split("").reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)) % 1000000}`;
  const inStock = item.stock !== 0;

  return (
    <motion.div
      className="wl-row"
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22 }}
    >
      {/* Top right remove button for mobile & desktop */}
      <button
        className="wl-row__remove-btn"
        onClick={() => onRemove(item.slug)}
        aria-label={`Remove ${item.name} from list`}
        title="Remove item"
      >
        <CloseIcon />
      </button>

      {/* Product Thumbnail */}
      <Link to={`/product/${item.slug}`} className="wl-row__img-link">
        <div className="wl-row__img-wrap">
          {item.image ? (
            <img src={item.image} alt={item.name} loading="lazy" className="wl-row__img" />
          ) : (
            <div className="wl-row__img-ph">–</div>
          )}
          {!inStock && <div className="wl-row__oos-tag">Out of stock</div>}
        </div>
      </Link>

      {/* Middle info column */}
      <div className="wl-row__center">
        <Link to={`/product/${item.slug}`} className="wl-row__name">
          {item.name}
        </Link>
        <p className="wl-row__itemno">Item no. {itemNumber}</p>

        <div className="wl-row__status">
          <span className={`wl-row__dot ${inStock ? "is-stock" : "is-oos"}`} />
          <span className="wl-row__stock-text">{inStock ? "In stock" : "Currently out of stock"}</span>
        </div>
        <p className="wl-row__delivery">Delivery time: {item.deliveryDays || "4-7 working days"}</p>
      </div>

      {/* Right price and actions column */}
      <div className="wl-row__right">
        <div className="wl-row__price-block">
          {item.oldPrice && item.oldPrice > item.price && (
            <span className="wl-row__old-price">{fmt(item.oldPrice)}</span>
          )}
          <span className="wl-row__price">{fmt(item.price)}</span>
        </div>

        {/* Desktop Button: "Add to Cart" */}
        <button
          className="wl-row__cart-btn"
          onClick={() => onMoveToCart(item)}
          disabled={!inStock}
          id={`wl-add-cart-${item.slug}`}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>

        {/* Mobile Floating/Compact Cart Icon Button */}
        <button
          className="wl-row__mobile-cart-btn"
          onClick={() => onMoveToCart(item)}
          disabled={!inStock}
          aria-label={`Add ${item.name} to cart`}
        >
          <CartIcon />
        </button>
      </div>
    </motion.div>
  );
}

/* ── Empty state ── */
function EmptyWishlist() {
  return (
    <motion.div
      className="wl-empty-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="wl-empty__icon">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </div>
      <h2 className="wl-empty__title">Your Wish and Comparison List is empty</h2>
      <p className="wl-empty__sub">Discover handcrafted textiles, rugs and homewares to add to your list.</p>
      <Button as={Link} to={ROUTES.shop} arrow id="wl-explore-btn">
        Explore Collection
      </Button>
    </motion.div>
  );
}

/* ── Main ── */
export default function WishlistPage() {
  const { items, addItem: addToWl, remove, clear } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const shop = useShop();
  const navigate = useNavigate();
  const [demoLoaded, setDemoLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  /* Pre-load demo items once if user wishlist is empty */
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Wish and Comparison List — WovenHaat",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      <PageMeta
        title="Wish and Comparison List — WovenHaat"
        description="Your saved handwoven textile favourites. Compare items and move directly to cart."
      />
      <div className="wl-page">
        <Container>
          {/* Breadcrumb row */}
          <nav className="wl-breadcrumb" aria-label="Breadcrumb">
            <Link to={ROUTES.home} className="wl-breadcrumb__link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span>Home</span>
            </Link>
            <span className="wl-breadcrumb__sep">›</span>
            <Link to={ROUTES.shop} className="wl-breadcrumb__link">Shop</Link>
            <span className="wl-breadcrumb__sep">›</span>
            <span className="wl-breadcrumb__current">My Wish and Comparison List</span>
          </nav>

          {/* Main White Card Container matching reference */}
          <div className="wl-container-card">
            {/* Header */}
            <div className="wl-container-card__header">
              <div className="wl-container-card__title-group">
                <h1 className="wl-container-card__title">My Wish and Comparison List</h1>
                {items.length > 0 && (
                  <span className="wl-container-card__count">({items.length})</span>
                )}
              </div>
              {items.length > 0 && (
                <button className="wl-clear-link" onClick={clear} id="wl-clear-btn">
                  Clear all
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <EmptyWishlist />
            ) : (
              <>
                {/* List of items */}
                <div className="wl-list">
                  <AnimatePresence>
                    {items.map((item) => (
                      <WishlistRow
                        key={item.slug}
                        item={item}
                        onMoveToCart={handleMoveToCart}
                        onRemove={remove}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Bottom Bar: VAT note + Action Buttons */}
                <div className="wl-footer-bar">
                  <p className="wl-footer-bar__note">
                    All prices incl. VAT, plus <Link to={ROUTES.shippingReturns} className="wl-footer-bar__link">Shipping costs</Link>
                  </p>

                  <div className="wl-footer-bar__actions">
                    <Link
                      to={ROUTES.compare}
                      className={`wl-footer-btn wl-footer-btn--compare${shop?.compare?.length ? " is-active" : ""}`}
                    >
                      Open Comparison List {shop?.compare?.length ? `(${shop.compare.length})` : ""}
                    </Link>

                    <button
                      type="button"
                      className="wl-footer-btn wl-footer-btn--share"
                      onClick={handleShare}
                      id="wl-share-btn"
                    >
                      <MailIcon />
                      <span>{copied ? "Link Copied!" : "Share Wish and Comparison List"}</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
