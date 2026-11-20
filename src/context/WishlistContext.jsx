/**
 * WishlistContext — WovenHaat wishlist with persistence.
 * API: { items, count, addItem, removeItem, remove, toggle, isWishlisted, clear }
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "wovenhaat_wishlist";

/**
 * Rows the wishlist page used to inject as demo content. They are not in the
 * catalogue, so anything saved under these slugs is leftover demo data and is
 * dropped on load instead of showing up permanently in the list.
 */
const DEMO_SLUGS = new Set([
  "jaipuri-block-print-bedsheet",
  "kashmiri-pashmina-stole-natural",
  "hand-tufted-wool-rug-terracotta",
]);

function loadWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && !DEMO_SLUGS.has(item.slug));
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(loadWishlist);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product) => {
    setItems((prev) => {
      if (prev.find((i) => i.slug === product.slug)) return prev;
      return [...prev, {
        slug: product.slug,
        id: product.id || product.slug,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice || product.compareAtPrice || null,
        image: product.image || (product.images && product.images[0]) || null,
        variant: product.variant || null,
        itemNo: product.itemNo || product.sku || (product.id ? `962${String(product.id).padStart(4, "0")}` : null),
        stock: product.stock ?? 99,
        deliveryDays: product.deliveryDays || "4-7 working days",
        addedAt: new Date().toISOString(),
      }];
    });
  }, []);

  const removeItem = useCallback((slug) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  // Alias so pages can call both remove() and removeItem()
  const remove = removeItem;

  const toggle = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.slug === product.slug);
      if (exists) return prev.filter((i) => i.slug !== product.slug);
      return [...prev, {
        slug: product.slug,
        id: product.id || product.slug,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice || product.compareAtPrice || null,
        image: product.image || (product.images && product.images[0]) || null,
        variant: product.variant || null,
        itemNo: product.itemNo || product.sku || (product.id ? `962${String(product.id).padStart(4, "0")}` : null),
        stock: product.stock ?? 99,
        deliveryDays: product.deliveryDays || "4-7 working days",
        addedAt: new Date().toISOString(),
      }];
    });
  }, []);

  const isWishlisted = useCallback((slug) => items.some((i) => i.slug === slug), [items]);

  const clear = useCallback(() => {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(() => ({
    items,
    count: items.length,
    addItem,
    removeItem,
    remove,
    toggle,
    isWishlisted,
    clear,
  }), [items, addItem, removeItem, remove, toggle, isWishlisted, clear]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  return ctx ?? {
    items: [],
    count: 0,
    addItem: () => {},
    removeItem: () => {},
    remove: () => {},
    toggle: () => {},
    isWishlisted: () => false,
    clear: () => {},
  };
}

export default WishlistContext;
