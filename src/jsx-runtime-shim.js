/**
 * Smallest pure-JSX shim so config files inside `src/` are lintable
 * without the Vite JSX transform. Real app code never imports this file.
 */

/** @jsxRuntime classic */

export function jsx(type, props, ...children) {
  return { type, props: props || {}, children };
}

export function createElement(type, props, ...children) {
  return jsx(type, props, ...children);
}

export function Fragment(props) {
  return props.children;
}

export function h(type, props, ...children) {
  return jsx(type, props || {}, ...children);
}
