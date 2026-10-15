/**
 * App — route table for the whole site.
 *
 * Every path in src/constants/routes.js is wired here. Dev 1 owns Layout,
 * Home, About, Contact and /design-system; Dev 2 owns Shop, Collections and
 * Product detail; the remaining routes render
 * <ComingSoon /> so navigation never 404s while those PRs land. Replace the
 * element for a path as each page ships — do not add a second router.
 */
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ShopProvider } from "./context/ShopProvider.jsx";
import { ROUTES } from "./constants/routes.js";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import DesignSystem from "./pages/DesignSystem.jsx";
import ComingSoon from "./pages/ComingSoon.jsx";
import NotFound from "./pages/NotFound.jsx";

// Shop side (Dev 2) — code-split so the catalogue data only loads with these pages.
const Shop = lazy(() => import("./pages/Shop.jsx"));
const Collections = lazy(() => import("./pages/Collections.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));

/** Suspense boundary per page, so the navbar and footer stay on screen while a chunk loads. */
const withLoading = (page) => <Suspense fallback={<PageLoading />}>{page}</Suspense>;

function PageLoading() {
  return (
    <div className="shop-scope">
      <div className="page-loading" role="status">
        <div className="spinner" aria-hidden="true" />
        <span className="visually-hidden">Loading page…</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ShopProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.about} element={<About />} />
          <Route path={ROUTES.contact} element={<Contact />} />
          <Route path={ROUTES.designSystem} element={<DesignSystem />} />

          {/* Shop side (Dev 2) */}
          <Route path={ROUTES.shop} element={withLoading(<Shop />)} />
          <Route path={ROUTES.collections} element={withLoading(<Collections />)} />
          <Route path={ROUTES.collectionDetail} element={withLoading(<Collections />)} />
          <Route path={ROUTES.product} element={withLoading(<ProductDetail />)} />
          <Route
            path={ROUTES.compare}
            element={<ComingSoon title="Compare products" owner="Dev 2" note="Side-by-side product comparison is coming soon. Your selection stays in the compare bar." />}
          />

          {/* Placeholders — each owned by another developer */}
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
      </ShopProvider>
    </CartProvider>
  );
}
