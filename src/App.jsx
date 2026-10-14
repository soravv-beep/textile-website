/**
 * App — route table for the whole site.
 *
 * Every path in src/constants/routes.js is wired here. Dev 1 owns Layout,
 * Home, About, Contact and /design-system; the remaining routes render
 * <ComingSoon /> so navigation never 404s while those PRs land. Replace the
 * element for a path as each page ships — do not add a second router.
 */
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ROUTES } from "./constants/routes.js";

import ComingSoon from "./pages/ComingSoon.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={ROUTES.home}
            element={<ComingSoon title="Home" owner="Dev 1" note="The home page lands in the next commit — hero, categories, bestsellers, testimonials, journal and newsletter." />}
          />
          <Route
            path={ROUTES.about}
            element={<ComingSoon title="About us" owner="Dev 1" />}
          />
          <Route
            path={ROUTES.contact}
            element={<ComingSoon title="Contact" owner="Dev 1" />}
          />

          {/* Placeholders — each owned by another developer */}
          <Route
            path={ROUTES.shop}
            element={<ComingSoon title="Shop" owner="Dev 2" note="Product grid, filters and sorting land here. Until then, browse the collections on the home page." />}
          />
          <Route
            path={ROUTES.collections}
            element={<ComingSoon title="Collections" owner="Dev 2" note="Rugs, cushions, throws and bath mats collections are being assembled here." />}
          />
          <Route
            path={ROUTES.product}
            element={<ComingSoon title="Product" owner="Dev 2" note="Product detail pages are on the way — gallery, sizes and care instructions." />}
          />
          <Route
            path={ROUTES.cart}
            element={<ComingSoon title="Your cart" owner="Dev 3" note="Cart and checkout are being wired up. Add-to-cart already updates the navbar badge." />}
          />
          <Route path={ROUTES.checkout} element={<ComingSoon title="Checkout" owner="Dev 3" />} />
          <Route path={ROUTES.login} element={<ComingSoon title="Sign in" owner="Dev 4" />} />
          <Route path={ROUTES.account} element={<ComingSoon title="My account" owner="Dev 4" />} />
          <Route path={ROUTES.wishlist} element={<ComingSoon title="Wishlist" owner="Dev 4" />} />
          <Route path={ROUTES.orders} element={<ComingSoon title="Orders" owner="Dev 4" />} />
          <Route path={ROUTES.bulkOrders} element={<ComingSoon title="Bulk & custom orders" owner="Dev 5" />} />
          <Route path={ROUTES.faq} element={<ComingSoon title="FAQ" owner="Dev 5" />} />
          <Route path={ROUTES.shippingReturns} element={<ComingSoon title="Shipping & returns" owner="Dev 5" />} />
          <Route path={ROUTES.sustainability} element={<ComingSoon title="Sustainability" owner="Dev 5" />} />
          <Route path={ROUTES.lookbook} element={<ComingSoon title="Lookbook" owner="Dev 5" />} />
          <Route path={ROUTES.journal} element={<ComingSoon title="Journal" owner="Dev 5" />} />
          <Route path={ROUTES.journalPost} element={<ComingSoon title="Journal article" owner="Dev 5" />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
