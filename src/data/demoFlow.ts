import type { Edge, Node } from "@xyflow/react";
import type { BlockType } from "@/types";

export interface FlowNodeData extends Record<string, unknown> {
  blockType: BlockType;
  title: string;
  subtitle?: string;
}

export const demoNodes: Node<FlowNodeData>[] = [
  { id: "n1", type: "attoBlock", position: { x: 40, y: 40 },
    data: { blockType: "trigger", title: "Gatilho", subtitle: "Primeira mensagem no WhatsApp" } },
  { id: "n2", type: "attoBlock", position: { x: 40, y: 180 },
    data: { blockType: "text", title: "Boas-vindas", subtitle: "Olá! Sou o assistente da Clínica Aurora 👋" } },
  { id: "n3", type: "attoBlock", position: { x: 40, y: 320 },
    data: { blockType: "menu", title: "Menu de opções", subtitle: "1) Agendar 2) Retorno 3) Falar com atendente" } },
  { id: "n4", type: "attoBlock", position: { x: -160, y: 480 },
    data: { blockType: "captureName", title: "Capturar nome", subtitle: "Salvar em contato.nome" } },
  { id: "n5", type: "attoBlock", position: { x: -160, y: 620 },
    data: { blockType: "businessHours", title: "Horário comercial?", subtitle: "Seg–Sex 08h–18h" } },
  { id: "n6", type: "attoBlock", position: { x: -320, y: 780 },
    data: { blockType: "addTag", title: "Adicionar tag", subtitle: "Agendamento" } },
  { id: "n7", type: "attoBlock", position: { x: -320, y: 920 },
    data: { blockType: "transfer", title: "Transferir para atendente", subtitle: "Equipe: Recepção" } },
  { id: "n8", type: "attoBlock", position: { x: 0, y: 780 },
    data: { blockType: "text", title: "Fora do horário", subtitle: "Retornamos em breve." } },
  { id: "n9", type: "attoBlock", position: { x: 0, y: 920 },
    data: { blockType: "end", title: "Encerrar fluxo" } },
  { id: "n10", type: "attoBlock", position: { x: 260, y: 480 },
    data: { blockType: "transfer", title: "Transferir para atendente", subtitle: "Retorno" } },
];

export const demoEdges: Edge[] = [
  { id: "e1", source: "n1", target: "n2" },
  { id: "e2", source: "n2", target: "n3" },
  { id: "e3", source: "n3", target: "n4", label: "1" },
  { id: "e4", source: "n3", target: "n10", label: "2" },
  { id: "e5", source: "n4", target: "n5" },
  { id: "e6", source: "n5", target: "n6", label: "Sim" },
  { id: "e7", source: "n5", target: "n8", label: "Não" },
  { id: "e8", source: "n6", target: "n7" },
  { id: "e9", source: "n8", target: "n9" },
];
