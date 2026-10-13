export const metadata = {
  title: "About WovenHaat — Our Story, Craft Process & Artisans",
  description:
    "The story of WovenHaat: 48 artisan families, a four-step craft process from fibre to finishing, fair wages, and GOTS & OEKO-TEX certified sustainable practices.",
  openGraph: {
    title: "About WovenHaat — Handcrafted Home Textiles",
    description: "The story, people and process behind every WovenHaat weave."
  }
};

const uns = (id, w, q = 70) => `https://images.unsplash.com/${id}?w=${w}&q=${q}`;

const MILESTONES = [
  { year: "2019", h: "The First Loom", p: "First collection launched in Panipat with three pit looms — 6 designs, 100 orders." },
  { year: "2021", h: "GOTS Certification", p: "Organic cotton line certified — every fibre is now traceable back to the farm." },
  { year: "2023", h: "48 Families & 62% Less Water", p: "Bhujodi and Kannur clusters joined; our dye house reduced water consumption by 62% through rainwater harvesting." },
  { year: "2025", h: "18 Countries, One Loom List", p: "Alongside exports, our D2C store went live — now serving buyers across 18+ countries, delivered straight to your home." }
];

const PROCESS = [
  { n: "01", h: "Fibre", p: "GOTS-certified organic cotton and GRS recycled yarn — ethically sourced from audited suppliers." },
  { n: "02", h: "Dyeing", p: "Low-impact and natural dyes, ETP-treated water, saving 62% water per kg of yarn." },
  { n: "03", h: "Weaving", p: "Woven by hand on pit looms — each piece takes 2–5 days, depending on design complexity." },
  { n: "04", h: "Finishing", p: "Washing, blocking, and rigorous quality checks — textile scraps are recycled, achieving zero landfill waste." }
];

const VALUES = [
  { h: "Handmade, always", p: "Zero power looms. Every rug, cushion, and throw is crafted by artisan hands — subtle irregularities are the hallmark of authentic craft, not flaws." },
  { h: "Fair work", p: "Wages well above minimum wage, well-ventilated spaces, regulated hours, and annual bonuses. 60% of our weaving units are women-led." },
  { h: "Sustainable materials", p: "Organic cotton, recycled fibres, natural dyes, and 100% plastic-free packaging — committed to zero-landfill operations." }
];

const TEAM = [
  { name: "Rameshbhai Patel", role: "Master Weaver · Bhujodi", img: "photo-1507003211169-0a1dd7228f2d", alt: "Portrait of master weaver Rameshbhai Patel", p: "35 years of master craftsmanship. Our intricate jaal and twill patterns are woven under his guidance." },
  { name: "Meera Rathore", role: "Design Lead · Jaipur", img: "photo-1573497019940-1c28c88b4f3e", alt: "Portrait of design lead Meera Rathore", p: "Curates seasonal color stories using DMC palettes — burnt orange and turquoise are her signature tones." },
  { name: "Arun Kumar", role: "Quality & Finishing · Panipat", img: "photo-1544723795-3fb6469f5b39", alt: "Portrait of quality head Arun Kumar", p: "Oversees our strict 12-point quality check — inspecting wash fastness, colorfastness, and hand-finished edges." }
];

export default function AboutPage() {
  return (
    <main id="main">
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About us</span>
          <h1>Every thread has a name behind it</h1>
          <p>
            WovenHaat was born from a simple belief: when something is made by hand,
            its story deserves to reach your home.
          </p>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="section" aria-labelledby="story-h">
        <div className="container split">
          <div className="split__media">
            <img src={uns("photo-1591195853828-11db59a44f6b", 800)} alt="Weaver at a wooden pit loom threading warp yarn" width="800" height="600" loading="lazy" />
          </div>
          <div className="split__text">
            <span className="eyebrow">Our story</span>
            <h2 id="story-h">From Panipat's looms to your living room</h2>
            <p>
              In 2019, we started with a small weaving unit in Panipat — three
              pit looms, one dye house, and an uncompromising commitment: never
              compromise on quality, and always pay fair compensation to artisans.
            </p>
            <p>
              Today, our network spans 48 artisan families across Bhuj, Bhadohi,
              and Kannur, crafting everything from rugs to curtains on traditional
              handlooms. Every order carries their name and their handcraft.
            </p>
            <a className="btn btn-secondary" href="/shop">
              See what they make
            </a>
          </div>
        </div>
      </section>

      {/* MILESTONES TIMELINE */}
      <section className="section section--alt texture" aria-labelledby="time-h">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Milestones</span>
            <h2 id="time-h">Our Journey</h2>
          </div>
          <ol className="timeline">
            {MILESTONES.map((m) => (
              <li key={m.year} className="timeline__item">
                <span className="timeline__year">{m.year}</span>
                <div>
                  <h3>{m.h}</h3>
                  <p>{m.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CRAFT PROCESS — 4 STEPS */}
      <section className="section" aria-labelledby="proc-h">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Craft process</span>
            <h2 id="proc-h">From Fibre to Finishing — Four Steps</h2>
          </div>
          <div className="grid grid--4 process-grid">
            {PROCESS.map((s) => (
              <div key={s.n} className="process-step">
                <span className="process-step__num">{s.n}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section section--alt" aria-labelledby="val-h">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">What we stand for</span>
            <h2 id="val-h">Three Promises We Never Break</h2>
          </div>
          <div className="grid grid--3">
            {VALUES.map((v) => (
              <div key={v.h} className="card card__body">
                <h3>{v.h}</h3>
                <p>{v.p}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "var(--sp-5)" }}>
            <a className="btn btn-outline" href="/sustainability">
              See certifications &amp; impact
            </a>
          </p>
        </div>
      </section>

      {/* TEAM / ARTISAN PROFILES */}
      <section className="section" aria-labelledby="team-h">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">People</span>
            <h2 id="team-h">The Hands Behind Every Weave</h2>
          </div>
          <div className="grid grid--3">
            {TEAM.map((t) => (
              <article key={t.name} className="card">
                <img src={uns(t.img, 500)} alt={t.alt} width="500" height="500" loading="lazy" style={{ aspectRatio: "1", objectFit: "cover", width: "100%" }} />
                <div className="card__body">
                  <h3>{t.name}</h3>
                  <p className="eyebrow">{t.role}</p>
                  <p>{t.p}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS STRIP + CTA */}
      <section className="section section--alt" aria-labelledby="cert-h">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Certified</span>
            <h2 id="cert-h">Trust Verified by Global Standards</h2>
            <div className="certs-strip" style={{ marginTop: "var(--sp-4)" }}>
              <span className="badge badge--outline">OEKO-TEX STANDARD 100</span>
              <span className="badge badge--outline">GOTS</span>
              <span className="badge badge--outline">GRS</span>
              <span className="badge badge--outline">ISO 9001</span>
            </div>
          </div>
          <div className="cta-band">
            <div>
              <h2>Ready to feel the weave?</h2>
              <p>Browse certified handloom textiles, or send us a bulk inquiry.</p>
            </div>
            <div className="btn-group">
              <a className="btn btn-primary" href="/shop">
                Shop the collection
              </a>
              <a className="btn btn-outline-light" href="/bulk-orders">
                Bulk enquiry
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
