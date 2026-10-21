
/**
 * WOVENHAAT Navbar
 *
 * Stage 1 (0–40px):
 * Announcement + logo + navigation visible.
 *
 * Stage 2 (41–350px):
 * Announcement slides away; logo + navigation remain visible.
 *
 * Stage 3 (351px+):
 * Desktop: only navigation remains fixed at the top.
 * Mobile/tablet: compact header controls remain available.
 */
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MAIN_NAV, MEGA } from '../../data/navigation.js';
import { CATEGORIES } from '../../data/collections.js';
import { useCart } from '../../context/CartContext.jsx';
import SearchModal from '../sections/SearchModal.jsx';
import './Navbar.css';

const MENU_IMAGES = {
  rugs: {
    feature: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=850&q=85',
    detail: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=450&q=85',
    side: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=85',
  },
  carpets: {
    feature: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=850&q=85',
    detail: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=450&q=85',
    side: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=600&q=85',
  },
  throws: {
    feature: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=850&q=85',
    detail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=450&q=85',
    side: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=85',
  },
  'table-linen': {
    feature: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=850&q=85',
    detail: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=450&q=85',
    side: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=85',
  },
  'bath-mats': {
    feature: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=850&q=85',
    detail: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=450&q=85',
    side: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=600&q=85',
  },
};

