/**
 * <ProductBrowser /> — search + filters + sort + product grid, used by the Shop
 * page (with search) and every Collection/Category page (without).
 *
 * Search, the filter groups and sorting all combine; "Clear all" (sidebar or
 * the active-filter bar) resets filters and the search box. Products render
 * through the shared <ProductGrid /> / <ProductCard />, revealed in batches
 * (see useProgressiveRender).
 */
import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import ProductFilters from "./ProductFilters.jsx";
import SearchSuggest from "./SearchSuggest.jsx";
import ProductGrid from "../product/ProductGrid.jsx";
import { useShop } from "../../context/shopContext.js";
import { useProgressiveRender } from "../../hooks/useProgressiveRender.js";
import { getSizeClass, priceBuckets } from "../../utils/shop.js";

const INITIAL_VISIBLE = 12;
const BATCH_SIZE = 12;
const initial = {
  category: "All",
  material: "All",
  color: "All",
  size: "All",
  price: "Any",
  rating: "Any"
};

export default function ProductBrowser({ list, initialSearch = "", showSearch = true, summary }) {
  const { cards, cardHandlers } = useShop();
  const [search, setSearch] = useState(initialSearch);
  const [filters, setFilters] = useState(initial);
  const [sort, setSort] = useState("featured");
  const [showMobile, setShowMobile] = useState(false);

  // the navbar search (or a shared link) can change ?q= while this page is mounted
  useEffect(() => setSearch(initialSearch), [initialSearch]);

  const options = useMemo(
    () => ({
      categories: [...new Set(list.map((p) => p.category))],
      materials: [...new Set(list.map((p) => p.material))],
      colors: [...new Set(list.map((p) => p.color))],
      sizes: ["Small", "Medium", "Large"].filter((s) => list.some((p) => getSizeClass(p) === s))
    }),
    [list]
  );

  const setFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  const clear = () => {
    setFilters(initial);
    setSearch("");
  };

  const filtered = useMemo(() => {
    const priceTest = priceBuckets.find(([label]) => label === filters.price)[1];
    const minRating = filters.rating.startsWith("4.5") ? 4.5 : filters.rating.startsWith("4") ? 4 : 0;
    const term = search.trim().toLowerCase();
    let result = list.filter(
      (p) =>
        (!term || `${p.name} ${p.category} ${p.material} ${p.color}`.toLowerCase().includes(term)) &&
        (filters.category === "All" || p.category === filters.category) &&
        (filters.material === "All" || p.material === filters.material) &&
        (filters.color === "All" || p.color === filters.color) &&
        (filters.size === "All" || getSizeClass(p) === filters.size) &&
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

  const activeChips = Object.entries(filters).filter(([key, value]) => value !== initial[key]);

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
            <button key={key} type="button" className="chip" onClick={() => setFilter(key, initial[key])}>
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
          <ProductFilters filters={filters} setFilter={setFilter} options={options} clear={clear} namespace="mobile" />
        </div>
      )}

      <div className="shop-layout">
        <aside className="desktop-filters">
          <ProductFilters filters={filters} setFilter={setFilter} options={options} clear={clear} namespace="desktop" />
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
            <div className="empty-state">
              <h3>No textiles found</h3>
              <p>Try removing a filter or using a broader search.</p>
              <button type="button" className="button outline" onClick={clear}>
                Reset filters
              </button>
            </div>
          )}
          {pendingItems.length > 0 && <div className="load-more" ref={loadMoreRef} aria-hidden="true" />}
        </div>
      </div>
    </>
  );
}
