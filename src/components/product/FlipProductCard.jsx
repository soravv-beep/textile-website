/**
 * <FlipProductCard /> — a 3D flip card. By default the back shows the SAME product
 * as the front in the second design (pass `back` only if you ever want another one).
 *
 *   front  → light card: inset photo, heart, name, description, price, dark "Add to cart"
 *   back   → full-bleed photo with a frosted gradient overlay, white text, white "Add to cart"
 *
 * Behaviour
 *   - Mouse: hover flips to the back, leaving flips back to the front.
 *   - Touch / pen: tap anywhere on the card (except the heart, Buy button or the
 *     product name link) to flip. Tapping outside a flipped card flips it back.
 *   - Keyboard: tabbing into the back face flips the card, tabbing back to the
 *     front flips it again, so both products are always reachable.
 *   - prefers-reduced-motion: the flip is instant (see the CSS file).
 *
 * `front` (and the optional `back`) use the same shape as the props of <ProductCard />,
 * i.e. what `useShop().cards([...])` returns, plus an optional `description`.
 * The heart and Buy buttons on each face act on THAT face's product.
 *
 * @param {object} props
 * @param {object} props.front  card props of the front product
 * @param {object} [props.back] card props of the back product (defaults to `front`)
 * @param {(id:string, product:object)=>void|Promise<void>} [props.onAddToCart]
 * @param {(id:string)=>void|Promise<void>} [props.onToggleWishlist]
 * @param {(id:string)=>void} [props.onToggleCompare] shows the compare button (Shop)
 * @param {string} [props.className]
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { productPath } from "../../constants/routes.js";
import { formatINR } from "../../utils/format.js";
import "./FlipProductCard.css";

const COMPARE_PATH = "M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7";
const STAR_PATH = "m12 3 2.7 5.9 6.3.7-4.7 4.3 1.3 6.3L12 17l-5.6 3.2 1.3-6.3L3 9.6l6.3-.7L12 3Z";
const HEART_PATH = "M12 21s-7.5-4.8-9.5-9A5.4 5.4 0 0 1 12 6.5 5.4 5.4 0 0 1 21.5 12c-2 4.2-9.5 9-9.5 9Z";

/** One side of the card. Owns the heart + Add to cart state of its own product. */
function Face({ side, product, onAddToCart, onToggleWishlist, onToggleCompare, onFocusFace, onHitClick }) {
  const {
    id, slug, name, images = [], price, compareAtPrice, description, badge,
    rating, reviewCount, compared = false, isWishlisted = false
  } = product;

  const [wished, setWished] = useState(Boolean(isWishlisted));
  const [cartState, setCartState] = useState("idle"); // idle | loading | added

  useEffect(() => {
    setWished(Boolean(isWishlisted));
  }, [isWishlisted]);

  const href = productPath(slug);
  const hasOldPrice = compareAtPrice && compareAtPrice > price;

  const toggleWishlist = async () => {
    const next = !wished;
    setWished(next); // optimistic, reverted if the handler throws
    try {
      await onToggleWishlist?.(id);
    } catch {
      setWished(!next);
    }
  };

  const buy = async () => {
    if (cartState !== "idle") return;
    setCartState("loading");
    try {
      await onAddToCart?.(id, { id, slug, name, price });
      setCartState("added");
      // Same signal the regular <ProductCard /> sends, so the navbar cart reacts.
      window.dispatchEvent(new CustomEvent("wovenhaat:cart-add", { detail: { id, slug } }));
      window.setTimeout(() => setCartState("idle"), 1600);
    } catch {
      setCartState("idle");
    }
  };

  return (
    <article
      className={`fpc__face fpc__face--${side}`}
      data-product-id={id}
      onFocus={onFocusFace}
    >
      {/* Whole-face link. Mouse click navigates; on touch the first tap flips instead.
          Hidden from assistive tech — the name link below is the accessible target. */}
      <Link className="fpc__hit" to={href} tabIndex={-1} aria-hidden="true" onClick={onHitClick} />

      <div className="fpc__media">
        {images[0] && (
          <img
            className="fpc__img"
            src={images[0]}
            alt={name}
            width="600"
            height="720"
            loading={side === "front" ? "eager" : "lazy"}
            decoding="async"
            draggable="false"
          />
        )}
        {side === "back" && <span className="fpc__shade" aria-hidden="true" />}

        {badge && <span className="fpc__badge">{badge.label}</span>}

        {onToggleCompare && (
          <button
            type="button"
            className={`fpc__compare${compared ? " is-on" : ""}`}
            aria-pressed={compared}
            aria-label={`Compare ${name}`}
            title={compared ? "Added to compare" : "Compare"}
            onClick={() => onToggleCompare(id)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d={COMPARE_PATH} />
            </svg>
          </button>
        )}

        <button
          type="button"
          className={`fpc__heart${wished ? " is-wished" : ""}`}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
          onClick={toggleWishlist}
        >
          <svg viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d={HEART_PATH} />
          </svg>
        </button>
      </div>

      <div className="fpc__body">
        <h3 className="fpc__name">
          <Link to={href}>{name}</Link>
        </h3>
        {rating != null && (
          <p
            className="fpc__rating"
            aria-label={`Rated ${rating} out of 5${reviewCount != null ? ` from ${reviewCount} reviews` : ""}`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d={STAR_PATH} />
            </svg>
            <b>{rating}</b>
            {reviewCount != null && <span>({reviewCount})</span>}
          </p>
        )}
        {description && <p className="fpc__desc">{description}</p>}

        <div className="fpc__foot">
          <p className="fpc__price">
            <strong>{formatINR(price)}</strong>
            {hasOldPrice && <s>{formatINR(compareAtPrice)}</s>}
          </p>
          <button
            type="button"
            className="fpc__buy"
            onClick={buy}
            disabled={cartState === "loading"}
            aria-label={`Add ${name} to cart`}
          >
            {cartState === "added" ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                  <path d="m5 13 4 4 10-11" />
                </svg>
                Added
              </>
            ) : (
              "Add to cart"
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FlipProductCard({
  front,
  back: backProp,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  className = ""
}) {
  const [flipped, setFlipped] = useState(false);
  const rootRef = useRef(null);
  const pointerType = useRef("mouse");
  const flippedByTouch = useRef(false);

  // Tap outside a card that was flipped by touch → flip it back.
  useEffect(() => {
    if (!flipped || !flippedByTouch.current) return undefined;
    const onDocPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        flippedByTouch.current = false;
        setFlipped(false);
      }
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [flipped]);

  const back = backProp ?? front;
  if (!front || !back) return null;

  const isMouse = (event) => event.pointerType === "mouse";

  const handlePointerEnter = (event) => {
    if (!isMouse(event)) return;
    flippedByTouch.current = false;
    setFlipped(true);
  };

  const handlePointerLeave = (event) => {
    if (!isMouse(event)) return;
    setFlipped(false);
  };

  const rememberPointer = (event) => {
    pointerType.current = event.pointerType || "mouse";
  };

  /** Tap-to-flip for touch / pen: used by the whole-face link. */
  const handleHitClick = (event) => {
    if (pointerType.current === "mouse") return; // desktop: normal navigation
    event.preventDefault();
    flippedByTouch.current = true;
    setFlipped((value) => !value);
  };

  return (
    <div
      ref={rootRef}
      className={["fpc", flipped ? "is-flipped" : "", className].filter(Boolean).join(" ")}
      role="group"
      aria-label={back === front ? front.name : `${front.name} and ${back.name}`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDownCapture={rememberPointer}
    >
      <div className="fpc__flipper">
        <Face
          side="front"
          product={front}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          onToggleCompare={onToggleCompare}
          onFocusFace={() => setFlipped(false)}
          onHitClick={handleHitClick}
        />
        <Face
          side="back"
          product={back}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          onToggleCompare={onToggleCompare}
          onFocusFace={() => setFlipped(true)}
          onHitClick={handleHitClick}
        />
      </div>
    </div>
  );
}
