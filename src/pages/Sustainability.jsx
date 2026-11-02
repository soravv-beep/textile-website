import { useState } from "react";
import { Link } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";
import Button from "../components/ui/Button.jsx";
import Tag from "../components/ui/Tag.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import Container from "../components/ui/Container.jsx";
import { Modal } from "../components/ui/Overlay.jsx";
import Reveal from "../animations/Reveal.jsx";
import { ROUTES } from "../constants/routes.js";
import {
  SUSTAINABILITY_STATS,
  SUSTAINABLE_MATERIALS,
  CERTIFICATIONS,
  PROCESS_LIFECYCLE,
  WATER_AND_WASTE_PRACTICES,
  SOURCING_REGIONS
} from "../data/sustainabilityData.js";

export default function Sustainability() {
  const [activeAccordion, setActiveAccordion] = useState(WATER_AND_WASTE_PRACTICES[0]?.id);
  const [selectedCert, setSelectedCert] = useState(null);

  const toggleAccordion = (id) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <PageMeta
        title="Sustainability & Certifications | WovenHaat"
        description="Our slow craft commitment: 100% GOTS organic cotton, OEKO-TEX non-toxic dyes, zero-landfill recycling, and 48 artisan families empowered."
      />

      {/* 1. Hero Section */}
      <section className="sus-hero">
        <Container>
          <div className="sus-hero__inner">
            <Reveal>
              <span className="eyebrow">RESPONSIBLE BY DESIGN</span>
              <h1 className="sus-hero__title">Made slowly. Made to last.</h1>
              <p className="sus-hero__lead">
                In an era of hyper-fast polyester fashion, we believe true luxury is mindful.
                From rain-fed organic cotton farms in Kutch to solar-assisted dye halls in Panipat,
                every thread is woven with respect for our planet and generational artisans.
              </p>
              <div className="sus-hero__ctas">
                <Button as="a" href="#certifications" variant="primary">
                  Explore Certifications
                </Button>
                <Button as="a" href="#lifecycle" variant="outline">
                  Our 4-Step Lifecycle
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. Impact Stats Strip */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: "64px" }}>
        <Container>
          <Reveal>
            <div className="sus-stats-grid">
              {SUSTAINABILITY_STATS.map((stat) => (
                <div key={stat.label} className="sus-stat-card">
                  <div className="sus-stat-card__val">{stat.value}</div>
                  <div className="sus-stat-card__lbl">{stat.label}</div>
                  <p className="sus-stat-card__desc">{stat.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 3. Sustainable Materials Section */}
      <section className="section section--alt" id="materials">
        <Container>
          <Reveal>
            <SectionHeading
              label="Natural Foundations"
              title="Purity You Can Feel"
              subtitle="We refuse synthetic polyester filaments and chemical coatings. Only certified organic fibers and natural minerals touch our looms."
            />
          </Reveal>

          <div className="sus-materials-grid">
            {SUSTAINABLE_MATERIALS.map((mat, idx) => (
              <Reveal key={mat.id} delay={idx * 0.1}>
                <div className="sus-material-card">
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="sus-material-card__img"
                    loading="lazy"
                  />
                  <div className="sus-material-card__body">
                    <div className="sus-material-card__head">
                      <h3 className="sus-material-card__title">{mat.name}</h3>
                      <Tag tone={mat.tagTone}>{mat.tag}</Tag>
                    </div>
                    <p className="sus-material-card__text">{mat.description}</p>
                    <ul className="sus-material-card__list">
                      {mat.features.map((feat) => (
                        <li key={feat}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Certifications Verification Grid */}
      <section className="section" id="certifications">
        <Container>
          <Reveal>
            <SectionHeading
              label="Third-Party Audits"
              title="Verified Credentials, Not Greenwashing"
              subtitle="Transparency is non-negotiable. Every claim is substantiated by internationally accredited textile testing laboratories and ethical trade bodies."
            />
          </Reveal>

          <div className="sus-cert-grid">
            {CERTIFICATIONS.map((cert, idx) => (
              <Reveal key={cert.id} delay={idx * 0.1}>
                <div className="sus-cert-card">
                  <div className="sus-cert-card__top">
                    <div>
                      <h3 className="sus-cert-card__name">{cert.name}</h3>
                      <div className="sus-cert-card__full">{cert.fullName}</div>
                    </div>
                    <Tag tone="eco">{cert.badgeLabel}</Tag>
                  </div>

                  <div className="sus-cert-card__meta">
                    <span className="sus-cert-card__meta-item">
                      License: <strong>{cert.licenceNumber}</strong>
                    </span>
                    <span className="sus-cert-card__meta-item">
                      Valid Till: <strong>{cert.validTill}</strong>
                    </span>
                  </div>

                  <p className="sus-cert-card__summary">{cert.summary}</p>

                  <ul className="sus-cert-card__highlights">
                    {cert.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>

                  <div className="sus-cert-card__action">
                    <span className="sus-cert-card__verified">
                      <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified & Active
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCert(cert)}
                    >
                      Certificate Details
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Production Lifecycle / 4-Step Process */}
      <section className="section section--alt" id="lifecycle">
        <Container>
          <Reveal>
            <SectionHeading
              label="Slow Production"
              title="The 4-Step Conscious Lifecycle"
              subtitle="From the cotton boll to your floorboards, see how human hands replace mechanical automation at every stage."
            />
          </Reveal>

          <div className="sus-lifecycle-grid">
            {PROCESS_LIFECYCLE.map((step, idx) => (
              <Reveal key={step.step} delay={idx * 0.1}>
                <div className="sus-lifecycle-step">
                  <div className="sus-lifecycle-step__num">{step.step}</div>
                  <div className="sus-lifecycle-step__phase">{step.phase}</div>
                  <div className="sus-lifecycle-step__loc">{step.location}</div>
                  <p className="sus-lifecycle-step__desc">{step.description}</p>
                  <div className="sus-lifecycle-step__eco">{step.ecoMetric}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Water & Waste Practices Accordion */}
      <section className="section" id="water-and-waste">
        <Container>
          <div style={{ maxWidth: "860px", marginInline: "auto" }}>
            <Reveal>
              <SectionHeading
                label="Resource Stewardship"
                title="Closed-Loop Water & Zero-Waste Systems"
                subtitle="Dyeing textiles historically drained freshwater tables. Here is how our Panipat facilities reverse that equation."
              />
            </Reveal>

            <Reveal delay={0.15}>
              <div className="sus-accordion">
                {WATER_AND_WASTE_PRACTICES.map((item) => {
                  const isOpen = activeAccordion === item.id;
                  return (
                    <div key={item.id} className="sus-accordion__item">
                      <button
                        type="button"
                        className="sus-accordion__trigger"
                        aria-expanded={isOpen}
                        onClick={() => toggleAccordion(item.id)}
                      >
                        <span>{item.title}</span>
                        <svg
                          className="sus-accordion__icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="sus-accordion__body">
                          <p style={{ margin: 0 }}>{item.body}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 7. Artisan Clusters & Sourcing Map */}
      <section className="section section--alt" id="clusters">
        <Container>
          <Reveal>
            <SectionHeading
              label="Geographic Heritage"
              title="Four Historic Weaving Clusters"
              subtitle="India's textile traditions vary by micro-climate and regional raw materials. We partner with master craftspeople in their native regions."
            />
          </Reveal>

          <div className="sus-regions-grid">
            {SOURCING_REGIONS.map((region, idx) => (
              <Reveal key={region.id} delay={idx * 0.1}>
                <div className="sus-region-card">
                  <img
                    src={region.image}
                    alt={`${region.name} weaving cluster`}
                    className="sus-region-card__img"
                    loading="lazy"
                  />
                  <div className="sus-region-card__body">
                    <h3 className="sus-region-card__name">{region.name}</h3>
                    <div className="sus-region-card__craft">{region.craft}</div>
                    <p className="sus-region-card__desc">{region.specialty}</p>
                    <div className="sus-region-card__stat">
                      <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" aria-hidden="true">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      {region.families} artisan families supported
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. Call to Action */}
      <section className="section" style={{ background: "var(--color-chrome)", color: "#FFFFFF" }}>
        <Container>
          <div style={{ textAlign: "center", maxWidth: "680px", marginInline: "auto" }}>
            <Reveal>
              <span className="eyebrow" style={{ color: "var(--color-accent)" }}>
                TRANSPARENT LUXURY
              </span>
              <h2 style={{ color: "#FFFFFF", marginBottom: "var(--sp-4)" }}>
                Bring slow craftsmanship into your home
              </h2>
              <p style={{ color: "#D1C7BD", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "var(--sp-6)" }}>
                Every purchase directly finances health coverage, fair wages, and organic farming transitions
                across our partner weaving communities.
              </p>
              <div style={{ display: "flex", gap: "var(--sp-4)", justifyContent: "center", flexWrap: "wrap" }}>
                <Button as={Link} to={ROUTES.shop} variant="primary" size="lg">
                  Shop Handwoven Collection
                </Button>
                <Button as={Link} to={ROUTES.lookbook} variant="outline-light" size="lg">
                  Browse Styled Lookbook
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Certificate Modal */}
      {selectedCert && (
        <Modal
          open={Boolean(selectedCert)}
          onClose={() => setSelectedCert(null)}
          title={`${selectedCert.name} Verification`}
        >
          <div style={{ marginTop: "var(--sp-4)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", marginBottom: "var(--sp-3)" }}>
              <Tag tone="eco">Official Accreditation</Tag>
              <span style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>
                License: {selectedCert.licenceNumber}
              </span>
            </div>

            <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--color-text)", marginBottom: "var(--sp-4)" }}>
              {selectedCert.summary}
            </p>

            <div style={{ background: "var(--color-bg)", padding: "var(--sp-4)", borderRadius: "var(--radius-sm)", marginBottom: "var(--sp-4)" }}>
              <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "var(--sp-2)" }}>
                Scope of Testing & Compliance:
              </div>
              <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.85rem", color: "var(--color-muted)", lineHeight: 1.6 }}>
                {selectedCert.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--sp-3)" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--color-link)", fontWeight: 600 }}>
                Audited annually · Valid through {selectedCert.validTill}
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert(`Certificate docket #${selectedCert.licenceNumber} request logged. Formal PDF verification copy is dispatched on request.`);
                  setSelectedCert(null);
                }}
              >
                Request Certificate PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
