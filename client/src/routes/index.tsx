import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Truck, Heart } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { categories, products } from "@/lib/products";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t, lang } = useI18n();
  const featured = products.filter((p) => p.featured);
  const newArr = products.filter((p) => p.badge === "new").concat(products.slice(0, 4)).slice(0, 4);
  const popular = products.filter((p) => p.badge === "popular").concat(products).slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[oklch(0.96_0.05_20)] via-[oklch(0.97_0.04_60)] to-[oklch(0.95_0.05_180)]" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur">
              <Sparkles className="h-3 w-3" /> {t("tagline")}
            </span>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">{t("heroSub")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/products">{t("shopNow")} <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/products" search={{ sort: "newest" } as never}>{t("exploreNew")}</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> {t("promoTitle")}</span>
              <span className="flex items-center gap-2"><Heart className="h-4 w-4 text-primary" /> 100% cotton</span>
            </div>
          </div>
          <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4 md:max-w-none">
            {featured.slice(0, 4).map((p, i) => (
              <div
                key={p.id}
                className={`aspect-square rounded-[2rem] shadow-lg ${i === 1 ? "translate-y-6" : ""} ${i === 2 ? "-translate-y-4" : ""}`}
                style={{ background: p.color }}
              >
                <div className="flex h-full items-center justify-center text-8xl">{p.emoji}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t("featuredCats")}</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/products"
              search={{ category: c.id } as never}
              className="group flex flex-col items-center gap-3 rounded-3xl bg-card p-6 text-center shadow-sm ring-1 ring-border/60 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="grid h-16 w-16 place-items-center rounded-full bg-accent text-3xl">{c.emoji}</div>
              <span className="font-medium">{c[lang]}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <Section title={t("newArrivals")} products={newArr} />

      {/* Promo */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-[oklch(0.94_0.06_20)] to-[oklch(0.94_0.07_60)] p-8 md:p-12">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t("promoTitle")}</h3>
              <p className="mt-2 text-muted-foreground">{t("promoSub")}</p>
            </div>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/products">{t("shopNow")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular */}
      <Section title={t("popular")} products={popular} />
    </Layout>
  );
}

function Section({ title, products }: { title: string; products: import("@/lib/products").Product[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <Link to="/products" className="text-sm text-primary hover:underline">View all →</Link>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
