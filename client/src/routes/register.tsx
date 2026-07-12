import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({ component: RegisterPage });

function RegisterPage() {
  const { t } = useI18n();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error("Passwords do not match"); return; }
    setLoading(true);
    try { await register(form.name, form.email, form.password); toast.success("Welcome!"); navigate({ to: "/" }); }
    finally { setLoading(false); }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">{t("register")}</h1>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div><Label htmlFor="name">{t("name")}</Label><Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 rounded-xl" /></div>
            <div><Label htmlFor="email">{t("email")}</Label><Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 rounded-xl" /></div>
            <div><Label htmlFor="pw">{t("password")}</Label><Input id="pw" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-1.5 rounded-xl" /></div>
            <div><Label htmlFor="cpw">{t("confirmPassword")}</Label><Input id="cpw" type="password" required value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="mt-1.5 rounded-xl" /></div>
            <Button type="submit" disabled={loading} className="w-full rounded-full">{loading ? t("processing") : t("register")}</Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link to="/login" className="text-primary hover:underline">{t("haveAccount")}</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}