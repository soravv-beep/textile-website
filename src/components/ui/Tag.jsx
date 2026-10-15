/**
 * <Tag /> — small pill label (Light Coral by default).
 * Light Coral always uses DARK text (--color-text) so the label clears WCAG AA.
 *
 * @param {object} props
 * @param {"coral"|"tan"|"orange"|"outline"|"eco"} [props.tone="coral"]
 * @param {React.ReactNode} props.children
 *
 * Examples:
 *   <Tag>New</Tag>
 *   <Tag tone="tan">Bestseller</Tag>
 *   <Tag tone="eco">GOTS certified</Tag>
 */
export default function Tag({ tone = "coral", className = "", children, ...rest }) {
  const toneClass = {
    coral: "badge--new",
    tan: "badge--best",
    orange: "badge--sale",
    outline: "badge--outline",
    eco: "badge--eco"
  }[tone];

  return (
    <span className={["badge", toneClass, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </span>
  );
}
