// Mock data for the demo tenant "Clínica Aurora".
// Everything here is fake and used only to power the initial UI.

import type {
  Campaign,
  Channel,
  Contact,
  Conversation,
  CustomField,
  Flow,
  Tag,
  TeamMember,
  WhatsAppTemplate,
} from "@/types";

export const tenant = {
  name: "Clínica Aurora",
  plan: "Pro (Demo)",
  whatsappNumber: "+55 11 90000-0000",
};

export const tags: Tag[] = [
  { id: "t1", name: "Novo lead", color: "#3B82F6" },
  { id: "t2", name: "Paciente", color: "#10B981" },
  { id: "t3", name: "Agendamento", color: "#F59E0B" },
  { id: "t4", name: "Urgência", color: "#EF4444" },
  { id: "t5", name: "Retorno", color: "#8B5CF6" },
];

export const customFields: CustomField[] = [
  { id: "f1", key: "cpf", label: "CPF", type: "text" },
  { id: "f2", key: "convenio", label: "Convênio", type: "select", options: ["Particular", "Unimed", "Bradesco"] },
  { id: "f3", key: "dataNascimento", label: "Nascimento", type: "date" },
];

export const team: TeamMember[] = [
  { id: "u1", name: "Marina Souza", email: "marina@aurora.com", role: "owner", status: "online" },
  { id: "u2", name: "Rafael Lima", email: "rafael@aurora.com", role: "admin", status: "online" },
  { id: "u3", name: "Beatriz Alves", email: "bia@aurora.com", role: "agent", status: "away" },
  { id: "u4", name: "Carlos Nunes", email: "carlos@aurora.com", role: "agent", status: "offline" },
];

export const contacts: Contact[] = [
  {
    id: "c1", name: "Ana Ribeiro", phone: "+55 11 98111-1111", email: "ana@email.com",
    tags: ["t1", "t3"], source: "WhatsApp", status: "lead", ownerId: "u3",
    currentFlowId: "fl1", lastInteractionAt: "2025-07-15T10:22:00Z",
    createdAt: "2025-07-10T08:00:00Z", fields: { cpf: "000.000.000-01", convenio: "Particular" },
  },
  {
    id: "c2", name: "Bruno Carvalho", phone: "+55 11 98222-2222", email: "bruno@email.com",
    tags: ["t2", "t5"], source: "Site", status: "customer", ownerId: "u2",
    lastInteractionAt: "2025-07-14T14:05:00Z", createdAt: "2025-06-01T12:00:00Z",
    fields: { convenio: "Unimed" },
  },
  {
    id: "c3", name: "Camila Torres", phone: "+55 11 98333-3333",
    tags: ["t4"], source: "Indicação", status: "active", ownerId: "u3",
    lastInteractionAt: "2025-07-16T09:00:00Z", createdAt: "2025-07-12T11:00:00Z",
    fields: {},
  },
  {
    id: "c4", name: "Diego Ferraz", phone: "+55 11 98444-4444", email: "diego@email.com",
    tags: ["t1"], source: "Instagram", status: "lead",
    lastInteractionAt: "2025-07-16T08:12:00Z", createdAt: "2025-07-16T08:10:00Z", fields: {},
  },
  {
    id: "c5", name: "Elisa Prado", phone: "+55 11 98555-5555",
    tags: ["t2", "t3"], source: "WhatsApp", status: "customer", ownerId: "u4",
    lastInteractionAt: "2025-07-13T18:44:00Z", createdAt: "2025-05-20T09:00:00Z",
    fields: { convenio: "Bradesco" },
  },
  {
    id: "c6", name: "Felipe Machado", phone: "+55 11 98666-6666",
    tags: [], source: "WhatsApp", status: "active",
    lastInteractionAt: "2025-07-15T22:12:00Z", createdAt: "2025-07-01T15:00:00Z", fields: {},
  },
];

