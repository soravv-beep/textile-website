/**
 * <EditorialHero /> — home page hero (magazine-cover composition).
 *
 * Desktop: full-bleed photo, mouse parallax at three depths, magazine grid.
 * Mobile (<640px): background video with poster fallback, bottom-pinned block.
 *
 * Legibility: the overlay is slightly darker under the copy, the brand
 * paragraph is 15–16px at 0.92 opacity, the CRAFT/CERTIFIED labels are Tan
 * (accent) instead of muted grey, and the headline uses -1.5% letter-spacing.
 *
 * @param {object} props
 * @param {string} [props.image] hero photo URL
 * @param {string} [props.videoSrc] mobile background video
 * @param {string} [props.poster] video poster
 */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { ROUTES, SOCIALS } from "../constants/routes.js";
import { unsplash } from "../utils/images.js";
import { useParallax } from "../animations/useParallax.js";
import { useReducedMotion } from "../animations/useReducedMotion.js";

const HEADLINE = ["Handwoven", "Warmth"];

const HERO_IMAGE = `${unsplash("photo-1616486338812-3dadae4b4ace", 2000, 80)}`;
const HERO_VIDEO = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function EditorialHero() {
  const parallaxRef = useParallax();
  const videoRef = useRef(null);
  const reduced = useReducedMotion();

  // Mobile only: play the background video; pause it on desktop to save bandwidth.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const sync = () => {
      if (window.innerWidth < 640 && !reduced) {
        video.play().catch(() => {
          /* autoplay blocked — the poster stays visible */
        });
      } else {
        video.pause();
      }
    };

    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [reduced]);

  return (
    <section className="ed-hero" aria-label="Featured collection" ref={parallaxRef}>
      {/* Desktop / tablet: full-bleed photo with parallax + Ken Burns */}
      <div className="ed-hero__bg" data-depth="14">
        <img
          className="ed-hero__photo"
          src={HERO_IMAGE}
          alt="Moody styled living room with a handwoven rug, cushions and a throw"
          width="2000"
          height="1333"
          fetchPriority="high"
        />
      </div>

      {/* Mobile: background video (poster first, muted, looping) */}
      <video
        className="ed-hero__video"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={unsplash("photo-1616486338812-3dadae4b4ace", 1000)}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div className="ed-hero__overlay" aria-hidden="true" />
      <div className="ed-hero__grain" aria-hidden="true" />

      <div className="ed-hero__content">
        {/* LEFT: social counters */}
        <section className="ed-socials ed-fade" aria-label="Social channels" data-depth="-6">
          <ul>
            {SOCIALS.map((social) => (
              <li key={social.key}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label} <span>{social.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* RIGHT: brand paragraph + CRAFT / CERTIFIED rows */}
        <section className="ed-info ed-fade" aria-label="About WovenHaat" data-depth="8">
          <p>
            WovenHaat is a house of handwoven rugs, cushions and throws, made by
            artisan families in Panipat and shipped to 18+ countries — slow craft,
            certified materials, colours drawn from real dyed yarn.
          </p>
          <dl>
            <div>
              <dt>Craft</dt>
              <dd>Handloom, handtufted and hand-knotted pieces</dd>
            </div>
            <div>
              <dt>Certified</dt>
              <dd>OEKO-TEX, GOTS and GRS certified</dd>
            </div>
          </dl>
        </section>

        {/* Mobile-only label */}
        <p className="ed-m-label ed-fade">New Collection</p>

        {/* HEADLINE — per-letter hover + mask reveal */}
        <div className="ed-headline" data-depth="10">
          <span className="ed-counter" aria-hidden="true">
            (48)
          </span>
          <h1>
            {HEADLINE.map((word) => (
              <span className="ed-line" key={word}>
                <span>
                  <span className="ed-word">
                    {word.split("").map((letter, index) => (
                      <span className="ed-letter" key={`${letter}-${index}`}>
                        {letter}
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* Mobile-only short line + stacked CTAs */}
        <section className="ed-m-cta" aria-label="Shop the collection">
          <p className="ed-m-text ed-fade">
            Handcrafted rugs, cushions and throws, made by artisans and shipped worldwide.
          </p>
          <div className="ed-m-btns ed-fade">
            <Link className="ed-btn ed-btn--primary" to={ROUTES.shop}>
              Shop the Collection
            </Link>
            <Link className="ed-btn ed-btn--ghost" to={ROUTES.bulkOrders}>
              Bulk Orders
            </Link>
          </div>
        </section>

        {/* DESKTOP: credit + CTAs */}
        <section className="ed-credit ed-fade" aria-label="Collection credit and actions">
          <p className="ed-by">A Collection by</p>
          <p className="ed-studio">WovenHaat Studio</p>
          <div className="ed-cta-row">
            <Link className="ed-btn ed-btn--primary" to={ROUTES.shop}>
              Shop the Collection
            </Link>
            <Link className="ed-lookbook" to={ROUTES.lookbook}>
              View Lookbook <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <div className="ed-corners ed-fade">
          <span>Collection 12</span>
          <span>® {new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  );
}
