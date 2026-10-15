import { ChevronDown } from "lucide-react";
import { colorSwatches } from "../../data/storeData.js";
import { priceBuckets } from "../../utils/format.js";

function FilterGroup({ title, children }) {
  return (
    <details className="filter-group" open>
      <summary>
        {title}
        <ChevronDown />
      </summary>
      <div>{children}</div>
    </details>
  );
}

function Radios({ name, options, value, onChange }) {
  return options.map((item) => (
    <label key={item}>
      <input
        type="radio"
        name={name}
        checked={value === item}
        onChange={() => onChange(item)}
      />
      {item}
    </label>
  ));
}

export default function ProductFilters({ filters, setFilter, options, clear, namespace = "" }) {
  return (
    <div className="filter-panel">
      <div className="filter-title">
        <strong>Filters</strong>
        <button onClick={clear}>Clear all</button>
      </div>
      {options.categories.length > 1 && (
        <FilterGroup title="Category">
          <Radios
            name={`${namespace ? namespace + "-" : ""}category`}
            options={["All", ...options.categories]}
            value={filters.category}
            onChange={(v) => setFilter("category", v)}
          />
        </FilterGroup>
      )}
      <FilterGroup title="Material">
<Radios
           name={`${namespace ? namespace + "-" : ""}material`}
           options={["All", ...options.materials]}
           value={filters.material}
           onChange={(v) => setFilter("material", v)}
         />
      </FilterGroup>
      <FilterGroup title="Colour">
        <div className="swatches">
          {["All", ...options.colors].map((item) => {
            const swatch = colorSwatches[item];
            return (
              <button
                key={item}
                title={swatch ? `${item} · ${swatch.dmc}` : item}
                aria-label={`Filter by ${item}`}
                aria-pressed={filters.color === item}
                className={`${filters.color === item ? "selected" : ""} swatch ${item === "All" ? "all" : ""}`}
                style={{
                  ...(swatch ? { background: swatch.css } : {}),
                  minWidth: 44,
                  minHeight: 44,
                }}
                onClick={() => setFilter("color", item)}
              >
                {item === "All" && "All"}
              </button>
            );
          })}
        </div>
        {filters.color !== "All" && (
          <small className="swatch-caption">
            {filters.color} · {colorSwatches[filters.color]?.dmc}
          </small>
        )}
      </FilterGroup>
      <FilterGroup title="Size">
<Radios
           name={`${namespace ? namespace + "-" : ""}size`}
           options={["All", ...options.sizes]}
           value={filters.size}
           onChange={(v) => setFilter("size", v)}
         />
      </FilterGroup>
      <FilterGroup title="Price">
<Radios
           name={`${namespace ? namespace + "-" : ""}price`}
           options={priceBuckets.map(([label]) => label)}
           value={filters.price}
           onChange={(v) => setFilter("price", v)}
         />
      </FilterGroup>
      <FilterGroup title="Rating">
<Radios
           name={`${namespace ? namespace + "-" : ""}rating`}
           options={["Any", "4★ & above", "4.5★ & above"]}
           value={filters.rating}
           onChange={(v) => setFilter("rating", v)}
         />
      </FilterGroup>
    </div>
  );
}
