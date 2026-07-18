# Handoff para o Claude Code

Este arquivo é escrito PARA um próximo agente (ou humano) que continuará o
projeto fora do Lovable. Leia na ordem.

## 1. Estado atual (honesto)

- **É uma demo navegável.** Nenhum backend. Todos os dados vêm de
  `src/data/mock/*`.
- **Sem auth.** Login/signup são formulários visuais que redirecionam.
- **Sem persistência.** Recarregar a página zera qualquer mudança.
- **Sem WhatsApp real.** O simulador é 100% cliente e não envia mensagens.
- **Preços na landing são ilustrativos**, não representam tabela final.

## 2. Estrutura que você precisa entender antes de codar

Leia nesta ordem:

1. `docs/ARCHITECTURE.md` — camadas.
2. `docs/DOMAIN_MODEL.md` — entidades e regras.
3. `docs/ROADMAP.md` — o que vem depois.
4. `src/types/index.ts` — verdade sobre o modelo.
5. `src/services/contracts.ts` — contratos de dados.

## 3. Regras invioláveis

- **Nunca importe `@/data/mock` em componentes de feature.** Use `@/services`.
- **Nunca mexa em `src/routeTree.gen.ts`** — é gerado.
- **Rota nova = arquivo em `src/routes/`.** Filenames com pontos viram
  slashes na URL (ver `tanstack-route-architecture`).
- **Toda entidade nova precisa de `workspaceId`.**
- **Fluxos publicados são imutáveis** — edição gera nova `WorkflowVersion`.
- **Papéis ficam em tabela separada**, nunca no perfil (segurança).

## 4. Como plugar um backend real

1. Crie `src/services/http/` implementando `Services` de `contracts.ts`.
2. Substitua a export em `src/services/index.ts`:
   ```ts
   // export const services = mockServices;
   export const services = httpServices;
   ```
3. Adicione TanStack Query ao redor de cada chamada — o template já traz
   as dependências necessárias para wiring com o router.
4. **Não reative** `supabase/migrations/*.draft.sql` sem revisar contra o
   novo domínio. O schema antigo não conhece `workspaces` nem
   `workflow_versions`.

## 5. Débitos técnicos conhecidos

- `src/lib/supabase/client.ts` existe mas não é usado. Deixado no repo
  para acelerar a Fase 2 do roadmap. Remova se não for usar Supabase.
- `src/data/mock.ts` é apenas re-export de `src/data/mock/`. Pode ser
  apagado quando nenhum código importar mais dele.
- `src/components/landing/sections.tsx` idem — re-export de `sections/`.
- `WhatsAppSimulator` usa messages hardcoded — trocar por leitura do
  fluxo atual quando o engine existir.
- Não há testes. Playwright está disponível no template — comece por
  fluxo de inbox e publicação de fluxo.

## 6. Comandos

```bash
bun install
bun run dev          # dev server em :8080
bun run build        # produção
bunx tsgo            # typecheck (não use `tsc --noEmit`)
```

## 7. Onde pedir ajuda

- Componentes shadcn: `src/components/ui/*` — não modifique, componha por
  cima.
- Ícones: `lucide-react` (usar por nome de string em blocos: ver
  `src/components/flow/BlockPalette.tsx`).
- Toasts: `sonner` (`import { toast } from "sonner"`).

Boa jornada. Mantenha o mock funcionando enquanto migra — assim as duas
implementações coexistem e você pode voltar atrás.
