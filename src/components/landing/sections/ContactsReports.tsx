import { Clock, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ContactsReports() {
  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Users className="h-4 w-4" /></div>
            <CardTitle>Contatos centralizados</CardTitle>
            <CardDescription>Histórico completo, tags, campos personalizados e segmentos.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Clock className="h-4 w-4" /></div>
            <CardTitle>Relatórios claros</CardTitle>
            <CardDescription>Tempo de resposta, SLA, resolução e conversão por fluxo.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
