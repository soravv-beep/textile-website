/**
 * About Us page (Dev 1).
 *
 * Sections: brand story → numbers strip → milestones timeline → artisan
 * families → values → certifications explained → founder note → CTA to Shop /
 * Contact. Content is the existing WovenHaat copy, restructured onto the new
 * design system.
 *
 * TODO(team): replace the three artisan portraits with real photographs of the
 * Panipat / Bhujodi / Kannur families (consent on file) before launch.
 */
import { Link } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import Container from "../components/ui/Container.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import Tag from "../components/ui/Tag.jsx";
import Reveal from "../animations/Reveal.jsx";
import { ROUTES } from "../constants/routes.js";
import { unsplash } from "../utils/images.js";

/** The four photographs in the brand band's collage. */
const TILES = {
  carpets: "/bulk-order-carpets.jpg",
  throws: unsplash("photo-1616486338812-3dadae4b4ace", 900),
  sofa: unsplash("photo-1616627561839-074385245ff6", 900),
  loom: unsplash("photo-1591195853828-11db59a44f6b", 1200)
};

const NUMBERS = [
  { value: "18+", label: "Countries shipped" },
  { value: "48", label: "Artisan families" },
  { value: "7", label: "Years of weaving" },
  { value: "0", label: "Power looms" }
];

const MILESTONES = [
  {
    year: "2019",
    title: "The first loom",
    body: "First collection launched in Panipat with three pit looms — 6 designs, 100 orders."
  },
  {
    year: "2021",
    title: "GOTS certification",
    body: "The organic cotton line was certified — every fibre is now traceable back to the farm."
  },
  {
    year: "2023",
    title: "48 families, 62% less water",
    body: "Bhujodi and Kannur clusters joined; our dye house cut water use by 62% through rainwater harvesting."
  },
  {
    year: "2026",
    title: "18 countries, one loom list",
    body: "Alongside exports, our D2C store now serves buyers in 18+ countries, delivered straight home."
  }
];

const ARTISANS = [
  {
    name: "Rameshbhai Patel",
    craft: "Master weaver · Bhujodi",
    image: unsplash("photo-1507003211169-0a1dd7228f2d", 500),
    alt: "Portrait of master weaver Rameshbhai Patel",
    body: "35 years at the loom. Our intricate jaal and twill patterns are woven under his guidance."
  },
  {
    name: "Meera Rathore",
    craft: "Design lead · Jaipur",
    image: unsplash("photo-1573497019940-1c28c88b4f3e", 500),
    alt: "Portrait of design lead Meera Rathore",
    body: "Curates the seasonal colour stories using DMC palettes — burnt orange and turquoise are her signature tones."
  },
  {
    name: "Arun Kumar",
    craft: "Quality & finishing · Panipat",
    image: unsplash("photo-1544723795-3fb6469f5b39", 500),
    alt: "Portrait of quality head Arun Kumar",
    body: "Runs our 12-point quality check — wash fastness, colourfastness and hand-finished edges."
  }
];

const VALUES = [
  {
    title: "Handmade, always",
    body: "Zero power looms. Every rug, cushion and throw is made by hand — subtle irregularities are the hallmark of authentic craft, not flaws."
  },
  {
    title: "Fair work",
    body: "Wages above the local minimum, well-ventilated spaces, regulated hours and annual bonuses. 60% of our weaving units are women-led."
  },
  {
    title: "Certified materials",
    body: "Organic cotton, recycled fibres and natural dyes, with 100% plastic-free packaging and a zero-landfill commitment."
  }
];

const CERTS = [
  {
    code: "OEKO-TEX Standard 100",
    body: "Every finished textile is tested for harmful substances — safe against skin, including for children's rooms."
  },
  {
    code: "GOTS",
    body: "Our organic cotton is certified from farm to finished product, with traceability at every stage."
  },
  {
    code: "GRS",
    body: "Global Recycled Standard verifies the recycled content in our yarn and our chain of custody."
  }
];

