/**
 * WishlistContext — WovenHaat wishlist with persistence.
 * API: { items, count, addItem, removeItem, remove, toggle, isWishlisted, clear }
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "wovenhaat_wishlist";

function loadWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
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
        name: product.name,
        price: product.price,
        image: product.image || null,
        variant: product.variant || null,
        stock: product.stock ?? 99,
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
        name: product.name,
        price: product.price,
        image: product.image || null,
        variant: product.variant || null,
        stock: product.stock ?? 99,
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
