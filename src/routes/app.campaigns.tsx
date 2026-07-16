import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ComingSoonBadge } from "@/components/layout/Badges";
import { campaigns } from "@/data/mock";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/campaigns")({ component: Campaigns });

function Campaigns() {
  return (
    <div>
      <PageHeader title="Campanhas" description="Envios em massa para segmentos." badge={<ComingSoonBadge />}
        actions={<Button disabled><Plus className="mr-1 h-4 w-4" /> Nova campanha</Button>} />
      <div className="p-6">
        <div className="mb-4 rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          Envios ativos exigem integração com WhatsApp Business API — disponível em breve.
        </div>
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Nome</TableHead><TableHead>Status</TableHead><TableHead>Audiência</TableHead><TableHead>Agendado para</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {campaigns.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell><Badge variant="outline">{c.status}</Badge></TableCell>
                  <TableCell>{c.audienceSize}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{c.scheduledAt ? new Date(c.scheduledAt).toLocaleString("pt-BR") : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
