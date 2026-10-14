/**
 * useSpotlight() — soft glow that follows the cursor inside a section.
 *
 *   const ref = useSpotlight();
 *   <section ref={ref} className="has-spotlight">…</section>
 *
 * The glow is a pseudo-element positioned from --spot-x / --spot-y, so only
 * custom properties change (no layout, no repaint of children).
 * Disabled on touch devices and with prefers-reduced-motion.
 */
import { useEffect, useRef } from "react";
import { useMotionEnabled } from "./useReducedMotion.js";

export function useSpotlight({ size = 420 } = {}) {
  const ref = useRef(null);
  const allowed = useMotionEnabled();

  useEffect(() => {
    const node = ref.current;
    if (!node || !allowed) return undefined;

    let frame = null;
    let point = { x: 0, y: 0 };

    const apply = () => {
      node.style.setProperty("--spot-x", `${point.x.toFixed(1)}px`);
      node.style.setProperty("--spot-y", `${point.y.toFixed(1)}px`);
      frame = null;
    };

    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    node.style.setProperty("--spot-size", `${size}px`);
    node.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      node.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [size, allowed]);

  return ref;
}

export default useSpotlight;
