import { createContext, useContext } from "react";

export const StoreContext = createContext({
  compare: [],
  clearCompare: () => {},
  toggleCompare: () => {},
});

export const useStore = () => useContext(StoreContext);
