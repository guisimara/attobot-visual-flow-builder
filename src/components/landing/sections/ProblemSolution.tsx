import { Check } from "lucide-react";

export function ProblemSolution() {
  return (
    <section className="border-y bg-muted/20 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">O atendimento manual não escala.</h2>
          <ul className="mt-6 space-y-3 text-muted-foreground">
            {["Perda de leads fora do horário", "Respostas repetitivas consumindo a equipe", "Sem visibilidade das conversas", "Difícil padronizar processos"].map((p) => (
              <li key={p} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-destructive" />{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Com AttoBot, sua operação flui.</h2>
          <ul className="mt-6 space-y-3">
            {["Fluxos visuais em minutos", "Bot 24/7 + atendente humano no momento certo", "Contatos, tags e campos organizados", "Métricas claras da operação"].map((p) => (
              <li key={p} className="flex gap-2 text-foreground"><Check className="mt-1 h-4 w-4 text-primary" />{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
