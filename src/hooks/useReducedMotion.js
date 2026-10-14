/**
 * Motion utilities shared by every animation hook.
 *
 * Rules for the whole animations kit:
 *  - animate transform / opacity only (never width, top, left, filter),
 *  - respect `prefers-reduced-motion: reduce`,
 *  - cursor / magnetic / tilt / parallax effects are disabled on touch devices,
 *  - no layout shift: reserve space in CSS, never animate into layout.
 */
import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/** true when the user asked for reduced motion (SSR-safe). */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia(QUERY);
    const onChange = (event) => setReduced(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** true on devices with a precise pointer (desktop mouse) — cursor effects only run there. */
export function useFinePointer() {
  const [fine, setFine] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(pointer: fine)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia("(pointer: fine)");
    const onChange = (event) => setFine(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return fine;
}

/** One shared answer for "may I run expensive pointer effects?" */
export function useMotionEnabled() {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  return fine && !reduced;
}
