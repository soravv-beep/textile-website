# Dev 6 — Sustainability, Lookbook & Journal: Plan, Data & Components

> Scope: `/sustainability`, `/lookbook`, `/journal`, `/journal/:slug`
> Deliverable: standalone HTML pages (bina build step), baad mein Dev 1 ke Navbar/Footer/theme se swap honge.
> Rules: mobile-first, sirf palette wale colors, common components Dev 1 ke.

---

## 1. File structure (Dev 6 ke files)

```
/sustainability.html          — Sustainability & Certifications
/lookbook.html                — Lookbook / Gallery (masonry + hotspots)
/journal.html                 — Journal blog list (featured + categories + search)
/journal-post.html            — Single post template (sample: burnt-orange-turquoise)
/assets/dev6/dev6.css         — sirf Dev-6-scoped styles (.d6-* namespace, Dev 1 ke theme ko override nahi karega)
/assets/dev6/dev6.js          — filters, masonry, hotspot modal, accordions, search (vanilla JS)
/assets/dev6/data/journal-posts.json
/assets/dev6/data/lookbook.json
/assets/dev6/data/certifications.json
```

Navbar/Footer: Dev 1 se aane tak **same markup placeholder** (spec ke navigation menu ke hisaab se) with `<!-- SWAP: Dev1 Navbar -->` comment taaki diff mein pakka mil jaye.

---

## 2. Component list

