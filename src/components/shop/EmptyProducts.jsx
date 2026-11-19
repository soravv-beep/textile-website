/**
 * <EmptyProducts /> — the "No products found" panel shown by <ProductBrowser />
 * when search + filters match nothing.
 *
 * A rounded panel with a folded-throw-and-vase illustration, a heading, a short
 * line of guidance and two actions. The illustration is inline SVG painted
 * entirely from the project's colour tokens (see styles/empty-products.css).
 *
 * @param {object} props
 * @param {() => void} props.onClear  resets search + filters (ProductBrowser's `clear`)
 */
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes.js";
import "../../styles/empty-products.css";

// One leaf shape, placed with transforms below.
const LEAF = "M0 0 C7 -9 7 -23 0 -32 C-7 -23 -7 -9 0 0Z";
const LEAVES = [
  { x: 70, y: 62, r: 0 },
  { x: 66, y: 76, r: -62 },
  { x: 74, y: 70, r: 62 },
  { x: 64, y: 90, r: -48 },
  { x: 77, y: 86, r: 50 },
  { x: 58, y: 100, r: -78 },
  { x: 82, y: 98, r: 76 },
];
const FRINGE = Array.from({ length: 11 }, (_, i) => 288 + i * 4.6);

function Illustration() {
  return (
    <svg className="empty-products__art" viewBox="0 0 380 190" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ep-floor-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" className="ep-floor-stop ep-floor-stop--clear" />
          <stop offset="0.18" className="ep-floor-stop" />
          <stop offset="0.82" className="ep-floor-stop" />
          <stop offset="1" className="ep-floor-stop ep-floor-stop--clear" />
        </linearGradient>
        <linearGradient id="ep-floor-down" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="ep-floor-mask">
          <rect x="0" y="150" width="380" height="40" fill="url(#ep-floor-down)" />
        </mask>
      </defs>
      {/* soft arch behind the objects */}
      <path className="ep-arch" d="M115 150 A82 82 0 0 1 279 150 Z" />
      {/* table surface */}
      <rect className="ep-floor" x="0" y="150" width="380" height="40" mask="url(#ep-floor-mask)" />
      <ellipse className="ep-shadow" cx="190" cy="152" rx="165" ry="6" />

      {/* vase + sprig */}
      <path className="ep-stem" d="M70 112 C70 92 69 76 70 60 M70 112 C66 100 62 94 58 88 M70 112 C75 102 80 96 84 90" />
      {LEAVES.map((l, i) => (
        <path key={i} className="ep-leaf" d={LEAF} transform={`translate(${l.x} ${l.y}) rotate(${l.r})`} />
      ))}
      <path
        className="ep-vase"
        d="M62 110 C62 104 78 104 78 110 L80 120 C98 130 98 150 88 151 L52 151 C42 150 42 130 60 120 Z"
      />
      <path className="ep-vase-shade" d="M80 120 C98 130 98 150 88 151 L74 151 C86 146 86 130 78 122 Z" />

      {/* folded throw */}
      <rect className="ep-fold" x="98" y="128" width="120" height="23" rx="5" />
      <rect className="ep-fold ep-fold--top" x="98" y="112" width="116" height="19" rx="5" />
      <path className="ep-weave" d="M108 119 H204 M108 124 H204 M108 137 H208 M108 142 H208" />

      {/* draped throw with fringe */}
      <path
        className="ep-drape"
        d="M132 116 C160 100 214 102 250 112 C276 119 298 128 322 143 L332 151 L196 151 L150 136 Z"
      />
      <path
        className="ep-weave"
        d="M150 118 C186 108 226 110 262 122 M158 126 C196 116 236 119 280 134 M176 134 C210 126 244 130 300 144"
      />
      {FRINGE.map((x, i) => (
        <path key={i} className="ep-fringe" d={`M${x} ${146 + i * 0.4} L${x + 3} ${158 + i * 0.4}`} />
      ))}

      {/* sparkle */}
      <path className="ep-spark" d="M312 72 L322 62 M322 80 L336 76 M326 92 L340 94" />
    </svg>
  );
}

export default function EmptyProducts({ onClear }) {
  return (
    <div className="empty-products" role="status">
      <Illustration />
      <h3 className="empty-products__title">No products found</h3>
      <p className="empty-products__text">
        We couldn&rsquo;t find any products with your search. Try a different keyword or browse our collections.
      </p>
      <div className="empty-products__actions">
        <button type="button" className="empty-products__btn empty-products__btn--primary" onClick={onClear}>
          Clear filters
        </button>
        <Link to={ROUTES.collections} className="empty-products__btn empty-products__btn--secondary">
          Browse collections
        </Link>
      </div>
    </div>
  );
}
