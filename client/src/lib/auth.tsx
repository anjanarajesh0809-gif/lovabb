import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type User = { name: string; email: string; role: "customer" | "admin" };
type Ctx = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthCtx = createContext<Ctx>(null!);
const KEY = "auth_user_v1";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);
  const save = (u: User | null) => {
    setUser(u);
    try { u ? localStorage.setItem(KEY, JSON.stringify(u)) : localStorage.removeItem(KEY); } catch {}
  };
  const login: Ctx["login"] = async (email) => {
    await new Promise((r) => setTimeout(r, 400));
    const role = email.toLowerCase().includes("admin") ? "admin" : "customer";
    save({ name: email.split("@")[0] || "Guest", email, role });
  };
  const register: Ctx["register"] = async (name, email) => {
    await new Promise((r) => setTimeout(r, 400));
    save({ name, email, role: "customer" });
  };
  const logout = () => save(null);

  return <AuthCtx.Provider value={{ user, login, register, logout }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);

export type Order = {
  id: string;
  createdAt: string;
  items: { productId: string; name: string; size: string; quantity: number; price: number }[];
  total: number;
  status: "placed" | "packed" | "shipped" | "delivered";
  paymentMethod: "card" | "upi" | "cod";
  address: { name: string; phone: string; line: string; city: string; state: string; pincode: string };
};

const ORDERS_KEY = "orders_v1";

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]"); } catch { return []; }
}
export function saveOrders(orders: Order[]) {
  try { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); } catch {}
}
export function addOrder(o: Order) {
  const all = loadOrders();
  all.unshift(o);
  saveOrders(all);
}