/**
 * CartContext — lightweight stub that Dev 3 replaces with the real cart.
 *
 * What it gives you today (used by the Navbar badge and the Home bestsellers):
 *   const { items, count, addItem, removeItem, clear } = useCart();
 *
 * It is intentionally NOT a full cart: no server sync and no persistence beyond
 * a session-scoped React state. Dev 3 should keep the same hook name and return
 * shape so no consumer has to change.
 *
 * Shop integration (Dev 2): `addItem(product, qty, size)` accepts an optional
 * size so one product can sit in the cart in several sizes; lines are keyed by
 * slug + size. `removeItem(slug, size)` removes one size, or every size of the
 * slug when `size` is omitted (the original behaviour).
 */
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = useCallback((product, qty = 1, size) => {
    setItems((prev) => {
      const same = (i) => i.slug === product.slug && i.size === size;
      if (prev.some(same)) {
        return prev.map((i) => (same(i) ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          qty,
          ...(size ? { size } : {}),
          ...(product.image ? { image: product.image } : {})
        }
      ];
    });
  }, []);

  const removeItem = useCallback((slug, size) => {
    setItems((prev) =>
      prev.filter((i) => !(i.slug === slug && (size === undefined || i.size === size)))
    );
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
