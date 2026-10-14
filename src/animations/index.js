/**
 * WovenHaat animations kit — shared by every page.
 *
 *   import { Reveal, Marquee, DragScroll, useTilt, useMagnetic } from "../animations/index.js";
 *
 * Hooks:  useTilt, useMagnetic, useSpotlight, useParallax, useNavUnderline,
 *         useReducedMotion, useFinePointer, useMotionEnabled
 * Pieces: <Reveal />, <Marquee />, <DragScroll />, <CustomCursor />, <SuccessCheck />
 *
 * Rules (see DESIGN_SYSTEM.md §7): transform/opacity only, rAF for pointer
 * effects, reduced-motion respected, touch devices skip cursor/tilt/parallax.
 */
export { default as Reveal } from "./Reveal.jsx";
export { default as Marquee } from "./Marquee.jsx";
export { default as DragScroll } from "./DragScroll.jsx";
export { default as CustomCursor } from "./CustomCursor.jsx";
export { default as SuccessCheck } from "./SuccessCheck.jsx";

export { useTilt } from "./useTilt.js";
export { useMagnetic } from "./useMagnetic.js";
export { useSpotlight } from "./useSpotlight.js";
export { useParallax } from "./useParallax.js";
export { useNavUnderline } from "./useNavUnderline.js";
export { useReducedMotion, useFinePointer, useMotionEnabled } from "./useReducedMotion.js";
