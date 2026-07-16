import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { templates } from "@/data/mock";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/templates")({ component: Templates });

const STATUS: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  approved: { label: "Aprovado", variant: "default" },
  pending: { label: "Em análise", variant: "secondary" },
  rejected: { label: "Rejeitado", variant: "destructive" },
};

function Templates() {
  return (
    <div>
      <PageHeader title="Templates WhatsApp" description="Mensagens pré-aprovadas para envios ativos." actions={<Button><Plus className="mr-1 h-4 w-4" /> Novo template</Button>} />
      <div className="p-6">
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Nome</TableHead><TableHead>Categoria</TableHead><TableHead>Idioma</TableHead><TableHead>Status</TableHead><TableHead>Corpo</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {templates.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell><Badge variant="outline">{t.category}</Badge></TableCell>
                  <TableCell>{t.language}</TableCell>
                  <TableCell><Badge variant={STATUS[t.status].variant}>{STATUS[t.status].label}</Badge></TableCell>
                  <TableCell className="max-w-md text-sm text-muted-foreground">{t.body}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