export default function Navbar() {
  const { count } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isHomePage = pathname === '/';

  const [row, setRow] = useState(false);
  const [cat, setCat] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [acc, setAcc] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollStage, setScrollStage] = useState(0);

  // Three-stage scroll detection.
  // Stage 2 now lasts until the user scrolls beyond 350px.
  useEffect(() => {
    let ticking = false;

    const updateStage = () => {
      const scrollY = window.scrollY;

      if (scrollY <= 40) {
        setScrollStage(0);
      } else if (scrollY <= 550) {
        setScrollStage(1);
      } else {
        setScrollStage(2);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateStage);
        ticking = true;
      }
    };

    updateStage();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const closeMega = () => {
    setRow(false);
    setCat(null);
  };

  const closeAll = () => {
    closeMega();
    setDrawer(false);
    setAcc(null);
    setSearchOpen(false);
  };

  const go = () => {
    closeAll();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeAll();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [drawer]);

  const openCategory = (slug) => {
    setCat(slug);
    setRow(true);
  };

  const activeCategory = CATEGORIES.find(
    (category) => category.slug === cat
  );

  const activeImages = MENU_IMAGES[cat] || MENU_IMAGES.rugs;
  const activeGroups = cat ? MEGA[cat] || [] : [];

  const stageClass = ['stage-1', 'stage-2', 'stage-3'][scrollStage];

  const navbarClass = [
    'nav',
    isHomePage ? '' : 'solid',
    stageClass,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header
      className={navbarClass}
      onMouseLeave={closeMega}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeMega();
        }
      }}
    >
      <div className="announcement-bar">
        <span>CRAFTED WITH CARE · WOVEN WITH HERITAGE</span>

        <Link to="/shop" onClick={go}>
          EXPLORE COLLECTION <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="container navin">
        <button
          className="burger"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={drawer}
          onClick={() => setDrawer(true)}
        >
          <span />
          <span />
          <span />
        </button>

        <Link to="/" className="logo" onClick={go}>
          WOVENHAAT
        </Link>

        <nav className="desk" aria-label="Main navigation">
          <ul>
            {MAIN_NAV.map(([label, target]) => (
              <li
                key={label}
                className={label === 'Collection' ? 'nav-collection' : ''}
                onMouseEnter={() => {
                  if (label === 'Collection') {
                    setRow(true);
                    setCat((current) => current || CATEGORIES[0]?.slug);
                  } else {
                    closeMega();
                  }
                }}
              >
                {label === 'Collection' ? (
                  <NavLink
                    to={target}
                    aria-haspopup="true"
                    aria-expanded={row}
                    className={row ? 'active' : ''}
                    onFocus={() => {
                      setRow(true);
                      setCat((current) => current || CATEGORIES[0]?.slug);
                    }}
                    onClick={closeMega}
                  >
                    Collection
                    <span className="nav-chevron" aria-hidden="true">
                      ⌄
                    </span>
                  </NavLink>
                ) : (
                  <NavLink
                    to={target}
                    end={target === '/'}
                    onFocus={closeMega}
                    onClick={closeMega}
                  >
                    {label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="icons">
          <button
            type="button"
            aria-label="Toggle search"
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((current) => !current);
              closeMega();
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.5" />
              <path d="m16 16 4.2 4.2" />
            </svg>
          </button>

          <Link to="/account" aria-label="My account" onClick={go}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="7.5" r="3.2" />
              <path d="M5.5 20c.3-4 2.7-6.1 6.5-6.1s6.2 2.1 6.5 6.1" />
            </svg>
          </Link>

          <Link
            to="/cart"
            className="bag-link"
            aria-label={`Shopping bag, ${count} items`}
            onClick={go}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5.5 8.5h13l1 12h-15z" />
              <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
            </svg>

            {count > 0 && <span className="bag-count">{count}</span>}
          </Link>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {row && (
        <div
          className="collection-menu"
          onMouseEnter={() => setRow(true)}
        >
          <div className="catrow">
            <div className="catrow-inner container">
              <span className="catrow-label">Explore</span>

              <ul>
                {CATEGORIES.map((category) => (
                  <li key={category.slug}>
                    <button
                      type="button"
                      className={
                        cat === category.slug
                          ? 'category-tab on'
                          : 'category-tab'
                      }
                      onMouseEnter={() => openCategory(category.slug)}
                      onFocus={() => openCategory(category.slug)}
                      onClick={() => {
                        navigate(`/collections/${category.slug}`);
                        closeAll();
                      }}
                      aria-expanded={cat === category.slug}
                    >
                      {category.name}
                      <span className="tab-line" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {activeCategory && (
            <div className="mega">
              <div className="container mega-topline">
                <Link
                  to={`/collections/${activeCategory.slug}`}
                  className="mega-back"
                  onClick={go}
                >
                  <span aria-hidden="true">←</span>
                  {activeCategory.name}
                </Link>

                <Link
                  to={`/collections/${activeCategory.slug}`}
                  className="mega-view-all"
                  onClick={go}
                >
                  Shop all {activeCategory.name}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <div className="container megain">
                <Link
                  to={`/collections/${activeCategory.slug}`}
                  className="mega-feature"
                  style={{
                    backgroundImage: `url("${activeImages.feature}")`,
                  }}
                  onClick={go}
                >
                  <span className="mega-feature-shade" />
                  <span className="mega-feature-caption">
                    {activeCategory.tagline}
                  </span>
                </Link>

                {activeGroups.map((group, index) => (
                  <div className="mega-group" key={group.title}>
                    <h4>{group.title}</h4>

                    <ul>
                      {group.links.map(([label, target]) => (
                        <li key={`${label}-${target}`}>
                          <Link to={target} onClick={go}>
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {(index === 1 || index === 2) && (
                      <Link
                        to={`/collections/${activeCategory.slug}`}
                        className={`mega-detail-image detail-${index}`}
                        style={{
                          backgroundImage: `url("${activeImages.detail}")`,
                        }}
                        aria-label={`Explore ${activeCategory.name}`}
                        onClick={go}
                      />
                    )}
                  </div>
                ))}

                <Link
                  to={`/collections/${activeCategory.slug}`}
                  className="mega-side-image"
                  style={{
                    backgroundImage: `url("${activeImages.side}")`,
                  }}
                  aria-label={`Shop ${activeCategory.name}`}
                  onClick={go}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {drawer && (
        <div
          className="drawer-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDrawer(false);
            }
          }}
        >
          <div
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="dhead">
              <Link to="/" className="logo" onClick={go}>
                WOVENHAAT
              </Link>

              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setDrawer(false)}
              >
                ×
              </button>
            </div>

            <form className="drawer-search" onSubmit={submitSearch}>
              <input
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search products"
                aria-label="Search products"
              />

              <button type="submit" aria-label="Submit search">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="10.8" cy="10.8" r="6.5" />
                  <path d="m16 16 4.2 4.2" />
                </svg>
              </button>
            </form>

            <ul className="drawer-main-list">
              {MAIN_NAV.map(([label, target]) =>
                label === 'Collection' ? (
                  <li key={label}>
                    <button
                      type="button"
                      className="drow"
                      aria-expanded={acc === 'collections'}
                      onClick={() =>
                        setAcc(
                          acc === 'collections' ? null : 'collections'
                        )
                      }
                    >
                      <span>Collection</span>
                      <span className="drawer-plus">
                        {acc === 'collections' ? '−' : '+'}
                      </span>
                    </button>

                    {acc === 'collections' && (
                      <ul className="sub">
                        {CATEGORIES.map((category) => (
                          <li key={category.slug}>
                            <button
                              type="button"
                              className="drow"
                              aria-expanded={acc === category.slug}
                              onClick={() =>
                                setAcc(
                                  acc === category.slug
                                    ? 'collections'
                                    : category.slug
                                )
                              }
                            >
                              <span>{category.name}</span>
                              <span className="drawer-plus">
                                {acc === category.slug ? '−' : '+'}
                              </span>
                            </button>

                            {acc === category.slug && (
                              <div className="sub2">
                                <Link
                                  to={`/collections/${category.slug}`}
                                  onClick={go}
                                >
                                  Shop All {category.name}
                                </Link>

                                {MEGA[category.slug]
                                  ?.flatMap((group) => group.links)
                                  .map(([linkLabel, linkTarget]) => (
                                    <Link
                                      key={`${linkLabel}-${linkTarget}`}
                                      to={linkTarget}
                                      onClick={go}
                                    >
                                      {linkLabel}
                                    </Link>
                                  ))}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={label}>
                    <Link className="drow" to={target} onClick={go}>
                      <span>{label}</span>
                      <span className="drawer-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </Link>
                  </li>
                )
              )}
            </ul>

            <div className="drawer-bottom">
              <Link to="/account" onClick={go}>
                My Account
              </Link>

              <Link to="/cart" onClick={go}>
                Shopping Bag ({count})
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
