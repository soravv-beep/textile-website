import { useEffect, useMemo, useState, useCallback, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Toast from "./components/common/Toast.jsx";
import { StoreContext } from "./context/StoreContext.js";
import { products, coupons } from "./data/storeData.js";
import { lineKey, getUnitPrice } from "./utils/format.js";
import Layout from "./components/Layout";

const ShopPage = lazy(() => import("./pages/ShopPage.jsx"));
const CollectionsPage = lazy(() => import("./pages/CollectionsPage.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

function PageSkeleton() {
  return (
    <main className="page-loading" role="status">
      <div className="spinner" aria-hidden="true" />
      <span className="sr-only">Loading page…</span>
    </main>
  );
}

const pageTitles = {
  "/shop": "Shop Handwoven Textiles",
  "/collections": "Collections",
};

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return fallback;
  }
};

const validateRecent = (ids) => {
  if (!Array.isArray(ids)) return [];
  const seen = new Set();
  return ids.filter((id) => {
    if (typeof id !== "number") return false;
    if (!products.some((p) => p.id === id)) return false;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  }).slice(0, 8);
};

export default function App() {
  const location = useLocation();
  const [wishlist, setWishlist] = useState(() => {
    const stored = readStorage("wh-wishlist", []);
    if (!Array.isArray(stored)) return new Set();
    const valid = stored.filter((id) => typeof id === "number" && products.some((p) => p.id === id));
    return new Set(valid);
  });

  const [cart, setCart] = useState(() => {
    const stored = readStorage("wh-cart", []);
    if (!Array.isArray(stored)) return [];
    const normalized = new Map();
    for (const item of stored) {
      const product = products.find((p) => p.id === item?.product?.id);
      if (!product || !Number.isInteger(item.qty) || item.qty < 1 || !product.sizes.includes(item.size)) continue;
      const key = lineKey(item);
      const previous = normalized.get(key);
      normalized.set(key, { product, size: item.size, qty: Math.min(99, item.qty + (previous?.qty || 0)) });
    }
    return [...normalized.values()];
  });

  const [coupon, setCoupon] = useState(() => {
    try {
      const raw = localStorage.getItem("wh-coupon") || "";
      const value = readStorage("wh-coupon", raw);
      return typeof value === "string" && Object.hasOwn(coupons, value) ? value : "";
    } catch { return ""; }
  });
  const [compare, setCompare] = useState([]);
  const [recent, setRecent] = useState(() => validateRecent(readStorage("wh-recent", [])));
  const [lastOrder, setLastOrder] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  const cleanPath = location.pathname;

  useEffect(() => {
    let title = pageTitles[cleanPath];
    if (cleanPath.startsWith("/product/")) title = products.find((p) => p.slug === cleanPath.split("/")[2])?.name;
    if (cleanPath.startsWith("/collections/")) title = "Collection";
    document.title = title ? `${title} | WovenHaat` : "Page not found | WovenHaat";
  }, [cleanPath]);

  useEffect(() => {
    try { localStorage.setItem("wh-wishlist", JSON.stringify([...wishlist])); } catch {}
  }, [wishlist]);

  useEffect(() => {
    try { localStorage.setItem("wh-cart", JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem("wh-coupon", coupon); } catch {}
  }, [coupon]);

  const notify = useCallback((message) => setToast(message), []);
  const clearCompare = useCallback(() => setCompare([]), []);

  const toggleWish = (product) => {
    const isCurrentlyWished = wishlist.has(product.id);
    setWishlist((current) => {
      const next = new Set(current);
      next.has(product.id) ? next.delete(product.id) : next.add(product.id);
      return next;
    });
    notify(isCurrentlyWished ? "Removed from wishlist." : "Saved to your wishlist.");
  };

  const toggleCompare = (product) => {
    if (compare.includes(product.id)) {
      setCompare(compare.filter((id) => id !== product.id));
    } else if (compare.length >= 3) {
      notify("You can compare up to 3 products.");
    } else {
      setCompare([...compare, product.id]);
    }
  };

  const addToCart = (product, qty = 1, size = product.sizes[0], silent = false) => {
    if (!product.sizes.includes(size) || !Number.isInteger(qty) || qty < 1) return;
    if (getUnitPrice(product, size) === null) {
      notify("Price unavailable for this size. Please choose another size.");
      return false;
    }
    setCart((current) => {
      const key = `${product.id}-${size}`;
      const found = current.find((item) => lineKey(item) === key);
      return found
        ? current.map((item) => (lineKey(item) === key ? { ...item, qty: Math.min(99, item.qty + qty) } : item))
        : [...current, { product, qty: Math.min(99, qty), size }];
    });
    if (!silent) notify(`${product.name} added to cart.`);
    return true;
  };

  const trackViewed = useCallback((id) => {
    setRecent((current) => {
      if (current[0] === id) return current;
      const next = [id, ...current.filter((x) => x !== id)].slice(0, 8);
      try { localStorage.setItem("wh-recent", JSON.stringify(next)); } catch { /* storage unavailable */ }
      return next;
    });
  }, []);

  const moveWishlistToCart = (product, size) => {
    if (!wishlist.has(product.id)) return false;
    if (product.inStock === false || product.available === false || product.stock === 0) {
      notify("This product is currently unavailable.");
      return false;
    }
    const existing = cart.find(item => item.product.id === product.id && item.size === size);
    if (existing?.qty >= 99) {
      notify("This size already has the maximum quantity in your cart.");
      return false;
    }
    if (addToCart(product, 1, size, true) !== true) return false;
    setWishlist(current => {
      const next = new Set(current);
      next.delete(product.id);
      return next;
    });
    notify(`${product.name} moved to cart.`);
    return true;
  };

  const store = useMemo(() => ({ compare, toggleCompare, clearCompare }), [compare, clearCompare]);
  const pageProps = { wishlist, onWish: toggleWish, addToCart, notify };

  return (
    <StoreContext.Provider value={store}>
      <div className="app">
        <Layout
          cartCount={cart.reduce((total, item) => total + item.qty, 0)}
          wishlistCount={wishlist.size}
          path={cleanPath}
          notify={notify}
        >
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/shop" element={<ShopPage {...pageProps} />} />
              <Route path="/collections" element={<CollectionsPage {...pageProps} />} />
              <Route path="/collections/:slug" element={<CollectionsPage {...pageProps} />} />
              <Route path="/product/:slug" element={<ProductPage {...pageProps} recent={recent} trackViewed={trackViewed} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
        <Toast message={toast} />
      </div>
    </StoreContext.Provider>
  );
}