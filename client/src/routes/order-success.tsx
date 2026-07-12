import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { useMemo } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { loadOrders } from "@/lib/auth";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/order-success")({
  validateSearch: (s) => z.object({ id: z.string().optional() }).parse(s),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { t } = useI18n();
  const { id } = Route.useSearch();
  const order = useMemo(() => loadOrders().find((o) => o.id === id) ?? loadOrders()[0], [id]);

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-3xl border border-border/60 bg-card p-8 text-center shadow-sm">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">{t("orderSuccess")}</h1>
          <p className="mt-2 text-muted-foreground">{t("orderSuccessSub")}</p>
          {order && (
            <div className="mt-6 rounded-2xl bg-muted/60 p-4 text-left text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{t("orderNo")}</span><span className="font-semibold">{order.id}</span></div>
              <div className="mt-1 flex justify-between"><span className="text-muted-foreground">{t("paidWith")}</span><span className="font-medium capitalize">{t(order.paymentMethod as never)}</span></div>
              <div className="mt-1 flex justify-between"><span className="text-muted-foreground">{t("total")}</span><span className="font-semibold">{formatINR(order.total)}</span></div>
              <ul className="mt-3 space-y-1 border-t border-border pt-3">
                {order.items.map((it, i) => (
                  <li key={i} className="flex justify-between">
                    <span className="truncate">{it.name} × {it.quantity}</span>
                    <span>{formatINR(it.price * it.quantity)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-full"><Link to="/products">{t("continueShopping")}</Link></Button>
            <Button asChild variant="outline" className="rounded-full"><Link to="/orders">{t("myOrders")}</Link></Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}