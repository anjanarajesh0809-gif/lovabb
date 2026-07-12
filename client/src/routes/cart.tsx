import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductImage } from "@/components/ProductImage";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { t, lang } = useI18n();
  const cart = useCart();
  const shipping = cart.subtotal > 999 || cart.subtotal === 0 ? 0 : 99;
  const total = cart.subtotal + shipping;

  if (cart.detailed.length === 0) {
    return (
      <Layout>
        <div className="mx-auto max-w-md px-4 py-24 text-center">
          <div className="text-7xl">🧺</div>
          <h1 className="mt-4 text-2xl font-semibold">{t("cartEmpty")}</h1>
          <Button asChild className="mt-6 rounded-full"><Link to="/products">{t("continueShopping")}</Link></Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-semibold tracking-tight">{t("cartTitle")}</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
          <ul className="space-y-4">
            {cart.detailed.map((d) => (
              <li key={d.productId + d.size} className="grid grid-cols-[6rem_1fr_auto] items-center gap-4 rounded-3xl border border-border/60 bg-card p-4">
                <Link to="/products/$slug" params={{ slug: d.product.slug }}>
                  <ProductImage color={d.product.color} emoji={d.product.emoji} className="aspect-square" size="text-4xl" />
                </Link>
                <div className="min-w-0">
                  <Link to="/products/$slug" params={{ slug: d.product.slug }} className="line-clamp-1 font-medium hover:underline">
                    {d.product.name[lang]}
                  </Link>
                  <p className="text-sm text-muted-foreground">{t("size")}: {d.size}</p>
                  <div className="mt-2 flex w-fit items-center rounded-full border border-border">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => cart.setQty(d.productId, d.size, d.quantity - 1)} aria-label="Decrease"><Minus className="h-3 w-3" /></Button>
                    <span className="w-8 text-center text-sm font-medium">{d.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => cart.setQty(d.productId, d.size, d.quantity + 1)} aria-label="Increase"><Plus className="h-3 w-3" /></Button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-semibold">{formatINR(d.lineTotal)}</span>
                  <Button variant="ghost" size="icon" onClick={() => cart.remove(d.productId, d.size)} aria-label={t("remove")}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-3xl border border-border/60 bg-card p-6">
            <h2 className="text-lg font-semibold">{t("orderSummary")}</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><dt>{t("subtotal")}</dt><dd className="font-medium">{formatINR(cart.subtotal)}</dd></div>
              <div className="flex justify-between"><dt>{t("shipping")}</dt><dd className="font-medium">{shipping === 0 ? t("free") : formatINR(shipping)}</dd></div>
              <div className="flex justify-between border-t border-border pt-3 text-base"><dt className="font-semibold">{t("total")}</dt><dd className="font-semibold">{formatINR(total)}</dd></div>
            </dl>
            <Button asChild size="lg" className="mt-6 w-full rounded-full">
              <Link to="/checkout"><ShoppingBag className="mr-2 h-4 w-4" />{t("checkout")}</Link>
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full rounded-full">
              <Link to="/products">{t("continueShopping")}</Link>
            </Button>
          </aside>
        </div>
      </div>
    </Layout>
  );
}