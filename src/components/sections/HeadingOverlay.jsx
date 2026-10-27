/**
 * <HeadingOverlay /> — the painted heading that floats over <CategoryGrid />.
 *
 * Three lines, centred across all four columns:
 *   1. a small letterspaced eyebrow
 *   2. a script line in soft lavender
 *   3. the big brush word, filled with a rainbow gradient (`background-clip: text`)
 *      except for one letter, which is left solid white so the word reads like
 *      it was hand-painted in two passes.
 *
 * The overlay is `pointer-events: none` (see the CSS) so the columns underneath
 * stay clickable, and it is the section's real heading — it is not decorative.
 *
 * @param {object} props
 * @param {string} [props.eyebrow]  small uppercase line
 * @param {string} [props.script]   handwritten line
 * @param {string} [props.word]     big brush line
 * @param {number} [props.solidIndex] index of the letter in `word` that stays white
 * @param {string} [props.id]       lets the section point aria-labelledby here
 */
export default function HeadingOverlay({
  eyebrow = "Shop by category",
  script = "Find your",
  word = "WEAVE",
  solidIndex = 2,
  id
}) {
  const before = word.slice(0, solidIndex);
  const solid = word.slice(solidIndex, solidIndex + 1);
  const after = word.slice(solidIndex + 1);

  return (
    <h2 className="cat-head" id={id}>
      <span className="cat-head__eyebrow">{eyebrow}</span>
      <span className="cat-head__script">{script}</span>
      <span className="cat-head__word">
        {before}
        <span className="cat-head__solid">{solid}</span>
        {after}
      </span>
    </h2>
  );
}
