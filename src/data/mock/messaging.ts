import type { WhatsAppTemplate, Campaign } from "@/types";
import { WORKSPACE_ID } from "./workspace";

const ws = WORKSPACE_ID;

export const templates: WhatsAppTemplate[] = [
  { id: "wt1", workspaceId: ws, name: "confirmacao_consulta", category: "utility", language: "pt_BR", status: "approved",
    body: "Olá {{1}}, sua consulta está confirmada para {{2}}." },
  { id: "wt2", workspaceId: ws, name: "promo_check_up", category: "marketing", language: "pt_BR", status: "pending",
    body: "Aproveite nosso check-up com 20% off até {{1}}." },
  { id: "wt3", workspaceId: ws, name: "codigo_verificacao", category: "authentication", language: "pt_BR", status: "approved",
    body: "Seu código é {{1}}. Não compartilhe." },
];

export const campaigns: Campaign[] = [
  { id: "cp1", workspaceId: ws, name: "Campanha de retorno anual", status: "scheduled", audienceSize: 320, scheduledAt: "2026-07-20T09:00:00Z", templateId: "wt1" },
  { id: "cp2", workspaceId: ws, name: "Check-up julho", status: "draft", audienceSize: 0, templateId: "wt2" },
  { id: "cp3", workspaceId: ws, name: "Boas-vindas leads Instagram", status: "sent", audienceSize: 84, templateId: "wt1" },
];
