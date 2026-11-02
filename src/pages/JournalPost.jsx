import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";
import Button from "../components/ui/Button.jsx";
import Tag from "../components/ui/Tag.jsx";
import Container from "../components/ui/Container.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import ProductCard from "../components/product/ProductCard.jsx";
import Newsletter from "../components/sections/Newsletter.jsx";
import Reveal from "../animations/Reveal.jsx";
import { ROUTES, journalPath } from "../constants/routes.js";
import { JOURNAL_POSTS, JOURNAL_SWATCHES } from "../data/journalContent.js";
import { MOCK_PRODUCTS } from "../data/mockProducts.js";

export default function JournalPost() {
  const { slug } = useParams();
  const [copiedLink, setCopiedLink] = useState(false);

  // Find current post by slug, defaulting to the first one if route doesn't match
  const currentIndex = useMemo(() => {
    const idx = JOURNAL_POSTS.findIndex((p) => p.slug === slug);
    return idx !== -1 ? idx : 0;
  }, [slug]);

  const post = JOURNAL_POSTS[currentIndex];

  const prevPost = currentIndex > 0 ? JOURNAL_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < JOURNAL_POSTS.length - 1 ? JOURNAL_POSTS[currentIndex + 1] : null;

  // Linked related products
  const relatedProducts = useMemo(() => {
    if (!post?.productIds?.length) return MOCK_PRODUCTS.slice(0, 3);
    const set = new Set(post.productIds);
    const matched = MOCK_PRODUCTS.filter((p) => set.has(p.id));
    return matched.length ? matched : MOCK_PRODUCTS.slice(0, 3);
  }, [post]);

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Read "${post.title}" on WovenHaat Journal:\n${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  if (!post) {
    return (
      <Container>
        <div style={{ textAlign: "center", padding: "96px var(--sp-4)" }}>
          <h1>Story not found</h1>
          <p>The craft story you are looking for does not exist or has moved.</p>
          <Button as={Link} to={ROUTES.journal} variant="primary">
            Return to Journal
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      <PageMeta
        title={`${post.title} | WovenHaat Journal`}
        description={post.excerpt}
        image={post.cover}
      />

      {/* 1. Post Header */}
      <header className="post-header">
        <Container>
          <div className="post-header__inner">
            {/* Breadcrumb */}
            <nav className="post-header__breadcrumb" aria-label="Breadcrumb">
              <Link to={ROUTES.home}>Home</Link>
              <span>/</span>
              <Link to={ROUTES.journal}>Journal</Link>
              <span>/</span>
              <span style={{ color: "var(--color-text)" }}>{post.category}</span>
            </nav>

            <div style={{ marginBottom: "var(--sp-3)" }}>
              <Tag tone="coral">{post.category}</Tag>
            </div>

            <h1 className="post-header__title">{post.title}</h1>
            <p className="post-header__lead">{post.excerpt}</p>

            {/* Author + Share strip */}
            <div className="post-header__meta-strip">
              <div className="jn-author-pill">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="jn-author-pill__avatar"
                />
                <div>
                  <div className="jn-author-pill__name">{post.author.name}</div>
                  <div className="jn-author-pill__sub">
                    {post.author.role} · {post.date} · {post.readMinutes} min read
                  </div>
                </div>
              </div>

              {/* Share buttons */}
              <div className="post-share-row">
                <button
                  type="button"
                  className="post-share-btn"
                  onClick={handleWhatsAppShare}
                  aria-label="Share story on WhatsApp"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
                  </svg>
                  Share
                </button>
                <button
                  type="button"
                  className="post-share-btn"
                  onClick={handleCopy}
                  aria-label="Copy story link"
                >
                  {copiedLink ? "✓ Copied" : "Copy Link"}
                </button>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* 2. Hero Cover Image */}
      <div className="container">
        <div className="post-hero-image-wrap">
          <img
            src={post.cover}
            alt={post.alt}
            className="post-hero-image"
          />
          <div className="post-hero-caption">{post.alt}</div>
        </div>
      </div>

      {/* 3. Article Content Layout */}
      <Container>
        <div className="post-layout">
          {/* Sticky Table of Contents Sidebar */}
          {post.toc && post.toc.length > 0 && (
            <aside aria-label="Table of contents">
              <div className="post-toc">
                <div className="post-toc__title">In This Story</div>
                <ul className="post-toc__list">
                  {post.toc.map((item) => (
                    <li key={item.id} className="post-toc__item">
                      <a href={`#${item.id}`} className="post-toc__link">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          {/* Main Article Body */}
          <main className="post-body">
            {post.sections?.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.heading}</h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {/* Inline Quote */}
                {section.quote && (
                  <blockquote className="post-quote">
                    <p className="post-quote__text">“{section.quote}”</p>
                    {section.quoteAuthor && (
                      <cite className="post-quote__author">— {section.quoteAuthor}</cite>
                    )}
                  </blockquote>
                )}

                {/* Inline Image */}
                {section.image && (
                  <div style={{ margin: "var(--sp-6) 0", borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow)" }}>
                    <img
                      src={section.image}
                      alt={section.imageCaption || section.heading}
                      style={{ width: "100%", height: "auto" }}
                      loading="lazy"
                    />
                    {section.imageCaption && (
                      <div className="post-hero-caption">{section.imageCaption}</div>
                    )}
                  </div>
                )}
              </section>
            ))}

            {/* Inline DMC Color Palette Swatches */}
            <div className="post-swatches-box">
              <div className="post-swatches-box__head">
                <h3 className="post-swatches-box__title">Heritage DMC Colour Palette</h3>
                <Tag tone="tan">Craft Standard</Tag>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--color-muted)", margin: "0 0 var(--sp-4)" }}>
                Our natural dyeing vats calibrate yarn skeins against these six foundational hues:
              </p>
              <div className="post-swatches-grid">
                {(post.swatches || JOURNAL_SWATCHES).map((swatch) => (
                  <div key={swatch.code} className="post-swatch-item">
                    <div
                      className="post-swatch-chip"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <div className="post-swatch-meta">
                      <span className="post-swatch-code">{swatch.code}</span>
                      <span className="post-swatch-name">{swatch.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Author Bio Box */}
            <div className="post-author-box">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="post-author-box__avatar"
              />
              <div>
                <h3 className="post-author-box__name">{post.author.name}</h3>
                <div className="post-author-box__role">{post.author.role}</div>
                <p className="post-author-box__bio">
                  Leading textile research and artisan cluster collaborations at WovenHaat.
                  Passionate about reviving indigenous pit-loom techniques and zero-chemical dye formulations.
                </p>
              </div>
            </div>

            {/* Prev / Next Story Links */}
            <div className="post-nav">
              {prevPost ? (
                <Link to={journalPath(prevPost.slug)} className="post-nav-card">
                  <span className="post-nav-card__label">← Previous Story</span>
                  <div className="post-nav-card__title">{prevPost.title}</div>
                </Link>
              ) : <div />}

              {nextPost ? (
                <Link to={journalPath(nextPost.slug)} className="post-nav-card" style={{ textAlign: "right" }}>
                  <span className="post-nav-card__label">Next Story →</span>
                  <div className="post-nav-card__title">{nextPost.title}</div>
                </Link>
              ) : <div />}
            </div>
          </main>
        </div>
      </Container>

      {/* 4. "Shop The Story" Related Products */}
      <section className="section section--alt" style={{ borderTop: "1px solid var(--color-border)" }}>
        <Container>
          <Reveal>
            <SectionHeading
              label="Shop The Story"
              title="Handcrafted Pieces Featured Here"
              subtitle="Every design mentioned in this article is woven by hand in our certified artisan clusters."
            />
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--sp-6)" }}>
            {relatedProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                id={prod.id}
                slug={prod.slug}
                name={prod.name}
                images={prod.images}
                price={prod.price}
                compareAtPrice={prod.compareAtPrice}
                saleEndsAt={prod.saleEndsAt}
                badge={prod.badge}
                ecoLabel={prod.ecoLabel}
                meta={prod.meta}
                inStock={prod.inStock}
                isWishlisted={prod.isWishlisted}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Newsletter Block */}
      <Newsletter />
    </>
  );
}
