/**
 * Shop context object + hook (Dev 2). The provider lives in ShopProvider.jsx;
 * this file stays component-free so shop components can import the hook
 * without a circular dependency.
 *
 *   const { wishlist, cards, addToCart, notify, ... } = useShop();
 */
import { createContext, useContext } from "react";

const noop = () => {};

export const ShopContext = createContext({
  wishlist: new Set(),
  compare: [],
  recent: [],
  notify: noop,
  toggleWish: noop,
  toggleCompare: noop,
  clearCompare: noop,
  trackViewed: noop,
  addToCart: () => false,
  moveWishlistToCart: () => false,
  cards: () => [],
  cardHandlers: {}
});

export const useShop = () => useContext(ShopContext);
