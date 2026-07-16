import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const navigate = useNavigate();
  return (
    <AuthShell title="Criar conta AttoBot" subtitle="Comece com dados de demonstração."
      footer={<>Já tem conta? <Link to="/login" className="text-primary">Entrar</Link></>}>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate({ to: "/onboarding" }); }}>
        <div className="space-y-2"><Label>Nome completo</Label><Input defaultValue="Marina Souza" /></div>
        <div className="space-y-2"><Label>Empresa</Label><Input defaultValue="Clínica Aurora" /></div>
        <div className="space-y-2"><Label>E-mail</Label><Input type="email" defaultValue="marina@aurora.com" /></div>
        <div className="space-y-2"><Label>Senha</Label><Input type="password" defaultValue="demo1234" /></div>
        <Button type="submit" className="w-full">Criar conta (demo)</Button>
      </form>
    </AuthShell>
  );
}
