import { useEffect, useId, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

import { categories, products } from "../../data/catalog.js";

/** Search box with product + category suggestions (keyboard accessible). */
export default function SearchSuggest({ value, onChange, placeholder, className = "", autoFocus = false, onPick }) {
  const suggestionsId = useId();
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const listRef = useRef(null);
  const term = value.trim().toLowerCase();
  const productMatches = term
    ? products.filter((p) => `${p.name} ${p.material} ${p.color}`.toLowerCase().includes(term)).slice(0, 4)
    : [];
  const categoryMatches = term ? categories.filter((c) => c.name.toLowerCase().includes(term)).slice(0, 2) : [];
  const allMatches = [
    ...categoryMatches.map((c) => ({ type: "category", data: c })),
    ...productMatches.map((p) => ({ type: "product", data: p }))
  ];
  const show = open && allMatches.length > 0;

  const pick = () => {
    setOpen(false);
    onPick?.();
  };

  // reset the highlighted suggestion whenever the query changes
  useEffect(() => {
    setHighlightIndex(-1);
  }, [value]);

  const handleKeyDown = (e) => {
    if (!show) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % allMatches.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + allMatches.length) % allMatches.length);
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0) {
        e.preventDefault();
        listRef.current?.querySelector(`[data-index="${highlightIndex}"] a`)?.click();
        pick();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      pick();
    }
  };

  return (
    <div className={`suggest ${className}`}>
      <Search aria-hidden="true" />
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Search products"
        aria-autocomplete="list"
        aria-expanded={show}
        aria-controls={show ? suggestionsId : undefined}
        autoComplete="off"
      />
      {show && (
        <ul
          id={suggestionsId}
          ref={listRef}
          className="suggest-list"
          role="listbox"
          onMouseDown={(event) => event.preventDefault()}
        >
          {allMatches.map((item, idx) => (
            <li
              key={`${item.type}-${item.data.id || item.data.slug}`}
              role="option"
              aria-selected={idx === highlightIndex}
              data-index={idx}
            >
              {item.type === "category" ? (
                <Link to={`/collections/${item.data.slug}`} onClick={pick}>
                  <span className="suggest-tag">Category</span>
                  {item.data.name}
                </Link>
              ) : (
                <Link to={`/product/${item.data.slug}`} onClick={pick}>
                  <img src={item.data.image} alt="" />
                  {item.data.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
