import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const PLANS = [
  { name: "Starter", price: "R$ 149", period: "/mês", desc: "Para começar.", features: ["1 número WhatsApp", "2 atendentes", "500 conversas/mês", "Fluxos básicos"], cta: "Começar" },
  { name: "Pro", price: "R$ 399", period: "/mês", desc: "O favorito.", features: ["1 número WhatsApp", "5 atendentes", "3.000 conversas/mês", "Editor completo", "Relatórios"], cta: "Testar grátis", highlight: true },
  { name: "Business", price: "R$ 899", period: "/mês", desc: "Operação crescendo.", features: ["Até 3 números", "15 atendentes", "10.000 conversas/mês", "Integrações", "SLA prioritário"], cta: "Falar com vendas" },
  { name: "Agency", price: "Sob consulta", period: "", desc: "Para agências.", features: ["Multi-workspaces", "Whitelabel (em breve)", "API de gestão", "Suporte dedicado"], cta: "Falar com vendas" },
];

export function Pricing() {
  return (
    <section id="precos" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-3">Planos</Badge>
          <h2 className="text-3xl font-semibold tracking-tight">Preços transparentes, sem surpresas.</h2>
          <p className="mt-3 text-muted-foreground">Valores ilustrativos desta demonstração — não representam a tabela final.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {PLANS.map((p) => (
            <Card key={p.name} className={p.highlight ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{p.name}</CardTitle>
                  {p.highlight && <Badge>Popular</Badge>}
                </div>
                <CardDescription>{p.desc}</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-semibold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />{f}</li>
                  ))}
                </ul>
                <Button asChild className="w-full" variant={p.highlight ? "default" : "outline"}>
                  <Link to="/signup">{p.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
