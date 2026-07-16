import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, UserPlus, Clock, CheckCircle2, Timer, Zap, TrendingUp, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ConversationsChart, ChannelsChart } from "@/components/dashboard/Charts";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DemoBadge } from "@/components/layout/Badges";
import { dashboardStats } from "@/data/mock";

export const Route = createFileRoute("/app/dashboard")({ component: Dashboard });

function Dashboard() {
  const s = dashboardStats;
  return (
    <div>
      <PageHeader title="Visão geral" description="Resumo do seu atendimento hoje." badge={<DemoBadge />} />
      <div className="space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Conversas" value={s.conversations.value} delta={s.conversations.delta} icon={MessageSquare} />
          <StatCard label="Novos contatos" value={s.newContacts.value} delta={s.newContacts.delta} icon={UserPlus} />
          <StatCard label="Aguardando" value={s.waiting.value} delta={s.waiting.delta} icon={Clock} />
          <StatCard label="Taxa de resolução" value={`${s.resolutionRate.value}%`} delta={s.resolutionRate.delta} icon={CheckCircle2} />
          <StatCard label="Tempo médio de resposta" value={s.avgResponse.value} delta={s.avgResponse.delta} icon={Timer} />
          <StatCard label="Automações executadas" value={s.automationsRun.value} delta={s.automationsRun.delta} icon={Zap} />
          <StatCard label="Contatos convertidos" value={s.convertedContacts.value} delta={s.convertedContacts.delta} icon={TrendingUp} />
          <StatCard label="Automações com erro" value={s.automationErrors.value} delta={s.automationErrors.delta} icon={AlertTriangle} />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2"><ConversationsChart /></div>
          <ChannelsChart />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2"><ActivityFeed /></div>
          <Card>
            <CardHeader>
              <CardTitle>Uso do plano</CardTitle>
              <CardDescription>Ciclo atual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>{s.planUsage.used.toLocaleString("pt-BR")} / {s.planUsage.total.toLocaleString("pt-BR")}</span>
                <span className="text-muted-foreground">{s.planUsage.label}</span>
              </div>
              <Progress value={(s.planUsage.used / s.planUsage.total) * 100} />
              <p className="text-xs text-muted-foreground">Renova em 12 dias.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