export const conversations: Conversation[] = [
  {
    id: "cv1", contactId: "c1", channel: "whatsapp", status: "waiting", botActive: false,
    assigneeId: "u3", tags: ["t3"], unread: 2,
    lastMessage: "Posso confirmar terça às 15h?", lastMessageAt: "2025-07-16T10:22:00Z",
    messages: [
      { id: "m1", direction: "in", content: "Olá, gostaria de agendar uma consulta", createdAt: "2025-07-15T10:10:00Z" },
      { id: "m2", direction: "out", authorName: "AttoBot", content: "Oi Ana! Posso te ajudar 😊. Para qual especialidade?", createdAt: "2025-07-15T10:10:20Z" },
      { id: "m3", direction: "in", content: "Dermatologia", createdAt: "2025-07-15T10:11:00Z" },
      { id: "m4", direction: "system", content: "Transferido para Beatriz", createdAt: "2025-07-15T10:12:00Z" },
      { id: "m5", direction: "out", authorId: "u3", authorName: "Beatriz", content: "Oi Ana! Tenho terça 15h ou quinta 09h.", createdAt: "2025-07-15T10:15:00Z" },
      { id: "m6", direction: "in", content: "Posso confirmar terça às 15h?", createdAt: "2025-07-16T10:22:00Z" },
    ],
  },
  {
    id: "cv2", contactId: "c2", channel: "whatsapp", status: "open", botActive: true,
    tags: ["t5"], unread: 0,
    lastMessage: "Perfeito, obrigado!", lastMessageAt: "2025-07-14T14:05:00Z",
    messages: [
      { id: "m1", direction: "in", content: "Preciso remarcar meu retorno", createdAt: "2025-07-14T13:50:00Z" },
      { id: "m2", direction: "out", authorName: "AttoBot", content: "Claro! Qual data prefere?", createdAt: "2025-07-14T13:50:30Z" },
      { id: "m3", direction: "in", content: "Perfeito, obrigado!", createdAt: "2025-07-14T14:05:00Z" },
    ],
  },
  {
    id: "cv3", contactId: "c3", channel: "whatsapp", status: "open", botActive: false,
    assigneeId: "u3", tags: ["t4"], unread: 5,
    lastMessage: "É urgente, preciso de ajuda agora", lastMessageAt: "2025-07-16T09:00:00Z",
    messages: [
      { id: "m1", direction: "in", content: "É urgente, preciso de ajuda agora", createdAt: "2025-07-16T09:00:00Z" },
    ],
  },
  {
    id: "cv4", contactId: "c4", channel: "instagram", status: "open", botActive: true,
    tags: ["t1"], unread: 1,
    lastMessage: "Vocês atendem convênio?", lastMessageAt: "2025-07-16T08:12:00Z",
    messages: [
      { id: "m1", direction: "in", content: "Vocês atendem convênio?", createdAt: "2025-07-16T08:12:00Z" },
    ],
  },
  {
    id: "cv5", contactId: "c5", channel: "whatsapp", status: "resolved", botActive: true,
    assigneeId: "u4", tags: [], unread: 0,
    lastMessage: "Obrigada!", lastMessageAt: "2025-07-13T18:44:00Z",
    messages: [
      { id: "m1", direction: "out", authorName: "AttoBot", content: "Sua consulta foi confirmada ✅", createdAt: "2025-07-13T18:40:00Z" },
      { id: "m2", direction: "in", content: "Obrigada!", createdAt: "2025-07-13T18:44:00Z" },
    ],
  },
];

export const flows: Flow[] = [
  { id: "fl1", name: "Atendimento e agendamento inicial", status: "published", trigger: "Primeira mensagem",
    contactsInFlow: 128, completionRate: 72, updatedAt: "2025-07-14T10:00:00Z",
    description: "Fluxo principal de boas-vindas, triagem e transferência." },
  { id: "fl2", name: "Lembrete de consulta 24h", status: "published", trigger: "Agendado (24h antes)",
    contactsInFlow: 42, completionRate: 91, updatedAt: "2025-07-10T10:00:00Z" },
  { id: "fl3", name: "Recuperação de lead frio", status: "paused", trigger: "Sem resposta 7 dias",
    contactsInFlow: 8, completionRate: 34, updatedAt: "2025-06-30T10:00:00Z" },
  { id: "fl4", name: "Pós-consulta e avaliação", status: "draft", trigger: "Consulta concluída",
    contactsInFlow: 0, completionRate: 0, updatedAt: "2025-07-15T09:00:00Z" },
];

