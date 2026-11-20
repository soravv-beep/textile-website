/**
 * ShopProvider — shop-side state (Dev 2): wishlist, compare list, recently
 * viewed, toast messages and size-aware add-to-cart.
 *
 * - The cart itself stays in CartContext (the navbar badge reads it); this
 *   provider only validates the size/price and calls `addItem`.
 * - Wishlist and recently-viewed persist in localStorage (`wh-wishlist`,
 *   `wh-recent`), same keys as the original shop build.
 * - Renders the toast and the compare bar so no layout file needs to change.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ShopContext } from "./shopContext.js";
import { useCart } from "./CartContext.jsx";
import { useWishlist } from "./WishlistContext.jsx";
import { products } from "../data/catalog.js";
import { getUnitPrice, toCardProps } from "../utils/shop.js";
import Toast from "../components/shop/Toast.jsx";
import CompareBar from "../components/shop/CompareBar.jsx";

const productById = new Map(products.map((product) => [product.id, product]));
const productBySlug = new Map(products.map((product) => [product.slug, product]));
const MAX_QTY = 99;
const MAX_COMPARE = 3;

/** Catalogue product → the shape WishlistContext stores. */
const toWishlistItem = (product) => ({
  slug: product.slug,
  id: product.id,
  name: product.name,
  price: getUnitPrice(product, product.sizes?.[0]) ?? product.price ?? 0,
  oldPrice: product.oldPrice ?? null,
  image: product.image || (product.images && product.images[0]) || null,
  stock: product.stock ?? 99
});

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) — state still works in memory */
  }
};

const validIds = (ids, limit = Infinity) => {
  if (!Array.isArray(ids)) return [];
  const seen = new Set();
  return ids
    .filter((id) => {
      if (typeof id !== "number" || !productById.has(id) || seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .slice(0, limit);
};

export function ShopProvider({ children }) {
  const { addItem, items } = useCart();
  // The wishlist lives in WishlistContext (the navbar badge, /wishlist and the
  // account page all read that one), so cards only derive the saved ids here.
  const {
    items: wishlistItems,
    addItem: addWishlistItem,
    remove: removeWishlistItem,
    toggle: toggleWishlistItem
  } = useWishlist();
  const wishlist = useMemo(() => {
    const ids = new Set();
    wishlistItems.forEach((item) => {
      const id = productBySlug.get(item.slug)?.id ?? item.id;
      if (typeof id === "number") ids.add(id);
    });
    return ids;
  }, [wishlistItems]);
  const [compare, setCompare] = useState([]);
  const [recent, setRecent] = useState(() => validIds(readStorage("wh-recent", []), 8));
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  // One-time lift of the old `wh-wishlist` id list (written by this provider
  // before the wishlist was unified) into WishlistContext.
  const migratedWishlist = useRef(false);
  useEffect(() => {
    if (migratedWishlist.current) return;
    migratedWishlist.current = true;
    const legacy = validIds(readStorage("wh-wishlist", []));
    if (!legacy.length) return;
    legacy.forEach((id) => {
      const product = productById.get(id);
      if (product) addWishlistItem(toWishlistItem(product));
    });
    try {
      localStorage.removeItem("wh-wishlist");
    } catch {
      /* storage unavailable — nothing to clean up */
    }
  }, [addWishlistItem]);

  const notify = useCallback((message) => setToast(message), []);
  const clearCompare = useCallback(() => setCompare([]), []);

  const toggleWish = useCallback(
    (product) => {
      const wasWished = wishlist.has(product.id);
      toggleWishlistItem(toWishlistItem(product));
      notify(wasWished ? "Removed from wishlist." : "Saved to your wishlist.");
    },
    [wishlist, toggleWishlistItem, notify]
  );

  const toggleCompare = useCallback(
    (product) => {
      if (compare.includes(product.id)) {
        setCompare(compare.filter((id) => id !== product.id));
      } else if (compare.length >= MAX_COMPARE) {
        notify(`You can compare up to ${MAX_COMPARE} products.`);
      } else {
        setCompare([...compare, product.id]);
      }
    },
    [compare, notify]
  );

  /** Add one product/size to the cart. Returns true on success, false otherwise. */
  const addToCart = useCallback(
    (product, qty = 1, size = product.sizes[0], silent = false) => {
      if (!product.sizes.includes(size) || !Number.isInteger(qty) || qty < 1) return false;
      const unitPrice = getUnitPrice(product, size);
      if (unitPrice === null) {
        notify("Price unavailable for this size. Please choose another size.");
        return false;
      }
      const inCart = items.find((i) => i.slug === product.slug && i.size === size)?.qty ?? 0;
      if (inCart + qty > MAX_QTY) {
        notify("This size already has the maximum quantity in your cart.");
        return false;
      }
      addItem({ slug: product.slug, name: product.name, price: unitPrice, image: product.image }, qty, size);
      if (!silent) notify(`${product.name} added to cart.`);
      return true;
    },
    [addItem, items, notify]
  );

  const trackViewed = useCallback((id) => {
    setRecent((current) => {
      if (current[0] === id) return current;
      const next = [id, ...current.filter((x) => x !== id)].slice(0, 8);
      writeStorage("wh-recent", next);
      return next;
    });
  }, []);

  /** For the wishlist page (Dev 4): move a saved product to the cart. */
  const moveWishlistToCart = useCallback(
    (product, size) => {
      if (!wishlist.has(product.id)) return false;
      if (!addToCart(product, 1, size, true)) return false;
      removeWishlistItem(product.slug);
      notify(`${product.name} moved to cart.`);
      return true;
    },
    [wishlist, addToCart, removeWishlistItem, notify]
  );

  /** Catalogue products → props for the shared <ProductCard />. */
  const cards = useCallback(
    (list) =>
      list.map((product) =>
        toCardProps(product, { wished: wishlist.has(product.id), compared: compare.includes(product.id) })
      ),
    [wishlist, compare]
  );

  /** Handlers to spread on <ProductGrid /> (the card passes the product id). */
  const cardHandlers = useMemo(
    () => ({
      onAddToCart: (id) => {
        const product = productById.get(id);
        // Throwing resets the card's button; the toast already explained why.
        if (!product || !addToCart(product, 1, product.sizes[0])) throw new Error("Unavailable");
      },
      onToggleWishlist: (id) => {
        const product = productById.get(id);
        if (product) toggleWish(product);
      },
      onToggleCompare: (id) => {
        const product = productById.get(id);
        if (product) toggleCompare(product);
      }
    }),
    [addToCart, toggleWish, toggleCompare]
  );

  const value = useMemo(
    () => ({
      wishlist,
      compare,
      recent,
      notify,
      toggleWish,
      toggleCompare,
      clearCompare,
      trackViewed,
      addToCart,
      moveWishlistToCart,
      cards,
      cardHandlers
    }),
    [wishlist, compare, recent, notify, toggleWish, toggleCompare, clearCompare, trackViewed, addToCart, moveWishlistToCart, cards, cardHandlers]
  );

  return (
    <ShopContext.Provider value={value}>
      {children}
      <Toast message={toast} />
      <CompareBar clear={clearCompare} />
    </ShopContext.Provider>
  );
}

export default ShopProvider;
