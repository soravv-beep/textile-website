/**
 * /design-system — live style guide (hidden from navigation, linked from
 * docs/DESIGN_SYSTEM.md). Shows every colour token, the type scale, spacing and
 * radius tokens, and every UI component in each state so reviewing a PR is a
 * matter of opening one page.
 *
 * Not linked from the navbar or footer on purpose: it is an internal tool.
 */
import { useState } from "react";

import PageMeta from "../components/PageMeta.jsx";
import ProductCard from "../components/product/ProductCard.jsx";
import ProductCardSkeleton from "../components/product/ProductCardSkeleton.jsx";
import { MOCK_PRODUCTS } from "../data/mockProducts.js";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import Container from "../components/ui/Container.jsx";
import IconButton from "../components/ui/IconButton.jsx";
import { Input, Select, Textarea } from "../components/ui/Field.jsx";
import { Drawer, Modal } from "../components/ui/Overlay.jsx";
import Rating from "../components/ui/Rating.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import Tag from "../components/ui/Tag.jsx";
import Reveal from "../animations/Reveal.jsx";
import Marquee from "../animations/Marquee.jsx";
import SuccessCheck from "../animations/SuccessCheck.jsx";

const COLOURS = [
  { token: "--color-text", hex: "#3F3A38", name: "Beaver Gray", note: "Body text, headings, footer/nav chrome" },
  { token: "--color-primary", hex: "#C8421F", name: "Burnt Orange", note: "Primary CTAs, active underline" },
  { token: "--color-primary-hover", hex: "#A93617", name: "Burnt Orange (hover)", note: "Derived" },
  { token: "--color-accent", hex: "#C08F4A", name: "Tan", note: "Labels, stars, accents" },
  { token: "--color-tag", hex: "#EE8F80", name: "Light Coral", note: "Tags/badges (dark text)" },
  { token: "--color-bg", hex: "#F0EBE3", name: "Mocha", note: "Page background" },
  { token: "--color-surface", hex: "#FFFFFF", name: "Surface", note: "Cards and form cards" },
  { token: "--color-border", hex: "#E2D9CC", name: "Border", note: "Soft beige hairline" },
  { token: "--color-link", hex: "#5C9FAE", name: "Turquoise", note: "Links (large/bold text only)" },
  { token: "--color-link-hover", hex: "#47808E", name: "Turquoise (dark)", note: "Body-size links — AA on Mocha" },
  { token: "--color-muted", hex: "#6E6560", name: "Muted", note: "Secondary text" },
  { token: "--color-chrome", hex: "#3F3A38", name: "Chrome", note: "Navbar + footer — never hardcode" }
];

const TYPE_SCALE = [
  { label: "H1 · hero", css: "clamp(40px, 12vw, 172px)", sample: "Handwoven", cls: "ds-type-h1" },
  { label: "H2", css: "clamp(1.6rem, 3.5vw, 2.4rem)", sample: "What homes are saying", cls: "ds-type-h2" },
  { label: "H3", css: "clamp(1.2rem, 2.5vw, 1.5rem)", sample: "Mocha Handloom Throw", cls: "ds-type-h3" },
  { label: "Body", css: "16px / 1.6", sample: "Every weave has its own name, its own story.", cls: "ds-type-body" },
  { label: "Label (caps)", css: "12–13px / 0.14em", sample: "Customer reviews", cls: "eyebrow" }
];

const RADII = [
  { name: "12px", token: "--radius", use: "Cards, inputs" },
  { name: "16px", token: "--radius-md", use: "Tiles, media" },
  { name: "24px", token: "--radius-lg", use: "Feature / form cards" },
  { name: "pill", token: "--radius-pill", use: "Badges, chips, CTA pills" }
];

function Swatch({ token, hex, name, note }) {
  return (
    <div className="ds-swatch">
      <span className="ds-swatch__chip" style={{ background: `var(${token})` }} aria-hidden="true" />
      <div>
        <strong>{name}</strong>
        <code>{token}</code>
        <span className="ds-swatch__hex">{hex}</span>
        <p>{note}</p>
      </div>
    </div>
  );
}

