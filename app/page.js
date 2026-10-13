import EditorialHero from "../components/EditorialHero";
import Newsletter from "../components/Newsletter";

const CATEGORIES = [
  { slug: "rugs", name: "Rugs", img: "photo-1600607686527-6fb886090705", alt: "Handloom rugs stacked in natural tones" },
  { slug: "cushions", name: "Cushions", img: "photo-1584100936595-c0654b55a2e2", alt: "Coral and tan cushion covers on a sofa" },
  { slug: "throws", name: "Throws", img: "photo-1616627561839-074385245ff6", alt: "Folded woven throw blanket in warm beige" },
  { slug: "bath-mats", name: "Bath Mats", img: "photo-1620626011761-996317b8d101", alt: "Cotton bath mat beside a freestanding tub" },
  { slug: "table-linen", name: "Table Linen", img: "photo-1617806118233-18e1de247200", alt: "Handwoven table linen laid for dinner" },
  { slug: "curtains", name: "Curtains", img: "photo-1513694203232-719a280e022f", alt: "Sheer curtains filtering daylight" }
];

const BESTSELLERS = [
  { slug: "bhujodi-terracotta-rug", name: "Bhujodi Terracotta Rug", img: "photo-1600166898405-da9535204843", alt: "Terracotta handloom flatweave rug", badge: "best", rating: 4.5, reviews: 128, price: "₹4,890", was: "₹6,100" },
  { slug: "coral-loom-cushion-set", name: "Coral Loom Cushion Set", img: "photo-1584100936595-c0654b55a2e2", alt: "Coral cotton cushion cover pair", badge: "new", rating: 5, reviews: 86, price: "₹1,290" },
  { slug: "mocha-handloom-throw", name: "Mocha Handloom Throw", img: "photo-1616627561839-074385245ff6", alt: "Mocha wool blend throw blanket", badge: null, rating: 4, reviews: 54, price: "₹2,450" },
  { slug: "turquoise-ribbed-bath-mat", name: "Turquoise Ribbed Bath Mat", img: "photo-1620626011761-996317b8d101", alt: "Turquoise striped cotton bath mat", badge: "sale", rating: 4.5, reviews: 73, price: "₹890", was: "₹1,150" }
];

const REVIEWS = [
  { rating: 5, text: "\"The rug's texture is even better than in the photos. The color is exactly like the DMC swatch.\"", who: "— Ananya S., Bengaluru" },
  { rating: 5, text: "\"Ordered 40 cushion covers for my boutique — the sample approval process was smooth and the quality is consistent.\"", who: "— Rekha Textiles, Jaipur" },
  { rating: 4, text: "\"The bath mats are soft and quick-drying. Delivered within 3 days, and the packaging was plastic-free too.\"", who: "— Karan M., Pune" }
];

const uns = (id, w, q = 70) => `https://images.unsplash.com/${id}?w=${w}&q=${q}`;

function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}

