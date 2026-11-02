/**
 * <Hero /> — WOVENHAAT editorial hero section.
 *
 * Features:
 *  - Full-screen height (100svh, min 520px)
 *  - Background video (with poster fallback) at full opacity — no darkening layer,
 *    so the footage keeps its original colours
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

      {/* Fine texture overlay */}
      <div className="hero__grain" aria-hidden="true" />

      <div className="hero__content">
        {/* No visible headline any more, but the page still needs its h1 for
            screen readers and search results. */}
        <h1 className="visually-hidden">WovenHaat — handwoven rugs, cushions and throws</h1>

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