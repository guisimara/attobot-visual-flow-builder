import type { Conversation } from "@/types";
import { WORKSPACE_ID } from "./workspace";

const ws = WORKSPACE_ID;

export const conversations: Conversation[] = [
  {
    id: "cv1", workspaceId: ws, contactId: "c1", channel: "whatsapp", status: "waiting", botActive: false,
    assigneeId: "u3", tags: ["t3"], unread: 2,
    lastMessage: "Posso confirmar terça às 15h?", lastMessageAt: "2026-07-16T10:22:00Z",
    messages: [
      { id: "m1", direction: "in", content: "Olá, gostaria de agendar uma consulta", createdAt: "2026-07-15T10:10:00Z" },
      { id: "m2", direction: "out", authorName: "AttoBot", content: "Oi Ana! Posso te ajudar 😊. Para qual especialidade?", createdAt: "2026-07-15T10:10:20Z" },
      { id: "m3", direction: "in", content: "Dermatologia", createdAt: "2026-07-15T10:11:00Z" },
      { id: "m4", direction: "system", content: "Transferido para Beatriz", createdAt: "2026-07-15T10:12:00Z" },
      { id: "m5", direction: "out", authorId: "u3", authorName: "Beatriz", content: "Oi Ana! Tenho terça 15h ou quinta 09h.", createdAt: "2026-07-15T10:15:00Z" },
      { id: "m6", direction: "in", content: "Posso confirmar terça às 15h?", createdAt: "2026-07-16T10:22:00Z" },
    ],
  },
  {
    id: "cv2", workspaceId: ws, contactId: "c2", channel: "whatsapp", status: "open", botActive: true,
    tags: ["t5"], unread: 0,
    lastMessage: "Perfeito, obrigado!", lastMessageAt: "2026-07-14T14:05:00Z",
    messages: [
      { id: "m1", direction: "in", content: "Preciso remarcar meu retorno", createdAt: "2026-07-14T13:50:00Z" },
      { id: "m2", direction: "out", authorName: "AttoBot", content: "Claro! Qual data prefere?", createdAt: "2026-07-14T13:50:30Z" },
      { id: "m3", direction: "in", content: "Perfeito, obrigado!", createdAt: "2026-07-14T14:05:00Z" },
    ],
  },
  {
    id: "cv3", workspaceId: ws, contactId: "c3", channel: "whatsapp", status: "open", botActive: false,
    assigneeId: "u3", tags: ["t4"], unread: 5,
    lastMessage: "É urgente, preciso de ajuda agora", lastMessageAt: "2026-07-16T09:00:00Z",
    messages: [
      { id: "m1", direction: "in", content: "É urgente, preciso de ajuda agora", createdAt: "2026-07-16T09:00:00Z" },
    ],
  },
  {
    id: "cv4", workspaceId: ws, contactId: "c4", channel: "instagram", status: "open", botActive: true,
    tags: ["t1"], unread: 1,
    lastMessage: "Vocês atendem convênio?", lastMessageAt: "2026-07-16T08:12:00Z",
    messages: [
      { id: "m1", direction: "in", content: "Vocês atendem convênio?", createdAt: "2026-07-16T08:12:00Z" },
    ],
  },
  {
    id: "cv5", workspaceId: ws, contactId: "c5", channel: "whatsapp", status: "resolved", botActive: true,
    assigneeId: "u4", tags: [], unread: 0,
    lastMessage: "Obrigada!", lastMessageAt: "2026-07-13T18:44:00Z",
    messages: [
      { id: "m1", direction: "out", authorName: "AttoBot", content: "Sua consulta foi confirmada ✅", createdAt: "2026-07-13T18:40:00Z" },
      { id: "m2", direction: "in", content: "Obrigada!", createdAt: "2026-07-13T18:44:00Z" },
    ],
  },
];
