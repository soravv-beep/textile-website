/**
 * WovenHaat — central route map.
 *
 * Single source of truth for every path on the site. Nav links, footer links,
 * cards and CTAs must import from here instead of hardcoding strings, so that
 * renaming a URL is a one-line change and no link silently 404s.
 *
 * Usage:
 *   import { ROUTES, productPath } from "../constants/routes.js";
 *   <Link to={ROUTES.shop}>Shop</Link>
 *   <Link to={productPath("bhujodi-terracotta-rug")}>…</Link>
 *
 * Pages that another developer owns are NOT built by Dev 1; they are wired to
 * <ComingSoon /> in src/App.jsx so navigation never 404s while those PRs land.
 */

export const ROUTES = {
  home: "/",
  shop: "/shop",
  collections: "/collections",
  product: "/product/:slug",
  cart: "/cart",
  checkout: "/checkout",
  login: "/login",
  account: "/account",
  wishlist: "/wishlist",
  orders: "/orders",
  bulkOrders: "/bulk-orders",
  faq: "/faq",
  shippingReturns: "/shipping-returns",
  sustainability: "/sustainability",
  lookbook: "/lookbook",
  journal: "/journal",
  journalPost: "/journal/:slug",
  about: "/about",
  contact: "/contact",
  /** hidden live style guide — linked from docs/DESIGN_SYSTEM.md only */
  designSystem: "/design-system"
};

/** Build the real path for a single product. */
export const productPath = (slug) => `/product/${slug}`;

/** Build the real path for a journal article. */
export const journalPath = (slug) => `/journal/${slug}`;

/** Build the real path for a collection anchor (used by the home tiles). */
export const collectionPath = (slug) => `/collections#${slug}`;

/** Main navigation — order matters (desktop + mobile drawer use the same list). */
export const NAV_LINKS = [
  { to: ROUTES.home, label: "Home" },
  { to: ROUTES.shop, label: "Shop" },
  { to: ROUTES.collections, label: "Collections" },
  { to: ROUTES.bulkOrders, label: "Bulk Orders" },
  { to: ROUTES.lookbook, label: "Lookbook" },
  { to: ROUTES.journal, label: "Journal" },
  { to: ROUTES.about, label: "About" },
  { to: ROUTES.contact, label: "Contact" }
];

/** Footer column: Shop */
export const FOOTER_SHOP = [
  { to: ROUTES.shop, label: "All Products" },
  { to: ROUTES.collections, label: "Collections" },
  { to: ROUTES.wishlist, label: "Wishlist" },
  { to: ROUTES.cart, label: "Cart" },
  { to: ROUTES.orders, label: "Track Order" }
];

/** Footer column: Company */
export const FOOTER_COMPANY = [
  { to: ROUTES.about, label: "About Us" },
  { to: ROUTES.journal, label: "Journal" },
  { to: ROUTES.sustainability, label: "Sustainability" },
  { to: ROUTES.lookbook, label: "Lookbook" }
];

/** Footer column: Support */
export const FOOTER_SUPPORT = [
  { to: ROUTES.faq, label: "FAQ" },
  { to: ROUTES.shippingReturns, label: "Shipping & Returns" },
  { to: ROUTES.contact, label: "Contact" },
  { to: ROUTES.bulkOrders, label: "Bulk Orders" }
];

/** Social profiles (single place to update handles across hero + footer + contact). */
export const SOCIALS = [
  { key: "instagram", label: "Instagram", handle: "(67K)", href: "https://instagram.com" },
  { key: "pinterest", label: "Pinterest", handle: "(12K)", href: "https://pinterest.com" },
  { key: "youtube", label: "YouTube", handle: "(5K)", href: "https://youtube.com" }
];

/** Contact details used by the Contact page + Footer + WhatsApp float. */
export const CONTACT = {
  email: "hello@wovenhaat.example",
  phoneDisplay: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp:
    "https://wa.me/919876543210?text=Hi%20WovenHaat%2C%20I%20have%20a%20question",
  addressLines: ["Plot 14, Sector 29 Industrial Area,", "Panipat, Haryana 132103"]
};
