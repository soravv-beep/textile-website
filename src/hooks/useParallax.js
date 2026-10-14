/**
 * useParallax() — mouse parallax for hero layers.
 *
 * Give each layer a different depth (px of travel) so background, heading and
 * small elements move at different speeds:
 *
 *   const ref = useParallax();                       // container (tracking area)
 *   <div ref={ref}>
 *     <img data-depth="24" />                        // moves most
 *     <h1 data-depth="10" />                         // moves less
 *     <span data-depth="-6" />                       // moves opposite
 *   </div>
 *
 * Desktop-only (fine pointer, no reduced-motion) and rAF-throttled.
 */
import { useEffect, useRef } from "react";
import { useMotionEnabled } from "./useReducedMotion.js";

export function useParallax({ smoothing = 0.09 } = {}) {
  const ref = useRef(null);
  const allowed = useMotionEnabled();

  useEffect(() => {
    const host = ref.current;
    if (!host || !allowed) return undefined;

    const layers = Array.from(host.querySelectorAll("[data-depth]")).map((node) => ({
      node,
      depth: Number(node.getAttribute("data-depth")) || 0,
      current: { x: 0, y: 0 }
    }));

    let target = { x: 0, y: 0 };
    let frame = null;

    const tick = () => {
      let moving = false;
      layers.forEach((layer) => {
        layer.current.x += (target.x * layer.depth - layer.current.x) * smoothing;
        layer.current.y += (target.y * layer.depth - layer.current.y) * smoothing;
        layer.node.style.transform = `translate3d(${layer.current.x.toFixed(2)}px, ${layer.current.y.toFixed(2)}px, 0)`;
        if (
          Math.abs(target.x * layer.depth - layer.current.x) > 0.08 ||
          Math.abs(target.y * layer.depth - layer.current.y) > 0.08
        ) {
          moving = true;
        }
      });
      frame = moving ? requestAnimationFrame(tick) : null;
    };

    const onMove = (event) => {
      const rect = host.getBoundingClientRect();
      target = {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5
      };
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      target = { x: 0, y: 0 };
      if (!frame) frame = requestAnimationFrame(tick);
    };

    host.addEventListener("mousemove", onMove);
    host.addEventListener("mouseleave", onLeave);
    return () => {
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [smoothing, allowed]);

  return ref;
}

export default useParallax;
