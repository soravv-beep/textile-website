/**
 * Form primitives — <Input />, <Select />, <Textarea />.
 *
 * All three share the same look: tinted white field, 12px radius, Tan focus
 * ring, red border + helper text on error, and the same a11y wiring
 * (label → id, aria-invalid, aria-describedby).
 *
 * @param {object} props
 * @param {string} props.id required — links label/error to the control
 * @param {string} props.label visible label text
 * @param {string} [props.error] error message; also sets aria-invalid
 * @param {string} [props.hint] quiet helper line under the field
 * @param {boolean} [props.optional=false] append "(optional)" to the label
 *
 * Example:
 *   <Input id="c-name" label="Full name" required value={name} onChange={set("name")} error={errors.name} />
 */
import { classNames, fieldIds, FieldShell } from "./fieldParts.jsx";

function useShared({ id, label, error, hint, optional, className }) {
  const { fieldId, errorId, hintId } = fieldIds(id);
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ");
  return {
    fieldId,
    errorId,
    hintId,
    describedBy,
    controlProps: {
      id: fieldId,
      className: classNames("field__control", error && "is-invalid", className),
      "aria-invalid": error ? "true" : undefined,
      "aria-describedby": describedBy || undefined
    },
    shellProps: { id: fieldId, label, error, hint, optional, errorId, hintId }
  };
}

export function Input({ type = "text", ...props }) {
  const { controlProps, shellProps } = useShared(props);
  return (
    <FieldShell {...shellProps}>
      <input type={type} {...controlProps} {...strip(props)} />
    </FieldShell>
  );
}

export function Textarea({ rows = 5, ...props }) {
  const { controlProps, shellProps } = useShared(props);
  return (
    <FieldShell {...shellProps}>
      <textarea rows={rows} {...controlProps} {...strip(props)} />
    </FieldShell>
  );
}

export function Select({ placeholder, options = [], children, ...props }) {
  const { controlProps, shellProps } = useShared(props);
  return (
    <FieldShell {...shellProps}>
      <select {...controlProps} {...strip(props)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const value = typeof opt === "string" ? opt : opt.value;
          const text = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
        {children}
      </select>
    </FieldShell>
  );
}

/** Remove the presentational props before spreading onto the native control. */
function strip({ id, label, error, hint, optional, className, children, ...rest }) {
  return rest;
}

export default Input;
