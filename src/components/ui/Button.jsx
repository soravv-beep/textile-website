/**
 * <Button /> — the only button/CTA component on the site.
 *
 * @param {object} props
 * @param {"primary"|"secondary"|"outline"|"outline-light"|"ghost"|"link"} [props.variant="primary"]
 *   primary       = Burnt Orange fill, white text (main CTAs)
 *   secondary     = Turquoise fill, white text (supporting CTAs)
 *   outline       = transparent, current text colour border (on Mocha/white)
 *   outline-light = transparent, white border — only on chrome/dark bands
 *   ghost         = transparent, no border, tints on hover (nav / icon rows)
 *   link          = text-only, Tan underline (inline "read more" actions)
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 * @param {boolean} [props.loading=false] shows a spinner, blocks clicks, sets aria-busy
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.block=false] full width
 * @param {boolean} [props.arrow=false] trailing → that slides on hover
 * @param {boolean} [props.ripple=true] click ripple from the pointer position
 * @param {React.ElementType} [props.as="button"] render as a element (e.g. `as={Link}` + `to`)
 * @param {React.ReactNode} props.children
 *
 * Examples:
 *   <Button>Shop the collection</Button>
 *   <Button as={Link} to={ROUTES.shop} variant="outline" arrow>View lookbook</Button>
 *   <Button variant="primary" block loading>Sending…</Button>
 */
import { useState } from "react";

const SPINNER = (
  <svg className="ui-spinner" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  block = false,
  arrow = false,
  ripple = true,
  as: Tag = "button",
  className = "",
  children,
  onClick,
  ...rest
}) {
  const [ripples, setRipples] = useState([]);
  const isTagButton = Tag === "button";

  const handleClick = (event) => {
    if (ripple && variant !== "link") {
      const rect = event.currentTarget.getBoundingClientRect();
      const id = Date.now() + Math.random();
      const drop = {
        id,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        size: Math.max(rect.width, rect.height) * 2
      };
      setRipples((r) => [...r, drop]);
      window.setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 620);
    }
    if (loading || disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const classes = [
    "btn",
    `btn-${variant}`,
    size !== "md" ? `btn-${size}` : "",
    block ? "btn-block" : "",
    loading ? "is-loading" : "",
    arrow ? "btn--arrow" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      className={classes}
      onClick={handleClick}
      {...(isTagButton ? { type: "button", disabled: disabled || loading } : {})}
      {...(loading ? { "aria-busy": "true" } : {})}
      {...(disabled && !isTagButton ? { "aria-disabled": "true", tabIndex: -1 } : {})}
      {...rest}
    >
      {ripple && ripples.length > 0 && (
        <span className="btn__ripples" aria-hidden="true">
          {ripples.map((r) => (
            <span
              key={r.id}
              className="btn__ripple"
              style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
            />
          ))}
        </span>
      )}
      {loading && SPINNER}
      <span className="btn__label">{children}</span>
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          →
        </span>
      )}
    </Tag>
  );
}
