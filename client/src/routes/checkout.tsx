import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { formatINR } from "@/lib/products";
import { addOrder, useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const { t, lang } = useI18n();
  const cart = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const shipping = cart.subtotal > 999 || cart.subtotal === 0 ? 0 : 99;
  const total = cart.subtotal + shipping;

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    address: "", city: "", state: "", pincode: "",
  });
  const [payment, setPayment] = useState<"card" | "upi" | "cod">("upi");
  const [loading, setLoading] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    for (const [k, v] of Object.entries(form)) {
      if (!v.trim()) { toast.error(`Please enter ${k}`); return; }
    }
    if (!/^\d{6}$/.test(form.pincode)) { toast.error("PIN code must be 6 digits"); return; }
    if (!/^\d{10}$/.test(form.phone)) { toast.error("Phone must be 10 digits"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    if (Math.random() < 0.05) { setLoading(false); toast.error("Payment failed. Please try again."); return; }
    const orderId = "LB" + Date.now().toString().slice(-8);
    addOrder({
      id: orderId,
      createdAt: new Date().toISOString(),
      items: cart.detailed.map((d) => ({
        productId: d.productId,
        name: d.product.name[lang],
        size: d.size,
        quantity: d.quantity,
        price: d.product.discountPrice ?? d.product.price,
      })),
      total,
      status: "placed",
      paymentMethod: payment,
      address: { name: form.name, phone: form.phone, line: form.address, city: form.city, state: form.state, pincode: form.pincode },
    });
    cart.clear();
    navigate({ to: "/order-success", search: { id: orderId } as never });
  };

  if (cart.detailed.length === 0) {
    return (
      <Layout>
        <div className="mx-auto max-w-md px-4 py-24 text-center">
          <div className="text-6xl">🧺</div>
          <h1 className="mt-4 text-2xl font-semibold">{t("cartEmpty")}</h1>
          <Button className="mt-6 rounded-full" onClick={() => navigate({ to: "/products" })}>{t("continueShopping")}</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-semibold tracking-tight">{t("checkout")}</h1>
        <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-8">
            <section className="rounded-3xl border border-border/60 bg-card p-6">
              <h2 className="text-lg font-semibold">{t("customerDetails")}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field id="name" label={t("name")} value={form.name} onChange={update("name")} />
                <Field id="email" label={t("email")} type="email" value={form.email} onChange={update("email")} />
                <Field id="phone" label={t("phone")} value={form.phone} onChange={update("phone")} inputMode="numeric" />
              </div>
            </section>
            <section className="rounded-3xl border border-border/60 bg-card p-6">
              <h2 className="text-lg font-semibold">{t("shippingAddress")}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2"><Field id="address" label={t("address")} value={form.address} onChange={update("address")} /></div>
                <Field id="city" label={t("city")} value={form.city} onChange={update("city")} />
                <Field id="state" label={t("state")} value={form.state} onChange={update("state")} />
                <Field id="pincode" label={t("pincode")} value={form.pincode} onChange={update("pincode")} inputMode="numeric" />
              </div>
            </section>
            <section className="rounded-3xl border border-border/60 bg-card p-6">
              <h2 className="text-lg font-semibold">{t("payment")}</h2>
              <RadioGroup value={payment} onValueChange={(v: string) => setPayment(v as "card" | "upi" | "cod")} className="mt-4 grid gap-3">
                {[
                  { v: "upi", label: t("upi"), emoji: "📱" },
                  { v: "card", label: t("card"), emoji: "💳" },
                  { v: "cod", label: t("cod"), emoji: "💵" },
                ].map((o) => (
                  <label key={o.v} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${payment === o.v ? "border-primary bg-primary/5" : "border-border"}`}>
                    <RadioGroupItem value={o.v} id={`p-${o.v}`} />
                    <span className="text-xl">{o.emoji}</span>
                    <span className="font-medium">{o.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </section>
          </div>

          <aside className="h-fit rounded-3xl border border-border/60 bg-card p-6">
            <h2 className="text-lg font-semibold">{t("orderSummary")}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {cart.detailed.map((d) => (
                <li key={d.productId + d.size} className="flex justify-between gap-2">
                  <span className="min-w-0 truncate">{d.product.name[lang]} × {d.quantity}</span>
                  <span className="shrink-0 font-medium">{formatINR(d.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between"><dt>{t("subtotal")}</dt><dd>{formatINR(cart.subtotal)}</dd></div>
              <div className="flex justify-between"><dt>{t("shipping")}</dt><dd>{shipping === 0 ? t("free") : formatINR(shipping)}</dd></div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-semibold"><dt>{t("total")}</dt><dd>{formatINR(total)}</dd></div>
            </dl>
            <Button type="submit" size="lg" disabled={loading} className="mt-6 w-full rounded-full">
              {loading ? t("processing") : `${t("placeOrder")} · ${formatINR(total)}`}
            </Button>
          </aside>
        </form>
      </div>
    </Layout>
  );
}

function Field({ id, label, ...props }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} required className="mt-1.5 rounded-xl" {...props} />
    </div>
  );
}