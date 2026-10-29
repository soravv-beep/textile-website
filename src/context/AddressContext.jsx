/**
 * AddressContext — WovenHaat
 * Persists user's saved addresses in localStorage.
 * API: { addresses, addAddress, updateAddress, removeAddress, setDefault }
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const AddressContext = createContext(null);
const STORAGE_KEY = "wovenhaat_addresses";

const DEFAULT_ADDRESSES = [
  {
    id: "addr_default_1",
    label: "Home",
    fullName: "Manav Chotai",
    phone: "9876543210",
    address1: "Plot 14, Sector 29, HSIDC Industrial Area",
    address2: "",
    city: "Panipat",
    state: "Haryana",
    pincode: "132103",
    isDefault: true,
  },
];

function loadAddresses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_ADDRESSES;
  } catch {
    return DEFAULT_ADDRESSES;
  }
}

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState(loadAddresses);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = useCallback((addr) => {
    const newAddr = {
      ...addr,
      id: `addr_${Date.now()}`,
      isDefault: addresses.length === 0 ? true : !!addr.isDefault,
    };
    setAddresses((prev) => {
      const updated = newAddr.isDefault
        ? prev.map((a) => ({ ...a, isDefault: false }))
        : prev;
      return [...updated, newAddr];
    });
    return newAddr;
  }, [addresses]);

  const updateAddress = useCallback((id, updates) => {
    setAddresses((prev) => {
      let list = prev.map((a) => (a.id === id ? { ...a, ...updates } : a));
      if (updates.isDefault) {
        list = list.map((a) => ({ ...a, isDefault: a.id === id }));
      }
      return list;
    });
  }, []);

  const removeAddress = useCallback((id) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      // If we removed the default, make first one default
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0] = { ...filtered[0], isDefault: true };
      }
      return filtered;
    });
  }, []);

  const setDefault = useCallback((id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  }, []);

  const defaultAddress = useMemo(
    () => addresses.find((a) => a.isDefault) || addresses[0] || null,
    [addresses]
  );

  const value = useMemo(
    () => ({ addresses, addAddress, updateAddress, removeAddress, setDefault, defaultAddress }),
    [addresses, addAddress, updateAddress, removeAddress, setDefault, defaultAddress]
  );

  return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>;
}

export function useAddress() {
  const ctx = useContext(AddressContext);
  return (
    ctx ?? {
      addresses: [],
      addAddress: () => {},
      updateAddress: () => {},
      removeAddress: () => {},
      setDefault: () => {},
      defaultAddress: null,
    }
  );
}

export default AddressContext;
