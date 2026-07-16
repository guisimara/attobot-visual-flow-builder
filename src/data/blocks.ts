import type { BlockDefinition, BlockType } from "@/types";

export const BLOCKS: BlockDefinition[] = [
  { type: "trigger", label: "Gatilho", category: "start", description: "Inicia o fluxo.", icon: "Zap" },
  { type: "text", label: "Mensagem de texto", category: "send", description: "Envia texto ao contato.", icon: "MessageSquare" },
  { type: "image", label: "Imagem", category: "send", description: "Envia uma imagem.", icon: "Image" },
  { type: "buttons", label: "Botões", category: "send", description: "Mensagem com botões.", icon: "MousePointerClick" },
  { type: "menu", label: "Menu de opções", category: "send", description: "Menu numerado de opções.", icon: "ListOrdered" },
  { type: "openQuestion", label: "Pergunta aberta", category: "capture", description: "Aguarda resposta livre.", icon: "HelpCircle" },
  { type: "captureName", label: "Capturar nome", category: "capture", description: "Salva o nome do contato.", icon: "User" },
  { type: "capturePhone", label: "Capturar telefone", category: "capture", description: "Salva o telefone.", icon: "Phone" },
  { type: "captureEmail", label: "Capturar e-mail", category: "capture", description: "Salva o e-mail.", icon: "Mail" },
  { type: "condition", label: "Condição (se/senão)", category: "logic", description: "Ramifica o fluxo.", icon: "GitBranch" },
  { type: "hasTag", label: "Possui tag", category: "logic", description: "Verifica se contato tem tag.", icon: "Tag" },
  { type: "businessHours", label: "Horário comercial", category: "logic", description: "Fora do horário ramifica.", icon: "Clock" },
  { type: "wait", label: "Esperar", category: "logic", description: "Pausa por X tempo.", icon: "Timer" },
  { type: "addTag", label: "Adicionar tag", category: "action", description: "Adiciona uma tag.", icon: "TagsIcon" },
  { type: "removeTag", label: "Remover tag", category: "action", description: "Remove uma tag.", icon: "X" },
  { type: "updateField", label: "Atualizar campo", category: "action", description: "Atualiza campo do contato.", icon: "Edit3" },
  { type: "startFlow", label: "Iniciar outro fluxo", category: "action", description: "Dispara outro fluxo.", icon: "PlayCircle" },
  { type: "notifyTeam", label: "Notificar equipe", category: "action", description: "Avisa a equipe.", icon: "Bell" },
  { type: "transfer", label: "Transferir para atendente", category: "action", description: "Passa para humano.", icon: "UserCheck" },
  { type: "pauseBot", label: "Pausar bot", category: "action", description: "Desativa o bot na conversa.", icon: "Pause" },
  { type: "end", label: "Encerrar fluxo", category: "end", description: "Finaliza o fluxo.", icon: "Flag" },
];

export const BLOCK_MAP: Record<BlockType, BlockDefinition> = BLOCKS.reduce(
  (acc, b) => ({ ...acc, [b.type]: b }),
  {} as Record<BlockType, BlockDefinition>,
);

export const CATEGORY_LABELS: Record<BlockDefinition["category"], string> = {
  start: "Início",
  send: "Enviar",
  capture: "Capturar",
  logic: "Lógica",
  action: "Ações",
  end: "Fim",
};
