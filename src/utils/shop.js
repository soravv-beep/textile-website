/**
 * Shop helpers — price buckets, size classes, per-size pricing and the PIN
 * delivery estimate. Currency formatting lives in utils/format.js (formatINR).
 */

/** Price filter buckets: [label, predicate]. */
export const priceBuckets = [
  ["Any", () => true],
  ["Under ₹500", (p) => p.price < 500],
  ["₹500 – ₹1,000", (p) => p.price >= 500 && p.price < 1000],
  ["₹1,000 – ₹2,000", (p) => p.price >= 1000 && p.price < 2000],
  ["₹2,000 – ₹5,000", (p) => p.price >= 2000 && p.price < 5000],
  ["Above ₹5,000", (p) => p.price >= 5000]
];

export const getSizeClass = (product) => product.sizeClass;

/** Price for one size, or null when that size has no real price. */
export const getUnitPrice = (product, size) => {
  if (product.sizes && !product.sizes.includes(size)) return null;
  const price = product.sizePrices?.[size];
  if (product.sizePrices) return Number.isFinite(price) && price > 0 ? price : null;
  // Legacy single-price items only; never reuse a base price for another size.
  if (product.sizes?.length > 1 && size !== product.sizes[0]) return null;
  return Number.isFinite(product.price) && product.price > 0 ? product.price : null;
};

/** Delivery estimate for a 6-digit Indian PIN, or null when the PIN is invalid. */
export const estimateDelivery = (pin) => {
  const clean = String(pin || "").replace(/\D/g, "");
  if (!/^[1-9]\d{5}$/.test(String(pin || "").trim())) return null;
  const zone = Number(clean[0]);
  if (zone >= 1 && zone <= 3) return "3–5 business days";
  if (zone >= 4 && zone <= 6) return "4–7 business days";
  return "5–9 business days";
};

/**
 * Map a catalogue product to the props of the shared <ProductCard />.
 * The card keeps Sourav's design; Aman's extras (rating, % off, compare) are
 * switched on through the optional props.
 */
export const toCardProps = (product, { wished = false, compared = false } = {}) => ({
  id: product.id,
  slug: product.slug,
  name: product.name,
  images: [...new Set([product.image, product.altImage].filter(Boolean))],
  price: product.price,
  compareAtPrice: product.oldPrice,
  badge: product.badge ? { label: product.badge } : undefined,
  meta: `${product.material} · ${product.category}`,
  rating: product.rating,
  reviewCount: product.reviews,
  showDiscount: true,
  inStock: true,
  isWishlisted: wished,
  compared
});
