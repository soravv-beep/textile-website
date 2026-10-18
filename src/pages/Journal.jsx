import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";
import Button from "../components/ui/Button.jsx";
import Tag from "../components/ui/Tag.jsx";
import Container from "../components/ui/Container.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import Reveal from "../animations/Reveal.jsx";
import Newsletter from "../components/sections/Newsletter.jsx";
import { journalPath } from "../constants/routes.js";
import { JOURNAL_CATEGORIES, JOURNAL_POSTS } from "../data/journal.js";

export default function Journal() {
  const [selectedCategory, setSelectedCategory] = useState("All Stories");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = useMemo(() => {
    return JOURNAL_POSTS.find((p) => p.featured) || JOURNAL_POSTS[0];
  }, []);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return JOURNAL_POSTS.filter((post) => {
      const matchCategory =
        selectedCategory === "All Stories" || post.category === selectedCategory;
      const matchSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <PageMeta
        title="The Journal — Craft Stories, Care & Color | WovenHaat"
        description="Essays, artisan interviews, color guides, and slow care tips from our handloom weaving clusters in Panipat, Bhujodi, and Kannur."
      />

      {/* 1. Hero Header */}
      <section className="section" style={{ paddingBottom: "24px" }}>
        <Container>
          <div className="jn-header">
            <Reveal>
              <span className="eyebrow">THE JOURNAL</span>
              <h1>Craft stories, care guides & colour notes</h1>
              <p style={{ fontSize: "1.15rem", color: "var(--color-muted)", lineHeight: 1.6 }}>
                Step behind the loom. Discover how generational artisans spin, dye, and interlock
                threads into textiles that tell timeless stories.
              </p>
            </Reveal>
          </div>

          {/* 2. Interactive Category Tabs & Search Bar */}
          <div className="jn-toolbar">
            <div className="jn-tabs">
              {JOURNAL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`jn-tab ${selectedCategory === cat ? "is-active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="jn-search">
              <svg className="jn-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="search"
                className="jn-search__input"
                placeholder="Search craft stories, dyes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* 3. Featured Post Card (Hero Spotlight) */}
          {selectedCategory === "All Stories" && !searchQuery && featuredPost && (
            <Reveal>
              <div className="jn-featured">
                <div className="jn-featured__media">
                  <img
                    src={featuredPost.cover}
                    alt={featuredPost.alt}
                    className="jn-featured__img"
                  />
                </div>
                <div className="jn-featured__body">
                  <div className="jn-featured__meta-top">
                    <Tag tone="coral">{featuredPost.category}</Tag>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>
                      Featured Article · {featuredPost.readMinutes} min read
                    </span>
                  </div>

                  <h2 className="jn-featured__title">
                    <Link to={journalPath(featuredPost.slug)}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="jn-featured__excerpt">
                    {featuredPost.excerpt}
                  </p>

                  <div className="jn-featured__foot">
                    <div className="jn-author-pill">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="jn-author-pill__avatar"
                      />
                      <div>
                        <div className="jn-author-pill__name">{featuredPost.author.name}</div>
                        <div className="jn-author-pill__sub">{featuredPost.date}</div>
                      </div>
                    </div>

                    <Button as={Link} to={journalPath(featuredPost.slug)} variant="primary" arrow>
                      Read Story
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* 4. Post Grid */}
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px var(--sp-4)" }}>
              <p style={{ color: "var(--color-muted)", fontSize: "1.1rem", marginBottom: "var(--sp-4)" }}>
                No craft stories match "{searchQuery}" in {selectedCategory}.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All Stories");
                  setSearchQuery("");
                }}
              >
                Reset Search & Categories
              </Button>
            </div>
          ) : (
            <div className="jn-grid">
              {filteredPosts.map((post, idx) => (
                <Reveal key={post.slug} delay={(idx % 3) * 0.1}>
                  <article className="jn-card">
                    <div className="jn-card__media">
                      <img
                        src={post.cover}
                        alt={post.alt}
                        className="jn-card__img"
                        loading="lazy"
                      />
                    </div>
                    <div className="jn-card__body">
                      <div className="jn-card__category">
                        <Tag tone="coral">{post.category}</Tag>
                      </div>
                      <h3 className="jn-card__title">
                        <Link to={journalPath(post.slug)}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="jn-card__excerpt">
                        {post.excerpt}
                      </p>
                      <div className="jn-card__foot">
                        <span>{post.date} · {post.readMinutes} min read</span>
                        <Link to={journalPath(post.slug)} className="jn-card__link">
                          Read story →
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* 5. Cross-links & Newsletter */}
      <Newsletter />
    </>
  );
}
