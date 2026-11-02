import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { products, categories } from "../../data/catalog.js";
import { productPath } from "../../constants/routes.js";
import { formatINR } from "../../utils/format.js";

/**
 * Search Dropdown — premium dropdown from navbar search icon.
 * Positioned absolutely below the navbar, aligned with search icon.
 * No backdrop overlay, no portal.
 */
export default function SearchDropdown({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Focus input when dropdown opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Reset state when dropdown closes
  useEffect(() => {
    if (!open) {
      setQuery("");
      setShowResults(false);
    }
  }, [open]);

  // Close on Escape
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Handle click outside to close
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  // Filter products based on query
  const getFilteredProducts = useCallback(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return products.filter((p) => p.badge === "Bestseller").slice(0, 8);
    }
    return products.filter((p) =>
      `${p.name} ${p.category} ${p.material} ${p.color}`.toLowerCase().includes(term)
    ).slice(0, 12);
  }, [query]);

  const filteredProducts = getFilteredProducts();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = query.trim();
    if (term) {
      onClose();
      window.location.href = `/shop?q=${encodeURIComponent(term)}`;
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowResults(false), 150);
  };

  if (!open) return null;

  return (
    <div className="search-dropdown" ref={dropdownRef} onKeyDown={handleKeyDown}>
      {/* Arrow pointer */}
      <div className="search-dropdown__arrow" aria-hidden="true" />

      {/* Search Input Row */}
      <form className="search-dropdown__form" onSubmit={handleSubmit}>
        <div className="search-dropdown__input-wrapper">
          <svg className="search-dropdown__icon" viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
            <circle cx="10.8" cy="10.8" r="6.5" />
            <path d="m16 16 4.2 4.2" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            className="search-dropdown__input"
            value={query}
            onChange={handleChange}
            onFocus={() => setShowResults(true)}
            onBlur={handleInputBlur}
            placeholder="Search"
            aria-label="Search products"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </form>

      {/* Results Section */}
      {(showResults || query) && (
        <div className="search-dropdown__results" role="list" aria-label="Search results">
          {filteredProducts.length > 0 ? (
            <>
              <h3 className="search-dropdown__section-title">Products</h3>
              <div className="search-dropdown__grid">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={productPath(product.slug)}
                    className="search-dropdown__product-card"
                    onClick={onClose}
                    role="listitem"
                  >
                    <div className="search-dropdown__image-wrapper">
                      <img
                        className="search-dropdown__image"
                        src={product.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="search-dropdown__info">
                      <h4 className="search-dropdown__product-name">{product.name}</h4>
                      <div className="search-dropdown__price-row">
                        <span className="search-dropdown__price">{formatINR(product.price)}</span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <span className="search-dropdown__old-price">{formatINR(product.compareAtPrice)}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <p className="search-dropdown__no-results">No products found. Try another search.</p>
          )}
        </div>
      )}
    </div>
  );
}