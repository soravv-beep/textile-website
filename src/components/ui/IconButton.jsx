/**
 * <IconButton /> — circular icon action (nav icons, close buttons, arrow strokes).
 * Minimum 44x44 tap target.
 *
 * @param {object} props
 * @param {string} props.label accessible name (required — icon-only buttons need it)
 * @param {React.ReactNode} props.children the <svg> icon
 * @param {"light"|"dark"|"ghost"} [props.tone="dark"]
 *   dark  = on Mocha/white surfaces (uses --color-text)
 *   light = on chrome/photo surfaces (uses --color-bg)
 *   ghost = transparent, themed on hover only
 * @param {boolean} [props.magnetic=false] magnetic pull toward the cursor
 */
import { useMagnetic } from "../../animations/useMagnetic.js";

export default function IconButton({
  label,
  tone = "dark",
  magnetic = false,
  className = "",
  children,
  ...rest
}) {
  const ref = useMagnetic({ enabled: magnetic, strength: 8 });

  return (
    <button
      ref={magnetic ? ref : undefined}
      type="button"
      className={["icon-btn", `icon-btn--${tone}`, className].filter(Boolean).join(" ")}
      aria-label={label}
      title={label}
      {...rest}
    >
      {children}
    </button>
  );
}
