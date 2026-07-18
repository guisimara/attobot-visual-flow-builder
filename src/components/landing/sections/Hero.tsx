import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section id="produto" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <Badge variant="outline" className="mb-4">Novo · Editor visual de fluxos</Badge>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Automatize conversas sem perder o <span className="text-primary">lado humano</span>.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            AttoBot é a plataforma visual da ATTO para criar chatbots e automações no WhatsApp — com transferência para atendente, tags, campos e relatórios em um só lugar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/signup">Testar grátis <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/app/dashboard">Ver demonstração</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Sem cartão de crédito · Dados 100% simulados nesta demo
          </p>
        </div>
        <DashboardMockup />
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="relative">
      <div className="rounded-2xl border bg-card p-4 shadow-2xl">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-muted-foreground">app.attobot.com · demo</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { l: "Conversas", v: "342", d: "+12%" },
            { l: "Resolução", v: "91%", d: "+2%" },
            { l: "Automações", v: "1.284", d: "+22%" },
          ].map((k) => (
            <div key={k.l} className="rounded-lg border bg-background p-3">
              <p className="text-[10px] text-muted-foreground">{k.l}</p>
              <p className="text-lg font-semibold">{k.v}</p>
              <p className="text-[10px] text-primary">{k.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border bg-background p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium">Fluxo: Atendimento inicial</p>
            <Badge variant="secondary" className="text-[10px]">publicado</Badge>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Boas-vindas", "Menu", "Transferir"].map((s) => (
              <div key={s} className="rounded-md border bg-muted/50 px-2 py-3 text-center text-xs">{s}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-6 -right-6 hidden rounded-xl border bg-background p-3 shadow-xl md:block">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2 text-primary"><MessageCircle className="h-4 w-4" /></div>
          <div>
            <p className="text-xs font-medium">Nova conversa</p>
            <p className="text-[10px] text-muted-foreground">Ana · há 2 min</p>
          </div>
        </div>
      </div>
    </div>
  );
}
