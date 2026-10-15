# WovenHaat — Design System (Dev 1)

> The site is **Vite + React + React Router** (the Next.js app and the old static `assets/` pages are gone). Everything below is shared by all five developers. Live playground: **`/design-system`** (not linked in the nav on purpose).

---

## 1. How to import

```jsx
// components + hooks
import { Button, Tag, SectionHeading, Card, Input } from "../components/ui/index.js";
import { Reveal, Marquee } from "../animations/index.js";
import { useTilt, useSpotlight } from "../hooks/index.js";
import { ROUTES, NAV_LINKS, productPath, collectionPath } from "../constants/routes.js";
import { useCart } from "../context/CartContext.jsx";
import { formatINR } from "../utils/format.js";
```

**Never** hardcode a route string, a colour, or a price format. Routes come from `src/constants/routes.js`, colours from the tokens below, prices from `formatINR()` (Indian digit grouping: `₹4,890`, `₹1,29,000`).

Every page renders inside `<Layout />` (navbar + `<Outlet />` + footer). Add the route in `src/App.jsx` under the existing `<Route element={<Layout />}>` — do not add a second router.

### Folder layout

```
src/
├── animations/    Reveal, Marquee, DragScroll, CustomCursor, SuccessCheck
├── components/
│   ├── layout/    Layout, Navbar, Footer
│   ├── sections/  EditorialHero, Newsletter
│   ├── contact/   EnquiryForm
│   ├── product/   ProductCard, ProductGrid, ProductImageSlider, SaleBanner, skeletons
│   ├── ui/        Button, Card, Tag, Field, Overlay, Rating, SectionHeading… (design-system kit)
│   └── PageMeta.jsx
├── constants/     routes.js — every path, nav + footer link list
├── context/       CartContext.jsx
├── data/          mock products, categories, journal, testimonials
├── hooks/         useTilt, useMagnetic, useSpotlight, useParallax, useNavUnderline, useReducedMotion, useCountdown
├── pages/         Home, About, Contact, DesignSystem, ComingSoon, NotFound
├── styles/        globals.css — the only stylesheet, numbered sections
└── utils/         format.js (formatINR), images.js (unsplash)
```

Shared page furniture goes in `components/layout`, a block used by one page goes in `sections`, and anything with its own CSS classes and README stays in `components/product`.

## 2. Colour tokens

Defined once in `src/styles/globals.css` `:root`.

| Token | Hex | Where |
|---|---|---|
| `--color-text` | `#3F3A38` | Beaver Gray — body, headings, dark bands |
| `--color-primary` | `#C8421F` | Burnt Orange — primary CTAs, active underline |
| `--color-primary-hover` | `#A93617` | Derived hover |
| `--color-accent` | `#C08F4A` | Tan — labels, stars, dividers, icons |
| `--color-tag` | `#EE8F80` | Light Coral — tags/badges (dark text only) |
| `--color-bg` | `#F0EBE3` | Mocha — page background |
| `--color-surface` | `#FFFFFF` | Cards, form cards |
| `--color-border` | `#E2D9CC` | Soft beige hairline |
| `--color-link` | `#5C9FAE` | Turquoise — links, large/bold text only |
| `--color-link-hover` | `#47808E` | Darker turquoise — body-size links (AA on Mocha) |
| `--color-muted` | `#6E6560` | Secondary text |
| `--color-chrome` | `#3F3A38` | **Navbar + Footer — both use this one token** |
| `--color-success` | `#4C7A5A` | Success states |
| `--color-error` | `#B23A1E` | Form errors |

### Accessibility — changes made and why

Contrast was checked for every text/background pair the system ships. Two adjustments were needed; both are documented here so nobody "fixes" them back:

