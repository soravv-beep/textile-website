/**
 * App — route table for the whole site.
 *
 * Every path in src/constants/routes.js is wired here. Dev 1 owns Layout,
 * Home, About, Contact and /design-system; Dev 2 owns Shop, Collections and
 * Product detail; Dev 3 owns Cart, Checkout, Login, Account, Wishlist and
 * Orders; the remaining routes render <ComingSoon /> so navigation never 404s
 * while those PRs land. Replace the element for a path as each page ships —
 * do not add a second router.
 */
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Layout from "./components/layout/Layout.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { OrdersProvider } from "./context/OrdersContext.jsx";
import { ShopProvider } from "./context/ShopProvider.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { useAuth } from "./context/AuthContext.jsx";
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

// Content pages (Dev 5) — long-form editorial, split out of the home chunk.
const Journal = lazy(() => import("./pages/Journal.jsx"));
const JournalPost = lazy(() => import("./pages/JournalPost.jsx"));
const Lookbook = lazy(() => import("./pages/Lookbook.jsx"));
const Sustainability = lazy(() => import("./pages/Sustainability.jsx"));

// Account side (Dev 3) — nothing here is needed until a shopper signs in.
const LoginPage = lazy(() => import("./pages/Login.jsx"));
const AccountPage = lazy(() => import("./pages/Account.jsx"));
const CartPage = lazy(() => import("./pages/Cart.jsx"));
const CheckoutPage = lazy(() => import("./pages/Checkout.jsx"));
const WishlistPage = lazy(() => import("./pages/Wishlist.jsx"));
const OrdersPage = lazy(() => import("./pages/Orders.jsx"));

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

/**
 * ProtectedRoute — Dev 3's account pages need a session. Unauthenticated
 * visitors go to /login and the path they wanted is handed over in location
 * state, so Login sends them back there after a successful sign-in.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} state={{ from: location.pathname }} replace />;
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ShopProvider>
          <WishlistProvider>
            <OrdersProvider>
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

                  {/* Account side (Dev 3) — everything except /login needs a session */}
                  <Route path={ROUTES.login} element={withLoading(<LoginPage />)} />
                  <Route path={ROUTES.cart} element={withLoading(<ProtectedRoute><CartPage /></ProtectedRoute>)} />
                  <Route path={ROUTES.checkout} element={withLoading(<ProtectedRoute><CheckoutPage /></ProtectedRoute>)} />
                  <Route path={ROUTES.account} element={withLoading(<ProtectedRoute><AccountPage /></ProtectedRoute>)} />
                  <Route path={ROUTES.wishlist} element={withLoading(<ProtectedRoute><WishlistPage /></ProtectedRoute>)} />
                  <Route path={ROUTES.orders} element={withLoading(<ProtectedRoute><OrdersPage /></ProtectedRoute>)} />

                  {/* Placeholders — each owned by another developer */}
                  <Route path={ROUTES.bulkOrders} element={<ComingSoon title="Bulk & custom orders" owner="Dev 5" />} />
                  <Route path={ROUTES.faq} element={<ComingSoon title="FAQ" owner="Dev 5" />} />
                  <Route path={ROUTES.shippingReturns} element={<ComingSoon title="Shipping & returns" owner="Dev 5" />} />
                  <Route path={ROUTES.sustainability} element={withLoading(<Sustainability />)} />
                  <Route path={ROUTES.lookbook} element={withLoading(<Lookbook />)} />
                  <Route path={ROUTES.journal} element={withLoading(<Journal />)} />
                  <Route path={ROUTES.journalPost} element={withLoading(<JournalPost />)} />

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </OrdersProvider>
          </WishlistProvider>
        </ShopProvider>
      </CartProvider>
    </AuthProvider>
  );
}
