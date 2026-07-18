# AttoBot — Arquitetura

Este documento é o mapa técnico do repositório. Leia-o antes de mexer em qualquer camada.

## Stack

- **TanStack Start v1** (SSR + Vite 7) — file-based routing em `src/routes/`.
- **React 19** + TypeScript strict.
- **Tailwind v4** (via `src/styles.css`, sem `tailwind.config.js`).
- **shadcn/ui** — componentes em `src/components/ui/`.
- **@xyflow/react** — editor visual de fluxos.
- **recharts** — gráficos do dashboard.
- **sonner** — toasts.

**Nada de backend real ainda.** O cliente Supabase existe em
`src/lib/supabase/client.ts` mas não é usado por nenhuma feature. A migration
`supabase/migrations/*.draft.sql` está renomeada como `.draft.sql` de propósito
para não ser aplicada automaticamente. Ver `ROADMAP.md` para o plano de
ativação.

## Camadas

```text
UI (routes + components)
       │  usa
       ▼
src/services/index.ts   ← ponto único de acesso a dados
       │  implementa
       ▼
src/services/mock/      ← implementação em memória (mocks)
       │  lê
       ▼
src/data/mock/          ← tabelas de dados demo, tipadas
       │  usa tipos de
       ▼
src/types/index.ts      ← domínio: Workspace, Contact, Flow, ...
```

Regras:

1. **Componentes NÃO importam de `@/data/mock` diretamente** — importam de
   `@/services`. A única exceção temporária são os componentes de layout
   (Sidebar) e a landing, que ainda leem valores de exibição direto do mock.
2. **Todas as entidades carregam `workspaceId`.** Contratos de serviço aceitam
   `workspaceId` como primeiro argumento. Ler o workspace atual: hook
   `useCurrentWorkspaceId()` em `src/hooks/use-current-workspace.ts`.
3. **Trocar mock por backend real = editar apenas `src/services/index.ts`.**
   Não deve haver `if (isMock)` espalhado.

## Rotas

File-based (TanStack Router). Casca do app em `src/routes/app.tsx`. Landing
em `src/routes/index.tsx`. Rotas de auth (`login`, `signup`, `forgot-password`,
`onboarding`) são páginas independentes, sem sidebar.

Rotas dinâmicas seguem `$param` (ex.: `app.contacts.$id.tsx`). Nunca use
`:id` (isso é Express/React Router).

## Dados demo

- `src/data/mock/workspace.ts` — `WORKSPACE_ID`, lista de workspaces e canais.
- `src/data/mock/organization.ts` — tags, custom fields, equipe.
- `src/data/mock/contacts.ts`
- `src/data/mock/conversations.ts`
- `src/data/mock/workflows.ts` — fluxos, versões, templates de fluxo.
- `src/data/mock/messaging.ts` — templates WhatsApp, campanhas.
- `src/data/mock/analytics.ts` — dashboard, feed, séries de gráfico.
- `src/data/mock.ts` — apenas re-export para compatibilidade.

## Editor visual

`src/components/flow/`:

- `FlowEditor.tsx` — o React Flow + top bar (Salvar, Publicar, Validar).
- `BlockPalette.tsx` — lista de blocos arrastáveis.
- `AttoBlockNode.tsx` — nó custom do xyflow.
- `NodeInspector.tsx` — painel lateral de propriedades.
- `WhatsAppSimulator.tsx` — mock visual (padrão CSS, sem CDN).

Blocos definidos em `src/data/blocks.ts` (21 tipos), fluxo demo em
`src/data/demoFlow.ts`.

## Responsividade

- **Sidebar** colapsível (shadcn `collapsible="icon"`).
- **Inbox** (`app.inbox.tsx`): grid `1fr` mobile → `300px_1fr` tablet →
  `300px_1fr_320px` xl. Contato aparece em `Sheet` no mobile.
- **Editor** (`FlowEditor.tsx`): paleta e inspetor viram overlays no
  mobile (`PanelLeft`/`PanelRight` toggles).

## Tema

Tokens em `src/styles.css` (@theme). Cores da marca ATTO: emerald primary +
charcoal dark. `ThemeToggle` persiste em `localStorage`.

## Convenções de nome

- Componentes: `PascalCase.tsx`.
- Hooks: `use-kebab.ts`.
- Serviços: sufixo `Service` no contrato.
- IDs mock: prefixo curto (`c1`, `cv1`, `fl1`, `wt1`, `t1`, `u1`).