1. **Body-size links use a darker turquoise.** Turquoise `#5C9FAE` on Mocha `#F0EBE3` is ≈2.6:1 — it fails AA for body text. `--color-link-hover` `#47808E` (≈3.7:1, AA for large text) is used for in-copy links, and **all** links are underlined on hover (`.btn-link` and the global `a:hover` rule) so colour is never the only signal. `--color-link` stays available for large/bold text and secondary buttons (white on turquoise ≈3.1:1, acceptable for 18px+ bold).
2. **Light Coral tags always use dark text.** `#3F3A38` on `#EE8F80` is 4.7:1 (AA). White on Coral would be 2.2:1 — never do that.

Other checked pairs: Beaver Gray on Mocha 9.4:1; white on Burnt Orange 4.9:1; Mocha on Chrome 9.4:1; Tan labels are only ever used at 12–13px **bold uppercase** on Mocha or Chrome.

## 3. Typography

Two families only — Playfair Display (headings, italic for accents/quotes, 18px+) and Inter (body, nav, buttons, labels, prices). No third family; vary weight only.

| Role | Size | Notes |
|---|---|---|
| Hero H1 | `clamp(40px, 12vw, 172px)` | home hero only, letter-spacing -1.5% |
| H2 | `clamp(1.6rem, 3.5vw, 2.4rem)` | section titles |
| H3 | `clamp(1.2rem, 2.5vw, 1.5rem)` | card titles |
| Body | 16–18px / 1.6 | `--fs-body`, `--lh-body` |
| Caps label | 12–13px / 0.1–0.15em | `.eyebrow` |

Fonts load from Google Fonts in `index.html` with `display=swap` (preconnect included).

## 4. Layout tokens

- Container `.container`: max-width `--maxw` (1200px), 16px mobile gutter (`--sp-4`), 32px from 768px (`--sp-6`).
- Section padding `.section`: 64px mobile, 96px from 1024px. `.section--tight` = 40/56px. `.section--alt` = white background.
- Radii: `--radius-sm` 8 (inputs) · `--radius` 12 (cards) · `--radius-md` 16 (tiles) · `--radius-lg` 24 (feature/form cards) · `--radius-pill`.
- Shadows: `--shadow` resting, `--shadow-lg` hover/floating.
- Breakpoints, mobile-first: **640 / 768 / 1024 / 1280**.
- Fixed header height: `--nav-offset` (104px = announce + nav). `.app-main` gets that padding-top; `.app-shell.has-hero` removes it so the hero sits under the transparent navbar.

## 5. Components (`src/components/ui`)

| Component | Variants / props | Notes |
|---|---|---|
| `<Button />` | `primary` `secondary` `outline` `outline-light` `ghost` `link`; `size sm/md/lg`; `loading`; `disabled`; `block`; `arrow`; `ripple`; `as={Link}` | Ripple animates from the click point; arrows slide on hover |
| `<Tag />` | `tone coral/tan/orange/outline/eco` | Coral + eco use dark text |
| `<SectionHeading />` | `label`, `title`, `subtitle`, `align`, `as` | Pass `id` and use it in the section's `aria-labelledby` |
| `<Card />` | `radius 12/16/24`, `padded`, `tilt`, `spotlight` | `tilt` caps at 8° and is off on touch |
| `<Input /> <Select /> <Textarea />` | `id`, `label`, `error`, `hint`, `optional` | Tan focus ring, red border + `role="alert"` message |
| `<Rating />` | `value`, `count`, `size`, `showValue` | Tan stars, `aria-label`ed |
| `<IconButton />` | `label` (required), `tone light/dark/ghost`, `magnetic` | 44×44 minimum tap target |
| `<Overlay /> <Modal /> <Drawer />` | `open`, `onClose`, `label`, `position` | Focus trap, Esc, scroll lock, focus restore |

## 6. Routes

All paths live in `src/constants/routes.js`: `/`, `/shop`, `/collections`, `/product/:slug`, `/cart`, `/checkout`, `/login`, `/account`, `/wishlist`, `/orders`, `/bulk-orders`, `/faq`, `/shipping-returns`, `/sustainability`, `/lookbook`, `/journal`, `/journal/:slug`, `/about`, `/contact` (+ hidden `/design-system`).

