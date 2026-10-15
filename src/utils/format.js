import { coupons, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING, EXPRESS_SHIPPING, COD_FEE } from "../data/storeData.js";

export const money = (amount) => {
  if (typeof amount !== "number" || Number.isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
};

export const lineKey = (item) => `${item.product.id}-${item.size}`;

export const calcTotals = (cart, coupon, delivery = "standard", payment = "upi") => {
  const hasUnpricedItems = cart.some((item) => getUnitPrice(item.product, item.size) === null);
  if (hasUnpricedItems) {
    return { subtotal: null, discount: 0, shipping: null, codFee: 0, total: null, hasUnpricedItems: true };
  }
  const subtotal = cart.reduce((sum, item) => sum + getUnitPrice(item.product, item.size) * item.qty, 0);

  let discount = 0;
  if (coupon && coupons[coupon]) {
    const c = coupons[coupon];
    if (c.type === "percent") discount = Math.round(subtotal * (c.value / 100));
    else if (c.type === "flat" && subtotal >= (c.minOrder || 0)) discount = c.value;
  }

  const afterDiscount = subtotal - discount;
  const shipping = delivery === "express" ? EXPRESS_SHIPPING : STANDARD_SHIPPING;
  const isFreeShippingCoupon = coupon && coupons[coupon]?.type === "shipping";
  const finalShipping = !cart.length ? 0 : delivery === "express" ? shipping : (afterDiscount >= FREE_SHIPPING_THRESHOLD || isFreeShippingCoupon) ? 0 : shipping;
  const codFee = cart.length && payment === "cod" ? COD_FEE : 0;
  const total = afterDiscount + finalShipping + codFee;

  return { subtotal, discount, shipping: finalShipping, codFee, total, hasUnpricedItems: false };
};

export const estimateDelivery = (pin) => {
  const clean = String(pin || "").replace(/\D/g, "");
  if (!/^[1-9]\d{5}$/.test(String(pin || "").trim())) return null;
  const zone = Number(clean[0]);
  if (zone >= 1 && zone <= 3) return "3–5 business days";
  if (zone >= 4 && zone <= 6) return "4–7 business days";
  if (zone >= 7 && zone <= 9) return "5–9 business days";
  return "5–9 business days";
};

export const priceBuckets = [
  ["Any", () => true],
  ["Under ₹500", (p) => p.price < 500],
  ["₹500 – ₹1,000", (p) => p.price >= 500 && p.price < 1000],
  ["₹1,000 – ₹2,000", (p) => p.price >= 1000 && p.price < 2000],
  ["₹2,000 – ₹5,000", (p) => p.price >= 2000 && p.price < 5000],
  ["Above ₹5,000", (p) => p.price >= 5000],
];

export const getSizeClass = (product) => product.sizeClass;
export const getUnitPrice = (product, size) => {
  if (product.sizes && !product.sizes.includes(size)) return null;
  const price = product.sizePrices?.[size];
  if (product.sizePrices) return Number.isFinite(price) && price > 0 ? price : null;
  // Legacy single-price items only; never reuse a base price for another size.
  if (product.sizes?.length > 1 && size !== product.sizes[0]) return null;
  return Number.isFinite(product.price) && product.price > 0 ? product.price : null;
};
