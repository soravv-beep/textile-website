/**
 * App — route table for the whole site.
 * Dev 3 (Manav Chotai) owns: Cart, Checkout, Login, Account, Wishlist, Orders.
 */
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Layout from "./components/layout/Layout.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { OrdersProvider } from "./context/OrdersContext.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { ROUTES } from "./constants/routes.js";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import DesignSystem from "./pages/DesignSystem.jsx";
import ComingSoon from "./pages/ComingSoon.jsx";
import NotFound from "./pages/NotFound.jsx";

/* Dev 3 pages */
import CartPage     from "./pages/Cart.jsx";
import CheckoutPage from "./pages/Checkout.jsx";
import LoginPage    from "./pages/Login.jsx";
import AccountPage  from "./pages/Account.jsx";
import WishlistPage from "./pages/Wishlist.jsx";
import OrdersPage   from "./pages/Orders.jsx";

/** Redirects unauthenticated users to /login, preserving the intended path. */
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
        <WishlistProvider>
          <OrdersProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path={ROUTES.home}         element={<Home />} />
                <Route path={ROUTES.about}        element={<About />} />
                <Route path={ROUTES.contact}      element={<Contact />} />
                <Route path={ROUTES.designSystem} element={<DesignSystem />} />
                <Route path={ROUTES.login}        element={<LoginPage />} />

                {/* Protected — require login */}
                <Route path={ROUTES.cart}     element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                <Route path={ROUTES.checkout} element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                <Route path={ROUTES.account}  element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
                <Route path={ROUTES.wishlist} element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
                <Route path={ROUTES.orders}   element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />

                {/* Placeholders */}
                <Route path={ROUTES.shop}           element={<ComingSoon title="Shop" owner="Dev 2" note="Product grid, filters and sorting land here." />} />
                <Route path={ROUTES.collections}    element={<ComingSoon title="Collections" owner="Dev 2" note="Collections being assembled." />} />
                <Route path={ROUTES.product}        element={<ComingSoon title="Product" owner="Dev 2" note="Product detail pages coming soon." />} />
                <Route path={ROUTES.bulkOrders}     element={<ComingSoon title="Bulk & custom orders" owner="Dev 5" />} />
                <Route path={ROUTES.faq}            element={<ComingSoon title="FAQ" owner="Dev 5" />} />
                <Route path={ROUTES.shippingReturns}element={<ComingSoon title="Shipping & returns" owner="Dev 5" />} />
                <Route path={ROUTES.sustainability} element={<ComingSoon title="Sustainability" owner="Dev 5" />} />
                <Route path={ROUTES.lookbook}       element={<ComingSoon title="Lookbook" owner="Dev 5" />} />
                <Route path={ROUTES.journal}        element={<ComingSoon title="Journal" owner="Dev 5" />} />
                <Route path={ROUTES.journalPost}    element={<ComingSoon title="Journal article" owner="Dev 5" />} />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </OrdersProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
