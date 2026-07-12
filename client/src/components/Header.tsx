import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { categories } from "@/lib/products";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/products", search: { q: q || undefined } as never });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:gap-6">
        <div className="flex min-w-0 items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader><SheetTitle>{t("brand")}</SheetTitle></SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                <Link to="/" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-muted">{t("home")}</Link>
                <Link to="/products" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-muted">{t("shop")}</Link>
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to="/products"
                    search={{ category: c.id } as never}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 pl-6 text-sm text-muted-foreground hover:bg-muted"
                  >
                    {c.emoji} {c[lang]}
                  </Link>
                ))}
                <Link to="/orders" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-muted">{t("orders")}</Link>
                <Link to="/admin" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-muted">{t("admin")}</Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">🌸</span>
            <span className="truncate text-lg font-semibold tracking-tight">{t("brand")}</span>
          </Link>
          <nav className="ml-6 hidden items-center gap-4 text-sm md:flex">
            <Link to="/" className="text-muted-foreground transition hover:text-foreground" activeProps={{ className: "text-foreground font-medium" }} activeOptions={{ exact: true }}>{t("home")}</Link>
            <Link to="/products" className="text-muted-foreground transition hover:text-foreground" activeProps={{ className: "text-foreground font-medium" }}>{t("shop")}</Link>
            <Link to="/orders" className="text-muted-foreground transition hover:text-foreground" activeProps={{ className: "text-foreground font-medium" }}>{t("orders")}</Link>
          </nav>
        </div>

        <form onSubmit={submitSearch} className="relative min-w-0" role="search">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search")}
            aria-label={t("search")}
            className="h-10 rounded-full border-border/60 bg-muted/60 pl-9"
          />
        </form>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Language">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang("en")}>English {lang === "en" && "✓"}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("hi")}>हिन्दी {lang === "hi" && "✓"}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t("login")}>
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {user ? (
                <>
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link to="/orders">{t("myOrders")}</Link></DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild><Link to="/admin">{t("admin")}</Link></DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout}>{t("logout")}</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild><Link to="/login">{t("login")}</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/register">{t("register")}</Link></DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild variant="ghost" size="icon" className="relative" aria-label={t("cart")}>
            <Link to="/cart">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}