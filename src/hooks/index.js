/**
 * WovenHaat hooks — reusable behaviour, no markup.
 *
 *   import { useTilt, useMagnetic, useReducedMotion } from "../hooks/index.js";
 *
 * Motion rules and when to use each one: docs/DESIGN_SYSTEM.md §7.
 * Every pointer-driven hook already bails out on touch devices and honours
 * prefers-reduced-motion through useMotionEnabled.
 */
export { useCountdown } from "./useCountdown.js";
export { useMagnetic } from "./useMagnetic.js";
export { useNavUnderline } from "./useNavUnderline.js";
export { useParallax } from "./useParallax.js";
export { useSpotlight } from "./useSpotlight.js";
export { useTilt } from "./useTilt.js";
export { useReducedMotion, useFinePointer, useMotionEnabled } from "./useReducedMotion.js";
