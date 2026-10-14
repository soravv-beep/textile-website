/**
 * useNavUnderline() — the Tan underline under a nav link grows out from the
 * side the cursor entered, and collapses toward the side it leaves.
 *
 *   const attach = useNavUnderline();
 *   <NavLink ref={attach}>Shop</NavLink>
 *
 * The hook only writes the `--under-from` / `--under-to` custom properties;
 * CSS owns the transition (see `.nav-link` in globals.css).
 */
import { useCallback } from "react";

export function useNavUnderline() {
  return useCallback((node) => {
    if (!node) return undefined;
    node.classList.add("nav-link");

    const onEnter = (event) => {
      const rect = node.getBoundingClientRect();
      const fromLeft = event.clientX - rect.left < rect.width / 2;
      node.style.setProperty("--under-from", fromLeft ? "left" : "right");
      node.classList.add("is-under");
    };

    const onLeave = (event) => {
      const rect = node.getBoundingClientRect();
      const toLeft = event.clientX - rect.left < rect.width / 2;
      node.style.setProperty("--under-to", toLeft ? "left" : "right");
      node.classList.remove("is-under");
    };

    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, []);
}

export default useNavUnderline;
