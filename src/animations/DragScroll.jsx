/**
 * <DragScroll /> — horizontal gallery you can drag with inertia.
 * Native scroll-snap still works with a trackpad / touch swipe; this adds
 * click-drag + momentum for mouse users.
 *
 *   <DragScroll>{cards}</DragScroll>
 *
 * @param {object} props
 * @param {string} [props.className] extra class on the scroller
 * @param {number} [props.friction=0.94] momentum decay (0–1)
 */
import { useEffect, useRef } from "react";

export default function DragScroll({ className = "", friction = 0.94, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let down = false;
    let startX = 0;
    let startScroll = 0;
    let velocity = 0;
    let lastX = 0;
    let frame = null;

    const glide = () => {
      if (Math.abs(velocity) < 0.2) {
        frame = null;
        return;
      }
      node.scrollLeft += velocity;
      velocity *= friction;
      frame = requestAnimationFrame(glide);
    };

    const onDown = (event) => {
      if (event.button !== 0) return;
      down = true;
      startX = event.clientX;
      startScroll = node.scrollLeft;
      lastX = event.clientX;
      velocity = 0;
      node.classList.add("is-dragging");
      if (frame) cancelAnimationFrame(frame);
    };

    const onMove = (event) => {
      if (!down) return;
      event.preventDefault();
      const delta = event.clientX - startX;
      node.scrollLeft = startScroll - delta;
      velocity = lastX - event.clientX;
      lastX = event.clientX;
    };

    const onUp = () => {
      if (!down) return;
      down = false;
      node.classList.remove("is-dragging");
      if (Math.abs(velocity) > 1) frame = requestAnimationFrame(glide);
    };

    node.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      node.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [friction]);

  return (
    <div ref={ref} className={["drag-scroll", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
