import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CircleUserRound,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";

import AppLink from "../common/AppLink.jsx";
import SearchSuggest from "../common/SearchSuggest.jsx";
import Logo from "./Logo.jsx";

const SCROLL_THRESHOLD = 60;

const navigation = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["Collections", "/collections"],
  ["Bulk Orders", "/bulk-orders"],
  ["Lookbook", "/lookbook"],
  ["Journal", "/journal"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

const Header = memo(function Header({
  path = "/",
  cartCount = 0,
  wishlistCount = 0,
  transparent = false,
}) {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cartWiggle, setCartWiggle] = useState(false);

  const isActive = useCallback(
    (to) => {
      if (to === "/") {
        return path === "/";
      }
      return path === to || path.startsWith(`${to}/`);
    },
    [path],
  );

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [path]);

  useEffect(() => {
    if (!transparent) {
      setScrolled(true);
      return undefined;
    }

    const updateHeader = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, [transparent, path]);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    let timeoutId;
    const handleCartAdd = () => {
      setCartWiggle(true);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setCartWiggle(false), 620);
    };
    window.addEventListener("wovenhaat:cart-add", handleCartAdd);
    return () => {
      window.removeEventListener("wovenhaat:cart-add", handleCartAdd);
      window.clearTimeout(timeoutId);
    };
  }, []);

  const closePanels = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((current) => !current);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
    setSearchOpen(false);
  };

  const submitSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;
    closePanels();
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    setSearch("");
  };

  const headerClassName = [
    "site-header",
    scrolled ? "is-solid" : "",
    transparent && !scrolled ? "is-transparent" : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      <div className="announcement">
        <span>Free shipping above ₹2,999</span>
        <i aria-hidden="true" />
        <span>Handcrafted by Indian artisans</span>
        <i aria-hidden="true" />
        <span>Easy 14-day returns</span>
      </div>

      <header className={headerClassName}>
        <div className="container">
          <nav className="nav" aria-label="Main navigation">
            <Logo />

            <ul className="nav__menu" role="menubar">
              {navigation.map(([label, to]) => (
                <li key={to} role="none">
                  <AppLink
                    to={to}
                    end={to === "/"}
                    className={[
                      isActive(to) ? "active" : "",
                      "nav-link",
                    ].filter(Boolean).join(" ")}
                    aria-current={isActive(to) ? "page" : undefined}
                    role="menuitem"
                  >
                    {label}
                  </AppLink>
                </li>
              ))}
            </ul>

            <div className="nav__actions">
              <button
                type="button"
                className="nav__icon"
                aria-label="Search products"
                aria-expanded={searchOpen}
                aria-controls="header-search"
                onClick={toggleSearch}
              >
                <Search aria-hidden="true" />
              </button>

              <AppLink
                to="/account"
                className="nav__icon hide-small"
                ariaLabel="My account"
              >
                <CircleUserRound aria-hidden="true" />
              </AppLink>

              <AppLink
                to="/wishlist"
                className="nav__icon badge-wrap"
                ariaLabel={
                  wishlistCount > 0
                    ? `Wishlist with ${wishlistCount} items`
                    : "Wishlist, empty"
                }
              >
                <Heart aria-hidden="true" />
                {wishlistCount > 0 && (
                  <span className="nav__badge" aria-hidden="true">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </AppLink>

              <AppLink
                to="/cart"
                className={[
                  "nav__icon",
                  "badge-wrap",
                  cartWiggle ? "is-wiggling" : "",
                ].filter(Boolean).join(" ")}
                ariaLabel={
                  cartCount > 0
                    ? `Cart with ${cartCount} items`
                    : "Cart, empty"
                }
              >
                <ShoppingBag aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="nav__badge" aria-hidden="true">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </AppLink>

              <button
                type="button"
                className="nav__toggle"
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={toggleMenu}
              >
                {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </button>
            </div>
          </nav>
        </div>

        {searchOpen && (
          <div className="nav__search" id="header-search" role="search">
            <form className="header-search" onSubmit={submitSearch}>
              <SearchSuggest
                autoFocus
                value={search}
                onChange={setSearch}
                placeholder="Search rugs, cushions, throws..."
                onPick={() => setSearchOpen(false)}
              />
              <button type="submit" className="text-link">Search</button>
              <button
                type="button"
                className="nav__icon nav__search-close"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                <X aria-hidden="true" />
              </button>
            </form>
          </div>
        )}

        <div
          className={`nav__drawer${menuOpen ? " is-open" : ""}`}
          id="mobile-nav"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <button
            className="nav__drawer-close"
            aria-label="Close navigation"
            onClick={closePanels}
          >
            <X aria-hidden="true" />
          </button>
          <nav aria-label="Mobile navigation links">
            {navigation.map(([label, to]) => (
              <AppLink
                key={to}
                to={to}
                end={to === "/"}
                className={isActive(to) ? "active" : ""}
                aria-current={isActive(to) ? "page" : undefined}
                onClick={closePanels}
              >
                <span>{label}</span>
                <ArrowRight aria-hidden="true" />
              </AppLink>
            ))}
            <AppLink
              to="/account"
              className="mobile-account"
              onClick={closePanels}
            >
              <span className="mobile-account-label">
                <CircleUserRound aria-hidden="true" />
                My Account
              </span>
              <ArrowRight aria-hidden="true" />
            </AppLink>
          </nav>
        </div>
      </header>

      {menuOpen && (
        <button
          type="button"
          className="nav__scrim"
          aria-label="Close navigation menu"
          onClick={closePanels}
        />
      )}
    </>
  );
});

Header.displayName = "Header";
export default Header;