### Dev 1 se expected (use karunga, banaunga nahi)
| Component | Notes |
|---|---|
| Navbar | Home \| Shop \| Collections \| Bulk Orders \| Lookbook \| Journal \| About \| Contact + search/wishlist/cart icons |
| Footer | quick links, policies, certifications strip, newsletter, social |
| Buttons | `.btn-primary` (#C8421F), `.btn-outline`, `.btn-secondary` (#5C9FAE) |
| Section header | eyebrow (uppercase tan) + serif heading (Playfair) + subtext |
| Newsletter block | Home page wala — Journal post ke end mein reuse |
| Badge | New (Coral) / Bestseller (Tan) |
| Product card | Dev 2 ka — "related products" aur "shop the look" mein reuse |

### Dev 6 ke apne components
| Component | Page | Description |
|---|---|---|
| `CertCard` | sustainability | logo, naam, 1-line meaning, "Download certificate" link (sirf jo certificate actually hold ho) |
| `ImpactStat` | sustainability | bada number + label (animated count-up, `prefers-reduced-motion` respect) |
| `MaterialCard` | sustainability | organic cotton / recycled fibre / natural dye — icon + copy |
| `SourcingMap` | sustainability | India map SVG ya simple region list with markers |
| `Accordion` (FAQ-style) | sustainability | water/waste practices details |
| `MasonryGrid` | lookbook | CSS columns masonry, filterable by room/style |
| `LookbookCard` | lookbook | photo + hotspot dots; click → drawer with "Shop this look" product links |
| `FilterChips` | lookbook, journal | room/style ya blog category chips — coral active state |
| `ShareRow` | lookbook, journal-post | WhatsApp / X / copy-link |
| `FeaturedPost` | journal | bada hero card: cover, category, title, excerpt, author, date |
| `PostCard` | journal | grid card: thumb, category chip, title, meta |
| `CategoryTabs` + search | journal | filter + client-side text search |
| `AuthorBox` | journal-post | avatar, name, bio |
| `TableOfContents` | journal-post | sticky sidebar desktop, collapsible mobile (h2 anchors) |
| `RelatedProducts` | journal-post | Dev 2 ke product card slot (placeholder card) |
| `NewsletterBox` | journal-post | Dev 1 ka newsletter block reuse |
| `Breadcrumb` | sab | seo + nav |

---

## 3. Content plan (page-wise outline)

### 3.1 Sustainability — `/sustainability`
1. **Hero**: eyebrow `RESPONSIBLE BY DESIGN`, H1 "Made slowly. Made to last.", 2-line intro, Mocha bg + tan weave texture.
2. **Impact stats strip** (4): `100% GOTS-certified cotton` · `62% less water since 2023` · `48 artisan families employed` · `0 landfill waste — dyed yarn scraps recycled`.
3. **Materials**: 3 cards — Organic Cotton, Recycled Fibres (GRS), Natural & low-impact dyes.
4. **Certifications**: grid of `CertCard` — OEKO-TEX STANDARD 100, GOTS, GRS, ISO 9001. Har card: logo, 1-line meaning, PDF download.
5. **Process practices**: 4-step (Fibre → Dyeing → Weaving → Finishing) har step ke saath water/waste note.
6. **Water & waste**: accordion — rainwater harvesting, ETP recycling, scrap-to-yarn, solar-powered loom hall.
7. **Fair work**: short section — fair wages, safe working conditions, women-led units.
8. **Sourcing map**: regions (Bhuj, Panipat, Bhadohi, Kannur) markers + 1-liner each.
9. **CTA**: "See the products behind these numbers" → Shop + View certifications.

### 3.2 Lookbook — `/lookbook`
1. **Hero**: full-width styled room photo, H1 "Rooms woven with intention", subline.
2. **Filter chips**: Room = Living · Bedroom · Bath · Dining · Outdoor; Style = Boho · Minimal · Classic · Festive.
3. **Masonry grid**: 12–16 photos (varied heights). Har card pe hover overlay: title + "Shop the look".
4. **Hotspot view** (modal/drawer): photo pe 2–4 dots; dot click → product mini-card (name, price, `View product` → `/product/:slug`).
5. **Customer photos**: 6-up UGC strip + hashtag `#WovenHaatHome` invite + WhatsApp "Send us your photo".
6. **Share row** + CTA → Shop.

### 3.3 Journal — `/journal`
1. **Hero strip**: `THE JOURNAL` + H1 "Craft stories, care guides & colour".
2. **Category tabs**: All · Artisan Stories · How It's Made · Decor Ideas · Colour Guides · Care Tips.
3. **Featured post**: hero card (sample: *"Decorating with Burnt Orange and Turquoise"* — hamari palette se direct link).
4. **Post grid**: 6–9 `PostCard` + client-side search box (title/tag match).
5. **Newsletter** + link to Lookbook/Sustainability (cross-links).

### 3.4 Post — `/journal/:slug` (sample: `burnt-orange-turquoise`)
1. Breadcrumb → category chip, H1, author + date + read time.
2. Cover image (16:9) + TOC sticky (desktop).
3. Body: 5–6 sections, pull-quote tan border, 2 images, DMC swatch chips (#C8421F, #5C9FAE) inline.
4. **AuthorBox** → **RelatedProducts** (3 cards) → **NewsletterBox** → **ShareRow** → prev/next post.

---

## 4. Data schemas (JSON — sirf client-side, no build step)

### `journal-posts.json`
```json
[
  {
    "slug": "burnt-orange-turquoise",
    "title": "Decorating with Burnt Orange and Turquoise",
    "category": "Colour Guides",
    "excerpt": "How two DMC shades warm up a neutral room without shouting.",
    "author": { "name": "Meera Rathore", "role": "Design Lead", "avatar": "..." },
    "date": "2026-10-05",
    "readMinutes": 6,
    "cover": "assets/dev6/img/journal/burnt-orange-turquoise/cover.jpg",
    "tags": ["colour", "dmc-900", "dmc-597"],
    "featured": true,
    "products": ["handloom-rug-terracotta", "cushion-cover-turquoise"],
    "content": [ { "type": "h2|p|img|quote|swatches", "text": "..." } ]
  }
]
```
*(BAKI posts isi schema se — 8 posts ka content plan nichhe §6.)*

### `lookbook.json`
```json
[
  {
    "id": "lb-01",
    "title": "Sunlit Boho Living Room",
    "room": "Living", "style": "Boho",
    "image": "assets/dev6/img/lookbook/lb-01.jpg",
    "ratio": "3/4",
    "hotspots": [
      { "x": 38, "y": 72, "product": "handloom-rug-terracotta" },
      { "x": 64, "y": 45, "product": "cushion-cover-coral-set" }
    ]
  }
]
```
*(x/y = % coordinates — image pe nahi, overlay layer pe position honge.)*

### `certifications.json`
```json
[
  { "id": "gots", "name": "GOTS", "full": "Global Organic Textile Standard",
    "meaning": "Fabric ki organic origin aur har processing step environmental + social audit ke under.",
    "logo": "assets/dev6/img/certs/gots.svg", "pdf": "assets/dev6/certs/gots.pdf", "validTill": "2027-06-30" }
]
```

---

## 5. Image strategy

| Need | Count | Ratio | Source (abhi) | Final |
|---|---|---|---|---|
| Sustainability hero | 1 | 21:9 (mobile 4:3) | Unsplash loom/weaver photo | Client photos |
| Materials icons | 3 | 1:1 SVG | inline SVG (tan stroke) | — |
| Cert logos | 4 | transparent PNG/SVG | official press-kit SVGs | certified versions |
| Sourcing map | 1 | SVG | hand-made India outline SVG | — |
| Lookbook rooms | 12–16 | mixed 3:4, 1:1, 4:3 | Unsplash interiors | styled shoots |
| Journal covers | 8 | 16:9 | Unsplash | brand photos |
| Author avatar | 2 | 1:1 | Unsplash portrait | team photos |

**Rules:** every img `loading="lazy"` (pehle 2 ke alawa), explicit `width/height` ya `aspect-ratio` → CLS 0, descriptive `alt` ("Terracotta handloom rug in a sunlit boho living room"), Dev 1 aane ke baad `srcset` + WebP. Hotspot images ke liye natural light wali, clutter-free photos chahiye taaki dots clearly dikhein.

Abhi ke liye: `https://images.unsplash.com/photo-...?w=800&q=70` direct URLs (hotlink — sirf dev/preview ke liye).

---

## 6. Journal content backlog (8 posts, pehle 4 ready content ke saath)

| # | Title | Category | Status |
|---|---|---|---|
| 1 | Decorating with Burnt Orange and Turquoise | Colour Guides | ✅ sample post (template demo) |
| 2 | How a Handloom Rug Is Made: Fibre to Finish | How It's Made | content ready plan |
| 3 | Meet the Weavers of Bhujodi | Artisan Stories | outline |
| 4 | Caring for Cotton, Wool & Jute | Care Tips | outline |
| 5 | Monsoon-Ready: Fabrics That Breathe | Decor Ideas | outline |
| 6 | The DMC Palette Behind WovenHaat | Colour Guides | outline |
| 7 | 5 Ways to Style Cushion Covers | Decor Ideas | outline |
| 8 | Why Your Bath Mat Should Be Cotton, Not Microfibre | Care Tips | outline |

---

## 7. Design conformance (checklist har page pe)

- [ ] Background `#F0EBE3`, text `#3F3A38` (kabhi pure black nahi)
- [ ] Primary buttons `#C8421F` + white text; links `#5C9FAE`; badges/ratings `#C08F4A`; tags/sale `#EE8F80`
- [ ] Headings: Playfair Display (serif); Body: Inter 16px min, line-height 1.6; labels: uppercase, letter-spacing .08em
- [ ] Radius 8–12px, soft shadows, tan @ low-opacity texture backgrounds
- [ ] Mobile-first: 1 col → 2 → 3/4; no horizontal scroll at 360px
- [ ] `prefers-reduced-motion` respected (count-up, hover swaps)
- [ ] Contrast: AA (spec §3.3 pairs use karun — e.g. burnt orange sirf large text pe)
- [ ] SEO: unique `<title>`/`<meta description>`, OG tags, BreadcrumbList + Article/FAQ JSON-LD

---

## 8. Progress update template (roz shaam group ke liye)

```
Dev 6 — <date>
✅ Done: <files/pages>
🚧 In progress: <kaam>
 blockers: <Dev 1 component unavailable? images pending?>
 next: <kal ka plan>
```

---

## 9. Build order (agla session)

1. Shared shell: `dev6.css` (tokens) + Navbar/Footer placeholder + breadcrumbs
2. **Sustainability** full page + certifications/impact data
3. **Journal** list + post template + 1 sample post
4. **Lookbook** masonry + hotspot drawer
5. Baaki 3 posts + polish + responsive/a11y pass
