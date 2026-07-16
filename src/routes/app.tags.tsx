import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tags, customFields } from "@/data/mock";
import { Plus } from "lucide-react";
import { ComingSoonBadge } from "@/components/layout/Badges";

export const Route = createFileRoute("/app/tags")({ component: Tags });

function Tags() {
  return (
    <div>
      <PageHeader title="Tags, segmentos e campos" description="Organize seus contatos." actions={<Button><Plus className="mr-1 h-4 w-4" /> Nova tag</Button>} />
      <div className="grid gap-4 p-6 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Tags</CardTitle><CardDescription>Rótulos aplicados aos contatos.</CardDescription></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {tags.map((t) => <Badge key={t.id} variant="outline" style={{ borderColor: t.color, color: t.color }}>{t.name}</Badge>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Segmentos <ComingSoonBadge /></CardTitle><CardDescription>Grupos dinâmicos por regra.</CardDescription></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Combine tags, campos e comportamento para criar segmentos automáticos.</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Campos personalizados</CardTitle><CardDescription>Guarde dados extras dos contatos.</CardDescription></CardHeader>
          <CardContent><ul className="space-y-1 text-sm">{customFields.map((f) => <li key={f.id} className="flex justify-between"><span>{f.label}</span><span className="text-muted-foreground">{f.type}</span></li>)}</ul></CardContent>
        </Card>
      </div>
    </div>
  );
}
