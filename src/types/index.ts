// Core entity types for AttoBot (demo data only).

export type ID = string;

export type ChannelType = "whatsapp" | "instagram" | "webchat" | "email";

export interface Tag {
  id: ID;
  name: string;
  color: string;
}

export interface CustomField {
  id: ID;
  key: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "boolean";
  options?: string[];
}

export interface TeamMember {
  id: ID;
  name: string;
  email: string;
  role: "owner" | "admin" | "agent" | "viewer";
  avatarUrl?: string;
  status: "online" | "away" | "offline";
}

export interface Contact {
  id: ID;
  name: string;
  phone: string;
  email?: string;
  avatarUrl?: string;
  tags: string[]; // tag ids
  source: string;
  status: "active" | "lead" | "customer" | "archived";
  ownerId?: ID; // assigned agent
  currentFlowId?: ID;
  lastInteractionAt: string;
  createdAt: string;
  fields: Record<string, string>;
}

export type MessageDirection = "in" | "out" | "system";
export interface Message {
  id: ID;
  direction: MessageDirection;
  authorId?: ID;
  authorName?: string;
  content: string;
  createdAt: string;
  status?: "sent" | "delivered" | "read";
}

export type ConversationStatus = "open" | "waiting" | "resolved" | "snoozed";
export interface Conversation {
  id: ID;
  contactId: ID;
  channel: ChannelType;
  status: ConversationStatus;
  botActive: boolean;
  assigneeId?: ID;
  tags: string[];
  unread: number;
  lastMessage: string;
  lastMessageAt: string;
  messages: Message[];
}

export type FlowStatus = "draft" | "published" | "paused";
export interface Flow {
  id: ID;
  name: string;
  description?: string;
  status: FlowStatus;
  trigger: string;
  contactsInFlow: number;
  completionRate: number;
  updatedAt: string;
}

export type BlockType =
  | "trigger"
  | "text"
  | "image"
  | "buttons"
  | "menu"
  | "openQuestion"
  | "captureName"
  | "capturePhone"
  | "captureEmail"
  | "condition"
  | "hasTag"
  | "businessHours"
  | "wait"
  | "addTag"
  | "removeTag"
  | "updateField"
  | "startFlow"
  | "notifyTeam"
  | "transfer"
  | "pauseBot"
  | "end";

export interface BlockDefinition {
  type: BlockType;
  label: string;
  category: "start" | "send" | "capture" | "logic" | "action" | "end";
  description: string;
  icon: string; // lucide icon name
}

export interface WhatsAppTemplate {
  id: ID;
  name: string;
  category: "marketing" | "utility" | "authentication";
  language: string;
  status: "approved" | "pending" | "rejected";
  body: string;
}

export interface Campaign {
  id: ID;
  name: string;
  status: "draft" | "scheduled" | "sent";
  audienceSize: number;
  scheduledAt?: string;
  templateId?: ID;
}

export interface Channel {
  id: ID;
  type: ChannelType;
  label: string;
  number?: string;
  status: "connected" | "demo" | "disconnected";
}
