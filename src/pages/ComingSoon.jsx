/**
 * Placeholder screen shown while the site is migrated.
 * The final version (with the shared UI kit) lands in the design-system commit.
 */
export default function ComingSoon({ title, note }) {
  return (
    <main id="main" className="section">
      <div className="container">
        <span className="eyebrow">Migration in progress</span>
        <h1>{title}</h1>
        <p>{note}</p>
      </div>
    </main>
  );
}
