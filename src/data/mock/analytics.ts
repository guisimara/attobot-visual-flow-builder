// Dashboard aggregates + activity feed + chart data. All numbers are illustrative.

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
