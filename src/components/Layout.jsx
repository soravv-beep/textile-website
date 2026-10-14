/**
 * <Layout /> — the wrapper every page renders inside (Dev 1).
 *
 *   <Route element={<Layout />}>
 *     <Route path={ROUTES.shop} element={<Shop />} />
 *   </Route>
 *
 * Renders: skip-to-content link → <Navbar /> → <main id="main"> <Outlet /> </main>
 * → <Footer />, plus the custom cursor and scroll restoration.
 *
 * `transparentNav` marks the routes whose first screen is a full-bleed hero
 * (only Home today) so the navbar can start transparent and become solid on
 * scroll. Add a new path to TRANSPARENT_NAV_ROUTES when a hero page ships.
 */
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import CustomCursor from "../animations/CustomCursor.jsx";
import { ROUTES } from "../constants/routes.js";

/** Routes whose first screen is a dark full-bleed hero. */
const TRANSPARENT_NAV_ROUTES = [ROUTES.home];

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
  const transparentNav = TRANSPARENT_NAV_ROUTES.includes(pathname);

  return (
    <div className={`app-shell${transparentNav ? " has-hero" : ""}`}>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar transparent={transparentNav} />

      <main id="main" className="app-main">
        <Outlet />
      </main>

      <Footer />
      <CustomCursor />
    </div>
  );
}
