# WovenHaat — Common Design System (Dev 1 se share)

> Sab pages **isi system** pe banenge. Nayi generic styles [assets/css/wovenhaat.css](assets/css/wovenhaat.css) mein add karein, page ke andar inline `<style>` na lagayein. Page-specific CSS usi CSS file ke end mein section number ke saath likhein.

## Include (har page pe — exact same)

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="assets/css/wovenhaat.css" />
...
<script src="assets/js/main.js" defer></script>
```

Navbar, footer aur announce bar ka markup [index.html](index.html) se copy karein (<!-- HEADER (Dev 1 common) --> aur <!-- FOOTER (Dev 1 common) --> comments ke beech), sirf `aria-current="page"` us page pe move karein.

## Colour tokens (kabhi hardcoded hex mat likho)

| Token | Hex | Kahan |
|---|---|---|
| `--clr-text` | #3F3A38 | body, headings (pure black kabhi nahi) |
| `--clr-primary` | #C8421F | primary buttons, active states |
| `--clr-primary-dark` | #A93617 | primary hover |
| `--clr-accent` | #C08F4A | eyebrows, badges, icons, dividers, stars |
| `--clr-tag` | #EE8F80 | New/Sale tags, dark-bg accents |
| `--clr-bg` | #F0EBE3 | page background |
| `--clr-bg-alt` | #FFFFFF | cards, forms, `.section--alt` |
| `--clr-link` | #5C9FAE | links, focus rings, secondary buttons |
| `--clr-muted` | #6E6560 | secondary text |

## Typography

- Headings: `Playfair Display` (auto `h1–h4` pe lagta hai), sizes `clamp()` se responsive
- Body: `Inter` 16px min, line-height 1.6
- Labels/eyebrow: `.eyebrow` class — uppercase, 0.14em spacing, tan

## Layout & components (sab CSS file mein ready hain)

| Class | Use |
|---|---|
| `.container` | max-width 1200px, responsive padding |
| `.section` / `.section--alt` | page sections (alt = white bg) |
| `.texture` | subtle tan weave pattern background |
| `.btn .btn-primary/.btn-outline/.btn-outline-light/.btn-secondary` | buttons (`.btn-sm`, `.btn-block`) |
| `.badge--new/--best/--sale/--outline` | product/policy badges |
| `.card` + `.card__body` | white card |
| `.grid .grid--2/3/4` | responsive grids (1→2→3/4) |
| `.form-group`, `.form-row`, `label/input/textarea` | forms |
| `.section-head` / `.section-head--center` | eyebrow + h2 + subtext |
| `.page-hero` | dark inner-page hero |
| `.breadcrumb` | `<ol class="breadcrumb">` |
| `.accordion` (`<details>`) | FAQ-style expanders |
| `.newsletter` + `form[data-newsletter]` | newsletter block |
| `.trust-strip` / `.trust-item` | icon + title + sub strip |
| `.split` / `.split__media` / `.split__text` | image + text (`.split--reverse` supported) |
| `.preview-card` | image card with gradient overlay |
| `.product-card` (+ `__media`, `__title`, `__meta`, `__price`, `.swap`) | product card — Dev 2 extend karega |
| `.timeline`, `.process-step` | About-style lists |
| `.contact-grid`, `.contact-list`, `.hours`, `.map-frame` | Contact-style layout |
| `.cta-band` | dark CTA band |
| `.wa-float` | floating WhatsApp button |
| `.stars` | rating (text stars, tan colour) |
| `.visually-hidden`, `.skip-link` | a11y helpers |

## JS hooks ([assets/js/main.js](assets/js/main.js))

- `data-nav-toggle` + `data-nav-drawer` — mobile menu (navbar markup mein already hai)
- `form[data-demo-form]` — client validation + success message (`data-success` se custom text)
- `form[data-newsletter]` — newsletter validation (`data-nl-msg` element mein result)
- `data-count="62" data-count-suffix="%"` — animated counter (reduced-motion respect)

## Rules (team agreement)

1. **Mobile-first** — pehle 1 column, phir `@media (min-width: …)`. 360px pe koi horizontal scroll nahi.
2. Sirf palette colours; contrast AA (spec §3.3) — burnt orange sirf large text/badges pe, turquoise links pe.
3. Sab `<img>` pe `width`, `height` ya CSS `aspect-ratio` + `loading="lazy"` (hero chhodo) → CLS 0.
4. Har page: unique `<title>` + meta description + OG tags + JSON-LD where relevant.
5. Forms: `<label>` for every input, `required` validation, error messages `.form-error`.
6. Inline SVG icons use karein (no icon-font dependency).
7. `prefers-reduced-motion` honoured — animations CSS transitions se hi.

## Pages ka status

| Page | File | Dev |
|---|---|---|
| Home | [index.html](index.html) | Dev 1 ✅ |
| About | [about.html](about.html) | Dev 1 ✅ |
| Contact | [contact.html](contact.html) | Dev 1 ✅ |
| Shop / Collections / Product | shop.html, collections.html, product.html | Dev 2 |
| Cart / Checkout / Account / Wishlist / Track | cart.html, checkout.html, account.html, wishlist.html, track.html | Dev 3 |
| Bulk Orders / FAQ | bulk-orders.html, faq.html | Dev 4 |
| Sustainability / Lookbook / Journal | sustainability.html, lookbook.html, journal.html | Dev 5 |

Navbar/footer links in pages ko reference karte hain — jo pages abhi nahi bane unke liye link file name pehle se set hai, bas wo files Dev 2–4 banayenge.
