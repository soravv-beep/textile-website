/**
 * CartContext — WovenHaat cart with persistence and updateQty support.
 * API: { items, count, addItem, removeItem, remove, updateQty, clear }
 *
 * A line is keyed by slug + size, so one rug can sit in the cart in several
 * sizes at once (ShopProvider passes the size as addItem's third argument).
 * Every mutator accepts an optional trailing size; omitting it keeps the
 * original whole-product behaviour — removeItem(slug) drops all its sizes.
 */
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "wovenhaat_cart";

/** Identity of one cart line — slug + size, whitespace-free so pages can use it in an id. */
export const lineKey = (item) =>
  `${item.slug}-${(item.size ?? "default").replace(/\s+/g, "-")}`;

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

  const addItem = useCallback((product, qty = 1, size) => {
    const same = (i) => i.slug === product.slug && i.size === size;
    setItems((prev) => {
      const found = prev.some(same);
      const next = found
        ? prev.map((i) => (same(i) ? { ...i, qty: i.qty + qty } : i))
        : [...prev, {
            slug: product.slug,
            name: product.name,
            price: product.price,
            qty,
            size,
            image: product.image || null,
            variant: product.variant || null,
            stock: product.stock || 99,
          }];
      return persist(next);
    });
  }, []);

  const removeItem = useCallback((slug, size) => {
    setItems((prev) =>
      persist(prev.filter((i) => !(i.slug === slug && (size === undefined || i.size === size))))
    );
  }, []);

  // Alias for pages that use remove() instead of removeItem()
  const remove = removeItem;

  const updateQty = useCallback((slug, qty, size) => {
    if (qty < 1) return;
    setItems((prev) =>
      persist(prev.map((i) =>
        i.slug === slug && (size === undefined || i.size === size) ? { ...i, qty } : i
      ))
    );
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
