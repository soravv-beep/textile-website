/**
 * CartContext — lightweight stub that Dev 3 replaces with the real cart.
 *
 * What it gives you today (used by the Navbar badge and the Home bestsellers):
 *   const { items, count, addItem, removeItem, clear } = useCart();
 *
 * It is intentionally NOT a full cart: no server sync, no variant handling, no
 * persistence beyond a session-scoped React state. Dev 3 should keep the same
 * hook name and return shape so no consumer has to change.
 */
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === product.slug);
      if (found) {
        return prev.map((i) =>
          i.slug === product.slug ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { slug: product.slug, name: product.name, price: product.price, qty }];
    });
  }, []);

  const removeItem = useCallback((slug) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    return { items, count, addItem, removeItem, clear };
  }, [items, addItem, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Read the cart. Safe outside a provider (returns a zeroed stub) so shared
 * components like <ProductCard /> never crash in isolation.
 */
export function useCart() {
  const ctx = useContext(CartContext);
  return (
    ctx ?? {
      items: [],
      count: 0,
      addItem: () => {},
      removeItem: () => {},
      clear: () => {}
    }
  );
}

export default CartContext;
