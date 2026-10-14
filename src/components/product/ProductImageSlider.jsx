/**
 * <ProductImageSlider /> — the image area of a product card.
 *
 * - 4/5 aspect ratio with big rounded corners and object-fit: cover, so the box
 *   is reserved in CSS and nothing shifts while images load.
 * - Swipe on touch (pointer events, no library), hover arrows on desktop, and a
 *   keyboard-accessible region (← / → move, Home/End jump).
 * - Counter "1 / 10" top-right, hover arrows, dots; second image cross-fades on
 *   hover of the card (`swapOnHover`).
 * - Every image except the first is lazy-loaded.
 *
 * @param {object} props
 * @param {string[]} props.images
 * @param {string} props.alt base alt text (usually the product name)
 * @param {number} [props.index] controlled index (optional)
 * @param {(i:number)=>void} [props.onIndexChange]
 * @param {boolean} [props.outOfStock=false] dims and desaturates the image
 * @param {boolean} [props.swapOnHover=true] fade in image 2 while hovering
 */
import { useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 45;

export default function ProductImageSlider({
  images = [],
  alt,
  index,
  onIndexChange,
  outOfStock = false,
  swapOnHover = true
}) {
  const total = images.length;
  const [internal, setInternal] = useState(0);
  const active = Math.min(index ?? internal, Math.max(total - 1, 0));
  const regionRef = useRef(null);
  const pointer = useRef({ x: 0, dragging: false, id: null });

  const goTo = (next) => {
    if (total === 0) return;
    const wrapped = (next + total) % total;
    if (index == null) setInternal(wrapped);
    onIndexChange?.(wrapped);
  };

  // Release the pointer capture when we unmount mid-drag.
  useEffect(() => {
    const node = regionRef.current;
    return () => {
      if (node?.hasPointerCapture?.(pointer.current.id)) {
        node.releasePointerCapture?.(pointer.current.id);
      }
    };
  }, []);

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse") return; // mouse users get arrows/dots
    pointer.current = { x: event.clientX, dragging: true, id: event.pointerId };
  };

  const onPointerUp = (event) => {
    if (!pointer.current.dragging) return;
    const delta = event.clientX - pointer.current.x;
    pointer.current.dragging = false;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    goTo(active + (delta < 0 ? 1 : -1));
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(total - 1);
    }
  };

  const hasMultiple = total > 1;

  if (total === 0) {
    // No images yet: keep the reserved 4/5 box so the grid never shifts.
    return (
      <div className="pc-media pc-media--empty" role="img" aria-label={`${alt} — image coming soon`}>
        <span className="pc-media__placeholder">Image coming soon</span>
      </div>
    );
  }

  return (
    <div
      ref={regionRef}
      className={[
        "pc-media",
        outOfStock ? "is-out" : "",
        swapOnHover && total > 1 ? "pc-media--swap" : ""
      ]
        .filter(Boolean)
        .join(" ")}
      role="group"
      aria-roledescription="carousel"
      aria-label={hasMultiple ? `${alt} — image gallery` : alt}
      tabIndex={hasMultiple ? 0 : -1}
      onKeyDown={hasMultiple ? onKeyDown : undefined}
      onPointerDown={hasMultiple ? onPointerDown : undefined}
      onPointerUp={hasMultiple ? onPointerUp : undefined}
    >
      {images.map((src, i) => {
        const isActive = i === active;
        // With hover-swap, image 2 doubles as the hover layer: it stays in the
        // DOM but is hidden until :hover, so no extra request is needed.
        const isSwapLayer = swapOnHover && total > 1 && i === 1 && active !== 1;
        return (
          <img
            key={src + i}
            className={["pc-media__img", isActive && !isSwapLayer ? "is-active" : "", isSwapLayer ? "pc-media__swap" : ""]
              .filter(Boolean)
              .join(" ")}
            src={src}
            alt={isActive ? `${alt} — image ${i + 1} of ${total}` : ""}
            width="800"
            height="1000"
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable="false"
            aria-hidden={isActive ? undefined : "true"}
          />
        );
      })}

      {hasMultiple && (
        <>
          <span className="pc-media__counter" aria-hidden="true">
            {active + 1} / {total}
          </span>

          <button
            type="button"
            className="pc-media__arrow pc-media__arrow--prev"
            aria-label="Previous image"
            onClick={(event) => {
              event.preventDefault();
              goTo(active - 1);
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m14 6-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="pc-media__arrow pc-media__arrow--next"
            aria-label="Next image"
            onClick={(event) => {
              event.preventDefault();
              goTo(active + 1);
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m10 6 6 6-6 6" />
            </svg>
          </button>

          <span className="pc-media__dots">
            {images.map((src, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                className={`pc-media__dot${i === active ? " is-active" : ""}`}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  goTo(i);
                }}
              />
            ))}
          </span>
        </>
      )}
    </div>
  );
}
