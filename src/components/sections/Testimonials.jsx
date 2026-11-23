import { useCallback, useEffect, useRef, useState } from "react";
import Container from "../ui/Container.jsx";
import { TESTIMONIALS } from "../../data/testimonials.js";

const AUTOPLAY_MS = 7000;
const SWIPE_PX = 48;
const TOTAL_STARS = 5;

const pad = (n) => String(n).padStart(2, "0");

/**
 * Filled / empty star row. The row is exposed as one labelled image so screen
 * readers announce the rating instead of five separate glyphs.
 */
function StarRow({ rating }) {
  return (
    <p
      className="tst__stars"
      role="img"
      aria-label={`Rated ${rating} out of ${TOTAL_STARS}`}
    >
      {Array.from({ length: TOTAL_STARS }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          className={i < rating ? "is-on" : undefined}
        >
          <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.9 6.2 20.4l1.1-6.4L2.6 9.4l6.5-.9z" />
        </svg>
      ))}
    </p>
  );
}

/** One review: portrait on the brown block + quote column. */
function Review({ item }) {
  return (
    <>
      <figure className="tst__media">
        <img
          className="tst__photo"
          src={item.avatar}
          alt={item.alt}
          width="880"
          height="1184"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="tst__body">
        <span className="tst__mark" aria-hidden="true">&#8220;</span>
        <StarRow rating={item.rating} />
        <blockquote className="tst__quote">{item.quote}</blockquote>

        <div className="tst__who">
          <p className="tst__name">{item.name}</p>
          <p className="tst__role">{item.place}</p>
        </div>
      </div>
    </>
  );
}

/**
 * Testimonials — one review per slide, with an in-place "see all" view.
 *
 * "See all testimonials" expands the section into the full list (rather than
 * linking off to a page that does not carry testimonials), and the nav row
 * carries a play/pause control for the autoplay.
 */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const touchX = useRef(null);
  const count = TESTIMONIALS.length;
  const active = TESTIMONIALS[index];

  const goTo = useCallback(
    (n) => setIndex(((n % count) + count) % count),
    [count]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!playing || hovered || showAll || count < 2) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing, hovered, showAll, count]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  };

  const handleTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchX.current === null) return;
    const delta = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > SWIPE_PX) (delta > 0 ? next : prev)();
    touchX.current = null;
  };

  return (
    <section className="tst section" aria-labelledby="tst-title">
      <Container>
        <header className="tst__head">
          <h2 id="tst-title" className="tst__title">Testimonial</h2>
          <p className="tst__sub">What our clients say about their experience</p>
        </header>

        {showAll ? (
          <>
            <ul className="tst__list">
              {TESTIMONIALS.map((item) => (
                <li key={item.id} className="tst__list-item">
                  <div className="tst__card">
                    <Review item={item} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="tst__nav">
              <button
                type="button"
                className="tst__all"
                onClick={() => setShowAll(false)}
              >
                Back to slider
              </button>
            </div>
          </>
        ) : (
          <div
            className="tst__stage"
            role="group"
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
            tabIndex={0}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <article className="tst__card" key={active.id}>
              <Review item={active} />
            </article>

            <div className="tst__foot">
              <button
                type="button"
                className="tst__all"
                onClick={() => setShowAll(true)}
              >
                See all testimonials
              </button>
              <span className="tst__count" aria-hidden="true">
                {pad(index + 1)} / {pad(count)}
              </span>
            </div>

            <div className="tst__nav">
              <button
                type="button"
                className="tst__arrow"
                onClick={prev}
                aria-label="Previous testimonial"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div className="tst__dots">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`tst__dot${i === index ? " is-active" : ""}`}
                    onClick={() => goTo(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                  />
                ))}
              </div>

              <button
                type="button"
                className="tst__arrow"
                onClick={next}
                aria-label="Next testimonial"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <button
                type="button"
                className="tst__play"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause testimonial autoplay" : "Play testimonial autoplay"}
                aria-pressed={!playing}
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <rect x="7" y="5" width="3.6" height="14" rx="1" />
                    <rect x="13.4" y="5" width="3.6" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M8 5.6l11 6.4-11 6.4z" />
                  </svg>
                )}
              </button>
            </div>

            <p className="visually-hidden" aria-live="polite">
              Testimonial {index + 1} of {count} — {active.name}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
