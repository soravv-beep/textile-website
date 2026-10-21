/**
 * <Layout /> — the wrapper every page renders inside.
 *
 *   <Route element={<Layout />}>
 *     <Route path={ROUTES.shop} element={<Shop />} />
 *   </Route>
 *
 * Renders: skip-to-content link → <Navbar /> → <main id="main"> <Outlet /> </main>
 * → <Footer />, plus the custom cursor and scroll restoration.
 *
 * The Navbar handles its own transparency logic internally (transparent on
 * Home page, solid on scroll > 40px, solid on all other pages).
 * Layout adds `has-hero` class on routes with full-bleed heroes so the
 * hero section can sit behind the transparent navbar.
 */
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import CustomCursor from "../../animations/CustomCursor.jsx";
import { ROUTES } from "../../constants/routes.js";

/** Routes whose first screen is a full-bleed hero (transparent navbar). */
const HERO_ROUTES = [ROUTES.home];

/** Scroll to the top on route change (but not on hash links within a page). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  const { pathname } = useLocation();
  const hasHero = HERO_ROUTES.includes(pathname);

  return (
    <div className={`app-shell${hasHero ? " has-hero" : ""}`}>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="app-main">
        <Outlet />
      </main>

      <Footer />
      <CustomCursor />
    </div>
  );
}
