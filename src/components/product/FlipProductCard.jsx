/**
 * <FlipProductCard /> — product card whose white info block slides away on hover.
 *
 *   normal → light card: inset photo, heart, name, description, price, dark "Add to cart"
 *   open   → the photo runs edge to edge inside the frame, the white block has slid down
 *            out of the card, and the SAME title / description / price / button now sit on
 *            the photo in white over a frosted gradient
 *
 * One switch drives both states: `--fpc-on` in globals.css (0 = normal, 1 = open).
 *   - mouse:    :hover, kept behind @media (hover: hover) so it can never stick on touch
 *   - touch:    tap the card (anywhere but the heart, the button or the name) → .is-revealed
 *   - keyboard: :focus-within, so nothing stays hidden while a user is tabbing
 *
 * `front` carries the same shape as the props of <ProductCard />, i.e. what
 * `useShop().cards([...])` returns, plus an optional `description`. The component
 * name and that prop are leftovers from when this was a 3D flip card — Home and
 * ProductBrowser pass them, so they stay.
 *
 * @param {object} props
 * @param {object} props.front  card props of the product
 * @param {(id:string, product:object)=>void|Promise<void>} [props.onAddToCart]
 * @param {(id:string)=>void|Promise<void>} [props.onToggleWishlist]
 * @param {(id:string)=>void} [props.onToggleCompare] shows the compare button (Shop)
 * @param {string} [props.className]
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { productPath } from "../../constants/routes.js";
import { formatINR } from "../../utils/format.js";

const COMPARE_PATH = "M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7";
const STAR_PATH = "m12 3 2.7 5.9 6.3.7-4.7 4.3 1.3 6.3L12 17l-5.6 3.2 1.3-6.3L3 9.6l6.3-.7L12 3Z";
const HEART_PATH = "M12 21s-7.5-4.8-9.5-9A5.4 5.4 0 0 1 12 6.5 5.4 5.4 0 0 1 21.5 12c-2 4.2-9.5 9-9.5 9Z";

export default function FlipProductCard({
  front,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  className = ""
}) {
  const {
    id, slug, name, images = [], price, compareAtPrice, description, badge,
    rating, reviewCount, compared = false, isWishlisted = false
  } = front ?? {};

  const [wished, setWished] = useState(Boolean(isWishlisted));
  const [cartState, setCartState] = useState("idle"); // idle | loading | added
  const [revealed, setRevealed] = useState(false);

  const rootRef = useRef(null);
  const pointerType = useRef("mouse");

  useEffect(() => {
    setWished(Boolean(isWishlisted));
  }, [isWishlisted]);

  // Tap outside a card that was opened by touch → close it again.
  useEffect(() => {
    if (!revealed) return undefined;
    const onDocPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setRevealed(false);
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [revealed]);

  if (!front) return null;

  const href = productPath(slug);
  const photo = images[0];
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

  const rememberPointer = (event) => {
    pointerType.current = event.pointerType || "mouse";
  };

  /** Tap-to-open for touch / pen: desktop keeps plain navigation on click. */
  const handleHitClick = (event) => {
    if (pointerType.current === "mouse") return;
    event.preventDefault();
    setRevealed((value) => !value);
  };

  return (
    <article
      ref={rootRef}
      className={[
        "fpc",
        photo ? "fpc--photo" : "",
        revealed ? "is-revealed" : "",
        className
      ].filter(Boolean).join(" ")}
      style={photo ? { "--fpc-photo": `url("${photo}")` } : undefined}
      onPointerDownCapture={rememberPointer}
    >
      {/* Whole-card link. Mouse click navigates; on touch the first tap opens instead.
          Hidden from assistive tech — the name link below is the accessible target. */}
      <Link className="fpc__hit" to={href} tabIndex={-1} aria-hidden="true" onClick={handleHitClick} />

      {/* Edge-to-edge copy of the photo, faded in under the inset one */}
      <span className="fpc__expand" aria-hidden="true" />

      <div className="fpc__media">
        {photo && (
          <img
            className="fpc__img"
            src={photo}
            alt={name}
            width="600"
            height="720"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        )}
      </div>

      {/* Gradient + frosted blur behind the text once the card is open */}
      <span className="fpc__shade" aria-hidden="true" />

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
