/**
 * Internal helpers for the form primitives in Field.jsx.
 * Not part of the public design-system API — import from "./Field.jsx" instead.
 */

export const classNames = (...parts) => parts.filter(Boolean).join(" ");

export const fieldIds = (id) => ({
  fieldId: id,
  errorId: `${id}-error`,
  hintId: `${id}-hint`
});

export function FieldShell({ id, label, error, hint, optional, errorId, hintId, children }) {
  return (
    <div className={classNames("field", error && "field--error")}>
      <label htmlFor={id} className="field__label">
        {label}
        {optional && <span className="field__optional"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p className="field__error" id={errorId} role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      )}
    </div>
  );
}
