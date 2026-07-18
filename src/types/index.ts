// Core entity types for AttoBot (demo data only).
// Multi-tenant by design: every business entity carries a workspaceId.

export type ID = string;

export type ChannelType = "whatsapp" | "instagram" | "webchat" | "email";

// ---------- Workspace / Multitenancy ----------

export type Role = "owner" | "admin" | "agent" | "viewer";

export type PlanTier = "starter" | "pro" | "business" | "agency";

export interface Workspace {
  id: ID;
  name: string;
  slug: string;
  plan: PlanTier;
  planLabel: string;
  createdAt: string;
  // Usage snapshots (demo only)
  conversationsUsed: number;
  conversationsLimit: number;
}

export interface WorkspaceMember {
  id: ID;
  workspaceId: ID;
  userId: ID;
  role: Role;
  invitedAt: string;
  joinedAt?: string;
}

// ---------- Users / Team ----------

export interface TeamMember {
  id: ID;
  workspaceId: ID;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  status: "online" | "away" | "offline";
}

// ---------- Tags / Custom fields ----------

export interface Tag {
  id: ID;
  workspaceId: ID;
  name: string;
  color: string;
}

export interface CustomField {
  id: ID;
  workspaceId: ID;
  key: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "boolean";
  options?: string[];
}

// ---------- Contacts ----------

export interface Contact {
  id: ID;
  workspaceId: ID;
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

// ---------- Conversations / Messages ----------

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
  workspaceId: ID;
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

// ---------- Flows / Workflows ----------

export type FlowStatus = "draft" | "published" | "paused";

export interface Flow {
  id: ID;
  workspaceId: ID;
  name: string;
  description?: string;
  status: FlowStatus;
  trigger: string;
  contactsInFlow: number;
  completionRate: number;
  updatedAt: string;
  // The current published version id (if any). Draft edits live in a new version.
  publishedVersionId?: ID;
}

/**
 * A Flow is the logical automation; a WorkflowVersion is an immutable snapshot
 * of nodes+edges that can be published. Editing a published flow always creates
 * a new draft version — the runtime engine executes a specific version.
 */
export interface WorkflowVersion {
  id: ID;
  flowId: ID;
  version: number;
  status: "draft" | "published";
  nodes: unknown[]; // xyflow Node[] — kept opaque here to avoid coupling
  edges: unknown[]; // xyflow Edge[]
  createdAt: string;
  publishedAt?: string;
  createdBy: ID;
}

/**
 * A live run of a WorkflowVersion for a single contact/conversation.
 * The mock runtime stores a shallow trace so the UI can show progress.
 */
export type ExecutionStatus = "running" | "waiting" | "completed" | "failed" | "cancelled";

export interface WorkflowExecution {
  id: ID;
  workspaceId: ID;
  flowId: ID;
  versionId: ID;
  contactId: ID;
  conversationId?: ID;
  status: ExecutionStatus;
  currentNodeId?: ID;
  startedAt: string;
  endedAt?: string;
  trace: NodeOutput[];
}

/**
 * A single step recorded when a node runs. `output` is the branch/handle the
 * node chose (e.g. "yes"/"no" for a condition, "1"/"2"/"3" for a menu).
 */
export interface NodeOutput {
  nodeId: ID;
  output: string;
  at: string;
  data?: Record<string, unknown>;
}

// ---------- Blocks (editor palette) ----------

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

// ---------- WhatsApp / Campaigns ----------

export interface WhatsAppTemplate {
  id: ID;
  workspaceId: ID;
  name: string;
  category: "marketing" | "utility" | "authentication";
  language: string;
  status: "approved" | "pending" | "rejected";
  body: string;
}

export interface Campaign {
  id: ID;
  workspaceId: ID;
  name: string;
  status: "draft" | "scheduled" | "sent";
  audienceSize: number;
  scheduledAt?: string;
  templateId?: ID;
}

export interface Channel {
  id: ID;
  workspaceId: ID;
  type: ChannelType;
  label: string;
  number?: string;
  status: "connected" | "demo" | "disconnected";
}
