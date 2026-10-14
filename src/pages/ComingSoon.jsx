/**
 * <ComingSoon /> — placeholder for every route another developer owns.
 *
 * Wired in src/App.jsx so no navigation 404s while the team builds the rest of
 * the site. Each instance names the owner so it is obvious which pages are
 * still stubs. Replace the element for that path when the real page lands.
 */
import { Link, useLocation } from "react-router-dom";

import Button from "../components/ui/Button.jsx";
import { Container } from "../components/ui/index.js";
import { ROUTES } from "../constants/routes.js";

export default function ComingSoon({ title, owner = "the team", note }) {
  const { pathname } = useLocation();

  return (
    <section className="section coming-soon" aria-labelledby="cs-h">
      <Container>
        <span className="eyebrow">Coming soon</span>
        <h1 id="cs-h">{title}</h1>
        <p className="coming-soon__note">
          {note ??
            `This page is still being built by ${owner}. The route ${pathname} is reserved and will render here as soon as that PR lands.`}
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
