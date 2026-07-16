import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal } from "lucide-react";
import { flows } from "@/data/mock";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/app/automations")({ component: Automations });

const STATUS: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  published: { label: "Publicado", variant: "default" },
  draft: { label: "Rascunho", variant: "secondary" },
  paused: { label: "Pausado", variant: "outline" },
};

function Automations() {
  return (
    <div>
      <PageHeader title="Automações" description="Fluxos de conversa da sua operação."
        actions={<>
          <Button variant="outline" asChild><Link to="/app/flow-templates">Ver modelos</Link></Button>
          <Button asChild><Link to="/app/automations/$id" params={{ id: "new" }}><Plus className="mr-1 h-4 w-4" /> Novo fluxo</Link></Button>
        </>} />
      <div className="p-6">
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Gatilho</TableHead>
                <TableHead>Contatos</TableHead>
                <TableHead>Conclusão</TableHead>
                <TableHead>Última edição</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {flows.map((f) => (
                <TableRow key={f.id}>
                  <TableCell>
                    <Link to="/app/automations/$id" params={{ id: f.id }} className="font-medium hover:underline">{f.name}</Link>
                    {f.description && <p className="text-xs text-muted-foreground">{f.description}</p>}
                  </TableCell>
                  <TableCell><Badge variant={STATUS[f.status].variant}>{STATUS[f.status].label}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{f.trigger}</TableCell>
                  <TableCell>{f.contactsInFlow}</TableCell>
                  <TableCell>{f.completionRate}%</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(f.updatedAt).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild><Link to="/app/automations/$id" params={{ id: f.id }}>Editar</Link></DropdownMenuItem>
                        <DropdownMenuItem>Duplicar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
