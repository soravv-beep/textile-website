"use client";

import { useEffect, useRef } from "react";

/**
 * Editorial hero (magazine-cover style).
 * Desktop: full-bleed photo + parallax, magazine grid composition.
 * Mobile (<640px): background video, bottom-pinned label/heading/text/CTAs.
 * JS: mobile video play/pause sync + desktop cursor parallax (reduced-motion aware).
 */
export default function EditorialHero() {
  const bgRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const bg = bgRef.current;
    if (!video || !bg) return;

    const hero = bg.closest(".ed-hero");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // video: play <640px, pause on desktop (save bandwidth)
    const syncVideo = () => {
      if (window.innerWidth < 640 && !reduce) {
        video.play().catch(() => {
          /* autoplay blocked → poster remains visible */
        });
      } else {
        video.pause();
      }
    };
    syncVideo();
    window.addEventListener("resize", syncVideo);

    // parallax: photo moves opposite to cursor max 20px (desktop, fine pointer, motion allowed)
    let cleanupParallax = () => {};
    if (hero && !reduce && window.matchMedia("(pointer: fine)").matches) {
      let tX = 0,
        tY = 0,
        cX = 0,
        cY = 0,
        raf = null;
      const follow = () => {
        cX += (tX - cX) * 0.08;
        cY += (tY - cY) * 0.08;
        bg.style.transform = `translate(${cX.toFixed(2)}px,${cY.toFixed(2)}px)`;
        if (Math.abs(tX - cX) > 0.1 || Math.abs(tY - cY) > 0.1) {
          raf = requestAnimationFrame(follow);
        } else {
          raf = null;
        }
      };
      const onMove = (e) => {
        const r = hero.getBoundingClientRect();
        tX = -((e.clientX - r.left) / r.width - 0.5) * 40; // ±20px opposite
        tY = -((e.clientY - r.top) / r.height - 0.5) * 40;
        if (!raf) raf = requestAnimationFrame(follow);
      };
      hero.addEventListener("mousemove", onMove);
      cleanupParallax = () => {
        hero.removeEventListener("mousemove", onMove);
        if (raf) cancelAnimationFrame(raf);
      };
    }

    return () => {
      window.removeEventListener("resize", syncVideo);
      cleanupParallax();
    };
  }, []);

  return (
    <section className="ed-hero" aria-label="Featured collection">
      {/* Desktop/laptop: full-bleed photo (parallax wrapper + Ken Burns) */}
      <div className="ed-hero__bg" ref={bgRef}>
        <img
          className="ed-hero__photo"
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=80"
          alt="Moody styled living room with a handwoven rug, cushions and a throw"
          width="2000"
          height="1333"
          fetchPriority="high"
        />
      </div>

      {/* Mobile: background video (poster first, muted/loop) */}
      <video
        className="ed-hero__video"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=70"
        aria-hidden="true"
      >
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>

      <div className="ed-hero__overlay" aria-hidden="true" />
      <div className="ed-hero__grain" aria-hidden="true" />

      <div className="ed-hero__content">
        {/* LEFT: social links */}
        <section className="ed-socials ed-fade" aria-label="Social channels">
          <ul>
            <li>
              <a href="https://instagram.com" rel="noopener">
                Instagram <span>(67K)</span>
              </a>
            </li>
            <li>
              <a href="https://pinterest.com" rel="noopener">
                Pinterest <span>(12K)</span>
              </a>
            </li>
            <li>
              <a href="https://youtube.com" rel="noopener">
                YouTube <span>(5K)</span>
              </a>
            </li>
          </ul>
        </section>

        {/* RIGHT: brand paragraph + info list */}
        <section className="ed-info ed-fade" aria-label="About WovenHaat">
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

        {/* MOBILE-ONLY label (hidden on desktop) */}
        <p className="ed-m-label ed-fade">New Collection</p>

        {/* HEADING (bottom-left, mask reveal) */}
        <div className="ed-headline">
          <span className="ed-counter" aria-hidden="true">
            (48)
          </span>
          <h1>
            <span className="ed-line">
              <span>Handwoven</span>
            </span>
            <span className="ed-line">
              <span>Warmth</span>
            </span>
          </h1>
        </div>

        {/* MOBILE-ONLY short line + stacked CTAs */}
        <section className="ed-m-cta" aria-label="Shop the collection">
          <p className="ed-m-text ed-fade">
            Handcrafted rugs, cushions and throws, made by artisans and shipped worldwide.
          </p>
          <div className="ed-m-btns ed-fade">
            <a className="ed-btn ed-btn--primary" href="/shop">
              Shop the Collection
            </a>
            <a className="ed-btn ed-btn--ghost" href="/bulk-orders">
              Bulk Orders
            </a>
          </div>
        </section>

        {/* DESKTOP: credit + CTAs (bottom-right) */}
        <section className="ed-credit ed-fade" aria-label="Collection credit and actions">
          <p className="ed-by">A Collection by</p>
          <p className="ed-studio">WovenHaat Studio</p>
          <div className="ed-cta-row">
            <a className="ed-btn ed-btn--primary" href="/shop">
              Shop the Collection
            </a>
            <a className="ed-lookbook" href="/lookbook">
              View Lookbook <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* Bottom corners */}
        <div className="ed-corners ed-fade">
          <span>Collection 12</span>
          <span>® 2026</span>
        </div>
      </div>
    </section>
  );
}
