/**
 * <SectionHeading /> — Tan caps label + Playfair title + optional subtitle.
 *
 * @param {object} props
 * @param {string} [props.label] Tan uppercase eyebrow (12–13px, 0.14em tracking)
 * @param {React.ReactNode} props.title Playfair heading (renders <h2> by default)
 * @param {React.ReactNode} [props.subtitle] muted body copy under the title
 * @param {"left"|"center"} [props.align="left"]
 * @param {"h2"|"h3"} [props.as="h2"]
 * @param {string} [props.id] use the same id in `aria-labelledby` on the section
 *
 * Example:
 *   <SectionHeading id="rev-h" align="center" label="Customer reviews" title="What homes are saying" />
 */
export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  as: Heading = "h2",
  id,
  className = "",
  children
}) {
  return (
    <div
      className={[
        "section-head",
        align === "center" ? "section-head--center" : "",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && <span className="eyebrow">{label}</span>}
      <Heading id={id}>{title}</Heading>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </div>
  );
}
