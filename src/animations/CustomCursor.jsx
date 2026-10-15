/**
 * <CustomCursor /> — dot + trailing ring, grows and shows a label over
 * interactive elements. Mounted once in <Layout />.
 *
 * Any element can drive the cursor by setting a data attribute:
 *   <a data-cursor="View">…</a>      → ring grows, label "View"
 *   <a data-cursor>…</a>             → ring grows, no label
 *   <div data-cursor-hide>…</div>    → cursor hidden over this area
 *
 * Only runs on precise-pointer devices without reduced-motion; the native
 * cursor is never hidden, so the site stays usable if this fails.
 */
import { useEffect, useRef, useState } from "react";
import { useMotionEnabled } from "../hooks/useReducedMotion.js";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(false);
  const enabled = useMotionEnabled();

  useEffect(() => {
    if (!enabled) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    document.documentElement.classList.add("has-custom-cursor");

    let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let ringPos = { ...pointer };
    let frame = null;

    const tick = () => {
      ringPos.x += (pointer.x - ringPos.x) * 0.16;
      ringPos.y += (pointer.y - ringPos.y) * 0.16;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      const settled =
        Math.abs(pointer.x - ringPos.x) < 0.1 && Math.abs(pointer.y - ringPos.y) < 0.1;
      frame = settled ? null : requestAnimationFrame(tick);
    };

    const onMove = (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;

      const host = event.target instanceof Element ? event.target : null;
      const target = host?.closest("[data-cursor], a, button, [role='button']");
      const hideZone = host?.closest("[data-cursor-hide]");

      if (hideZone) {
        setHidden(true);
        setActive(false);
        setLabel("");
      } else {
        setHidden(false);
        setActive(Boolean(target));
        setLabel(target?.getAttribute?.("data-cursor") || "");
      }

      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => setHidden(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor" aria-hidden="true" data-cursor-hide>
      <span ref={dotRef} className="cursor__dot" />
      <span
        ref={ringRef}
        className={[
          "cursor__ring",
          active ? "is-active" : "",
          hidden ? "is-hidden" : ""
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="cursor__label">{label}</span>
      </span>
    </div>
  );
}
