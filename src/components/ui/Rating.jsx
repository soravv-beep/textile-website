/**
 * <Rating /> — Tan/gold stars, accessible.
 *
 * @param {object} props
 * @param {number} props.value rating out of 5 (supports halves)
 * @param {number} [props.count] review count, rendered as "(128)"
 * @param {"sm"|"md"} [props.size="sm"]
 * @param {boolean} [props.showValue=false] print the numeric value
 */
export default function Rating({ value, count, size = "sm", showValue = false, className = "" }) {
  const rounded = Math.round(value);
  return (
    <span
      className={["rating", size === "md" ? "rating--md" : "", className].filter(Boolean).join(" ")}
      role="img"
      aria-label={`${value} out of 5 stars${count ? ` from ${count} reviews` : ""}`}
    >
      <span className="rating__stars" aria-hidden="true">
        {"★".repeat(rounded)}
        <span className="rating__empty">{"★".repeat(5 - rounded)}</span>
      </span>
      {showValue && <span className="rating__value">{value}</span>}
      {count != null && <span className="rating__count">({count})</span>}
    </span>
  );
}
