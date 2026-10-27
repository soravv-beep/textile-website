/**
 * <TrustStrip /> — the certification row that sits above <CategoryGrid />.
 *
 * No fill of its own: the fixed page-wide mandala background shows through, so
 * this reads as four items on the page rather than a coloured band. Each icon
 * keeps its own colour so the row reads the same way at a glance: safety blue,
 * fibres green, yarn ink, reach red.
 *
 * Decorative by design — the strip is a plain labelled region, not a heading,
 * so it never enters the page's outline.
 */
import { Globe, Leaf, Recycle, ShieldCheck } from "lucide-react";

/** Icon + ink colour per item. `tone` is `undefined` for the plain one. */
const TRUST_ITEMS = [
  { label: "Certified safe", Icon: ShieldCheck, tone: "#5aa9e6" },
  { label: "Organic fibres", Icon: Leaf, tone: "#5fd08a" },
  { label: "Recycled yarn", Icon: Recycle },
  { label: "18+ countries", Icon: Globe, tone: "#d93a2b" }
];

export default function TrustStrip() {
  return (
    <section className="cat-strip" aria-label="Certifications and reach">
      <ul className="cat-strip__list">
        {TRUST_ITEMS.map(({ label, Icon, tone }) => (
          <li className="cat-strip__item" key={label}>
            <Icon className="cat-strip__icon" style={tone ? { color: tone } : undefined} aria-hidden="true" />
            <span className="cat-strip__label">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
