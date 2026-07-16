import { Link } from "@tanstack/react-router";
import {
  Zap, Users, Bot, BarChart3, ShieldCheck, Puzzle, MessageCircle, Check,
  ArrowRight, Sparkles, GitBranch, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// -------- Hero --------
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
          <span className="ml-3 text-xs text-muted-foreground">app.attobot.com</span>
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

// -------- Problem/Solution --------
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

// -------- Features grid --------
const FEATURES = [
  { icon: GitBranch, title: "Editor visual de fluxos", desc: "Arraste blocos, conecte e publique. Sem código." },
  { icon: Users, title: "Atendimento humano", desc: "Transferência com contexto e caixa de entrada compartilhada." },
  { icon: Bot, title: "Automações completas", desc: "Tags, campos, condições, esperas, notificações e mais." },
  { icon: BarChart3, title: "Relatórios em tempo real", desc: "Volume, resolução, SLA e performance por fluxo." },
  { icon: Puzzle, title: "Integrações", desc: "APIs, CRM e ferramentas — em breve." },
  { icon: ShieldCheck, title: "Seguro e LGPD-ready", desc: "Controle de permissões, logs e privacidade." },
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

// -------- Editor visual demo section --------
export function EditorSection() {
  return (
    <section className="border-y bg-gradient-to-b from-background to-muted/20 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
        <div>
          <Badge variant="outline" className="mb-3"><Sparkles className="mr-1 h-3 w-3" /> Editor visual</Badge>
          <h2 className="text-3xl font-semibold tracking-tight">Desenhe fluxos como no papel — só que publicável.</h2>
          <p className="mt-4 text-muted-foreground">
            Blocos de mensagem, botões, menus, perguntas, condições, tags, esperas, transferência e encerramento. Simulador de WhatsApp em tempo real.
          </p>
          <ul className="mt-6 space-y-2">
            {["21+ blocos prontos", "Condições e horário comercial", "Simulador WhatsApp integrado", "Versionamento e rascunhos"].map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" />{s}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border bg-card p-4 shadow-xl">
          <div className="grid grid-cols-4 gap-3">
            {["Gatilho", "Mensagem", "Menu", "Capturar", "Condição", "Tag", "Espera", "Transferir"].map((b, i) => (
              <div key={b} className={`rounded-md border px-2 py-3 text-center text-xs ${i === 2 ? "border-primary bg-primary/5" : "bg-background"}`}>{b}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// -------- Human handoff --------
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

// -------- Segments --------
const SEGMENTS = ["Clínicas & Saúde", "E-commerce", "Educação", "Imobiliárias", "Agências", "Serviços B2B"];
export function Segments() {
  return (
    <section className="border-y bg-muted/20 py-14">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Feito para times de</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {SEGMENTS.map((s) => (
            <Badge key={s} variant="secondary" className="px-3 py-1.5 text-sm">{s}</Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------- Pricing --------
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
          <p className="mt-3 text-muted-foreground">Escolha o plano que acompanha sua operação. Valores demonstrativos.</p>
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

// -------- FAQ --------
const FAQS = [
  { q: "Preciso de conta na Meta para começar?", a: "Nesta demonstração não. No produto real haverá conexão com WhatsApp Business API." },
  { q: "Posso desenhar fluxos sem programar?", a: "Sim, o editor é 100% visual." },
  { q: "Existe modo de teste?", a: "Sim, simulador de WhatsApp integrado ao editor." },
  { q: "Meus dados ficam seguros?", a: "Trabalhamos com controle de permissões, logs e LGPD." },
  { q: "Consigo transferir para um humano?", a: "Sim, com contexto, tags e campos preservados." },
];

export function FAQ() {
  return (
    <section className="border-y bg-muted/20 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-3xl font-semibold tracking-tight">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="mt-6">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`i${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// -------- CTA --------
export function FinalCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-primary/5 p-10 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Zap className="h-5 w-5" />
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">Pronto para conversas que viram ação?</h2>
        <p className="mt-3 text-muted-foreground">Crie sua conta demo em 30 segundos.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link to="/signup">Testar grátis</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/app/dashboard">Ver demo</Link></Button>
        </div>
      </div>
    </section>
  );
}

// -------- Contatos & Reports strip --------
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
