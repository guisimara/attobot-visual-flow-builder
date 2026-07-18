# Domínio AttoBot

Modelo conceitual. Fonte da verdade: `src/types/index.ts`.

## Multi-tenancy

Toda entidade de negócio carrega `workspaceId`. Um usuário pode ser membro
de múltiplos workspaces com papéis diferentes.

```text
Workspace 1..* WorkspaceMember *..1 User
Workspace 1..* Contact
Workspace 1..* Conversation
Workspace 1..* Flow
Workspace 1..* Tag / CustomField / Channel / Template / Campaign
```

## Papéis

`Role = "owner" | "admin" | "agent" | "viewer"`

| Ação                          | owner | admin | agent | viewer |
|-------------------------------|:-----:|:-----:|:-----:|:------:|
| Publicar fluxo                |  ✓    |  ✓    |       |        |
| Editar fluxo (rascunho)       |  ✓    |  ✓    |  ✓    |        |
| Responder conversa            |  ✓    |  ✓    |  ✓    |        |
| Ver relatórios                |  ✓    |  ✓    |  ✓    |  ✓     |
| Convidar / remover membros    |  ✓    |  ✓    |       |        |
| Faturamento e plano           |  ✓    |       |       |        |

(A matriz vive no roadmap — hoje o app não faz enforcement.)

## Fluxos (Flows) e versionamento

- `Flow` é a automação lógica (nome, gatilho, status).
- `WorkflowVersion` é um snapshot imutável de nós + arestas.
- Editar um fluxo publicado NUNCA muta a versão publicada — cria uma nova
  versão em `draft`. Publicar promove `draft → published`.
- `WorkflowExecution` é uma run de uma versão específica para um contato,
  com trace de `NodeOutput` (`nodeId` + saída escolhida).

Isso é essencial para: rollback, A/B, auditoria e observabilidade.

## Conversas

- `Conversation` tem `status` (`open | waiting | resolved | snoozed`) e
  `botActive`. Transferência para humano = `botActive: false` + `assigneeId`.
- `Message.direction` é `in | out | system`. Mensagens `system` são
  metadados (transferências, mudanças de estado) e não são enviadas.

## Contatos

- `Contact.tags` referencia `Tag.id[]`.
- `Contact.fields` é `Record<string, string>` — chaves batem com
  `CustomField.key`.
- `ownerId` é opcional — nem todo contato tem responsável.
- `currentFlowId` referencia o fluxo ativo (se houver execução em andamento).

## Blocos do editor

`BlockType` tem 21 valores agrupados em 6 categorias
(`start | send | capture | logic | action | end`). Definições completas em
`src/data/blocks.ts`. Cada bloco publica saídas nomeadas (ex.: menu →
`"1" | "2" | "3"`, condition → `"yes" | "no"`) — o engine registra a
saída escolhida em `NodeOutput.output`.

## Canais

`ChannelType = "whatsapp" | "instagram" | "webchat" | "email"`. Só o
WhatsApp está no MVP; os outros existem como placeholders `disconnected`.
