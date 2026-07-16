import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { contacts, tags, team, flows } from "@/data/mock";
import { Search, Plus, Filter } from "lucide-react";

export const Route = createFileRoute("/app/contacts")({ component: Contacts });

function Contacts() {
  return (
    <div>
      <PageHeader title="Contatos" description={`${contacts.length} contatos`}
        actions={<Button><Plus className="mr-1 h-4 w-4" /> Novo contato</Button>} />
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome, telefone ou e-mail…" className="pl-8" />
          </div>
          <Button variant="outline"><Filter className="mr-1 h-4 w-4" /> Filtros</Button>
        </div>
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader><TableRow>
              <TableHead className="w-[40px]"><Checkbox /></TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Atendente</TableHead>
              <TableHead>Fluxo</TableHead>
              <TableHead>Última interação</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {contacts.map((c) => (
                <TableRow key={c.id}>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell><Link to="/app/contacts/$id" params={{ id: c.id }} className="font-medium hover:underline">{c.name}</Link></TableCell>
                  <TableCell className="text-sm">{c.phone}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{c.email ?? "—"}</TableCell>
                  <TableCell><div className="flex flex-wrap gap-1">
                    {c.tags.map((tid) => {
                      const t = tags.find((x) => x.id === tid);
                      return t && <Badge key={tid} variant="outline" style={{ borderColor: t.color, color: t.color }}>{t.name}</Badge>;
                    })}
                  </div></TableCell>
                  <TableCell className="text-sm">{c.source}</TableCell>
                  <TableCell><Badge variant="secondary">{c.status}</Badge></TableCell>
                  <TableCell className="text-sm">{team.find((t) => t.id === c.ownerId)?.name ?? "—"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{flows.find((f) => f.id === c.currentFlowId)?.name ?? "—"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(c.lastInteractionAt).toLocaleDateString("pt-BR")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
