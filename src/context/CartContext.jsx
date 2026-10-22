/**
 * CartContext — WovenHaat cart with persistence and updateQty support.
 * API: { items, count, addItem, removeItem, updateQty, clear }
 */
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "wovenhaat_cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  // Persist on every change
  const persist = (next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  };

  const addItem = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === product.slug);
      const next = found
        ? prev.map((i) => i.slug === product.slug ? { ...i, qty: i.qty + qty } : i)
        : [...prev, {
            slug: product.slug,
            name: product.name,
            price: product.price,
            qty,
            image: product.image || null,
            variant: product.variant || null,
            stock: product.stock || 99,
          }];
      return persist(next);
    });
  }, []);

  const removeItem = useCallback((slug) => {
    setItems((prev) => persist(prev.filter((i) => i.slug !== slug)));
  }, []);

  // Alias for pages that use remove() instead of removeItem()
  const remove = removeItem;

  const updateQty = useCallback((slug, qty) => {
    if (qty < 1) return;
    setItems((prev) => persist(prev.map((i) => i.slug === slug ? { ...i, qty } : i)));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    return { items, count, addItem, removeItem, remove, updateQty, clear };
  }, [items, addItem, removeItem, remove, updateQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  return ctx ?? {
    items: [],
    count: 0,
    addItem: () => {},
    removeItem: () => {},
    remove: () => {},
    updateQty: () => {},
    clear: () => {},
  };
}

export default CartContext;
