import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  return (
    <AuthShell title="Entrar no AttoBot" subtitle="Acesse sua conta demonstrativa."
      footer={<>Não tem conta? <Link to="/signup" className="text-primary">Cadastre-se</Link></>}>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate({ to: "/app/dashboard" }); }}>
        <div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" type="email" defaultValue="marina@aurora.com" /></div>
        <div className="space-y-2">
          <div className="flex justify-between"><Label htmlFor="pwd">Senha</Label><Link to="/forgot-password" className="text-xs text-primary">Esqueci</Link></div>
          <Input id="pwd" type="password" defaultValue="demo1234" />
        </div>
        <Button type="submit" className="w-full">Entrar (demo)</Button>
        <p className="text-center text-xs text-muted-foreground">Autenticação real não implementada nesta etapa.</p>
      </form>
    </AuthShell>
  );
}
