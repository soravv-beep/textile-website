/**
 * App — route shell.
 *
 * Step 1 of the migration: the old static pages and the Next.js app have been
 * replaced by a Vite + React Router SPA. The shared Layout (navbar/footer),
 * design system and real pages land in the following commits; until then every
 * path renders the "Coming soon" screen so nothing 404s.
 */
import { Route, Routes } from "react-router-dom";

import ComingSoon from "./pages/ComingSoon.jsx";
import { ROUTES } from "./constants/routes.js";

export default function App() {
  return (
    <Routes>
      <Route
        path={ROUTES.home}
        element={
          <ComingSoon
            title="WovenHaat is moving to Vite"
            owner="Dev 1"
            note="The Next.js build has been replaced by Vite + React Router. The shared layout and pages land in the next commits."
          />
        }
      />
    </Routes>
  );
}
