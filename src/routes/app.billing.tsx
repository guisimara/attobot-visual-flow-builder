import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { dashboardStats, tenant } from "@/data/mock";

export const Route = createFileRoute("/app/billing")({ component: Billing });

function Billing() {
  const u = dashboardStats.planUsage;
  return (
    <div>
      <PageHeader title="Plano e cobrança" description="Assinatura, uso e faturas." />
      <div className="grid gap-4 p-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="flex items-center gap-2">{tenant.plan} <Badge>Ativo</Badge></CardTitle><CardDescription>Renova em 12 dias.</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm"><span>{u.used.toLocaleString("pt-BR")} / {u.total.toLocaleString("pt-BR")} {u.label}</span></div>
            <Progress value={(u.used / u.total) * 100} />
            <div className="flex gap-2"><Button>Fazer upgrade</Button><Button variant="outline">Gerenciar</Button></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Método de pagamento</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Nenhum cartão cadastrado (demo).</CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader><CardTitle>Faturas</CardTitle><CardDescription>Últimas cobranças</CardDescription></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Sem faturas nesta demonstração.</CardContent>
        </Card>
      </div>
    </div>
  );
}
