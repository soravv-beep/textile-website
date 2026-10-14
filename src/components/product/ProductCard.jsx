/**
 * <ProductCard /> — the production product card for Shop, Collections, Wishlist
 * and Home. Replaces the old ProductCardStub.
 *
 * Layout, top to bottom: sale strip (only with a real deadline) → inset image
 * area (4/5, rounded, slider + wishlist heart + counter) → eco/certification
 * pill → Playfair name (2 lines max) → muted meta line → dashed divider →
 * price + pill "Add to cart".
 *
 * The whole card is clickable through a stretched link to /product/:slug; the
 * heart and the add-to-cart button sit above it and never trigger navigation.
 * Keyboard users get a real link on the product name, so the hit area is not
 * the only way in.
 *
 * @param {object} props
 * @param {string} props.id            stable product id (used by the callbacks)
 * @param {string} props.slug          URL slug → /product/:slug
 * @param {string} props.name          product name (Playfair, 2 lines max)
 * @param {string[]} props.images      image URLs; first is eager, rest lazy
 * @param {number} props.price         current price in rupees
 * @param {number} [props.compareAtPrice] original price, struck through when higher
 * @param {string} [props.saleEndsAt]  ISO date of a REAL sale end; omit for no sale
 * @param {{ label:string, icon?:React.ReactNode }} [props.badge] corner badge (optional)
 * @param {string} [props.ecoLabel]    certification/handloom pill, e.g. "GOTS Certified"
 * @param {string} [props.meta]        small line, e.g. "5x8 ft · Wool"
 * @param {boolean} [props.inStock=true]
 * @param {boolean} [props.isWishlisted=false]
 * @param {(id:string, product:{id:string,slug:string,name:string,price:number})=>void|Promise<void>} [props.onAddToCart]
 * @param {(id:string)=>void|Promise<void>} [props.onToggleWishlist]
 * @param {boolean} [props.tilt=true]  subtle 3D tilt + glare (off on touch)
 * @param {string} [props.className]
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SaleBanner from "./SaleBanner.jsx";
import ProductImageSlider from "./ProductImageSlider.jsx";
import Button from "../ui/Button.jsx";
import { productPath } from "../../constants/routes.js";
import { formatINR } from "../../utils/format.js";
import { useTilt } from "../../animations/useTilt.js";
import { useMagnetic } from "../../animations/useMagnetic.js";
import { useReducedMotion } from "../../animations/useReducedMotion.js";

/** Discount percentage, only when compareAtPrice really is higher than price. */
function discountPercent(price, compareAtPrice) {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

const CART_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M6 6h15l-1.5 9h-12z" />
    <path d="M6 6 5 3H2" />
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
  </svg>
);

const LEAF_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M12 21c0-9 4-13 9-15-1 8-4 12-9 15Z" />
    <path d="M12 21C7 18 4 14 3 6c5 2 9 6 9 15Z" />
  </svg>
);

