import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";
import Button from "../components/ui/Button.jsx";
import Tag from "../components/ui/Tag.jsx";
import Container from "../components/ui/Container.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import { Drawer } from "../components/ui/Overlay.jsx";
import Reveal from "../animations/Reveal.jsx";
import { useCart } from "../context/CartContext.jsx";
import { productPath, CONTACT } from "../constants/routes.js";
import { formatINR } from "../utils/format.js";
import { MOCK_PRODUCTS } from "../data/mockProducts.js";
import {
  LOOKBOOK_ROOMS,
  LOOKBOOK_STYLES,
  LOOKBOOK_ITEMS,
  UGC_COMMUNITY_GALLERY
} from "../data/lookbookData.js";

export default function Lookbook() {
  const [selectedRoom, setSelectedRoom] = useState("All Rooms");
  const [selectedStyle, setSelectedStyle] = useState("All Styles");
  const [activeLook, setActiveLook] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedItemSlug, setAddedItemSlug] = useState(null);

  const { addItem } = useCart();

  const filteredLooks = useMemo(() => {
    return LOOKBOOK_ITEMS.filter((item) => {
      const matchRoom = selectedRoom === "All Rooms" || item.room === selectedRoom;
      const matchStyle = selectedStyle === "All Styles" || item.style === selectedStyle;
      return matchRoom && matchStyle;
    });
  }, [selectedRoom, selectedStyle]);

  const activeLookProducts = useMemo(() => {
    if (!activeLook) return [];
    const productMap = new Map(MOCK_PRODUCTS.map((p) => [p.id, p]));
    return activeLook.hotspots
      .map((h) => ({
        ...h,
        product: productMap.get(h.productId)
      }))
      .filter((h) => Boolean(h.product));
  }, [activeLook]);

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleAddToCart = (product) => {
    addItem(product, 1);
    setAddedItemSlug(product.slug);
    setTimeout(() => setAddedItemSlug(null), 1800);
  };

  return (
    <>
      <PageMeta
        title="Lookbook & Styled Spaces | WovenHaat"
        description="Explore curated living spaces styled with authentic handloom rugs, cushion sets, and artisanal throws. Shop the look with interactive hotspots."
      />

      {/* 1. Hero Header */}
      <section className="section" style={{ paddingBottom: "32px" }}>
        <Container>
          <div style={{ textAlign: "center", maxWidth: "820px", marginInline: "auto" }}>
            <Reveal>
              <span className="eyebrow">CURATED LIVING</span>
              <h1 style={{ marginBottom: "var(--sp-3)" }}>Rooms woven with intention</h1>
              <p style={{ fontSize: "1.15rem", color: "var(--color-muted)", lineHeight: 1.6, marginBottom: "var(--sp-5)" }}>
                See how natural wool textures, sun-baked terracotta dyes, and deep mineral turquoise tones
                transform real rooms into calm, grounded sanctuaries.
              </p>
            </Reveal>
          </div>

          {/* 2. Filter Controls */}
          <div className="lb-controls">
            {/* Room Filter Chips */}
            <div className="lb-filters-row">
              <span className="lb-filters-label">Room:</span>
              {LOOKBOOK_ROOMS.map((room) => (
                <button
                  key={room}
                  type="button"
                  className={`lb-chip ${selectedRoom === room ? "is-active" : ""}`}
                  onClick={() => setSelectedRoom(room)}
                >
                  {room}
                </button>
              ))}
            </div>

            {/* Style Filter Chips */}
            <div className="lb-filters-row">
              <span className="lb-filters-label">Aesthetic:</span>
              {LOOKBOOK_STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  className={`lb-chip lb-chip--style ${selectedStyle === style ? "is-active" : ""}`}
                  onClick={() => setSelectedStyle(style)}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Masonry Gallery Grid */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: "72px" }}>
        <Container>
          {filteredLooks.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px var(--sp-4)" }}>
              <p style={{ color: "var(--color-muted)", fontSize: "1.1rem" }}>
                No styled rooms match this combination.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedRoom("All Rooms");
                  setSelectedStyle("All Styles");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="lb-masonry">
              {filteredLooks.map((look) => (
                <div key={look.id} className="lb-card">
                  <div className="lb-card__media">
                    <img
                      src={look.image}
                      alt={look.title}
                      className="lb-card__img"
                      loading="lazy"
                    />

                    {/* Hotspot Pins */}
                    {look.hotspots.map((spot, sIdx) => (
                      <button
                        key={`${look.id}-spot-${sIdx}`}
                        type="button"
                        className="lb-hotspot-pin"
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        aria-label={`Shop ${spot.label}`}
                        title={spot.label}
                        onClick={() => setActiveLook(look)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                        </svg>
                      </button>
                    ))}

                    {/* Hover Overlay */}
                    <div className="lb-card__overlay">
                      <div className="lb-card__badges">
                        <Tag tone="coral">{look.room}</Tag>
                        <Tag tone="tan">{look.style}</Tag>
                      </div>
                      <h3 className="lb-card__title">{look.title}</h3>
                      <Button
                        variant="primary"
                        size="sm"
                        className="lb-card__shop-btn"
                        onClick={() => setActiveLook(look)}
                      >
                        Shop This Look ({look.hotspots.length} pieces)
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* 4. Customer UGC Gallery: #WovenHaatHome */}
      <section className="section section--alt">
        <Container>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "var(--sp-4)", marginBottom: "var(--sp-6)" }}>
              <div>
                <span className="eyebrow">COMMUNITY SPACES</span>
                <h2 style={{ margin: 0 }}>In Real Homes: #WovenHaatHome</h2>
              </div>
              <Button
                as="a"
                href={`${CONTACT.whatsapp}&text=${encodeURIComponent("Hi WovenHaat, I would like to submit my home photos styled with your handloom textiles!")}`}
                target="_blank"
                rel="noreferrer"
                variant="outline"
              >
                Share Your Space on WhatsApp
              </Button>
            </div>
          </Reveal>

          <div className="lb-ugc-grid">
            {UGC_COMMUNITY_GALLERY.map((ugc, idx) => (
              <Reveal key={ugc.id} delay={idx * 0.1}>
                <div className="lb-ugc-card">
                  <img
                    src={ugc.image}
                    alt={`Styled by ${ugc.author}`}
                    className="lb-ugc-card__img"
                    loading="lazy"
                  />
                  <div className="lb-ugc-card__body">
                    <p className="lb-ugc-card__quote">“{ugc.text}”</p>
                    <div className="lb-ugc-card__author">{ugc.author}</div>
                    <div className="lb-ugc-card__handle">{ugc.handle}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Share & Cross-links bar */}
      <section className="section" style={{ paddingBlock: "48px", borderTop: "1px solid var(--color-border)" }}>
        <Container>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--sp-4)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)" }}>
              <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>Curated with slow living intent:</span>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                {copiedLink ? "✓ Link Copied!" : "Copy Lookbook Link"}
              </Button>
            </div>
            <div style={{ display: "flex", gap: "var(--sp-3)" }}>
              <Button as={Link} to="/journal" variant="outline" size="sm">
                Read Craft Stories
              </Button>
              <Button as={Link} to="/sustainability" variant="outline" size="sm">
                Our Certifications
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Shop The Look Drawer */}
      {activeLook && (
        <Drawer
          open={Boolean(activeLook)}
          onClose={() => setActiveLook(null)}
          title={`Shop: ${activeLook.title}`}
          side="right"
        >
          <div className="lb-drawer-content">
            <div className="lb-drawer-hero">
              <img src={activeLook.image} alt={activeLook.title} />
            </div>

            <p className="lb-drawer-narrative">
              "{activeLook.narrative}"
            </p>

            <h3 className="lb-drawer-heading">Featured Handwoven Pieces:</h3>

            <div className="lb-drawer-products">
              {activeLookProducts.map(({ product, label }) => {
                const isJustAdded = addedItemSlug === product.slug;
                return (
                  <div key={product.id} className="lb-product-mini">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="lb-product-mini__thumb"
                    />
                    <div className="lb-product-mini__info">
                      <div style={{ fontSize: "0.75rem", color: "var(--color-accent)", fontWeight: 600 }}>
                        {label}
                      </div>
                      <h4 className="lb-product-mini__name">
                        <Link
                          to={productPath(product.slug)}
                          onClick={() => setActiveLook(null)}
                        >
                          {product.name}
                        </Link>
                      </h4>
                      <p className="lb-product-mini__price">
                        {formatINR(product.price)}
                      </p>
                    </div>

                    <Button
                      variant={isJustAdded ? "secondary" : "primary"}
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      {isJustAdded ? "✓ Added" : "Add to Cart"}
                    </Button>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: "var(--sp-6)", textAlign: "center" }}>
              <Button
                as={Link}
                to="/shop"
                variant="outline"
                block
                onClick={() => setActiveLook(null)}
              >
                Browse All Handcrafted Products
              </Button>
            </div>
          </div>
        </Drawer>
      )}
    </>
  );
}
