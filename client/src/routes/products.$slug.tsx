import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductImage } from "@/components/ProductImage";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { formatINR, getProduct, relatedProducts } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { product: p };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <div className="text-6xl">🧺</div>
        <h1 className="mt-4 text-2xl font-semibold">Product not found</h1>
        <Button asChild className="mt-6 rounded-full"><Link to="/products">Back to shop</Link></Button>
      </div>
    </Layout>
  ),
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const cart = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const gallery = [product.color, product.color, product.color];
  const price = product.discountPrice ?? product.price;

  const handleAdd = () => {
    cart.add(product.id, size, qty);
    toast.success(product.name[lang] + " · " + t("addToCart"));
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">{t("home")}</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-foreground">{t("shop")}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name[lang]}</span>
        </nav>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <ProductImage color={gallery[activeImg]} emoji={product.emoji} className="aspect-square" size="text-[10rem]" />
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`aspect-square overflow-hidden rounded-2xl ring-2 transition ${activeImg === i ? "ring-primary" : "ring-transparent"}`}
                >
                  <ProductImage color={c} emoji={product.emoji} className="aspect-square" size="text-3xl" />
                </button>
              ))}
            </div>
          </div>

          <div>
            {product.badge && (
              <Badge className="rounded-full bg-primary text-primary-foreground">
                {product.badge.toUpperCase()}
              </Badge>
            )}
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{product.name[lang]}</h1>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-primary">{formatINR(price)}</span>
              {product.discountPrice && (
                <span className="text-lg text-muted-foreground line-through">{formatINR(product.price)}</span>
              )}
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium">{t("size")}</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/50"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium">{t("quantity")}</label>
              <div className="mt-2 flex w-fit items-center rounded-full border border-border">
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease"><Minus className="h-4 w-4" /></Button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setQty(qty + 1)} aria-label="Increase"><Plus className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full" onClick={handleAdd}>
                <ShoppingBag className="mr-2 h-4 w-4" /> {t("addToCart")}
              </Button>
              <Button asChild size="lg" variant="secondary" className="rounded-full" onClick={handleAdd}>
                <Link to="/checkout">{t("buyNow")}</Link>
              </Button>
            </div>

            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t("description")}</h2>
              <p className="mt-2 text-base leading-relaxed text-foreground">{product.description[lang]}</p>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">{t("relatedProducts")}</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {relatedProducts(product).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </Layout>
  );
}