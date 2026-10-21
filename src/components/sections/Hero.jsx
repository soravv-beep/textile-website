/**
 * <Hero /> — WOVENHAAT exact replica hero section.
 *
 * Features:
 *  - Full-screen height (100svh, min 520px)
 *  - Background video (with poster fallback) — uses Unsplash video source
 *  - Dark cinematic overlay (dual gradient matching WOVENHAAT)
 *  - Fine film-grain texture overlay
 *  - Magazine-style absolute-positioned content layout
 *  - Responsive breakpoints matching WOVENHAAT (1000px, 700px, 420px)
 *  - Reduced motion support (hides video, disables transitions)
 *
 * Uses target project's unsplash utility for images/video.
 */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";
import { ROUTES } from "../../constants/routes.js";
import "./Hero.css";

// WOVENHAAT headline text
const HEADLINE = ["HANDWOVEN", "WARMTH"];

// Local video file copied to public/hero-video.mp4
const HERO_VIDEO = "/hero-video.mp4";

export default function Hero() {
  const videoRef = useRef(null);
  const reduced = useReducedMotion();

  // Play background video on all screens (matching WOVENHAAT)
  // On reduced motion, never play video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const playVideo = () => {
      if (!reduced) {
        video.play().catch(() => {
          // autoplay blocked — first frame stays visible
        });
      }
    };

    playVideo();
    return () => {
      video.pause();
    };
  }, [reduced]);

  return (
    <section className="hero" aria-label="Featured collection">
      {/* Background video */}
      <video
        className="hero__video"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Dark cinematic overlay */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* Fine texture overlay */}
      <div className="hero__grain" aria-hidden="true" />

      <div className="hero__content">
        {/* Upper-right brand introduction */}
        <div className="hero__intro">
          <p className="hero__description">
            WovenHaat is a house of handwoven rugs, cushions and throws,
            made by artisan families in Panipat and shipped to 18+ countries —
            slow craft, certified materials, colours drawn from real dyed yarn.
          </p>

          <div className="hero__detail">
            <span>CRAFT</span>
            <p>Handloom, handtufted and hand-knotted pieces</p>
          </div>

          <div className="hero__detail">
            <span>CERTIFIED</span>
            <p>OEKO-TEX, GOTS and GRS certified</p>
          </div>
        </div>

       

        {/* Main headline */}
        <div className="hero__headline">
          <h1>
            <span>HANDWOVEN</span>
            <span>WARMTH</span>
          </h1>
        </div>

        {/* Collection signature */}
        <div className="hero__signature">
          <span>A COLLECTION BY</span>
          <p>WovenHaat Studio</p>
        </div>

        {/* Hero buttons */}
        <div className="hero__actions">
          <Link className="hero__button hero__button--primary" to={ROUTES.shop}>
            SHOP THE COLLECTION
          </Link>

          <Link className="hero__lookbook" to={ROUTES.collections}>
            VIEW LOOKBOOK <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Bottom labels */}
        <div className="hero__bottom-left">
          COLLECTION 12
        </div>

        <div className="hero__copyright">
          © {new Date().getFullYear()}
        </div>
      </div>
    </section>
  );
}