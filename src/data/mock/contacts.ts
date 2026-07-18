import type { Contact } from "@/types";
import { WORKSPACE_ID } from "./workspace";

const ws = WORKSPACE_ID;

export const contacts: Contact[] = [
  {
    id: "c1", workspaceId: ws, name: "Ana Ribeiro", phone: "+55 11 98111-1111", email: "ana@email.com",
    tags: ["t1", "t3"], source: "WhatsApp", status: "lead", ownerId: "u3",
    currentFlowId: "fl1", lastInteractionAt: "2026-07-15T10:22:00Z",
    createdAt: "2026-07-10T08:00:00Z", fields: { cpf: "000.000.000-01", convenio: "Particular" },
  },
  {
    id: "c2", workspaceId: ws, name: "Bruno Carvalho", phone: "+55 11 98222-2222", email: "bruno@email.com",
    tags: ["t2", "t5"], source: "Site", status: "customer", ownerId: "u2",
    lastInteractionAt: "2026-07-14T14:05:00Z", createdAt: "2026-06-01T12:00:00Z",
    fields: { convenio: "Unimed" },
  },
  {
    id: "c3", workspaceId: ws, name: "Camila Torres", phone: "+55 11 98333-3333",
    tags: ["t4"], source: "Indicação", status: "active", ownerId: "u3",
    lastInteractionAt: "2026-07-16T09:00:00Z", createdAt: "2026-07-12T11:00:00Z",
    fields: {},
  },
  {
    id: "c4", workspaceId: ws, name: "Diego Ferraz", phone: "+55 11 98444-4444", email: "diego@email.com",
    tags: ["t1"], source: "Instagram", status: "lead",
    lastInteractionAt: "2026-07-16T08:12:00Z", createdAt: "2026-07-16T08:10:00Z", fields: {},
  },
  {
    id: "c5", workspaceId: ws, name: "Elisa Prado", phone: "+55 11 98555-5555",
    tags: ["t2", "t3"], source: "WhatsApp", status: "customer", ownerId: "u4",
    lastInteractionAt: "2026-07-13T18:44:00Z", createdAt: "2026-05-20T09:00:00Z",
    fields: { convenio: "Bradesco" },
  },
  {
    id: "c6", workspaceId: ws, name: "Felipe Machado", phone: "+55 11 98666-6666",
    tags: [], source: "WhatsApp", status: "active",
    lastInteractionAt: "2026-07-15T22:12:00Z", createdAt: "2026-07-01T15:00:00Z", fields: {},
  },
];
