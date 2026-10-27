import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/catalog.js";
import { productPath } from "../../constants/routes.js";
import { formatINR } from "../../utils/format.js";
import Overlay from "../ui/Overlay.jsx";

/**
 * Search Modal — WovenHaat Custom Design
 * Features: integrated header search input, clean 4-column grid (2-column on mobile),
 * hidden scrollbars, square product cards, and single modal close icon.
 */
export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const stored = localStorage.getItem("wovenhaat_recent_searches");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setQuery("");
      setShowResults(false);
    }
  }, [open]);

  // Save recent searches
  const addRecentSearch = useCallback((term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 5);
      try {
        localStorage.setItem("wovenhaat_recent_searches", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const term = query.trim();
    if (term) {
      addRecentSearch(term);
      onClose();
      window.location.href = `/shop?q=${encodeURIComponent(term)}`;
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowResults(false), 150);
  };

  // Filter products based on query (up to 4 for single row fit)
  const getFilteredProducts = useCallback(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter((p) =>
        `${p.name} ${p.category} ${p.material} ${p.color}`.toLowerCase().includes(term)
      )
      .slice(0, 4);
  }, [query]);

  const filteredProducts = getFilteredProducts();

  // Get trending/bestseller products for initial state (4 items for single row)
  const trendingProducts = useMemo(
    () => products.filter((p) => p.badge === "Bestseller").slice(0, 4),
    []
  );

  return (
    <Overlay
      open={open}
      onClose={onClose}
      label="Search products"
      position="modal"
      scrim={true}
      className="search-modal-overlay"
    >
      <div className="search-modal" role="dialog" aria-modal="true" aria-label="Search products">
        {/* Header Bar with Integrated Search & Single Close Icon */}
        <header className="search-modal__header">
          <form className="search-modal__search-form" onSubmit={handleSubmit}>
            <div className="search-modal__input-row">
              <svg className="search-modal__icon" viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="search-modal__input"
                value={query}
                onChange={handleChange}
                onFocus={() => setShowResults(true)}
                onBlur={handleInputBlur}
                placeholder="Search products, categories..."
                aria-label="Search products"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </form>
          <button
            type="button"
            className="search-modal__close"
            aria-label="Close search"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {/* Content Section */}
        <div className="search-modal__content">
          {query.length > 0 ? (
            filteredProducts.length > 0 ? (
              <>
                <div className="search-modal__section-header">
                  <h2 className="search-modal__section-title">Products</h2>
                </div>
                <div className="search-modal__grid" role="list" aria-label="Search results">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={productPath(product.slug)}
                      className="search-modal__product-card"
                      onClick={onClose}
                      role="listitem"
                    >
                      <div className="search-modal__image-wrapper">
                        <img
                          className="search-modal__image"
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                        />
                        {product.badge && (
                          <span className="search-modal__badge">{product.badge}</span>
                        )}
                      </div>
                      <div className="search-modal__info">
                        <h4 className="search-modal__product-name">{product.name}</h4>
                        <div className="search-modal__price-row">
                          <span className="search-modal__price">{formatINR(product.price)}</span>
                          {product.compareAtPrice && product.compareAtPrice > product.price && (
                            <span className="search-modal__old-price">{formatINR(product.compareAtPrice)}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="search-modal__view-all">
                  <Link to={`/shop?q=${encodeURIComponent(query)}`} onClick={onClose}>
                    View all products →
                  </Link>
                </div>
              </>
            ) : (
              <div className="search-modal__no-results">
                <h3>No products found for "{query}"</h3>
                <p>Try searching for a different item or material.</p>
                <Link to="/shop" className="search-modal__browse-link" onClick={onClose}>
                  Browse all products
                </Link>
              </div>
            )
          ) : (
            <>
              {recentSearches.length > 0 && (
                <section className="search-modal__section">
                  <div className="search-modal__section-header">
                    <h2 className="search-modal__section-title">Recent Searches</h2>
                    <button
                      type="button"
                      className="search-modal__clear-recent"
                      onClick={() => {
                        setRecentSearches([]);
                        localStorage.removeItem("wovenhaat_recent_searches");
                      }}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="search-modal__recent-list" role="list">
                    {recentSearches.map((term, index) => (
                      <button
                        key={index}
                        type="button"
                        className="search-modal__recent-item"
                        onClick={() => {
                          setQuery(term);
                          handleSubmit({ preventDefault: () => {} });
                        }}
                        role="listitem"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="7" />
                          <path d="M16 16L21 21" strokeLinecap="round" />
                        </svg>
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <section className="search-modal__section">
                <div className="search-modal__section-header">
                  <h2 className="search-modal__section-title">Products</h2>
                </div>
                <div className="search-modal__grid" role="list" aria-label="Trending products">
                  {trendingProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={productPath(product.slug)}
                      className="search-modal__product-card"
                      onClick={onClose}
                      role="listitem"
                    >
                      <div className="search-modal__image-wrapper">
                        <img
                          className="search-modal__image"
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                        />
                        {product.badge && (
                          <span className="search-modal__badge">{product.badge}</span>
                        )}
                      </div>
                      <div className="search-modal__info">
                        <h4 className="search-modal__product-name">{product.name}</h4>
                        <div className="search-modal__price-row">
                          <span className="search-modal__price">{formatINR(product.price)}</span>
                          {product.compareAtPrice && product.compareAtPrice > product.price && (
                            <span className="search-modal__old-price">{formatINR(product.compareAtPrice)}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </Overlay>
  );
}