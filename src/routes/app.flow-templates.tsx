import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { flowTemplates } from "@/data/mock";

export const Route = createFileRoute("/app/flow-templates")({ component: Templates });

function Templates() {
  return (
    <div>
      <PageHeader title="Modelos de fluxo" description="Comece por um modelo pronto e adapte à sua operação." />
      <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
        {flowTemplates.map((t) => (
          <Card key={t.id} className="transition hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t.name}</CardTitle>
                <Badge variant="outline">{t.category}</Badge>
              </div>
              <CardDescription>{t.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/app/automations/$id" params={{ id: t.id }}>Usar modelo</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
