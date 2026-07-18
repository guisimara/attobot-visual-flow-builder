import { Bot, BarChart3, GitBranch, Puzzle, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const FEATURES = [
  { icon: GitBranch, title: "Editor visual de fluxos", desc: "Arraste blocos, conecte e publique. Sem código." },
  { icon: Users, title: "Atendimento humano", desc: "Transferência com contexto e caixa de entrada compartilhada." },
  { icon: Bot, title: "Automações completas", desc: "Tags, campos, condições, esperas, notificações e mais." },
  { icon: BarChart3, title: "Relatórios da operação", desc: "Volume, resolução, SLA e performance por fluxo." },
  { icon: Puzzle, title: "Integrações", desc: "APIs, CRM e ferramentas — em breve." },
  { icon: ShieldCheck, title: "Controles de acesso", desc: "Papéis, permissões e trilha de auditoria (roadmap LGPD)." },
];

export function Features() {
  return (
    <section id="recursos" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <Badge variant="outline" className="mb-3">Recursos</Badge>
          <h2 className="text-3xl font-semibold tracking-tight">Tudo o que sua operação precisa em um só lugar.</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="transition hover:shadow-md">
              <CardHeader>
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-4 w-4" />
                </div>
                <CardTitle className="text-base">{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
