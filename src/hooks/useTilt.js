/**
 * useTilt() — 3D tilt + moving glare for cards, capped at 8deg.
 *
 * Writes CSS custom properties on the element so all the work stays on the
 * compositor:  --tilt-x, --tilt-y (deg) and --glare-x / --glare-y (glare pos).
 * Pair with the `.has-tilt` class (see globals.css section 27).
 *
 *   const ref = useTilt({ max: 6 });
 *   <div ref={ref} className="has-tilt">…</div>
 *
 * Disabled automatically on touch devices and with prefers-reduced-motion.
 *
 * @param {object} [options]
 * @param {number} [options.max=8] maximum rotation in degrees
 * @param {boolean} [options.enabled=true]
 */
import { useEffect, useRef } from "react";
import { useMotionEnabled } from "./useReducedMotion.js";

export function useTilt({ max = 8, enabled = true } = {}) {
  const ref = useRef(null);
  const allowed = useMotionEnabled();

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled || !allowed) return undefined;

    let frame = null;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };

    const apply = () => {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      node.style.setProperty("--tilt-y", `${current.x.toFixed(2)}deg`);
      node.style.setProperty("--tilt-x", `${(-current.y).toFixed(2)}deg`);
      node.style.setProperty("--glare-x", `${(50 + target.x * 4).toFixed(1)}%`);
      node.style.setProperty("--glare-y", `${(50 + target.y * 4).toFixed(1)}%`);
      const settled =
        Math.abs(target.x - current.x) < 0.02 && Math.abs(target.y - current.y) < 0.02;
      frame = settled ? null : requestAnimationFrame(apply);
    };

    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      target = { x: px * max, y: py * max };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      target = { x: 0, y: 0 };
      node.style.setProperty("--glare-x", "50%");
      node.style.setProperty("--glare-y", "50%");
      if (!frame) frame = requestAnimationFrame(apply);
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max, enabled, allowed]);

  return ref;
}

export default useTilt;
