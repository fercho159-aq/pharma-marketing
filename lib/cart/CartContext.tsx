"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/data/products";

export type CartItem = {
  product: Product;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "ohm-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage once.
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignore corrupt state */
    }
    setHydrated(true);
  }, []);

  // Persist after hydration.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota errors */
    }
  }, [items, hydrated]);

  const add = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { product, qty }];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.product.id !== productId);
      return prev.map((i) => (i.product.id === productId ? { ...i, qty } : i));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((acc, i) => acc + i.qty, 0);
    const subtotal = items.reduce((acc, i) => acc + i.qty * i.product.price, 0);
    return { items, count, subtotal, add, remove, setQty, clear };
  }, [items, add, remove, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
