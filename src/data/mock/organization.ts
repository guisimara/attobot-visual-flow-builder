import type { Tag, CustomField, TeamMember } from "@/types";
import { WORKSPACE_ID } from "./workspace";

const ws = WORKSPACE_ID;

export const tags: Tag[] = [
  { id: "t1", workspaceId: ws, name: "Novo lead", color: "#3B82F6" },
  { id: "t2", workspaceId: ws, name: "Paciente", color: "#10B981" },
  { id: "t3", workspaceId: ws, name: "Agendamento", color: "#F59E0B" },
  { id: "t4", workspaceId: ws, name: "Urgência", color: "#EF4444" },
  { id: "t5", workspaceId: ws, name: "Retorno", color: "#8B5CF6" },
];

export const customFields: CustomField[] = [
  { id: "f1", workspaceId: ws, key: "cpf", label: "CPF", type: "text" },
  { id: "f2", workspaceId: ws, key: "convenio", label: "Convênio", type: "select", options: ["Particular", "Unimed", "Bradesco"] },
  { id: "f3", workspaceId: ws, key: "dataNascimento", label: "Nascimento", type: "date" },
];

export const team: TeamMember[] = [
  { id: "u1", workspaceId: ws, name: "Marina Souza", email: "marina@aurora.com", role: "owner", status: "online" },
  { id: "u2", workspaceId: ws, name: "Rafael Lima", email: "rafael@aurora.com", role: "admin", status: "online" },
  { id: "u3", workspaceId: ws, name: "Beatriz Alves", email: "bia@aurora.com", role: "agent", status: "away" },
  { id: "u4", workspaceId: ws, name: "Carlos Nunes", email: "carlos@aurora.com", role: "agent", status: "offline" },
];
