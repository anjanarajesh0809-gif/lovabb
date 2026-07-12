import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { formatINR, type Product } from "@/lib/products";
import { ProductImage } from "./ProductImage";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useI18n();
  const cart = useCart();
  const price = product.discountPrice ?? product.price;
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-3 transition hover:shadow-lg">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative block"
        aria-label={product.name[lang]}
      >
        <ProductImage color={product.color} emoji={product.emoji} className="aspect-square" size="text-7xl" />
        {product.badge && (
          <Badge className="absolute left-3 top-3 rounded-full bg-primary text-primary-foreground shadow" variant="default">
            {product.badge === "sale" ? "SALE" : product.badge === "new" ? "NEW" : "★"}
          </Badge>
        )}
      </Link>
      <div className="mt-3 flex flex-1 flex-col gap-2 px-1">
        <Link to="/products/$slug" params={{ slug: product.slug }} className="line-clamp-1 font-medium text-foreground hover:underline">
          {product.name[lang]}
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-primary">{formatINR(price)}</span>
          {product.discountPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatINR(product.price)}</span>
          )}
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="mt-1 rounded-full"
          onClick={() => {
            cart.add(product.id, product.sizes[0], 1);
            toast.success(product.name[lang] + " · " + t("addToCart"));
          }}
        >
          <ShoppingBag className="mr-1 h-4 w-4" />
          {t("quickAdd")}
        </Button>
      </div>
    </div>
  );
}