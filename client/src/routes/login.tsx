import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const { t } = useI18n();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await login(email, password); toast.success("Welcome back!"); navigate({ to: "/" }); }
    finally { setLoading(false); }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">{t("login")}</h1>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="password">{t("password")}</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 rounded-xl" />
            </div>
            <Button type="submit" disabled={loading} className="w-full rounded-full">{loading ? t("processing") : t("login")}</Button>
          </form>
          <div className="mt-4 flex justify-between text-sm">
            <Link to="/forgot-password" className="text-primary hover:underline">{t("forgot")}</Link>
            <Link to="/register" className="text-primary hover:underline">{t("noAccount")}</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}