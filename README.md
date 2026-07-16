# AttoBot — Estrutura inicial (ATTO)

Base navegável de um SaaS de chatbots e automações de atendimento.
Nenhuma integração real ativa nesta etapa: dados são 100% mock e a autenticação, banco, WhatsApp API, pagamentos e IA serão adicionados depois.

## Stack

- React 19 + TypeScript + Vite
- TanStack Start / Router (file-based)
- Tailwind v4 + shadcn/ui
- @xyflow/react (editor de fluxos)
- recharts (gráficos)

## Estrutura

```
src/
  components/
    brand/          → logo AttoBot
    landing/        → header, footer e seções da landing
    layout/         → AppSidebar, AppHeader, AuthShell, PageHeader, EmptyState, Badges
    dashboard/      → StatCard, Charts, ActivityFeed
    inbox/          → ConversationList, ConversationThread, ContactPanel
    flow/           → FlowEditor + BlockPalette + AttoBlockNode + NodeInspector + WhatsAppSimulator
    ui/             → shadcn primitives
  data/
    mock.ts         → tenant "Clínica Aurora", contatos, conversas, fluxos, tags, equipe, métricas
    blocks.ts       → definição dos 21 blocos do editor
    demoFlow.ts     → nodes/edges do fluxo demonstrativo
  routes/
    __root.tsx      → shell + head + Toaster
    index.tsx       → landing pública
    login.tsx / signup.tsx / forgot-password.tsx / onboarding.tsx
    app.tsx         → layout autenticado (sidebar recolhível + header)
    app.index.tsx   → redirect → /app/dashboard
    app.dashboard.tsx
    app.inbox.tsx
    app.automations.tsx / app.automations.$id.tsx (editor)
    app.flow-templates.tsx
    app.contacts.tsx / app.contacts.$id.tsx
    app.tags.tsx / app.templates.tsx / app.campaigns.tsx
    app.reports.tsx / app.team.tsx / app.channels.tsx
    app.integrations.tsx / app.billing.tsx / app.settings.tsx
  types/index.ts    → entidades TS
  styles.css        → design system (oklch, tema claro/escuro)
```

## Rotas principais

| Rota | Descrição |
| --- | --- |
| `/` | Landing pública |
| `/login`, `/signup`, `/forgot-password`, `/onboarding` | Auth (mock) |
| `/app/dashboard` | Visão geral com métricas |
| `/app/inbox` | Caixa de entrada 3 colunas |
| `/app/automations` | Lista de fluxos |
| `/app/automations/$id` | Editor visual (xyflow) |
| `/app/flow-templates` | Galeria de modelos |
| `/app/contacts` + `/app/contacts/$id` | Contatos |
| `/app/tags`, `/app/templates`, `/app/campaigns`, `/app/reports`, `/app/team`, `/app/channels`, `/app/integrations`, `/app/billing`, `/app/settings` | Demais páginas |

## Blocos do editor (`src/data/blocks.ts`)

Gatilho · Mensagem · Imagem · Botões · Menu · Pergunta aberta · Capturar nome/telefone/e-mail · Condição · Possui tag · Horário comercial · Esperar · Adicionar/Remover tag · Atualizar campo · Iniciar outro fluxo · Notificar equipe · Transferir · Pausar bot · Encerrar.

Fluxo demonstrativo pronto: **"Atendimento e agendamento inicial"**.

## Próximos passos (a fazer no Claude Code)

1. Integrar autenticação real (Lovable Cloud ou provedor de sua preferência).
2. Persistir fluxos, contatos, conversas e tags em banco.
3. Conectar WhatsApp Business API / Meta.
4. Implementar execução real do runtime de fluxo (state machine).
5. Webhooks, integrações e API pública.
6. Cobrança e planos reais.
7. IA para sugestões de resposta, resumo e roteamento inteligente.
8. Testes, telemetria e observabilidade.

---
ATTO · Conversas que viram ação.