export default function HomePage() {
  return (
    <main id="main">
      <EditorialHero />

      {/* CATEGORIES */}
      <section className="section" aria-labelledby="cat-h">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Shop by category</span>
            <h2 id="cat-h">Find your weave</h2>
          </div>
          <div className="grid grid--3 cat-grid">
            {CATEGORIES.map((c) => (
              <a key={c.slug} className="cat-tile" href={`/collections#${c.slug}`}>
                <img src={uns(c.img, 600)} alt={c.alt} width="600" height="450" loading="lazy" />
                <span className="cat-tile__label">{c.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="section section--alt texture" aria-labelledby="best-h">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Loved by homes</span>
            <h2 id="best-h">Bestsellers</h2>
            <p>Every weave has its own name, its own story.</p>
          </div>

          {/* NOTE: Placeholder product cards; to be replaced with product-card component */}
          <div className="grid grid--4" id="bestseller-grid">
            {BESTSELLERS.map((p) => (
              <article key={p.slug} className="card product-card">
                <a href={`/product/${p.slug}`} className="product-card__media">
                  <img src={uns(p.img, 500)} alt={p.alt} width="500" height="500" loading="lazy" />
                  {p.badge === "best" && <span className="badge badge--best">Bestseller</span>}
                  {p.badge === "new" && <span className="badge badge--new">New</span>}
                  {p.badge === "sale" && <span className="badge badge--sale">Sale</span>}
                </a>
                <div className="card__body">
                  <h3 className="product-card__title">
                    <a href={`/product/${p.slug}`}>{p.name}</a>
                  </h3>
                  <p className="product-card__meta">
                    <Stars rating={p.rating} /> ({p.reviews})
                  </p>
                  <p className="product-card__price">
                    {p.price} {p.was && <s>{p.was}</s>}
                  </p>
                  <button className="btn btn-primary btn-sm btn-block" type="button">
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>

          <p style={{ textAlign: "center", marginTop: "var(--sp-6)" }}>
            <a className="btn btn-outline" href="/shop">
              View all products
            </a>
          </p>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="section" aria-label="Why shop with us">
        <div className="container">
          <div className="trust-strip">
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
              <strong>Certified Safe</strong>
              <span>OEKO-TEX, GOTS &amp; GRS</span>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 7h11v8H3z" /><path d="M14 10h4l3 3v2h-7z" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
              <strong>Free Shipping</strong>
              <span>Orders above ₹1499</span>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></svg>
              <strong>Easy Returns</strong>
              <span>7-day no-question returns</span>
            </div>
            <div className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
              <strong>Secure Payment</strong>
              <span>UPI, cards, COD</span>
            </div>
          </div>
        </div>
      </section>

      {/* CRAFT STORY TEASER */}
      <section className="section section--alt" aria-labelledby="craft-h">
        <div className="container split">
          <div className="split__media">
            <img src={uns("photo-1591195853828-11db59a44f6b", 800)} alt="Artisan working at a wooden pit loom" width="800" height="600" loading="lazy" />
          </div>
          <div className="split__text">
            <span className="eyebrow">The craft story</span>
            <h2 id="craft-h">Four steps from fibre to your floor</h2>
            <p>
              Fibre, dyeing, weaving, finishing — every step is handcrafted, bearing the
              artisan's name on every piece. Our 48 weaver families work with fair wages
              and safe working conditions.
            </p>
            <a className="btn btn-secondary" href="/about">
              Read our story
            </a>
          </div>
        </div>
      </section>

      {/* LOOKBOOK + JOURNAL PREVIEW */}
      <section className="section" aria-labelledby="preview-h">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Inspiration</span>
            <h2 id="preview-h">Styled rooms &amp; craft stories</h2>
          </div>
          <div className="grid grid--2">
            <a className="preview-card" href="/lookbook">
              <img src={uns("photo-1616486338812-3dadae4b4ace", 700)} alt="Boho living room styled with layered rugs and cushions" width="700" height="460" loading="lazy" />
              <div className="preview-card__overlay">
                <span className="eyebrow">Lookbook</span>
                <h3>Rooms woven with intention</h3>
                <span className="preview-card__cta">Shop the look →</span>
              </div>
            </a>
            <a className="preview-card" href="/journal">
              <img src={uns("photo-1528459801416-a9e53bbf4e17", 700)} alt="Spools of coloured yarn in burnt orange and turquoise" width="700" height="460" loading="lazy" />
              <div className="preview-card__overlay">
                <span className="eyebrow">Journal</span>
                <h3>Decorating with Burnt Orange &amp; Turquoise</h3>
                <span className="preview-card__cta">Read the story →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section--alt" aria-labelledby="rev-h">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Customer reviews</span>
            <h2 id="rev-h">What homes are saying</h2>
          </div>
          <div className="grid grid--3">
            {REVIEWS.map((r, i) => (
              <blockquote key={i} className="card card__body review">
                <p className="stars" aria-label={`${r.rating} out of 5 stars`}>
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </p>
                <p>{r.text}</p>
                <footer>{r.who}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
