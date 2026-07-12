import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({ component: ForgotPage });

function ForgotPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success(t("resetSent"));
  };
  return (
    <Layout>
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">{t("resetPwd")}</h1>
          {sent ? (
            <p className="mt-4 text-muted-foreground">{t("resetSent")}</p>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div><Label htmlFor="email">{t("email")}</Label><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 rounded-xl" /></div>
              <Button type="submit" className="w-full rounded-full">{t("resetPwd")}</Button>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            <Link to="/login" className="text-primary hover:underline">{t("login")}</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}