Unbuilt pages render `<ComingSoon />` naming the owning dev, so **no link 404s**. When your page ships, swap that element in `src/App.jsx`.

## 7. Animations (`src/animations`) and hooks (`src/hooks`)

`<Reveal />`, `<Marquee />`, `<DragScroll />`, `<CustomCursor />` and `<SuccessCheck />` are components in `src/animations`; every `use*` below is a hook in `src/hooks`.

| Piece | What it does |
|---|---|
| `<Reveal />` | Staggered fade-up on scroll (`delay`, `stagger`, `from`, `distance`) |
| `<Marquee />` | Seamless loop, pauses on hover |
| `<DragScroll />` | Drag-to-scroll gallery with inertia |
| `<CustomCursor />` | Dot + trailing ring, labels via `data-cursor="View"` |
| `<SuccessCheck />` | Drawn-in checkmark for form success |
| `useTilt` | 3D tilt + moving glare (max 8°) |
| `useMagnetic` | Magnetic buttons/icons |
| `useSpotlight` | Cursor-following soft glow on `.has-spotlight` |
| `useParallax` | Mouse parallax; add `data-depth="24"` to layers |
| `useNavUnderline` | Nav underline slides from the cursor's entry side |
| `useReducedMotion` / `useFinePointer` / `useMotionEnabled` | Capability checks |

**Rules:** animate `transform`/`opacity` only; rAF (`requestAnimationFrame`) for pointer effects; `prefers-reduced-motion: reduce` disables everything (see the block at the end of `globals.css`); cursor/tilt/magnetic/parallax are disabled on touch devices; never animate into layout (no width/top/left), so there is no layout shift.

One animation library is used: **framer-motion**, and only by `<Reveal />` (scroll reveal + stagger). Everything pointer-driven is hand-written rAF so the bundle stays small.

## 8. Do / Don't

**Do**
- Import tokens via CSS variables and components from `src/components/ui/index.js`.
- Put new shared CSS in `src/styles/globals.css` under a new numbered section, never in a page-level `<style>` block.
- Use `<SectionHeading>` + a `aria-labelledby` id on each section.
- Mark images `loading="lazy"` (except the hero) with `width`/`height` or an `aspect-ratio` so nothing shifts.

**Don't**
- ❌ Hardcode `#C8421F` or any hex — use `var(--color-primary)`.
- ❌ Use `#3F3A38` directly for the navbar or footer — use `var(--color-chrome)` so they can never drift.
- ❌ Add a third font family or a second animation library.
- ❌ Use white text on Light Coral, or Turquoise for body-size text.
- ❌ Link with raw `<a href="/shop">` — use `<Link to={ROUTES.shop}>`.
- ❌ Build one of Dev 1's pages again: home, about, contact, navbar, footer, design system.

## 9. Environment variables

| Variable | Used by | Notes |
|---|---|---|
| `VITE_FORM_ENDPOINT` | `src/components/contact/EnquiryForm.jsx` | POST target for contact enquiries. **Unset = demo mode** (form validates and shows success without sending). |
| `VITE_NEWSLETTER_ENDPOINT` | `src/components/sections/Newsletter.jsx` | Optional subscribe endpoint; unset = demo mode. |

Copy `.env.example` to `.env.local` and fill in. `VITE_*` values are inlined into the bundle — never put a secret there.

## 10. Known follow-ups

- `<ProductCard />` (`src/components/product/`) renders `src/data/mockProducts.js`, and `src/data/*.js` is **mock data** for Dev 2 to replace; testimonials are dummy reviews pending real ones.
- Artisan photos in `About` are placeholders pending consent-cleared photography.
- `CartContext` is a session-only stub for Dev 3 to replace (keep the hook name and shape).
- Home bestseller `stock` is fixed at 10 (feeds the "1/10" counter) — replace with real availability.
