/**
 * <Navbar /> — fixed header shared by every page (Dev 1).
 *
 * Behaviour:
 *  - fixed to the top, includes the announcement bar,
 *  - over the HOME hero it starts fully TRANSPARENT with light text and turns
 *    solid --color-chrome (the same colour as the footer) with a soft shadow +
 *    backdrop blur after ~60px of scroll, and returns to transparent at the top,
 *  - on every other route it is solid from the first paint,
 *  - active route gets the burnt-orange underline,
 *  - cart icon shows the item count from CartContext (Dev 3 replaces the source).
 *
 * Accessibility: aria-labels on icon buttons, Esc closes the drawer/search,
 * focus trap + body scroll lock while open (provided by <Overlay />), skip link
 * lives in <Layout />.
 *
 * Props: `transparent` — set by Layout on routes with a hero (home) so the nav
 * knows it may start transparent.
 */
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { NAV_LINKS, ROUTES } from "../constants/routes.js";
import { useCart } from "../context/CartContext.jsx";
import { Overlay } from "./ui/index.js";
import { IconButton } from "./ui/index.js";
import { useNavUnderline } from "../animations/useNavUnderline.js";

const SCROLL_THRESHOLD = 60;

const ICONS = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  wishlist: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 21s-7.5-4.8-9.5-9A5.4 5.4 0 0 1 12 6.5 5.4 5.4 0 0 1 21.5 12c-2 4.2-9.5 9-9.5 9Z" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6h15l-1.5 9h-12z" />
      <path d="M6 6 5 3H2" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
};

/** One nav link with the underline that slides in from the cursor's side. */
function NavItem({ link, onClick }) {
  const attachUnderline = useNavUnderline();
  return (
    <li>
      <NavLink
        ref={attachUnderline}
        to={link.to}
        end={link.to === "/"}
        onClick={onClick}
        className="nav__link"
      >
        {link.label}
      </NavLink>
    </li>
  );
}

export default function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // reset panels on navigation
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // transparent → solid on scroll (only meaningful when the route has a hero)
  useEffect(() => {
    if (!transparent) {
      setScrolled(true);
      return undefined;
    }
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent, pathname]);

  // Esc closes the search overlay (drawer handles its own Esc via <Overlay />)
  useEffect(() => {
    if (!searchOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  const submitSearch = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    // Search results page is owned by Dev 2 — route the query to the shop page.
    navigate(`${ROUTES.shop}?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <>
      <header className={`site-header${scrolled ? " is-solid" : ""}`}>
        <div className="announce">
          Free shipping above ₹1499 · Easy 7-day returns ·{" "}
          <Link to={ROUTES.bulkOrders}>Bulk orders → get a quote</Link>
        </div>

        <div className="container nav">
          <Link to={ROUTES.home} className="nav__logo">
            Woven<span>Haat</span>
          </Link>

          <nav aria-label="Main">
            <ul className="nav__menu">
              {NAV_LINKS.map((link) => (
                <NavItem key={link.to} link={link} />
              ))}
            </ul>
          </nav>

          <div className="nav__actions">
            <IconButton
              label="Search products"
              tone="light"
              className="nav__icon"
              aria-haspopup="dialog"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen(true)}
            >
              {ICONS.search}
            </IconButton>

            <Link to={ROUTES.wishlist} className="nav__icon" aria-label="Wishlist">
              {ICONS.wishlist}
            </Link>

            <Link
              to={ROUTES.cart}
              className="nav__icon"
              aria-label={count > 0 ? `Cart, ${count} items` : "Cart, empty"}
            >
              {ICONS.cart}
              {count > 0 && (
                <span className="nav__badge" aria-hidden="true">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>

            <IconButton
              label={menuOpen ? "Close menu" : "Open menu"}
              tone="light"
              className="nav__icon nav__toggle"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              {ICONS.menu}
            </IconButton>
          </div>
        </div>
      </header>

      {/* Mobile slide-in drawer (focus trap, Esc, body scroll lock via Overlay) */}
      <Overlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        label="Site menu"
        position="drawer-right"
        className="nav-drawer"
      >
        <nav aria-label="Mobile">
          <ul className="nav-drawer__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === "/"} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to={ROUTES.account} onClick={() => setMenuOpen(false)}>
                My Account
              </NavLink>
            </li>
          </ul>
        </nav>
      </Overlay>

      {/* Search overlay */}
      <Overlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        label="Search products"
        position="modal"
        className="nav-search-overlay"
      >
        <form className="nav__search" onSubmit={submitSearch} role="search">
          <label className="visually-hidden" htmlFor="nav-search-input">
            Search products
          </label>
          <input
            id="nav-search-input"
            type="search"
            name="q"
            placeholder="Search rugs, cushions, throws…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
      </Overlay>
    </>
  );
}
