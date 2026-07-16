import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { team } from "@/data/mock";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/team")({ component: Team });

const STATUS: Record<string, string> = { online: "bg-emerald-500", away: "bg-amber-500", offline: "bg-muted-foreground" };

function Team() {
  return (
    <div>
      <PageHeader title="Equipe" description="Atendentes e permissões." actions={<Button><Plus className="mr-1 h-4 w-4" /> Convidar</Button>} />
      <div className="p-6">
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader><TableRow><TableHead>Pessoa</TableHead><TableHead>Papel</TableHead><TableHead>Status</TableHead><TableHead /></TableRow></TableHeader>
            <TableBody>
              {team.map((m) => (
                <TableRow key={m.id}>
                  <TableCell><div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback>{m.name.slice(0,2).toUpperCase()}</AvatarFallback></Avatar>
                    <div><p className="font-medium">{m.name}</p><p className="text-xs text-muted-foreground">{m.email}</p></div>
                  </div></TableCell>
                  <TableCell><Badge variant="outline">{m.role}</Badge></TableCell>
                  <TableCell><div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${STATUS[m.status]}`} /><span className="text-sm capitalize">{m.status}</span></div></TableCell>
                  <TableCell className="text-right"><Button size="sm" variant="ghost">Gerenciar</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
