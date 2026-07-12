import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-16 border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">🌸</span>
            <span className="text-lg font-semibold">{t("brand")}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{t("aboutText")}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{t("footerAbout")}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Our story</li><li>Sustainability</li><li>Careers</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{t("footerHelp")}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/orders" className="hover:text-foreground">Track order</Link></li>
            <li>Size guide</li><li>Shipping</li><li>Returns</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{t("footerContact")}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>hello@littleblossoms.in</li><li>+91 98100 00000</li><li>Bengaluru, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {t("brand")}. Made with love in India.
      </div>
    </footer>
  );
}