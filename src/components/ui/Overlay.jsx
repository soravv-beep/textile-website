/**
 * <Overlay /> base + <Modal /> / <Drawer /> wrappers.
 *
 * Handles the shared hard parts once: Portal-free fixed positioning, Esc to
 * close, body scroll lock, focus trap, focus restore, and
 * prefers-reduced-motion-safe transitions. Dev 3/4/5 can build the cart drawer
 * and filters on top of this instead of re-implementing focus management.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {string} props.label accessible name of the dialog
 * @param {"modal"|"drawer-right"|"drawer-left"|"drawer-bottom"} [props.position="modal"]
 * @param {boolean} [props.scrim=true] dim + click-outside to close
 * @param {string} [props.className]
 */
import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Overlay({
  open,
  onClose,
  label,
  position = "modal",
  scrim = true,
  className = "",
  children
}) {
  const panelRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    lastFocused.current = document.activeElement;
    document.body.classList.add("nav-locked");

    const panel = panelRef.current;
    const first = panel?.querySelector(FOCUSABLE);
    (first ?? panel)?.focus?.();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose?.();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const nodes = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null
      );
      if (nodes.length === 0) return;
      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === firstNode) {
        event.preventDefault();
        lastNode.focus();
      } else if (!event.shiftKey && document.activeElement === lastNode) {
        event.preventDefault();
        firstNode.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.classList.remove("nav-locked");
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={`ui-overlay ui-overlay--${position} ${className}`.trim()}>
      {scrim && (
        <button
          type="button"
          className="ui-overlay__scrim"
          aria-label="Close"
          onClick={onClose}
        />
      )}
      <div
        ref={panelRef}
        className="ui-overlay__panel"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
      >
        <button type="button" className="ui-overlay__close" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

/** Centered dialog. */
export function Modal({ title, children, ...props }) {
  return (
    <Overlay position="modal" label={title} {...props}>
      {title && <h2 className="ui-overlay__title">{title}</h2>}
      {children}
    </Overlay>
  );
}

/** Edge drawer (cart, filters, menus). */
export function Drawer({ title, side = "right", children, ...props }) {
  return (
    <Overlay position={`drawer-${side}`} label={title} {...props}>
      {title && <h2 className="ui-overlay__title">{title}</h2>}
      {children}
    </Overlay>
  );
}

export default Overlay;