export default function ProductCard({
  id,
  slug,
  name,
  images = [],
  price,
  compareAtPrice,
  saleEndsAt,
  badge,
  ecoLabel,
  meta,
  inStock = true,
  isWishlisted = false,
  onAddToCart,
  onToggleWishlist,
  tilt = true,
  className = ""
}) {
  const [wished, setWished] = useState(Boolean(isWishlisted));
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    setWished(Boolean(isWishlisted));
  }, [isWishlisted]);
  const [cartState, setCartState] = useState("idle"); // idle | loading | added
  const [imageIndex, setImageIndex] = useState(0);

  const tiltRef = useTilt({ max: 6, enabled: tilt });
  const magnetRef = useMagnetic({ strength: 6, radius: 60 });
  const reduced = useReducedMotion();

  const percent = discountPercent(price, compareAtPrice);
  const href = productPath(slug);

  const toggleWishlist = async () => {
    // Saving an out-of-stock piece is allowed on purpose — it is the usual
    // "notify me later" signal.
    const next = !wished;
    setWished(next);                       // optimistic
    if (next) setBurst((n) => n + 1);
    try {
      await onToggleWishlist?.(id);
    } catch {
      setWished(!next);                    // revert when the API says no
    }
  };

  const addToCart = async () => {
    if (!inStock || cartState !== "idle") return;
    setCartState("loading");
    try {
      await onAddToCart?.(id, { id, slug, name, price });
      setCartState("added");
      // Let the navbar cart icon react (Dev 3 can also just read CartContext).
      window.dispatchEvent(new CustomEvent("wovenhaat:cart-add", { detail: { id, slug } }));
      window.setTimeout(() => setCartState("idle"), 1600);
    } catch {
      setCartState("idle");
    }
  };

  return (
    <article
      ref={tilt ? tiltRef : undefined}
      className={[
        "pc-card",
        tilt ? "has-tilt" : "",
        inStock ? "" : "is-out-of-stock",
        className
      ]
        .filter(Boolean)
        .join(" ")}
      data-product-id={id}
    >
      {saleEndsAt && <SaleBanner percent={percent} endsAt={saleEndsAt} />}

      <div className="pc-card__inner">
        <div className="pc-card__media-wrap">
          <ProductImageSlider
            images={images}
            alt={name}
            index={imageIndex}
            onIndexChange={setImageIndex}
            outOfStock={!inStock}
          />

          {/* Wishlist — above the stretched link, never navigates */}
          <button
            type="button"
            className={`pc-wish${wished ? " is-wished" : ""}${reduced ? "" : " is-animated"}`}
            aria-pressed={wished}
            aria-label={wished ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
            onClick={toggleWishlist}
          >
            <svg viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 21s-7.5-4.8-9.5-9A5.4 5.4 0 0 1 12 6.5 5.4 5.4 0 0 1 21.5 12c-2 4.2-9.5 9-9.5 9Z" />
            </svg>
            {/* tiny particle burst on save */}
            {wished && !reduced && (
              <span className="pc-wish__burst" key={burst} aria-hidden="true">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span className="pc-wish__particle" style={{ "--i": i }} key={i} />
                ))}
              </span>
            )}
          </button>

          {!inStock && <span className="pc-card__soldout">Sold out</span>}

          {badge && <span className="pc-card__badge">{badge.icon}{badge.label}</span>}

          {/* Stretched hit area: mouse users can click anywhere on the card.
              Hidden from AT — the name link below is the accessible target. */}
          <Link className="pc-card__hit" to={href} tabIndex={-1} aria-hidden="true" />
        </div>

        {ecoLabel && (
          <span className="pc-eco">
            {LEAF_ICON}
            {ecoLabel}
          </span>
        )}

        <h3 className="pc-name">
          <Link to={href}>{name}</Link>
        </h3>

        {meta && <p className="pc-meta">{meta}</p>}

        <hr className="pc-divider" />

        <div className="pc-foot">
          <p className="pc-price">
            {percent ? <s>{formatINR(compareAtPrice)}</s> : null}
            <strong>{formatINR(price)}</strong>
          </p>

          <span className="pc-add-wrap" ref={magnetRef}>
            <Button
              className="pc-add"
              variant={inStock ? "primary" : "outline"}
              size="sm"
              loading={cartState === "loading"}
              disabled={!inStock}
              onClick={addToCart}
              aria-label={inStock ? `Add ${name} to cart` : `${name} is sold out`}
            >
              {cartState === "added" ? (
                <>
                  <svg className="pc-add__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="m5 13 4 4 10-11" />
                  </svg>
                  Added
                </>
              ) : (
                <>
                  <span className="pc-add__icon">{CART_ICON}</span>
                  {inStock ? "Add to cart" : "Sold out"}
                </>
              )}
            </Button>
          </span>
        </div>
      </div>
    </article>
  );
}
