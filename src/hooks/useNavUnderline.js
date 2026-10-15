/**
 * useNavUnderline — attaches to a nav link and slides the burnt-orange
 * underline in from the side the cursor entered on (dev 1 — shared).
 */
import { useCallback, useRef } from "react";

export function useNavUnderline() {
  const cleanupRef = useRef(null);

  return useCallback((node) => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    if (!node) return;

    node.classList.add("nav-link");

    const onEnter = (event) => {
      const rect = node.getBoundingClientRect();
      const fromLeft = event.clientX - rect.left < rect.width / 2;
      if (fromLeft) node.removeAttribute("data-under-from");
      else node.setAttribute("data-under-from", "right");
      node.classList.add("is-under");
    };

    const onLeave = (event) => {
      const rect = node.getBoundingClientRect();
      const toLeft = event.clientX - rect.left < rect.width / 2;
      if (toLeft) node.removeAttribute("data-under-from");
      else node.setAttribute("data-under-from", "right");
      node.classList.remove("is-under");
    };

    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mouseleave", onLeave);

    cleanupRef.current = () => {
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, []);
}

export default useNavUnderline;
