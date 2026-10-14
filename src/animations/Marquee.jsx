/**
 * <Marquee /> — infinite horizontal strip that pauses on hover.
 * Duplicates its children once so the loop is seamless, and animates only
 * `transform` (see `.marquee` in globals.css).
 *
 *   <Marquee speed={28}>
 *     <span>OEKO-TEX</span><span>GOTS</span><span>GRS</span>
 *   </Marquee>
 *
 * @param {object} props
 * @param {number} [props.speed=30] seconds per full loop (higher = slower)
 * @param {"left"|"right"} [props.direction="left"]
 * @param {boolean} [props.pauseOnHover=true]
 */
export default function Marquee({
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = "",
  children
}) {
  return (
    <div
      className={[
        "marquee",
        direction === "right" ? "marquee--reverse" : "",
        pauseOnHover ? "marquee--pausable" : "",
        className
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--marquee-duration": `${speed}s` }}
    >
      <div className="marquee__track">
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
