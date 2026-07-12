import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartItem = { productId: string; size: string; quantity: number };

type Ctx = {
  items: CartItem[];
  add: (productId: string, size: string, qty?: number) => void;
  remove: (productId: string, size: string) => void;
  setQty: (productId: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: (CartItem & { product: Product; lineTotal: number })[];
};

const CartCtx = createContext<Ctx>(null!);
const KEY = "cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const add: Ctx["add"] = (productId, size, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === productId && i.size === size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [...prev, { productId, size, quantity: qty }];
    });
  };
  const remove: Ctx["remove"] = (productId, size) =>
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));
  const setQty: Ctx["setQty"] = (productId, size, qty) =>
    setItems((prev) =>
      prev.map((i) => (i.productId === productId && i.size === size ? { ...i, quantity: Math.max(1, qty) } : i)),
    );
  const clear = () => setItems([]);

  const detailed = items
    .map((i) => {
      const product = products.find((p) => p.id === i.productId);
      if (!product) return null;
      const price = product.discountPrice ?? product.price;
      return { ...i, product, lineTotal: price * i.quantity };
    })
    .filter(Boolean) as Ctx["detailed"];

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = detailed.reduce((s, d) => s + d.lineTotal, 0);

  return (
    <CartCtx.Provider value={{ items, add, remove, setQty, clear, count, subtotal, detailed }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);