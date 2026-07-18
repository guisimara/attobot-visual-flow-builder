import type { Flow, WorkflowVersion } from "@/types";
import { WORKSPACE_ID } from "./workspace";

const ws = WORKSPACE_ID;

export const flows: Flow[] = [
  {
    id: "fl1", workspaceId: ws, name: "Atendimento e agendamento inicial", status: "published",
    trigger: "Primeira mensagem", contactsInFlow: 128, completionRate: 72,
    updatedAt: "2026-07-14T10:00:00Z", publishedVersionId: "fv1_2",
    description: "Fluxo principal de boas-vindas, triagem e transferência.",
  },
  {
    id: "fl2", workspaceId: ws, name: "Lembrete de consulta 24h", status: "published",
    trigger: "Agendado (24h antes)", contactsInFlow: 42, completionRate: 91,
    updatedAt: "2026-07-10T10:00:00Z", publishedVersionId: "fv2_1",
  },
  {
    id: "fl3", workspaceId: ws, name: "Recuperação de lead frio", status: "paused",
    trigger: "Sem resposta 7 dias", contactsInFlow: 8, completionRate: 34,
    updatedAt: "2026-06-30T10:00:00Z",
  },
  {
    id: "fl4", workspaceId: ws, name: "Pós-consulta e avaliação", status: "draft",
    trigger: "Consulta concluída", contactsInFlow: 0, completionRate: 0,
    updatedAt: "2026-07-15T09:00:00Z",
  },
];

// Empty version records — the engine and real editor persistence will fill these.
// Kept as an explicit table so the shape is visible to future contributors.
export const workflowVersions: WorkflowVersion[] = [
  { id: "fv1_1", flowId: "fl1", version: 1, status: "published", nodes: [], edges: [], createdAt: "2026-07-01T10:00:00Z", publishedAt: "2026-07-01T10:00:00Z", createdBy: "u1" },
  { id: "fv1_2", flowId: "fl1", version: 2, status: "published", nodes: [], edges: [], createdAt: "2026-07-14T10:00:00Z", publishedAt: "2026-07-14T10:00:00Z", createdBy: "u2" },
  { id: "fv2_1", flowId: "fl2", version: 1, status: "published", nodes: [], edges: [], createdAt: "2026-07-10T10:00:00Z", publishedAt: "2026-07-10T10:00:00Z", createdBy: "u2" },
];

export const flowTemplates = [
  { id: "tpl1", name: "Boas-vindas", category: "Atendimento", description: "Saudação + menu inicial." },
  { id: "tpl2", name: "Qualificação de lead", category: "Vendas", description: "Perguntas e pontuação." },
  { id: "tpl3", name: "Agendamento", category: "Serviços", description: "Menu de horários e confirmação." },
  { id: "tpl4", name: "Suporte N1", category: "Suporte", description: "FAQ + transferência." },
  { id: "tpl5", name: "Recuperação de carrinho", category: "E-commerce", description: "Lembrete e cupom." },
  { id: "tpl6", name: "Pesquisa NPS", category: "Pós-venda", description: "Nota + comentário." },
];
