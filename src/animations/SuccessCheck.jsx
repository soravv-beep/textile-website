/**
 * <SuccessCheck /> — drawn-in checkmark for form success states.
 *
 *   {sent && <SuccessCheck size={44} />}
 *
 * Pure SVG stroke animation, hidden from assistive tech (the surrounding
 * message already announces the success text).
 *
 * @param {object} props
 * @param {number} [props.size=40] px
 * @param {string} [props.className]
 */
export default function SuccessCheck({ size = 40, className = "" }) {
  return (
    <span
      className={["success-check", className].filter(Boolean).join(" ")}
      style={{ "--check-size": `${size}px` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 52 52">
        <circle className="success-check__ring" cx="26" cy="26" r="23" />
        <path className="success-check__mark" d="M14 27.5 22 35l16-17" />
      </svg>
    </span>
  );
}
