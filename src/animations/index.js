/**
 * WovenHaat animation pieces — shared by every page.
 *
 *   import { Reveal, Marquee, DragScroll } from "../animations/index.js";
 *
 * Pieces: <Reveal />, <Marquee />, <DragScroll />, <CustomCursor />, <SuccessCheck />
 * The hooks behind them live in src/hooks (see src/hooks/index.js).
 *
 * Rules (see docs/DESIGN_SYSTEM.md §7): transform/opacity only, rAF for pointer
 * effects, reduced-motion respected, touch devices skip cursor/tilt/parallax.
 */
export { default as Reveal } from "./Reveal.jsx";
export { default as Marquee } from "./Marquee.jsx";
export { default as DragScroll } from "./DragScroll.jsx";
export { default as CustomCursor } from "./CustomCursor.jsx";
export { default as SuccessCheck } from "./SuccessCheck.jsx";
