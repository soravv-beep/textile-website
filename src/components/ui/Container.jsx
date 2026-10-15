/**
 * <Container /> — the standard page gutter.
 * Max width 1200px, 16px gutters on mobile, 32px from 768px up.
 *
 * @param {object} props
 * @param {"div"|"section"|"header"|"footer"|"nav"|"main"} [props.as="div"]
 * @param {boolean} [props.bleed=false] full-bleed (no max-width) — pair with an inner Container
 */
export default function Container({ as: Tag = "div", bleed = false, className = "", children, ...rest }) {
  return (
    <Tag className={[bleed ? "container--bleed" : "container", className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </Tag>
  );
}
