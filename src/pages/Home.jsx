/**
 * Home page (Dev 1 — design system owner).
 *
 * Section order:
 *   1. Editorial hero (full-bleed photo, transparent nav)
 *   2. Trust strip — coral bar: certified safe · organic fibres · recycled yarn · 18+ countries
 *   3. Shop by category — full-bleed 4-column grid with the painted heading overlay
 *   4. Featured / bestsellers — <FlipProductCard /> (photo opens behind the text on hover)
 *   5. Craft story — Panipat artisan families
 *   6. Testimonials — "What homes are saying" (gold stars, portrait cards)
 *   7. Bulk / custom orders CTA → /bulk-orders
 *   8. Journal teaser + Instagram grid
 *   9. Newsletter
 *
 * SEO title/description are set through <PageMeta />.
 */
import { Link } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";
import FlipProductCard from "../components/product/FlipProductCard.jsx";
import Newsletter from "../components/sections/Newsletter.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import Container from "../components/ui/Container.jsx";
import Rating from "../components/ui/Rating.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import Tag from "../components/ui/Tag.jsx";
import Reveal from "../animations/Reveal.jsx";
import { useSpotlight } from "../hooks/useSpotlight.js";

import Hero from "../components/sections/Hero.jsx";
import Testimonials from "../components/sections/Testimonials.jsx";
import TrustStrip from "../components/sections/TrustStrip.jsx";
import CategoryGrid from "../components/sections/CategoryGrid.jsx";
import { CATEGORIES } from "../data/categories.js";
import { products } from "../data/catalog.js";
import { useShop } from "../context/shopContext.js";
import { JOURNAL_POSTS, INSTAGRAM_POSTS } from "../data/journal.js";
import { ROUTES, SOCIALS } from "../constants/routes.js";
import { unsplash } from "../utils/images.js";

/** The first four catalogue products flagged "Bestseller" (Shop catalogue, src/data/catalog.js). */
const BESTSELLERS = products.filter((product) => product.badge === "Bestseller").slice(0, 4);

function Bestsellers() {
  // Same shared <ProductCard /> and cart / wishlist state as the Shop page.
  const { cards, cardHandlers } = useShop();

  return (
    <section className="section section--alt texture" aria-labelledby="best-h">
      <Container>
        <SectionHeading
          id="best-h"
          align="center"
          label="Loved by homes"
          title="Bestsellers"
          subtitle="Every weave has its own name, its own story."
        />
        {/* Hover-reveal cards: the white block slides away and the photo opens behind the text. */}
        <div className="fpc-grid">
          {cards(BESTSELLERS).map((card) => (
            <FlipProductCard
              key={card.id}
              front={card}
              onAddToCart={cardHandlers.onAddToCart}
              onToggleWishlist={cardHandlers.onToggleWishlist}
            />
          ))}
        </div>
        <div className="section-cta">
          <Button as={Link} to={ROUTES.shop} variant="outline">
            View all products
          </Button>
        </div>
      </Container>
    </section>
  );
}

function CraftStory() {
  return (
    <section className="craft-banner section" aria-labelledby="craft-h">
      <div className="craft-banner__bg" aria-hidden="true" style={{ backgroundImage: 'url("/craft-story-carpets.jpg")' }} />
      <div className="craft-banner__overlay" aria-hidden="true" />
      <Container>
        <div className="craft-banner__content">
          <Reveal from="left" className="craft-banner__text">
            <span className="eyebrow">The craft story</span>
            <h2 id="craft-h">Four steps from fibre to your floor</h2>
            <p>
              Fibre, dyeing, weaving, finishing — every step is done by hand, and every
              piece carries the name of the artisan family that made it. Our weaver
              families in Panipat work with fair wages and safe, well-ventilated looms.
            </p>
            <Button as={Link} to={ROUTES.about} variant="secondary" arrow>
              Read our story
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function BulkCta() {
  const ref = useSpotlight();
  return (
    <section className="section cta-band-section" aria-labelledby="bulk-h">
      {/* No <Container> here on purpose — the band is meant to run edge to edge. */}
      <div className="cta-band cta-band--bulk has-spotlight" ref={ref}>
        <div>
          <span className="eyebrow">Retailers, designers & hotels</span>
          <h2 id="bulk-h">Bulk &amp; custom orders</h2>
          <p>
            Custom sizes, DMC-matched colourways and volume pricing — with samples
            before you commit.
          </p>
        </div>
        <div className="btn-group">
          <Button as={Link} to={ROUTES.bulkOrders} variant="primary" arrow>
            Request a quote
          </Button>
          <Button as={Link} to={ROUTES.contact} variant="outline" className="btn-outline-light">
            Talk to us
          </Button>
        </div>
      </div>
    </section>
  );
}

function JournalTeaser() {
  return (
    <section className="section section--alt" aria-labelledby="journal-h">
      <Container>
        <SectionHeading
          id="journal-h"
          align="center"
          label="From the journal"
          title="Slow craft, written down"
        />
        <Reveal stagger={0.1} className="grid grid--3">
          {JOURNAL_POSTS.map((post) => (
            <Link key={post.slug} to={post.to} className="preview-card" data-cursor="Read">
              <img
                src={post.image}
                alt={post.alt}
                width="700"
                height="460"
                loading="lazy"
                decoding="async"
              />
              <span className="preview-card__overlay">
                <span className="eyebrow">{post.label}</span>
                <h3>{post.title}</h3>
                <span className="preview-card__cta">Read the story →</span>
              </span>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

function InstagramGrid() {
  const instagram = SOCIALS.find((social) => social.key === "instagram");
  return (
    <section className="section" aria-labelledby="ig-h">
      <Container>
        <SectionHeading
          id="ig-h"
          align="center"
          label="@wovenhaat"
          title="From the loom, daily"
          subtitle={`Follow along — ${instagram?.handle ?? ""} weavers, dyes and finished rooms.`}
        />
        <div className="ig-grid">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              className="ig-tile"
              href={instagram?.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Instagram"
            >
              <img
                src={post.image}
                alt={post.alt}
                width="400"
                height="400"
                loading="lazy"
                decoding="async"
              />
            </a>
          ))}
        </div>
        <div className="section-cta">
          <Tag tone="outline">Follow @wovenhaat on Instagram</Tag>
        </div>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <PageMeta
        title="WovenHaat — Handwoven Rugs, Cushions & Throws from Panipat"
        description="Handwoven rugs, cushions and throws made by artisan families in Panipat and shipped to 18+ countries. OEKO-TEX, GOTS and GRS certified. Free shipping above ₹1499."
      />

      <Hero />
      <TrustStrip />
      <CategoryGrid categories={CATEGORIES} />
      <Bestsellers />
      <CraftStory />
      <Testimonials />
      <BulkCta />
      <JournalTeaser />
      <InstagramGrid />
      <Newsletter />
    </>
  );
}
