/**
 * useMagnetic() — pulls a button/icon slightly toward the cursor, then springs back.
 *
 *   const ref = useMagnetic({ strength: 10 });
 *   <Button ref={ref}>…</Button>   // or any element with the ref attached
 *
 * Only transform is animated; disabled on touch and with reduced motion.
 *
 * @param {object} [options]
 * @param {number} [options.strength=10] max translation in px
 * @param {number} [options.radius=90] activation radius in px around the element
 * @param {boolean} [options.enabled=true]
 */
import { useEffect, useRef } from "react";
import { useMotionEnabled } from "./useReducedMotion.js";

export function useMagnetic({ strength = 10, radius = 90, enabled = true } = {}) {
  const ref = useRef(null);
  const allowed = useMotionEnabled();

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled || !allowed) return undefined;

    let frame = null;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let inside = false;

    const apply = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      node.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      const settled =
        Math.abs(target.x - current.x) < 0.05 && Math.abs(target.y - current.y) < 0.05;
      frame = settled ? null : requestAnimationFrame(apply);
    };

    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const distance = Math.hypot(dx, dy);
      const range = Math.max(rect.width, rect.height) / 2 + radius;
      inside = distance < range;
      if (!inside) return;
      const falloff = 1 - distance / range;
      target = {
        x: (dx / range) * strength * falloff * 2,
        y: (dy / range) * strength * falloff * 2
      };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeaveDoc = () => {
      if (!inside) return;
      inside = false;
      target = { x: 0, y: 0 };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeaveDoc);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeaveDoc);
      if (frame) cancelAnimationFrame(frame);
      node.style.transform = "";
    };
  }, [strength, radius, enabled, allowed]);

  return ref;
}

export default useMagnetic;
