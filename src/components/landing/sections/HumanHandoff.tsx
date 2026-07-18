import { BarChart3, Bot, Users } from "lucide-react";

export function HumanHandoff() {
  return (
    <section id="solucoes" className="py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-3">
        {[
          { icon: Bot, title: "Bot resolve o simples", desc: "FAQs, agendamentos, triagem, coleta de dados." },
          { icon: Users, title: "Humano assume o complexo", desc: "Transferência com histórico, tags e campos." },
          { icon: BarChart3, title: "Você vê tudo", desc: "Dashboards, filas, SLA e conversão." },
        ].map((c) => (
          <div key={c.title} className="rounded-xl border p-6">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
