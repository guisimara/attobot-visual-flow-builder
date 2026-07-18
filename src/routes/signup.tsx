import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, callRpc } from "@/lib/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setSubmitting(false);
      toast.error(signUpError.message);
      return;
    }

    // Se a confirmação por e-mail estiver ativada no projeto, o signUp não
    // devolve uma sessão ainda — o usuário precisa clicar no link do e-mail
    // antes de conseguirmos criar o tenant/profile (que exigem auth.uid()).
    if (!signUpData.session) {
      setSubmitting(false);
      toast.success("Conta criada! Confirme seu e-mail para continuar.");
      navigate({ to: "/login" });
      return;
    }

    const { error: bootstrapError } = await callRpc("bootstrap_owner_profile", {
      p_tenant_name: company,
      p_full_name: name,
    });

    setSubmitting(false);

    if (bootstrapError) {
      toast.error("Conta criada, mas houve um erro ao configurar sua empresa: " + bootstrapError.message);
      return;
    }

    navigate({ to: "/onboarding" });
  }

  return (
    <AuthShell title="Criar conta AttoBot" subtitle="Comece agora, é rápido."
      footer={<>Já tem conta? <Link to="/login" className="text-primary">Entrar</Link></>}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label>Nome completo</Label>
          <Input required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Empresa</Label>
          <Input required value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>E-mail</Label>
          <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Senha</Label>
          <Input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Criando…" : "Criar conta"}
        </Button>
      </form>
    </AuthShell>
  );
}
