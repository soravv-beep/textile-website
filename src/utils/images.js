/**
 * Image helpers.
 * Images are illustrative Unsplash URLs (same approach as the previous build),
 * always requested at the size we actually render so nothing downloads a
 * 4000px photo into a 500px slot.
 */
export const unsplash = (id, w, q = 70) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;
