import { useState, useEffect, useCallback, useRef } from "react";
import Container from "../ui/Container.jsx";
import Rating from "../ui/Rating.jsx";
import { TESTIMONIALS } from "../../data/testimonials.js";

/**
 * Premium Testimonials Section — WovenHaat
 * 
 * Desktop: Horizontal split layout (25% intro | 75% three cards)
 * Tablet: Adjusted spacing, cards may stack or stay in row
 * Mobile: Stacked intro + single-card carousel with touch/swipe, keyboard nav
 * 
 * Features:
 * - Autoplay pauses on hover/focus
 * - Touch/swipe support
 * - Keyboard navigation (ArrowLeft/ArrowRight)
 * - Dots pagination
 * - Accessible ARIA labels and live regions
 */
export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [cardWidth, setCardWidth] = useState(0); // Width of one card + gap in pixels
  const [maxIndex, setMaxIndex] = useState(0);
  const autoplayRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate card width and max index when on mobile
  useEffect(() => {
    if (!isMobile || !trackRef.current) return;

    const calculateDimensions = () => {
      const track = trackRef.current;
      const container = track.parentElement;
      const cards = track.querySelectorAll('.testimonials-premium__card');
      if (cards.length === 0 || !container) return;

      // Card width = container width (viewport minus arrow padding)
      const containerRect = container.getBoundingClientRect();
      const cardWidthWithGap = containerRect.width; // Each card takes full container width
      
      // Max index = last card that can be fully visible
      const totalCards = TESTIMONIALS.length;
      const newMaxIndex = totalCards - 1;
      
      setCardWidth(cardWidthWithGap);
      setMaxIndex(newMaxIndex);
      
      // Clamp current index if needed
      if (currentIndex > newMaxIndex) {
        setCurrentIndex(newMaxIndex);
      }
    };

    // Initial calculation
    calculateDimensions();
    
    // Recalculate on resize
    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, [isMobile, currentIndex]);

  // Autoplay logic (only on mobile carousel)
  useEffect(() => {
    if (!isMobile || isHovered) return;

    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(autoplayRef.current);
  }, [isMobile, isHovered, maxIndex]);

  // Keyboard navigation (only on mobile carousel)
  useEffect(() => {
    if (!isMobile) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobile]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  }, [maxIndex]);

  // Touch/swipe handlers (only on mobile)
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!isMobile || touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      diff > 0 ? goToNext() : goToPrev();
    }
    setTouchStart(null);
  };

  // Calculate transform for carousel - use pixel values for precision
  const translateX = isMobile && cardWidth > 0 ? -currentIndex * cardWidth : 0;

  return (
    <section
      className="testimonials-premium section"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <div className="testimonials-premium__grid">
          {/* LEFT: Introduction Area (25% on desktop) */}
          <div className="testimonials-premium__intro" aria-labelledby="testimonials-heading">
            <span className="eyebrow">REAL REVIEWS</span>
            <h2 id="testimonials-heading" className="testimonials-premium__title">
              Comfort in Every Thread
            </h2>
            <p className="testimonials-premium__description">
              Our customers share their love for our fabrics, and it means the world to us.
            </p>
            <div className="testimonials-premium__stars" aria-label="5 out of 5 stars">
              <span aria-hidden="true">★★★★★</span>
            </div>
            <p className="testimonials-premium__thankyou">
              Thank you for being part of our journey!
            </p>
          </div>

          {/* RIGHT: Testimonial Cards Area (75% on desktop) */}
          <div
            className={`testimonials-premium__cards ${isMobile ? "testimonials-premium__cards--mobile" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role={isMobile ? "region" : "list"}
            aria-label={isMobile ? "Customer testimonials carousel" : "Customer testimonials"}
            aria-roledescription={isMobile ? "carousel" : undefined}
          >
            {isMobile ? (
              // MOBILE: Single card carousel
              <>
                {/* Navigation arrows */}
                <button
                  className="testimonials-premium__nav testimonials-premium__nav--prev"
                  onClick={goToPrev}
                  aria-label="Previous testimonial"
                  disabled={currentIndex === 0}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <button
                  className="testimonials-premium__nav testimonials-premium__nav--next"
                  onClick={goToNext}
                  aria-label="Next testimonial"
                  disabled={currentIndex >= maxIndex}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>

                {/* Carousel track */}
                <div 
                  className="testimonials-premium__track" 
                  ref={trackRef}
                  style={{ transform: `translateX(${translateX}px)` }}
                >
                  {TESTIMONIALS.map((testimonial) => (
                    <article key={testimonial.id} className="testimonials-premium__card" role="listitem">
                      {renderTestimonialCard(testimonial)}
                    </article>
                  ))}
                </div>

                {/* Dots pagination */}
                <div className="testimonials-premium__dots" aria-label="Slide navigation">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      className={`testimonials-premium__dot ${i === currentIndex ? "is-active" : ""}`}
                      onClick={() => goToSlide(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      aria-current={i === currentIndex ? "true" : "false"}
                    />
                  ))}
                </div>

                {/* Slide counter for accessibility */}
                <div className="testimonials-premium__counter" aria-live="polite" aria-atomic="true">
                  <span className="testimonials-premium__counter__current">{currentIndex + 1}</span>
                  <span className="testimonials-premium__counter__separator">/</span>
                  <span className="testimonials-premium__counter__total">{TESTIMONIALS.length}</span>
                </div>
              </>
            ) : (
              // DESKTOP/TABLET: Three cards in a row
              <ul className="testimonials-premium__card-list" role="list">
                {TESTIMONIALS.map((testimonial) => (
                  <li key={testimonial.id} className="testimonials-premium__card" role="listitem">
                    {renderTestimonialCard(testimonial)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Renders a single testimonial card with product image, quote, and customer info.
 */
function renderTestimonialCard({ quote, name, place, avatar, alt, productImage, productAlt, rating }) {
  return (
    <>
      {/* Product Image at top */}
      <div className="testimonials-premium__card-image-wrapper">
        <img
          className="testimonials-premium__card-image"
          src={productImage}
          alt={productAlt}
          width="600"
          height="400"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Card Content */}
      <div className="testimonials-premium__card-content">
        <blockquote className="testimonials-premium__quote">
          {quote}
        </blockquote>

        {/* Customer Footer */}
        <footer className="testimonials-premium__footer">
          <div className="testimonials-premium__customer">
            <img
              className="testimonials-premium__customer-avatar"
              src={avatar}
              alt={alt}
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
            />
            <div className="testimonials-premium__customer-info">
              <strong className="testimonials-premium__customer-name">{name}</strong>
              <span className="testimonials-premium__customer-place">{place}</span>
            </div>
          </div>

          <div className="testimonials-premium__rating-wrapper">
            <span className="testimonials-premium__verified" aria-label="Verified buyer">Verified Buyer</span>
            <Rating value={rating} size="sm" aria-label={`${rating} out of 5 stars`} />
          </div>
        </footer>
      </div>
    </>
  );
}