export default function DesignSystem() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <PageMeta
        title="Design system — WovenHaat"
        description="Live style guide for the WovenHaat design system: colour tokens, type scale, spacing, and every shared component."
      />

      <section className="page-hero">
        <Container>
          <span className="eyebrow">Internal</span>
          <h1>Design system</h1>
          <p>
            Every token and component the team shares. Rules and import examples live in
            DESIGN_SYSTEM.md in docs/ — this page is the visual reference.
          </p>
        </Container>
      </section>

      {/* COLOURS */}
      <section className="section" aria-labelledby="ds-colour-h">
        <Container>
          <SectionHeading id="ds-colour-h" label="01 · Colour" title="Tokens" subtitle="Never hardcode a hex — always use the variable." />
          <div className="ds-swatches">
            {COLOURS.map((colour) => (
              <Swatch key={colour.token} {...colour} />
            ))}
          </div>

          <h3 className="ds-sub">Contrast checks (WCAG AA = 4.5:1 for body text)</h3>
          <ul className="ds-checks">
            <li>Beaver Gray on Mocha — 9.4:1, passes AA and AAA.</li>
            <li>White on Burnt Orange — 4.9:1, passes AA for all text.</li>
            <li>Beaver Gray on Light Coral — 4.7:1, passes AA (that is why tags use dark text).</li>
            <li>
              Turquoise on Mocha — 2.6:1 at body size, so body links use the darker
              <code> --color-link-hover</code> (3.7:1, "large text only" AA) and are always
              underlined so colour is never the only signal.
            </li>
            <li>Mocha on Chrome — 9.4:1, passes AA/AAA (nav + footer text).</li>
          </ul>
        </Container>
      </section>

      {/* TYPE */}
      <section className="section section--alt" aria-labelledby="ds-type-h">
        <Container>
          <SectionHeading id="ds-type-h" label="02 · Typography" title="Scale" subtitle="Playfair Display for headings (18px+), Inter for everything else." />
          <div className="ds-type-list">
            {TYPE_SCALE.map((row) => (
              <div className="ds-type-row" key={row.label}>
                <span className="ds-type-row__meta">
                  {row.label}
                  <code>{row.css}</code>
                </span>
                <span className={row.cls}>{row.sample}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SPACING / RADIUS / SHADOW */}
      <section className="section" aria-labelledby="ds-space-h">
        <Container>
          <SectionHeading id="ds-space-h" label="03 · Layout" title="Spacing, radius & shadow" />
          <div className="grid grid--2">
            <Card>
              <h3>Radius scale</h3>
              <ul className="ds-list">
                {RADII.map((radius) => (
                  <li key={radius.token}>
                    <code>{radius.token}</code> = {radius.name} — {radius.use}
                  </li>
                ))}
              </ul>
              <h3 className="ds-sub">Spacing</h3>
              <ul className="ds-list">
                <li><code>--sp-4</code> / 16px — mobile gutter</li>
                <li><code>--sp-6</code> / 32px — tablet gutter</li>
                <li>64px section padding on mobile, 96px from 1024px</li>
                <li><code>--maxw</code> 1200px container</li>
                <li>Breakpoints: 640 / 768 / 1024 / 1280, mobile-first</li>
              </ul>
            </Card>
            <Card>
              <h3>Shadows</h3>
              <ul className="ds-list">
                <li><code>--shadow</code> — resting cards</li>
                <li><code>--shadow-lg</code> — hover, media, floating elements</li>
              </ul>
              <h3 className="ds-sub">Motion</h3>
              <ul className="ds-list">
                <li>Transform and opacity only — never layout properties.</li>
                <li>150–350ms; nav solid transition is 300ms.</li>
                <li>Every effect is skipped under <code>prefers-reduced-motion</code>.</li>
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* COMPONENTS */}
      <section className="section section--alt" aria-labelledby="ds-comp-h">
        <Container>
          <SectionHeading id="ds-comp-h" label="04 · Components" title="Everything in one place" />

          <h3 className="ds-sub">Button</h3>
          <div className="ds-row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="ds-row">
            <Button size="sm">Small</Button>
            <Button arrow>With arrow</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button variant="primary" block className="ds-block-demo">Full width</Button>
          </div>

          <h3 className="ds-sub">Tag / Badge</h3>
          <div className="ds-row">
            <Tag>New</Tag>
            <Tag tone="tan">Bestseller</Tag>
            <Tag tone="orange">Sale</Tag>
            <Tag tone="eco">OEKO-TEX</Tag>
            <Tag tone="outline">GOTS</Tag>
          </div>

          <h3 className="ds-sub">Rating</h3>
          <div className="ds-row">
            <Rating value={5} count={128} />
            <Rating value={4} count={54} size="md" showValue />
          </div>

          <h3 className="ds-sub">IconButton</h3>
          <div className="ds-row ds-row--chrome">
            <IconButton label="Search" tone="light">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </IconButton>
            <IconButton label="Wishlist" tone="light" magnetic>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 21s-7.5-4.8-9.5-9A5.4 5.4 0 0 1 12 6.5 5.4 5.4 0 0 1 21.5 12c-2 4.2-9.5 9-9.5 9Z" />
              </svg>
            </IconButton>
            <IconButton label="Cart" tone="light">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6h15l-1.5 9h-12z" />
                <path d="M6 6 5 3H2" />
              </svg>
            </IconButton>
          </div>

          <h3 className="ds-sub">Card, with tilt + spotlight</h3>
          <div className="grid grid--3">
            <Card tilt spotlight>
              <h3>Tilt card</h3>
              <p>Up to 8° rotation with a moving glare. Off on touch devices.</p>
            </Card>
            <Card radius={16}>
              <h3>16px radius</h3>
              <p>Media and tile variant.</p>
            </Card>
            <Card radius={24}>
              <h3>24px radius</h3>
              <p>Feature and form cards.</p>
            </Card>
          </div>

          <h3 className="ds-sub">Modal &amp; Drawer</h3>
          <div className="ds-row">
            <Button variant="outline" onClick={() => setModalOpen(true)}>
              Open modal
            </Button>
            <Button variant="outline" onClick={() => setDrawerOpen(true)}>
              Open drawer
            </Button>
          </div>

          <h3 className="ds-sub">SuccessCheck</h3>
          <div className="ds-row">
            <SuccessCheck size={44} />
            <SuccessCheck size={28} />
          </div>
        </Container>
      </section>

      {/* FORMS */}
      <section className="section" aria-labelledby="ds-form-h">
        <Container>
          <SectionHeading id="ds-form-h" label="05 · Forms" title="Inputs & validation" />
          <Card radius={24} className="ds-form-card">
            <Input id="ds-name" label="Full name" placeholder="Your name" hint="Helper text sits under the field." />
            <Input id="ds-email" label="Email" type="email" placeholder="your@email.com" error="That email address doesn't look right." />
            <Input id="ds-optional" label="GSTIN" placeholder="Optional for retail buyers" optional />
            <Select
              id="ds-type"
              label="Enquiry type"
              placeholder="Choose a type…"
              options={["Retail", "Bulk Order", "Custom Design", "Other"]}
            />
            <Textarea id="ds-message" label="Message" placeholder="Tell us what you're planning…" hint="Max 600 characters." />
          </Card>
        </Container>
      </section>

      {/* PRODUCT CARD STATES */}
      <section className="section" aria-labelledby="ds-card-h">
        <Container>
          <SectionHeading
            id="ds-card-h"
            label="07 · Product card"
            title="Every card state"
            subtitle="The card is sold/collections-ready: props and usage are documented in src/components/product/README.md."
          />
          <div className="product-grid">
            <ProductCard {...MOCK_PRODUCTS[0]} isWishlisted />
            <ProductCard {...MOCK_PRODUCTS[2]} />
            <ProductCard {...MOCK_PRODUCTS[7]} />
            <ProductCard {...MOCK_PRODUCTS[6]} />
          </div>
          <h3 className="ds-sub">Skeleton (same dimensions — no layout shift)</h3>
          <div className="product-grid">
            <ProductCardSkeleton count={4} withSale />
          </div>
          <p className="ds-motion-note">
            Left to right: on sale with a live countdown and a saved heart, normal
            in-stock, out of stock (dimmed, disabled button), and a second sale item
            ticking in the last hour. Hover a card for the tilt, glare, image zoom and
            hover image-swap.
          </p>
        </Container>
      </section>

      {/* MOTION + REVEAL */}
      <section className="section section--alt" aria-labelledby="ds-motion-h">
        <Container>
          <SectionHeading id="ds-motion-h" label="06 · Motion" title="Reveal, marquee & cursor" />
          <Marquee speed={26}>
            <span>OEKO-TEX Standard 100</span>
            <span className="trust-marquee__dot">·</span>
            <span>GOTS</span>
            <span className="trust-marquee__dot">·</span>
            <span>GRS</span>
            <span className="trust-marquee__dot">·</span>
          </Marquee>
          <div className="ds-motion-note">
            <p>
              Hover any card on this page for tilt, glare and spotlight. The custom cursor
              shows a label over elements with <code>data-cursor="View"</code>.
            </p>
          </div>
          <Reveal stagger={0.1} className="grid grid--3">
            <Card><h3>Reveal</h3><p>Staggered fade-up on scroll, once.</p></Card>
            <Card><h3>Reveal</h3><p>Each child animates in turn.</p></Card>
            <Card><h3>Reveal</h3><p>Viewport amount 0.25.</p></Card>
          </Reveal>
        </Container>
      </section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Modal base">
        <p>
          Focus is trapped, Esc closes, and the page behind is scroll-locked. Built on the
          shared <code>&lt;Overlay /&gt;</code>.
        </p>
        <Button variant="primary" onClick={() => setModalOpen(false)}>
          Close
        </Button>
      </Modal>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Drawer base" side="right">
        <p>Slides in from the edge. Use it for cart, filters or menus (Dev 3/4).</p>
        <Button variant="outline" onClick={() => setDrawerOpen(false)}>
          Close drawer
        </Button>
      </Drawer>
    </>
  );
}
