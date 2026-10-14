# ProductCard — usage

The production product card used by **Shop, Collections, Wishlist and Home**.
It replaced the temporary `ProductCardStub` (deleted).

```
src/components/product/
├── ProductCard.jsx           the card
├── ProductImageSlider.jsx    image area: swipe, arrows, dots, counter
├── SaleBanner.jsx            discount + live HH:MM:SS countdown
├── ProductCardSkeleton.jsx   loading placeholder (same dimensions)
├── ProductGrid.jsx           responsive 4 / 3 / 2 column wrapper
└── README.md                 this file
```

Styles live in section 27 of [`src/styles/globals.css`](../../styles/globals.css), the only
stylesheet imported by `src/main.jsx`. Only design tokens are used — no hardcoded hex
except the sage-green eco pill (`#EAF1E6` / `#3E6B3F`), which is the one allowed
non-palette colour because it signals "eco".

## Quick start

```jsx
import ProductGrid from "../components/product/ProductGrid.jsx";
import { useCart } from "../context/CartContext.jsx";
import { MOCK_PRODUCTS } from "../data/mockProducts.js";

const { addItem } = useCart();

<ProductGrid
  products={MOCK_PRODUCTS}
  loading={false}
  onAddToCart={(id, product) => addItem(product)}
  onToggleWishlist={(id) => wishlistApi.toggle(id)}
/>
```

A single card, anywhere:

```jsx
import ProductCard from "../components/product/ProductCard.jsx";

<ProductCard
  id="wh-001"
  slug="bhujodi-terracotta-rug"
  name="Bhujodi Terracotta Handloom Rug"
  images={["https://…/1.jpg", "https://…/2.jpg", "https://…/3.jpg"]}
  price={12499}
  compareAtPrice={17849}
  saleEndsAt="2026-11-02T18:00:00.000Z"
  badge={{ label: "Bestseller" }}
  ecoLabel="Handloom"
  meta="5x8 ft · Wool"
  inStock
  isWishlisted={false}
  onAddToCart={(id, product) => addItem(product)}
  onToggleWishlist={(id) => toggle(id)}
/>
```

Loading state:

```jsx
<ProductGrid loading skeletonCount={8} />
```

## Props

| Prop | Type | Notes |
|---|---|---|
| `id` | `string` | required — passed to both callbacks |
| `slug` | `string` | required — card links to `/product/:slug` |
| `name` | `string` | Playfair, clamped to 2 lines |
| `images` | `string[]` | first is eager, the rest lazy; swipe/arrows/dots when > 1 |
| `price` | `number` | rupees; formatted `Intl.NumberFormat('en-IN')` → `₹12,499` |
| `compareAtPrice` | `number?` | struck-through line, and the discount % on the banner |
| `saleEndsAt` | `string?` | **real** ISO sale end date. Omit and the sale strip is hidden |
| `badge` | `{ label, icon? }?` | corner badge (Light Coral) |
| `ecoLabel` | `string?` | certification pill, e.g. `GOTS Certified`, `Handloom`, `OEKO-TEX` |
| `meta` | `string?` | small muted line, e.g. `5x8 ft · Wool` |
| `inStock` | `boolean` | `false` → dimmed image, "Sold out" badge, disabled button |
| `isWishlisted` | `boolean` | initial heart state (optimistic after that) |
| `onAddToCart` | `(id, product) => void \| Promise` | button shows spinner → "Added" check |
| `onToggleWishlist` | `(id) => void \| Promise` | rejects → the heart reverts |
| `tilt` | `boolean` | subtle 3D tilt + glare (default `true`, off on touch) |

## Behaviour notes for the other devs

- **No fake sales.** `SaleBanner` renders nothing without a future `saleEndsAt`.
  Mock deadlines in `src/data/mockProducts.js` are generated relative to "now" so
  the demo ticks — replace them with API values.
- **Countdown format** is `HH : MM : SS` in three dark boxes, days folded into
  hours (a 3-day sale shows `72`). Digits are `aria-hidden`; a visually-hidden
  `aria-live="polite"` line announces the remaining time at most once a minute.
- **Whole-card click** uses a stretched link (`aria-hidden`, `tabIndex={-1}`); the
  accessible target is the product-name link, and the heart/button sit above the
  hit area so they never navigate.
- **Cart signal.** After a successful add the card dispatches
  `window` event `wovenhaat:cart-add` with `{ id, slug }` — the navbar cart icon
  wiggles on it. Dev 3 can ignore it and use `CartContext` instead.
- **No layout shift:** media `aspect-ratio: 4/5`, the product name always reserves
  two lines, and the sale strip has a reserved height on the skeleton.
- **Motion:** tilt/glare, image zoom 1.05, second-image cross-fade, heart pop +
  particle burst, magnetic add-to-cart, digit fade. Only `transform`/`opacity`,
  all disabled under `prefers-reduced-motion`, cursor effects off on touch.
- **Touch targets** are ≥44px (heart, arrows, dots), and under 400px the add
  button collapses to icon-only so the price row never wraps.

## States shown on `/design-system`

Default · hover · focus-visible · sale + countdown · no sale · out of stock ·
wishlisted · adding (spinner) · added (check) · skeleton grid.
