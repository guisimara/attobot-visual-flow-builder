import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ConversationsChart, ChannelsChart } from "@/components/dashboard/Charts";
import { DemoBadge } from "@/components/layout/Badges";
import { MessageSquare, CheckCircle2, Timer, TrendingUp } from "lucide-react";
import { dashboardStats } from "@/data/mock";

export const Route = createFileRoute("/app/reports")({ component: Reports });

function Reports() {
  const s = dashboardStats;
  return (
    <div>
      <PageHeader title="Relatórios" description="Performance da operação e das automações." badge={<DemoBadge />} />
      <div className="space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Conversas" value={s.conversations.value} delta={s.conversations.delta} icon={MessageSquare} />
          <StatCard label="Resolução" value={`${s.resolutionRate.value}%`} delta={s.resolutionRate.delta} icon={CheckCircle2} />
          <StatCard label="Tempo médio" value={s.avgResponse.value} delta={s.avgResponse.delta} icon={Timer} />
          <StatCard label="Conversões" value={s.convertedContacts.value} delta={s.convertedContacts.delta} icon={TrendingUp} />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2"><ConversationsChart /></div>
          <ChannelsChart />
        </div>
      </div>
    </div>
  );
}
