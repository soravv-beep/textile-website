/**
 * MOCK DATA — 8 products for the <ProductCard /> demo grid and the home page.
 *
 * ⚠️ Demo values. `saleEndsAt` is generated relative to "now" so the countdown
 * actually runs in the demo — in production the deadline must come from the API
 * and must be the REAL sale end (never a rolling/evergreen timer). Products with
 * no `saleEndsAt` simply hide the sale strip.
 *
 * Shape matches the <ProductCard /> props exactly:
 *   { id, slug, name, images[], price, compareAtPrice?, saleEndsAt?, badge?, ecoLabel?, meta, inStock, isWishlisted? }
 */
import { unsplash } from "../utils/images.js";

/** Hours from now, as an ISO string (demo deadlines only). */
const inHours = (hours) => new Date(Date.now() + hours * 3600 * 1000).toISOString();

export const MOCK_PRODUCTS = [
  {
    id: "wh-001",
    slug: "bhujodi-terracotta-rug",
    name: "Bhujodi Terracotta Handloom Rug",
    images: [
      unsplash("photo-1600166898405-da9535204843", 800),
      unsplash("photo-1600607686527-6fb886090705", 800),
      unsplash("photo-1616486338812-3dadae4b4ace", 800)
    ],
    price: 12499,
    compareAtPrice: 17849,
    saleEndsAt: inHours(54),
    badge: { label: "Bestseller" },
    ecoLabel: "Handloom",
    meta: "5x8 ft · Wool",
    inStock: true,
    isWishlisted: true
  },
  {
    id: "wh-002",
    slug: "coral-loom-cushion-set",
    name: "Coral Loom Cushion Cover Set",
    images: [
      unsplash("photo-1584100936595-c0654b55a2e2", 800),
      unsplash("photo-1616627561839-074385245ff6", 800)
    ],
    price: 2490,
    compareAtPrice: 3190,
    saleEndsAt: inHours(6),
    ecoLabel: "GOTS Certified",
    meta: "16x16 in · Organic cotton",
    inStock: true
  },
  {
    id: "wh-003",
    slug: "mocha-handloom-throw",
    name: "Mocha Handloom Throw",
    images: [
      unsplash("photo-1616627561839-074385245ff6", 800),
      unsplash("photo-1591195853828-11db59a44f6b", 800)
    ],
    price: 3450,
    ecoLabel: "GRS Recycled Yarn",
    meta: "130x170 cm · Wool blend",
    inStock: true
  },
  {
    id: "wh-004",
    slug: "turquoise-ribbed-bath-mat",
    name: "Turquoise Ribbed Bath Mat",
    images: [unsplash("photo-1620626011761-996317b8d101", 800)],
    price: 1190,
    compareAtPrice: 1590,
    saleEndsAt: inHours(72),
    badge: { label: "Sale" },
    ecoLabel: "OEKO-TEX",
    meta: "50x80 cm · Cotton",
    inStock: true
  },
  {
    id: "wh-005",
    slug: "kannur-midnight-rug",
    name: "Kannur Midnight Hand-Knotted Rug",
    images: [
      unsplash("photo-1600607686527-6fb886090705", 800),
      unsplash("photo-1600166898405-da9535204843", 800),
      unsplash("photo-1528459801416-a9e53bbf4e17", 800)
    ],
    price: 28900,
    ecoLabel: "Handknotted",
    meta: "6x9 ft · Wool",
    inStock: true
  },
  {
    id: "wh-006",
    slug: "bhadoi-sage-table-linen",
    name: "Bhadohi Sage Table Linen Set",
    images: [unsplash("photo-1617806118233-18e1de247200", 800)],
    price: 1890,
    ecoLabel: "GOTS Certified",
    meta: "6 place settings · Cotton",
    inStock: true
  },
  {
    id: "wh-007",
    slug: "loom-coral-coverlet",
    name: "Coral Loom Coverlet — Handtufted",
    images: [
      unsplash("photo-1522708323590-d24dbb6b0267", 800),
      unsplash("photo-1584100936595-c0654b55a2e2", 800)
    ],
    price: 6790,
    compareAtPrice: 8490,
    saleEndsAt: inHours(0.35), // expires in ~20 minutes, so the ticking is visible in the demo
    ecoLabel: "Handtufted",
    meta: "200x220 cm · Cotton",
    inStock: true
  },
  {
    id: "wh-008",
    slug: "panipat-ivory-bath-set",
    name: "Panipat Ivory Bath Set",
    images: [unsplash("photo-1620626011761-996317b8d101", 800)],
    price: 2290,
    ecoLabel: "OEKO-TEX",
    meta: "Mat + 2 hand towels · Cotton",
    inStock: false,
    isWishlisted: false
  }
];

/** Convenience: only the pieces that are in stock (used by the home page grid). */
export const MOCK_BESTSELLERS = MOCK_PRODUCTS.filter((p) => p.inStock).slice(0, 4);
