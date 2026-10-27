/**
 * OrdersContext — order history management for WovenHaat.
 *
 * Provides: { orders, placeOrder, getOrder, cancelOrder }
 * Orders are persisted in localStorage (replace with API later).
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const OrdersContext = createContext(null);
const STORAGE_KEY = "wovenhaat_orders";

/** Dummy orders for Order Tracking and Account page review. */
const DUMMY_ORDERS = [
  {
    id: "WH-2024-DM01",
    items: [
      { slug: "bhujodi-terracotta-rug", name: "Bhujodi Terracotta Handloom Rug", price: 12499, qty: 1,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&auto=format&fit=crop" },
      { slug: "coral-loom-cushion-set", name: "Coral Loom Cushion Cover Set", price: 2490, qty: 2,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&auto=format&fit=crop" },
    ],
    shippingAddress: { fullName: "Manav Chotai", phone: "9876543210", address1: "Plot 14, Sector 29", address2: "Industrial Area", city: "Panipat", state: "Haryana", pincode: "132103" },
    paymentMethod: "card",
    subtotal: 17479, shippingCost: 0, total: 17479,
    status: "shipped",
    placedAt:  new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    trackingNumber: "TRACK1234567890",
    timeline: [
      { status: "confirmed",  label: "Order Confirmed", time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
      { status: "processing", label: "Processing",      time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { status: "shipped",    label: "Shipped",         time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: "WH-2024-DM02",
    items: [
      { slug: "mocha-handloom-throw", name: "Mocha Handloom Throw", price: 3450, qty: 1,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&auto=format&fit=crop" },
      { slug: "turquoise-ribbed-bath-mat", name: "Turquoise Ribbed Bath Mat", price: 1190, qty: 2,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=80&auto=format&fit=crop" },
    ],
    shippingAddress: { fullName: "Manav Chotai", phone: "9876543210", address1: "Plot 14, Sector 29", address2: "", city: "Panipat", state: "Haryana", pincode: "132103" },
    paymentMethod: "cod",
    subtotal: 5830, shippingCost: 0, total: 5830,
    status: "delivered",
    placedAt:  new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    trackingNumber: "TRACK0987654321",
    timeline: [
      { status: "confirmed",  label: "Order Confirmed", time: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
      { status: "processing", label: "Processing",      time: new Date(Date.now() - 9  * 24 * 60 * 60 * 1000).toISOString() },
      { status: "shipped",    label: "Shipped",         time: new Date(Date.now() - 8  * 24 * 60 * 60 * 1000).toISOString() },
      { status: "delivered",  label: "Delivered",       time: new Date(Date.now() - 5  * 24 * 60 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: "WH-2024-DM03",
    items: [
      { slug: "kannur-midnight-rug", name: "Kannur Midnight Hand-Knotted Rug", price: 28900, qty: 1,
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=80&auto=format&fit=crop" },
    ],
    shippingAddress: { fullName: "Manav Chotai", phone: "9876543210", address1: "Plot 14, Sector 29", address2: "", city: "Panipat", state: "Haryana", pincode: "132103" },
    paymentMethod: "upi",
    subtotal: 28900, shippingCost: 0, total: 28900,
    status: "confirmed",
    placedAt:  new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    trackingNumber: "TRACK1122334455",
    timeline: [
      { status: "confirmed", label: "Order Confirmed", time: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
    ],
  },
];

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DUMMY_ORDERS;
  } catch {
    return DUMMY_ORDERS;
  }
}

/** Generate a readable order ID like WH-2024-A3F9 */
function generateOrderId() {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `WH-${year}-${rand}`;
}

export const ORDER_STATUS = {
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  RETURNED: "returned"
};

export const STATUS_LABELS = {
  confirmed:        "Order Confirmed",
  processing:       "Processing",
  shipped:          "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered:        "Delivered",
  cancelled:        "Cancelled",
  returned:         "Returned"
};

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  /**
   * placeOrder({ items, shippingAddress, paymentMethod, total })
   * Returns the new order object.
   */
  const placeOrder = useCallback(({ items, shippingAddress, paymentMethod, total, subtotal, shippingCost }) => {
    const now = new Date().toISOString();
    const order = {
      id: generateOrderId(),
      items,
      shippingAddress,
      paymentMethod,
      total,
      subtotal,
      shippingCost,
      status: ORDER_STATUS.CONFIRMED,
      placedAt: now,
      createdAt: now,  // alias used by Orders.jsx
      timeline: [
        { status: ORDER_STATUS.CONFIRMED, label: "Order Confirmed", time: now }
      ],
      trackingNumber: `TRACK${Date.now()}`,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const getOrder = useCallback((id) => orders.find((o) => o.id === id) ?? null, [orders]);

  const cancelOrder = useCallback((id) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id && o.status === ORDER_STATUS.CONFIRMED
          ? {
              ...o,
              status: ORDER_STATUS.CANCELLED,
              timeline: [
                ...o.timeline,
                { status: ORDER_STATUS.CANCELLED, label: "Order Cancelled", time: new Date().toISOString() }
              ]
            }
          : o
      )
    );
  }, []);

  const value = useMemo(() => ({ orders, placeOrder, getOrder, cancelOrder }), [orders, placeOrder, getOrder, cancelOrder]);

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  return ctx ?? { orders: [], placeOrder: () => null, getOrder: () => null, cancelOrder: () => {} };
}

export default OrdersContext;
