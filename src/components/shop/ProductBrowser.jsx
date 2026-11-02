/**
 * <ProductBrowser /> — search + filters + sort + product grid, used by the Shop
 * page (with search) and every Collection/Category page (without).
 *
 * Search, the filter groups and sorting all combine; "Clear all" (sidebar or
 * the active-filter bar) resets filters and the search box. Products render
 * through the shared <ProductGrid /> / <ProductCard />, revealed in batches
 * (see useProgressiveRender).
 *
 * URL query params supported:
 *   ?q=search term
 *   ?category=Rugs|Cushions|Throws|Bath Mats|Table Linen|Curtains
 *   ?material=Cotton|Wool|Jute|Linen|Chenille
 *   ?color=Terracotta|Natural|...
 *   ?size=Small|Medium|Large|Set|[category-specific sizes]
 *   ?type=Woven Throws|Knit Throws|... (productType)
 *   ?style=Classic|Modern|Textured
 *   ?price=Under ₹500|₹500 – ₹1,000|...
 *   ?rating=4★ & above|4.5★ & above
 *   ?sort=featured|popular|new|low|high|rating
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";

import ProductFilters from "./ProductFilters.jsx";
import SearchSuggest from "./SearchSuggest.jsx";
import ProductGrid from "../product/ProductGrid.jsx";
import { useShop } from "../../context/shopContext.js";
import { useProgressiveRender } from "../../hooks/useProgressiveRender.js";
import { getSizeClass, priceBuckets } from "../../utils/shop.js";
import { ROUTES } from "../../constants/routes.js";

const INITIAL_VISIBLE = 12;
const BATCH_SIZE = 12;

// Default filter values
const initialFilters = {
  category: "All",
  material: "All",
  color: "All",
  size: "All",
  type: "All",
  style: "All",
  price: "Any",
  rating: "Any"
};

// URL param to filter key mapping
const PARAM_TO_FILTER = {
  q: "search",
  category: "category",
  material: "material",
  color: "color",
  size: "size",
  sub: "type",        // mega menu uses 'sub' for product type
  type: "type",
  style: "style",
  price: "price",
  rating: "rating",
  sort: "sort"
};

const FILTER_TO_PARAM = {
  category: "category",
  material: "material",
  color: "color",
  size: "size",
  type: "type",
  style: "style",
  price: "price",
  rating: "rating",
  sort: "sort"
};

function filtersEqual(a, b) {
  return Object.keys(a).every(k => a[k] === b[k]);
}

export default function ProductBrowser({ list, initialSearch = "", showSearch = true, summary, initialFilters: propInitialFilters = {} }) {
  const { cards, cardHandlers } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // Refs to track state and avoid loops
  const initializedRef = useRef(false);
  const lastUrlParamsRef = useRef("");
  const isInternalUpdateRef = useRef(false);

  // Initialize filters from URL params ONCE on mount, merged with prop initialFilters
  const getInitialFilters = () => {
    const filters = { ...initialFilters };
    let search = initialSearch;

    // Apply prop initialFilters first (from Collections page)
    Object.entries(propInitialFilters).forEach(([key, value]) => {
      if (filters.hasOwnProperty(key)) {
        filters[key] = value;
      } else if (key === "search") {
        search = value;
      } else if (key === "sort") {
        // sort will be handled separately
      }
    });

    // Then apply URL params (which take precedence)
    searchParams.forEach((value, key) => {
      const filterKey = PARAM_TO_FILTER[key];
      if (filterKey === "search") {
        search = value;
      } else if (filterKey && filters.hasOwnProperty(filterKey)) {
        filters[filterKey] = value;
      }
    });

    return { filters, search };
  };

  // Initialize state ONCE using lazy initialization
  const [search, setSearch] = useState(() => getInitialFilters().search);
  const [filters, setFilters] = useState(() => getInitialFilters().filters);
  const [sort, setSort] = useState(() => propInitialFilters.sort || getInitialFilters().filters.sort || "featured");
  const [showMobile, setShowMobile] = useState(false);

  // Build URL params string for comparison
  const buildUrlParams = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      const paramKey = FILTER_TO_PARAM[key];
      if (paramKey && value !== initialFilters[key]) {
        params.set(paramKey, value);
      }
    });
    if (search.trim()) params.set("q", search.trim());
    if (sort !== "featured") params.set("sort", sort);
    return params.toString();
  }, [filters, search, sort]);

  // Sync URL when USER changes filters (not on external URL changes)
  useEffect(() => {
    // Skip on first render
    if (!initializedRef.current) {
      initializedRef.current = true;
      lastUrlParamsRef.current = buildUrlParams;
      return;
    }

    // Skip if this update came from external URL change
    if (isInternalUpdateRef.current) {
      isInternalUpdateRef.current = false;
      return;
    }

    const newUrlParams = buildUrlParams;
    if (newUrlParams !== lastUrlParamsRef.current) {
      lastUrlParamsRef.current = newUrlParams;
      const params = new URLSearchParams(newUrlParams);
      setSearchParams(params, { replace: true });
    }
  }, [buildUrlParams, setSearchParams]);

  // Handle browser back/forward / external link clicks - sync state from URL
  useEffect(() => {
    if (!initializedRef.current) return;

    const currentUrlParams = searchParams.toString();
    if (currentUrlParams === lastUrlParamsRef.current) return; // No actual change

    const { filters: urlFilters, search: urlSearch } = getInitialFilters();
    
    // Only update if filters actually changed
    if (!filtersEqual(filters, urlFilters) || search !== urlSearch) {
      isInternalUpdateRef.current = true;
      setFilters(urlFilters);
      setSearch(urlSearch);
      if (urlFilters.sort) setSort(urlFilters.sort);
      lastUrlParamsRef.current = currentUrlParams;
    }
  }, [searchParams]);

  // the navbar search (or a shared link) can change ?q= while this page is mounted
  useEffect(() => setSearch(initialSearch), [initialSearch]);

  // Compute filter options from current product list
  const options = useMemo(
    () => ({
      categories: [...new Set(list.map((p) => p.category))].sort(),
      materials: [...new Set(list.map((p) => p.material))].sort(),
      colors: [...new Set(list.map((p) => p.color))].sort(),
      sizes: [...new Set(list.map((p) => getSizeClass(p)))].filter(Boolean).sort(),
      types: [...new Set(list.map((p) => p.productType).filter(Boolean))].sort(),
      styles: [...new Set(list.map((p) => p.style).filter(Boolean))].sort(),
      // Category-specific sizes from product.sizes arrays
      categorySizes: [...new Set(list.flatMap((p) => p.sizes || []))].sort()
    }),
    [list]
  );

  const setFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  // Determine base filters for clear - keep category if on a category page
  const baseFilters = useMemo(() => ({
    ...initialFilters,
    category: propInitialFilters.category || initialFilters.category
  }), [propInitialFilters.category]);

  const clear = () => {
    setFilters(baseFilters);
    setSearch("");
    setSort("featured");
  };

  const filtered = useMemo(() => {
    const priceTest = priceBuckets.find(([label]) => label === filters.price)[1];
    const minRating = filters.rating.startsWith("4.5") ? 4.5 : filters.rating.startsWith("4") ? 4 : 0;
    const term = search.trim().toLowerCase();

    let result = list.filter(
      (p) =>
        (!term || `${p.name} ${p.category} ${p.material} ${p.color} ${p.productType || ""} ${p.style || ""}`.toLowerCase().includes(term)) &&
        (filters.category === "All" || p.category === filters.category) &&
        (filters.material === "All" || p.material === filters.material) &&
        (filters.color === "All" || p.color === filters.color) &&
        (filters.size === "All" || getSizeClass(p) === filters.size || (p.sizes && p.sizes.includes(filters.size))) &&
        (filters.type === "All" || p.productType === filters.type) &&
        (filters.style === "All" || p.style === filters.style) &&
        priceTest(p) &&
        p.rating >= minRating
    );

    if (sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    if (sort === "popular") result = [...result].sort((a, b) => b.reviews - a.reviews);
    if (sort === "new") result = [...result].sort((a, b) => (b.badge === "New") - (a.badge === "New"));

    return result;
  }, [list, search, filters, sort]);

  const { visibleItems, pendingItems, revealFrom, loadMoreRef } = useProgressiveRender(
    filtered,
    INITIAL_VISIBLE,
    BATCH_SIZE,
    3000
  );

  const activeChips = Object.entries(filters).filter(([key, value]) => value !== baseFilters[key]);

  return (
    <>
      <div className="shop-tools">
        {showSearch ? (
          <SearchSuggest
            className="shop-search"
            value={search}
            onChange={setSearch}
            placeholder="Search rugs, cushions, throws..."
          />
        ) : (
          <span className="result-count">{summary}</span>
        )}
        <button
          type="button"
          className="filter-mobile button outline"
          aria-label="Open filters"
          aria-expanded={showMobile}
          aria-controls="mobile-filters"
          onClick={() => setShowMobile(!showMobile)}
        >
          <SlidersHorizontal aria-hidden="true" />
          Filters
        </button>
        <label className="sort-select">
          Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="popular">Popularity</option>
            <option value="new">New arrivals</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
      </div>

      {(activeChips.length > 0 || search.trim()) && (
        <div className="active-filters">
          Active filters:
          {search.trim() && (
            <button type="button" className="chip" onClick={() => setSearch("")}>
              “{search.trim()}”
              <X aria-hidden="true" />
            </button>
          )}
          {activeChips.map(([key, value]) => (
            <button key={key} type="button" className="chip" onClick={() => setFilter(key, baseFilters[key])}>
              {value}
              <X aria-hidden="true" />
            </button>
          ))}
          <button type="button" onClick={clear}>
            Clear all
          </button>
        </div>
      )}

      {showMobile && (
        <div id="mobile-filters" className="mobile-filter-wrap">
          <ProductFilters
            filters={filters}
            setFilter={setFilter}
            options={options}
            clear={clear}
            namespace="mobile"
            initialFilters={baseFilters}
          />
        </div>
      )}

      <div className="shop-layout">
        <aside className="desktop-filters">
          <ProductFilters
            filters={filters}
            setFilter={setFilter}
            options={options}
            clear={clear}
            namespace="desktop"
            initialFilters={baseFilters}
          />
        </aside>
        <div>
          <p className="result-line" aria-live="polite">
            Showing {visibleItems.length} of {filtered.length} products
          </p>
          {visibleItems.length > 0 ? (
            <ProductGrid
              progressive
              flip
              tilt={false}
              className="product-grid--shop"
              products={cards(visibleItems)}
              pendingProducts={cards(pendingItems)}
              revealFrom={revealFrom}
              {...cardHandlers}
            />
          ) : (
            <div className="empty-state premium-empty">
              <div className="empty-state__illustration" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
                  <path d="M32 18V32L40 38" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
                </svg>
              </div>
              <h3>No textiles found</h3>
              <p>There are currently no products matching your selection. We're working on bringing you more beautiful handwoven pieces soon.</p>
              <div className="empty-state__actions">
                <button type="button" className="button outline" onClick={clear}>
                  Clear filters
                </button>
                <Link to={ROUTES.shop} className="button primary">
                  Explore all products
                </Link>
              </div>
            </div>
          )}
          {pendingItems.length > 0 && <div className="load-more" ref={loadMoreRef} aria-hidden="true" />}
        </div>
      </div>
    </>
  );
}