import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({ component: Forgot });

function Forgot() {
  return (
    <AuthShell title="Recuperar senha" subtitle="Enviaremos um link para redefinir sua senha."
      footer={<Link to="/login" className="text-primary">Voltar ao login</Link>}>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("E-mail enviado (demo)"); }}>
        <div className="space-y-2"><Label>E-mail</Label><Input type="email" /></div>
        <Button type="submit" className="w-full">Enviar link (demo)</Button>
      </form>
    </AuthShell>
  );
}
