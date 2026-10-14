/**
 * Home page (Dev 1 — design system owner).
 *
 * Section order:
 *   1. Editorial hero (full-bleed photo, transparent nav)
 *   2. Trust strip — OEKO-TEX · GOTS · GRS · 18+ countries
 *   3. Shop by category tiles → /collections#<slug>
 *   4. Featured / bestsellers — the real <ProductCard /> (mock data for now)
 *   5. Craft story — Panipat artisan families
 *   6. Testimonials — "What homes are saying" (gold stars, portrait cards)
 *   7. Bulk / custom orders CTA → /bulk-orders
 *   8. Journal teaser + Instagram grid
 *   9. Newsletter
 *
 * SEO title/description are set through <PageMeta />.
 */
import { useState } from "react";
import { Link } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";
import ProductGrid from "../components/product/ProductGrid.jsx";
import Newsletter from "../components/sections/Newsletter.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import Container from "../components/ui/Container.jsx";
import Rating from "../components/ui/Rating.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import Tag from "../components/ui/Tag.jsx";
import Reveal from "../animations/Reveal.jsx";
import Marquee from "../animations/Marquee.jsx";
import { useSpotlight } from "../hooks/useSpotlight.js";

import EditorialHero from "../components/sections/EditorialHero.jsx";
import { CATEGORIES } from "../data/categories.js";
import { MOCK_BESTSELLERS, MOCK_PRODUCTS } from "../data/mockProducts.js";
import { useCart } from "../context/CartContext.jsx";
import { JOURNAL_POSTS, INSTAGRAM_POSTS } from "../data/journal.js";
import { TESTIMONIALS } from "../data/testimonials.js";
import { ROUTES, SOCIALS } from "../constants/routes.js";
import { unsplash } from "../utils/images.js";

const TRUST = [
  {
    title: "Certified safe",
    caption: "OEKO-TEX Standard 100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  },
  {
    title: "Organic fibres",
    caption: "GOTS certified cotton",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 21c0-9 4-13 9-15-1 8-4 12-9 15Z" />
        <path d="M12 21C7 18 4 14 3 6c5 2 9 6 9 15Z" />
      </svg>
    )
  },
  {
    title: "Recycled yarn",
    caption: "GRS certified",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
      </svg>
    )
  },
  {
    title: "18+ countries",
    caption: "Shipped worldwide",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18-2.5-3-2.5-15.5 0-18Z" />
      </svg>
    )
  }
];

function TrustStrip() {
  return (
    <section className="section section--tight" aria-label="Certifications and reach">
      <Container>
        <Reveal stagger={0.08} className="trust-strip">
          {TRUST.map((item) => (
            <div className="trust-item" key={item.title}>
              {item.icon}
              <strong>{item.title}</strong>
              <span>{item.caption}</span>
            </div>
          ))}
        </Reveal>
        <Marquee speed={38} className="trust-marquee">
          <span>OEKO-TEX Standard 100</span>
          <span className="trust-marquee__dot">·</span>
          <span>GOTS</span>
          <span className="trust-marquee__dot">·</span>
          <span>GRS</span>
          <span className="trust-marquee__dot">·</span>
          <span>Shipped to 18+ countries</span>
          <span className="trust-marquee__dot">·</span>
        </Marquee>
      </Container>
    </section>
  );
}

function Categories() {
  return (
    <section className="section" aria-labelledby="cat-h">
      <Container>
        <SectionHeading
          id="cat-h"
          align="center"
          label="Shop by category"
          title="Find your weave"
          subtitle="Rugs, cushions, throws and bath mats — every piece woven on a handloom in Panipat."
        />
        <Reveal stagger={0.1} className="grid grid--4">
          {CATEGORIES.map((category) => (
            <Link key={category.slug} to={category.to} className="cat-tile" data-cursor="Shop">
              <img
                src={category.image}
                alt={category.alt}
                width="600"
                height="450"
                loading="lazy"
                decoding="async"
              />
              <span className="cat-tile__label">{category.name}</span>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

function Bestsellers() {
  const { addItem } = useCart();
  const [wishlist, setWishlist] = useState(() =>
    MOCK_PRODUCTS.filter((product) => product.isWishlisted).map((product) => product.id)
  );

  // Demo wishlist source — Dev 4 owns the real one (see the product README).
  const toggleWishlist = (id) =>
    setWishlist((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

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
        {/* Real <ProductCard /> (was the temporary stub). Mock data until the
            product API lands — see src/components/product/README.md. */}
        <ProductGrid
          products={MOCK_BESTSELLERS.map((product) => ({
            ...product,
            isWishlisted: wishlist.includes(product.id)
          }))}
          onAddToCart={(id, product) => addItem(product)}
          onToggleWishlist={toggleWishlist}
        />
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
    <section className="section" aria-labelledby="craft-h">
      <Container className="split">
        <div className="split__media">
          <img
            src={unsplash("photo-1591195853828-11db59a44f6b", 800)}
            alt="Artisan working at a wooden pit loom in Panipat"
            width="800"
            height="600"
            loading="lazy"
            decoding="async"
          />
        </div>
        <Reveal className="split__text" from="left">
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
      </Container>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section section--alt" aria-labelledby="rev-h">
      <Container>
        <SectionHeading
          id="rev-h"
          align="center"
          label="Customer reviews"
          title="What homes are saying"
        />
        <div className="reviews-grid">
          {TESTIMONIALS.map((review) => (
            <Card as="article" key={review.id} className="review-card" padded={false}>
              <img
                className="review-card__portrait"
                src={review.avatar}
                alt={review.alt}
                width="120"
                height="120"
                loading="lazy"
                decoding="async"
              />
              <div className="review-card__body">
                <Rating value={review.rating} size="md" />
                <blockquote className="review-card__quote">{review.quote}</blockquote>
                <footer className="review-card__who">
                  <strong>{review.name}</strong>
                  <span>{review.place}</span>
                </footer>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BulkCta() {
  const ref = useSpotlight();
  return (
    <section className="section" aria-labelledby="bulk-h">
      <Container>
        <div className="cta-band has-spotlight" ref={ref}>
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
      </Container>
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

      <EditorialHero />
      <TrustStrip />
      <Categories />
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
