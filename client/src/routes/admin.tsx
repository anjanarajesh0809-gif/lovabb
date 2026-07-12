import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Package, ShoppingBag, IndianRupee, Plus, Trash2, Pencil } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { products as seed, formatINR, type Product } from "@/lib/products";
import { loadOrders, saveOrders, type Order } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({ component: AdminPage });

const PKEY = "admin_products_v1";

function loadProducts(): Product[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(PKEY);
    return raw ? JSON.parse(raw) : seed;
  } catch { return seed; }
}
function saveProducts(list: Product[]) {
  try { localStorage.setItem(PKEY, JSON.stringify(list)); } catch {}
}

function AdminPage() {
  const { t } = useI18n();
  const [productList, setProductList] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => { setProductList(loadProducts()); setOrders(loadOrders()); }, []);

  const revenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-semibold tracking-tight">{t("dashboard")}</h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Stat icon={<IndianRupee className="h-5 w-5" />} label={t("revenue")} value={formatINR(revenue)} />
          <Stat icon={<ShoppingBag className="h-5 w-5" />} label={t("totalOrders")} value={String(orders.length)} />
          <Stat icon={<Package className="h-5 w-5" />} label={t("totalProducts")} value={String(productList.length)} />
        </div>

        <Tabs defaultValue="products" className="mt-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="products" className="rounded-full">{t("productsMgmt")}</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-full">{t("ordersMgmt")}</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <ProductsAdmin list={productList} setList={(l) => { setProductList(l); saveProducts(l); }} />
          </TabsContent>
          <TabsContent value="orders" className="mt-6">
            <OrdersAdmin orders={orders} setOrders={(o) => { setOrders(o); saveOrders(o); }} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6">
      <div className="flex items-center gap-3 text-muted-foreground">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground">{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      <div className="mt-3 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function ProductsAdmin({ list, setList }: { list: Product[]; setList: (l: Product[]) => void }) {
  const { t, lang } = useI18n();
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const remove = (id: string) => { setList(list.filter((p) => p.id !== id)); toast.success("Deleted"); };
  const save = (p: Product) => {
    const exists = list.some((x) => x.id === p.id);
    setList(exists ? list.map((x) => (x.id === p.id ? p : x)) : [p, ...list]);
    setOpen(false); setEditing(null);
    toast.success("Saved");
  };

  return (
    <div>
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setEditing(null); }}>
          <DialogTrigger asChild>
            <Button className="rounded-full" onClick={() => setEditing(null)}><Plus className="mr-2 h-4 w-4" />{t("addProduct")}</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{editing ? t("edit") : t("addProduct")}</DialogTitle></DialogHeader>
            <ProductForm initial={editing} onSave={save} />
          </DialogContent>
        </Dialog>
      </div>
      <ul className="mt-4 divide-y divide-border rounded-3xl border border-border/60 bg-card">
        {list.map((p) => (
          <li key={p.id} className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 p-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl text-2xl" style={{ background: p.color }}>{p.emoji}</div>
            <div className="min-w-0">
              <div className="truncate font-medium">{p.name[lang]}</div>
              <div className="text-sm text-muted-foreground">{p.category} · {formatINR(p.discountPrice ?? p.price)}</div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => { setEditing(p); setOpen(true); }} aria-label={t("edit")}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove(p.id)} aria-label={t("delete")}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductForm({ initial, onSave }: { initial: Product | null; onSave: (p: Product) => void }) {
  const [name, setName] = useState(initial?.name.en ?? "");
  const [nameHi, setNameHi] = useState(initial?.name.hi ?? "");
  const [desc, setDesc] = useState(initial?.description.en ?? "");
  const [price, setPrice] = useState(initial?.price ?? 999);
  const [emoji, setEmoji] = useState(initial?.emoji ?? "🌸");
  const [category, setCategory] = useState<Product["category"]>(initial?.category ?? "dresses");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p: Product = {
      id: initial?.id ?? String(Date.now()),
      slug: initial?.slug ?? name.toLowerCase().replace(/\s+/g, "-"),
      name: { en: name, hi: nameHi || name },
      description: { en: desc, hi: desc },
      price,
      category,
      sizes: initial?.sizes ?? ["0-6M", "6-12M", "1-2Y"],
      color: initial?.color ?? "linear-gradient(135deg, #fde2e4, #fad0c4)",
      emoji,
    };
    onSave(p);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Name (EN)</Label><Input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1.5 rounded-xl" /></div>
        <div><Label>Name (HI)</Label><Input value={nameHi} onChange={(e) => setNameHi(e.target.value)} className="mt-1.5 rounded-xl" /></div>
      </div>
      <div><Label>Description</Label><Input value={desc} onChange={(e) => setDesc(e.target.value)} className="mt-1.5 rounded-xl" /></div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div><Label>Price ₹</Label><Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mt-1.5 rounded-xl" /></div>
        <div>
          <Label>Category</Label>
          <Select value={category} onValueChange={(v: string) => setCategory(v as Product["category"])}>
            <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["dresses", "rompers", "sets", "ethnic", "accessories"].map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div><Label>Emoji</Label><Input value={emoji} onChange={(e) => setEmoji(e.target.value)} className="mt-1.5 rounded-xl" /></div>
      </div>
      <DialogFooter>
        <Button type="submit" className="rounded-full">Save</Button>
      </DialogFooter>
    </form>
  );
}

function OrdersAdmin({ orders, setOrders }: { orders: Order[]; setOrders: (o: Order[]) => void }) {
  const statuses: Order["status"][] = ["placed", "packed", "shipped", "delivered"];
  const update = (id: string, status: Order["status"]) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
    toast.success("Updated");
  };
  if (orders.length === 0) return <div className="rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">No orders</div>;
  return (
    <ul className="divide-y divide-border rounded-3xl border border-border/60 bg-card">
      {orders.map((o) => (
        <li key={o.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4">
          <div className="min-w-0">
            <div className="font-medium">#{o.id}</div>
            <div className="truncate text-sm text-muted-foreground">{o.address.name} · {o.address.city} · {formatINR(o.total)}</div>
          </div>
          <Select value={o.status} onValueChange={(v: string) => update(o.id, v as Order["status"])}>
            <SelectTrigger className="w-36 rounded-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </li>
      ))}
    </ul>
  );
}