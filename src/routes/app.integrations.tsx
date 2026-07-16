import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ComingSoonBadge } from "@/components/layout/Badges";
import { Button } from "@/components/ui/button";

const INTEGRATIONS = [
  { name: "Google Calendar", desc: "Agendamentos sincronizados." },
  { name: "HubSpot", desc: "CRM e contatos." },
  { name: "RD Station", desc: "Marketing e leads." },
  { name: "Zapier", desc: "Conecte com milhares de apps." },
  { name: "Webhook customizado", desc: "Receba eventos em tempo real." },
  { name: "API AttoBot", desc: "Integre pelo nosso REST/GraphQL." },
];

export const Route = createFileRoute("/app/integrations")({ component: Integrations });

function Integrations() {
  return (
    <div>
      <PageHeader title="Integrações" description="Conecte o AttoBot com o resto do seu stack." badge={<ComingSoonBadge />} />
      <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
        {INTEGRATIONS.map((i) => (
          <Card key={i.name}>
            <CardHeader><CardTitle className="flex items-center justify-between">{i.name} <ComingSoonBadge /></CardTitle><CardDescription>{i.desc}</CardDescription></CardHeader>
            <CardContent><Button variant="outline" disabled className="w-full">Conectar</Button></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
