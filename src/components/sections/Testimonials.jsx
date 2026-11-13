import { useCallback, useEffect, useRef, useState } from "react";
import Container from "../ui/Container.jsx";
import { TESTIMONIALS } from "../../data/testimonials.js";

const AUTOPLAY_MS = 7000;
const SWIPE_PX = 48;

/**
 * Testimonials — one reviewer at a time.
 *
 * Desktop / tablet: portrait left, quote right, arrows pinned to the card
 * edges, pill pagination centred below.
 * Mobile: everything stacks and the arrows join the pagination row.
 */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
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
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
  };

  const handleTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (touchX.current === null) return;
    const delta = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > SWIPE_PX) (delta > 0 ? next : prev)();
    touchX.current = null;
    setPaused(false);
  };

  return (
    <section className="tst section" aria-labelledby="tst-title">
      <Container>
        <header className="tst__head">
          <span className="tst__rule" aria-hidden="true" />
          <h2 id="tst-title" className="tst__title">Testimonials.</h2>
          <p className="tst__sub">In their own words — from the homes these weaves live in.</p>
        </header>

        <div
          className="tst__stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <article className="tst__card" key={active.id}>
            <div className="tst__media">
              <img
                className="tst__photo"
                src={active.avatar}
                alt={active.alt}
                width="240"
                height="240"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="tst__body">
              <span className="tst__mark tst__mark--open" aria-hidden="true">&#8220;</span>
              <blockquote className="tst__quote">{active.quote}</blockquote>
              <span className="tst__mark tst__mark--close" aria-hidden="true">&#8221;</span>
              <footer className="tst__who">
                <p className="tst__name">{active.name}</p>
                <p className="tst__role">{active.place}</p>
              </footer>
            </div>
          </article>

          <div className="tst__nav">
            <button
              type="button"
              className="tst__arrow tst__arrow--prev"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <p className="visually-hidden" aria-live="polite">
              Testimonial {index + 1} of {count} — {active.name}
            </p>
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
              className="tst__arrow tst__arrow--next"
              onClick={next}
              aria-label="Next testimonial"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