export const flowTemplates = [
  { id: "tpl1", name: "Boas-vindas", category: "Atendimento", description: "Saudação + menu inicial." },
  { id: "tpl2", name: "Qualificação de lead", category: "Vendas", description: "Perguntas e pontuação." },
  { id: "tpl3", name: "Agendamento", category: "Serviços", description: "Menu de horários e confirmação." },
  { id: "tpl4", name: "Suporte N1", category: "Suporte", description: "FAQ + transferência." },
  { id: "tpl5", name: "Recuperação de carrinho", category: "E-commerce", description: "Lembrete e cupom." },
  { id: "tpl6", name: "Pesquisa NPS", category: "Pós-venda", description: "Nota + comentário." },
];

export const templates: WhatsAppTemplate[] = [
  { id: "wt1", name: "confirmacao_consulta", category: "utility", language: "pt_BR", status: "approved",
    body: "Olá {{1}}, sua consulta está confirmada para {{2}}." },
  { id: "wt2", name: "promo_check_up", category: "marketing", language: "pt_BR", status: "pending",
    body: "Aproveite nosso check-up com 20% off até {{1}}." },
  { id: "wt3", name: "codigo_verificacao", category: "authentication", language: "pt_BR", status: "approved",
    body: "Seu código é {{1}}. Não compartilhe." },
];

export const campaigns: Campaign[] = [
  { id: "cp1", name: "Campanha de retorno anual", status: "scheduled", audienceSize: 320, scheduledAt: "2025-07-20T09:00:00Z", templateId: "wt1" },
  { id: "cp2", name: "Check-up julho", status: "draft", audienceSize: 0, templateId: "wt2" },
  { id: "cp3", name: "Boas-vindas leads Instagram", status: "sent", audienceSize: 84, templateId: "wt1" },
];

export const channels: Channel[] = [
  { id: "ch1", type: "whatsapp", label: "WhatsApp Clínica Aurora", number: tenant.whatsappNumber, status: "demo" },
  { id: "ch2", type: "instagram", label: "Instagram @clinicaaurora", status: "disconnected" },
  { id: "ch3", type: "webchat", label: "Chat do site", status: "disconnected" },
];

export const dashboardStats = {
  conversations: { value: 342, delta: 12.5 },
  newContacts: { value: 87, delta: 8.1 },
  waiting: { value: 6, delta: -25 },
  resolutionRate: { value: 91, delta: 2.3 },
  avgResponse: { value: "2m 14s", delta: -18 },
  automationsRun: { value: 1284, delta: 22 },
  convertedContacts: { value: 41, delta: 15 },
  automationErrors: { value: 3, delta: -50 },
  planUsage: { used: 6800, total: 10000, label: "conversas/mês" },
};

export const activityFeed = [
  { id: "a1", when: "há 2 min", who: "Beatriz", what: "assumiu a conversa com Ana Ribeiro" },
  { id: "a2", when: "há 12 min", who: "AttoBot", what: "iniciou o fluxo 'Lembrete de consulta 24h' para 8 contatos" },
  { id: "a3", when: "há 34 min", who: "Rafael", what: "publicou o fluxo 'Atendimento e agendamento inicial'" },
  { id: "a4", when: "há 1 h", who: "AttoBot", what: "resolveu 12 conversas automaticamente" },
  { id: "a5", when: "há 3 h", who: "Marina", what: "adicionou a tag 'Retorno' a 5 contatos" },
];

export const chartData = {
  weekly: [
    { day: "Seg", conversas: 42, resolvidas: 38 },
    { day: "Ter", conversas: 55, resolvidas: 49 },
    { day: "Qua", conversas: 48, resolvidas: 44 },
    { day: "Qui", conversas: 61, resolvidas: 55 },
    { day: "Sex", conversas: 72, resolvidas: 66 },
    { day: "Sáb", conversas: 40, resolvidas: 36 },
    { day: "Dom", conversas: 24, resolvidas: 22 },
  ],
  channels: [
    { name: "WhatsApp", value: 82 },
    { name: "Instagram", value: 12 },
    { name: "Webchat", value: 6 },
  ],
};
