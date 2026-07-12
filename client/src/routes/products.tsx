import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Search, SlidersHorizontal } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { allSizes, categories, products } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  size: z.string().optional(),
  sort: z.enum(["featured", "lowHigh", "highLow", "newest"]).optional(),
  max: z.number().optional(),
});

export const Route = createFileRoute("/products")({
  validateSearch: (s) => searchSchema.parse(s),
  component: ProductsPage,
});

function ProductsPage() {
  const { t, lang } = useI18n();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const [q, setQ] = useState(search.q ?? "");
  const [maxPrice, setMaxPrice] = useState(search.max ?? 2500);
  const category = search.category ?? "all";
  const size = search.size ?? "all";
  const sort = search.sort ?? "featured";

  const filtered = useMemo(() => {
    let list = products.slice();
    const query = q.trim().toLowerCase();
    if (query) list = list.filter((p) => p.name.en.toLowerCase().includes(query) || p.name.hi.includes(query));
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (size !== "all") list = list.filter((p) => p.sizes.includes(size));
    list = list.filter((p) => (p.discountPrice ?? p.price) <= maxPrice);
    switch (sort) {
      case "lowHigh": list.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)); break;
      case "highLow": list.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price)); break;
      case "newest": list.sort((a, b) => Number(b.id) - Number(a.id)); break;
      default: list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return list;
  }, [q, category, size, sort, maxPrice]);

  const setParam = (patch: Partial<z.infer<typeof searchSchema>>) => {
    navigate({ search: (prev: Record<string, unknown>) => ({ ...prev, ...patch }) as never, replace: true });
  };

  const Filters = (
    <div className="flex flex-col gap-6">
      <div>
        <label className="text-sm font-medium">{t("category")}</label>
        <Select value={category} onValueChange={(v) => setParam({ category: v === "all" ? undefined : v })}>
          <SelectTrigger className="mt-2 rounded-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("all")}</SelectItem>
            {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c[lang]}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium">{t("size")}</label>
        <Select value={size} onValueChange={(v) => setParam({ size: v === "all" ? undefined : v })}>
          <SelectTrigger className="mt-2 rounded-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("all")}</SelectItem>
            {allSizes.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">{t("price")}</label>
          <span className="text-sm text-muted-foreground">≤ ₹{maxPrice}</span>
        </div>
        <Slider
          className="mt-3"
          value={[maxPrice]}
          min={300}
          max={3000}
          step={100}
          onValueChange={(v) => setMaxPrice(v[0])}
          onValueCommit={(v) => setParam({ max: v[0] })}
        />
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("shop")}</h1>
        <p className="mt-1 text-muted-foreground">{filtered.length} products</p>

        <div className="mt-6 grid gap-4 md:grid-cols-[16rem_1fr]">
          <aside className="hidden md:block">
            <div className="sticky top-24 rounded-3xl border border-border/60 bg-card p-6">
              {Filters}
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => { setQ(e.target.value); setParam({ q: e.target.value || undefined }); }}
                  placeholder={t("search")}
                  aria-label={t("search")}
                  className="h-11 rounded-full pl-9"
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="rounded-full md:hidden">
                    <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                  <div className="mt-6">{Filters}</div>
                </SheetContent>
              </Sheet>
              <Select value={sort} onValueChange={(v) => setParam({ sort: v as never })}>
                <SelectTrigger className="h-11 w-44 rounded-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">{t("featured")}</SelectItem>
                  <SelectItem value="newest">{t("newest")}</SelectItem>
                  <SelectItem value="lowHigh">{t("lowHigh")}</SelectItem>
                  <SelectItem value="highLow">{t("highLow")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filtered.length === 0 ? (
              <div className="mt-16 rounded-3xl border border-dashed border-border p-12 text-center">
                <div className="text-5xl">🧺</div>
                <p className="mt-3 text-muted-foreground">{t("resultsEmpty")}</p>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}