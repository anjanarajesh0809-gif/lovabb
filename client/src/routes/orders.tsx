import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { loadOrders, type Order } from "@/lib/auth";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/orders")({ component: OrdersPage });

const statusColor: Record<Order["status"], string> = {
  placed: "bg-accent text-accent-foreground",
  packed: "bg-secondary text-secondary-foreground",
  shipped: "bg-primary/20 text-primary",
  delivered: "bg-primary text-primary-foreground",
};

function OrdersPage() {
  const { t } = useI18n();
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => { setOrders(loadOrders()); }, []);

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-semibold tracking-tight">{t("myOrders")}</h1>
        {orders.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-border p-12 text-center">
            <div className="text-6xl">📦</div>
            <p className="mt-3 text-muted-foreground">{t("noOrders")}</p>
            <Button asChild className="mt-4 rounded-full"><Link to="/products">{t("shopNow")}</Link></Button>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {orders.map((o) => (
              <li key={o.id} className="rounded-3xl border border-border/60 bg-card p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">#{o.id}</span>
                      <Badge className={`rounded-full ${statusColor[o.status]}`}>{t(o.status as never)}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</p>
                    <ul className="mt-3 space-y-1 text-sm">
                      {o.items.map((it, i) => (
                        <li key={i} className="text-muted-foreground">
                          {it.name} · {it.size} × {it.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{formatINR(o.total)}</div>
                    <div className="text-xs text-muted-foreground capitalize">{o.paymentMethod}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}