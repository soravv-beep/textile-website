/**
 * 404 — an unknown URL.
 * Offers the two most likely escapes (home, shop) instead of a dead end.
 */
import { Link } from "react-router-dom";

import PageMeta from "../components/PageMeta.jsx";
import Button from "../components/ui/Button.jsx";
import Container from "../components/ui/Container.jsx";
import { ROUTES } from "../constants/routes.js";

export default function NotFound() {
  return (
    <section className="section coming-soon" aria-labelledby="nf-h">
      <PageMeta title="Page not found — WovenHaat" description="That page doesn't exist. Browse handwoven rugs, cushions and throws instead." />
      <Container>
        <span className="eyebrow">404</span>
        <h1 id="nf-h">That thread leads nowhere</h1>
        <p className="coming-soon__note">
          The page you were looking for has moved or never existed. The looms are
          still running, though — try one of these.
        </p>
        <div className="coming-soon__actions">
          <Button as={Link} to={ROUTES.home} variant="outline">
            Back to home
          </Button>
          <Button as={Link} to={ROUTES.shop} variant="primary" arrow>
            Shop the collection
          </Button>
        </div>
      </Container>
    </section>
  );
}
