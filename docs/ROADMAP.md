# Roadmap

Prioridades para tirar o AttoBot do estado "demo navegável" para MVP.

## Fase 1 — Backend real (sem Supabase ainda)

- [ ] Criar `src/services/http/` — implementação dos contratos via `fetch`
      contra uma API HTTP (ainda a definir). A UI não muda: só
      `src/services/index.ts` troca de `mockServices` para `httpServices`.
- [ ] Adicionar TanStack Query como camada de cache. Envolver cada chamada
      de serviço em `useQuery` / `useMutation`.
- [ ] Introduzir loading + error boundaries reais nas rotas do `/app`.

## Fase 2 — Persistência (Supabase Cloud)

- [ ] Ativar Lovable Cloud (Supabase gerenciado). NÃO reativar a migration
      `supabase/migrations/*.draft.sql` sem uma revisão de schema — ela foi
      escrita antes das mudanças de domínio (workspaces, versionamento).
- [ ] Reescrever a migration com:
  - `workspaces`, `workspace_members` (role enum)
  - `contacts`, `tags`, `contact_tags` (join), `custom_fields`
  - `conversations`, `messages`
  - `flows`, `workflow_versions`, `workflow_executions`, `node_outputs`
  - `whatsapp_templates`, `campaigns`, `channels`
  - RLS por `workspace_id` + função `has_role(workspace_id, role)`.
- [ ] Papéis em tabela separada (`workspace_members`), NUNCA em `profiles`.
- [ ] GRANTs explícitos no schema `public` (obrigatório no PostgREST).

## Fase 3 — Auth

- [ ] Signup / login reais via Supabase Auth.
- [ ] Rota `/_authenticated/*` como layout gate.
- [ ] Convite de membro por e-mail (edge function).

## Fase 4 — WhatsApp real

- [ ] Integração com WhatsApp Business API (Meta Cloud API).
- [ ] Webhook em `src/routes/api/public/whatsapp.ts` com verificação de
      assinatura.
- [ ] Aprovação de templates via API oficial.

## Fase 5 — Engine de fluxo

- [ ] Runtime que executa `WorkflowVersion` para uma conversa.
- [ ] Persistir `WorkflowExecution` com trace de `NodeOutput`.
- [ ] Timers (bloco `wait`, `businessHours`) via cron + fila.

## Fase 6 — Polimento

- [ ] Testes E2E (Playwright) dos fluxos críticos: enviar mensagem,
      transferir, publicar fluxo.
- [ ] Relatórios com dados reais (funil por fluxo, SLA).
- [ ] LGPD: log de acesso, export de dados do titular, direito ao
      esquecimento.
- [ ] Whitelabel (plano Agency).

## Fora de escopo (por enquanto)

- Multi-canal além de WhatsApp (Instagram, webchat, email).
- IA generativa nos blocos.
- Marketplace de fluxos.
