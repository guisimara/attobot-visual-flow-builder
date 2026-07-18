/**
 * Service contracts for AttoBot.
 *
 * The UI must depend ONLY on these interfaces — never on `@/data/mock` directly
 * in feature code. Swapping the mock implementation for a real backend (REST,
 * Supabase, tRPC) becomes a single change in `@/services/index.ts`.
 *
 * Every method takes the current workspaceId as its first argument so the
 * contract is honest about multi-tenancy. Mocked implementations ignore it
 * unless they need to filter across workspaces.
 */

import type {
  Campaign,
  Channel,
  Contact,
  Conversation,
  CustomField,
  Flow,
  Message,
  Tag,
  TeamMember,
  WhatsAppTemplate,
  Workspace,
  WorkflowExecution,
  WorkflowVersion,
  ID,
} from "@/types";

export interface WorkspaceService {
  list(): Promise<Workspace[]>;
  get(id: ID): Promise<Workspace | null>;
  currentMembers(workspaceId: ID): Promise<TeamMember[]>;
}

export interface ContactService {
  list(workspaceId: ID): Promise<Contact[]>;
  get(workspaceId: ID, id: ID): Promise<Contact | null>;
  create(workspaceId: ID, input: Omit<Contact, "id" | "workspaceId" | "createdAt" | "lastInteractionAt">): Promise<Contact>;
  update(workspaceId: ID, id: ID, patch: Partial<Contact>): Promise<Contact>;
  addTag(workspaceId: ID, id: ID, tagId: ID): Promise<Contact>;
  removeTag(workspaceId: ID, id: ID, tagId: ID): Promise<Contact>;
}

export interface ConversationService {
  list(workspaceId: ID, filter?: { status?: Conversation["status"]; assigneeId?: ID }): Promise<Conversation[]>;
  get(workspaceId: ID, id: ID): Promise<Conversation | null>;
  reply(workspaceId: ID, conversationId: ID, message: Omit<Message, "id" | "createdAt">): Promise<Message>;
  setStatus(workspaceId: ID, id: ID, status: Conversation["status"]): Promise<Conversation>;
  setBot(workspaceId: ID, id: ID, active: boolean): Promise<Conversation>;
  assign(workspaceId: ID, id: ID, assigneeId: ID | null): Promise<Conversation>;
}

export interface FlowService {
  list(workspaceId: ID): Promise<Flow[]>;
  get(workspaceId: ID, id: ID): Promise<Flow | null>;
  create(workspaceId: ID, input: Pick<Flow, "name" | "trigger" | "description">): Promise<Flow>;
  publish(workspaceId: ID, id: ID, version: WorkflowVersion): Promise<Flow>;
  pause(workspaceId: ID, id: ID): Promise<Flow>;
  duplicate(workspaceId: ID, id: ID): Promise<Flow>;
  versions(workspaceId: ID, flowId: ID): Promise<WorkflowVersion[]>;
  executions(workspaceId: ID, flowId: ID): Promise<WorkflowExecution[]>;
}

export interface TagService {
  list(workspaceId: ID): Promise<Tag[]>;
  create(workspaceId: ID, input: Omit<Tag, "id" | "workspaceId">): Promise<Tag>;
}

export interface CustomFieldService {
  list(workspaceId: ID): Promise<CustomField[]>;
}

export interface TeamService {
  list(workspaceId: ID): Promise<TeamMember[]>;
  invite(workspaceId: ID, email: string, role: TeamMember["role"]): Promise<TeamMember>;
}

export interface ChannelService {
  list(workspaceId: ID): Promise<Channel[]>;
}

export interface TemplateService {
  list(workspaceId: ID): Promise<WhatsAppTemplate[]>;
}

export interface CampaignService {
  list(workspaceId: ID): Promise<Campaign[]>;
}

export interface Services {
  workspaces: WorkspaceService;
  contacts: ContactService;
  conversations: ConversationService;
  flows: FlowService;
  tags: TagService;
  customFields: CustomFieldService;
  team: TeamService;
  channels: ChannelService;
  templates: TemplateService;
  campaigns: CampaignService;
}
