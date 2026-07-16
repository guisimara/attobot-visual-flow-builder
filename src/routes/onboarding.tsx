import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AttoLogo } from "@/components/brand/AttoLogo";
import { Check, MessageCircle, Users, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

const STEPS = [
  { icon: MessageCircle, title: "Conectar canal", desc: "Ligue seu WhatsApp (simulado nesta demo)." },
  { icon: Workflow, title: "Escolher um modelo", desc: "Comece por um fluxo pronto e ajuste." },
  { icon: Users, title: "Convidar a equipe", desc: "Adicione atendentes e defina permissões." },
];

function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 p-6">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          <AttoLogo size="lg" />
          <h1 className="mt-6 text-2xl font-semibold">Vamos configurar seu AttoBot</h1>
          <p className="text-sm text-muted-foreground">Três passos rápidos. Você pode pular e voltar depois.</p>
          <ol className="mt-8 space-y-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className={cn("flex items-start gap-3 rounded-lg border p-4", i === step && "border-primary bg-primary/5")}>
                <div className={cn("mt-0.5 flex h-8 w-8 items-center justify-center rounded-full", i < step ? "bg-primary text-primary-foreground" : "bg-muted")}>
                  {i < step ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                </div>
                <div className="flex-1"><p className="font-medium">{s.title}</p><p className="text-sm text-muted-foreground">{s.desc}</p></div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={() => navigate({ to: "/app/dashboard" })}>Pular</Button>
            <Button onClick={() => step < STEPS.length - 1 ? setStep(step + 1) : navigate({ to: "/app/dashboard" })}>
              {step < STEPS.length - 1 ? "Próximo" : "Ir para o painel"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