export default function About() {
  return (
    <div className="about-page">
      <PageMeta
        title="About WovenHaat — Our Story, Artisans & Certifications"
        description="WovenHaat's story: artisan families in Panipat, a fibre-to-finish craft process, fair wages and OEKO-TEX, GOTS & GRS certified materials."
      />

      {/* ============================================================
          BRAND BAND — studio intro + origin story.
          The page paints no backdrop of its own; the site-wide carpet
          layer shows through, so this band only carries its top/bottom
          spacing. Palette is sampled from the Canva mock-ups.
          ============================================================ */}
      <div className="about-band">
        {/* WHO WE ARE — ochre banner card with a three-photo collage that
            breaks out of the card's bottom edge. */}
        <section className="about-who" aria-labelledby="who-h">
          <Container>
            <div className="about-who__card">
              <div className="about-who__lead">
                <span className="about-who__eyebrow">WovenHaat Studio</span>
                <h1 id="who-h" className="about-who__title">Who We Are&nbsp;?</h1>
              </div>

              {/* Tall carpet wall: the spine of the collage, deliberately
                  allowed to overflow the card below its border. */}
              <figure className="about-who__tile about-who__tile--tall">
                <img
                  src={TILES.carpets}
                  alt="Rolls of handwoven carpet standing against a hanging rug in the studio"
                  width="900"
                  height="1200"
                  decoding="async"
                />
              </figure>

              <figure className="about-who__tile about-who__tile--fold">
                <img
                  src={TILES.throws}
                  alt="Handwoven throws and cushions neatly folded in sunlight"
                  width="900"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>

            <div className="about-who__below">
              <figure className="about-who__tile about-who__tile--sofa">
                <img
                  src={TILES.sofa}
                  alt="Living room sofa styled with layered cushions and a mocha throw"
                  width="900"
                  height="640"
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <div className="about-who__note">
                <p>
                  Every thread has a name behind it. WovenHaat was born from a simple
                  belief: when something is made by hand, its story deserves to reach
                  your home.
                </p>
                <Link className="about-who__handle" to={ROUTES.shop}>
                  @madebysorav
                  <span className="about-who__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12h15m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* OUR STORY — ochre text card on the left, loom photo and the
            maroon CTA stacked on the right. */}
        <section className="about-story" aria-labelledby="story-h">
          <Container className="about-story__inner">
            <Reveal from="left" className="about-story__card">
              <span className="about-story__eyebrow">Our story</span>
              <h2 id="story-h">From Panipat&rsquo;s looms to your living room</h2>
              <p>
                In 2019 we started with a small weaving unit in Panipat — three pit looms,
                one dye house, and one uncompromising rule: never compromise on quality,
                and always pay fairly for the work.
              </p>
              <p>
                Today our network spans 48 artisan families across Bhuj, Bhadohi and
                Kannur, crafting rugs, cushions and throws on traditional handlooms. Every
                order carries their name and their handcraft.
              </p>
            </Reveal>

            <div className="about-story__media">
              <img
                src={TILES.loom}
                alt="Weaver working at an authentic wooden pit loom in Bhujodi"
                width="1200"
                height="900"
                decoding="async"
              />
              <Button as={Link} to={ROUTES.shop} variant="secondary" className="about-story__cta">
                See what they make
              </Button>
            </div>
          </Container>
        </section>
      </div>

      {/* NUMBERS */}
      <section className="section section--alt texture" aria-label="WovenHaat by the numbers">
        <Container>
          <Reveal stagger={0.08} className="numbers-strip">
            {NUMBERS.map((item) => (
              <div className="numbers-strip__item" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* TIMELINE */}
      <section className="section" aria-labelledby="time-h">
        <Container>
          <SectionHeading id="time-h" align="center" label="Milestones" title="Our journey" />
          <ol className="timeline">
            {MILESTONES.map((item) => (
              <li className="timeline__item" key={item.year}>
                <span className="timeline__year">{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ARTISANS */}
      <section className="section section--alt" aria-labelledby="team-h">
        <Container>
          <SectionHeading
            id="team-h"
            align="center"
            label="The people"
            title="Hands behind every weave"
            subtitle="Wages, hours and working conditions are audited every year — these are the people the audit protects."
          />
          <Reveal stagger={0.1} className="grid grid--3">
            {ARTISANS.map((person) => (
              <Card as="article" key={person.name} padded={false} className="artisan-card">
                <img
                  className="artisan-card__photo"
                  src={person.image}
                  alt={person.alt}
                  width="500"
                  height="500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="card__body">
                  <h3>{person.name}</h3>
                  <p className="eyebrow artisan-card__craft">{person.craft}</p>
                  <p>{person.body}</p>
                </div>
              </Card>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* VALUES */}
      <section className="section" aria-labelledby="val-h">
        <Container>
          <SectionHeading
            id="val-h"
            align="center"
            label="What we stand for"
            title="Three promises we never break"
          />
          <Reveal stagger={0.1} className="grid grid--3">
            {VALUES.map((value) => (
              <Card as="article" key={value.title} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </Card>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* CERTIFICATIONS */}
      <section className="section section--alt" aria-labelledby="cert-h">
        <Container>
          <SectionHeading
            id="cert-h"
            align="center"
            label="Certified"
            title="Trust, verified by global standards"
            subtitle="Audited by third parties, not by us — certificates are available on request for any order."
          />
          <div className="grid grid--3">
            {CERTS.map((cert) => (
              <Card as="article" key={cert.code} className="cert-card">
                <Tag tone="outline">{cert.code}</Tag>
                <p>{cert.body}</p>
              </Card>
            ))}
          </div>
          <div className="section-cta">
            <Button as={Link} to={ROUTES.sustainability} variant="outline">
              See our sustainability report
            </Button>
          </div>
        </Container>
      </section>

      {/* FOUNDER NOTE */}
      <section className="section" aria-labelledby="founder-h">
        <Container>
          <Card className="founder-card" radius={24}>
            <span className="eyebrow">A note from the founder</span>
            <h2 id="founder-h">We measure success in looms still running</h2>
            <p>
              "We started WovenHaat because the weavers we grew up around were being
              priced out by power looms. Seven years later, 48 families still work from
              their own looms, on their own terms. That is the number we protect."
            </p>
            <footer className="founder-card__sign">
              <strong>Sorav</strong>
              <span>Founder, WovenHaat</span>
            </footer>
          </Card>
        </Container>
      </section>

      {/* CTA */}
      <section className="section" aria-label="Next steps">
        <Container>
          <div className="cta-band">
            <div>
              <h2>Ready to feel the weave?</h2>
              <p>Browse certified handloom textiles, or send us a bulk enquiry.</p>
            </div>
            <div className="btn-group">
              <Button as={Link} to={ROUTES.shop} variant="primary" arrow>
                Shop the collection
              </Button>
              <Button as={Link} to={ROUTES.contact} variant="outline-light">
                Contact us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
