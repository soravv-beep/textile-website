/**
 * Format helpers shared by product cards, cart and prices.
 * Prices are always shown in rupees with Indian digit grouping
 * (₹4,890 / ₹1,29,000) — never abbreviated.
 */
const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

/** 4890 → "₹4,890" */
export const formatINR = (value) => INR.format(Number(value) || 0);

/** 128 → "128 reviews" / "1 review" */
export const pluralize = (count, singular, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;
