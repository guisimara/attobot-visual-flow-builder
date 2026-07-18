/**
 * Mock implementation of the service contracts. Reads from `@/data/mock`.
 * All async — mirrors real network shape so components can already use
 * loading states, TanStack Query, etc. when we replace this layer.
 */

import type { Services } from "../contracts";
import type { Contact, Conversation, Flow, Message } from "@/types";
import {
  campaigns as campaignsMock,
  channels as channelsMock,
  contacts as contactsMock,
  conversations as conversationsMock,
  customFields as customFieldsMock,
  flows as flowsMock,
  tags as tagsMock,
  team as teamMock,
  templates as templatesMock,
  workflowVersions as workflowVersionsMock,
  workspaces as workspacesMock,
} from "@/data/mock";

// Tiny latency so UIs get a chance to render skeletons in dev.
const wait = (ms = 50) => new Promise((r) => setTimeout(r, ms));

const scoped = <T extends { workspaceId: string }>(list: T[], workspaceId: string) =>
  list.filter((x) => x.workspaceId === workspaceId);

let _contacts: Contact[] = [...contactsMock];
let _conversations: Conversation[] = [...conversationsMock];
let _flows: Flow[] = [...flowsMock];

export const mockServices: Services = {
  workspaces: {
    async list() { await wait(); return workspacesMock; },
    async get(id) { await wait(); return workspacesMock.find((w) => w.id === id) ?? null; },
    async currentMembers(workspaceId) { await wait(); return scoped(teamMock, workspaceId); },
  },

  contacts: {
    async list(workspaceId) { await wait(); return scoped(_contacts, workspaceId); },
    async get(workspaceId, id) { await wait(); return _contacts.find((c) => c.id === id && c.workspaceId === workspaceId) ?? null; },
    async create(workspaceId, input) {
      await wait();
      const now = new Date().toISOString();
      const contact: Contact = { ...input, id: `c_${Date.now()}`, workspaceId, createdAt: now, lastInteractionAt: now };
      _contacts = [contact, ..._contacts];
      return contact;
    },
    async update(workspaceId, id, patch) {
      await wait();
      _contacts = _contacts.map((c) => (c.id === id && c.workspaceId === workspaceId ? { ...c, ...patch } : c));
      return _contacts.find((c) => c.id === id)!;
    },
    async addTag(workspaceId, id, tagId) {
      await wait();
      _contacts = _contacts.map((c) =>
        c.id === id && c.workspaceId === workspaceId && !c.tags.includes(tagId)
          ? { ...c, tags: [...c.tags, tagId] }
          : c,
      );
      return _contacts.find((c) => c.id === id)!;
    },
    async removeTag(workspaceId, id, tagId) {
      await wait();
      _contacts = _contacts.map((c) =>
        c.id === id && c.workspaceId === workspaceId ? { ...c, tags: c.tags.filter((t) => t !== tagId) } : c,
      );
      return _contacts.find((c) => c.id === id)!;
    },
  },

  conversations: {
    async list(workspaceId, filter) {
      await wait();
      let list = scoped(_conversations, workspaceId);
      if (filter?.status) list = list.filter((c) => c.status === filter.status);
      if (filter?.assigneeId) list = list.filter((c) => c.assigneeId === filter.assigneeId);
      return list;
    },
    async get(workspaceId, id) { await wait(); return _conversations.find((c) => c.id === id && c.workspaceId === workspaceId) ?? null; },
    async reply(workspaceId, conversationId, message) {
      await wait();
      const msg: Message = { ...message, id: `m_${Date.now()}`, createdAt: new Date().toISOString() };
      _conversations = _conversations.map((c) =>
        c.id === conversationId && c.workspaceId === workspaceId
          ? { ...c, messages: [...c.messages, msg], lastMessage: msg.content, lastMessageAt: msg.createdAt }
          : c,
      );
      return msg;
    },
    async setStatus(workspaceId, id, status) {
      await wait();
      _conversations = _conversations.map((c) => (c.id === id && c.workspaceId === workspaceId ? { ...c, status } : c));
      return _conversations.find((c) => c.id === id)!;
    },
    async setBot(workspaceId, id, active) {
      await wait();
      _conversations = _conversations.map((c) => (c.id === id && c.workspaceId === workspaceId ? { ...c, botActive: active } : c));
      return _conversations.find((c) => c.id === id)!;
    },
    async assign(workspaceId, id, assigneeId) {
      await wait();
      _conversations = _conversations.map((c) =>
        c.id === id && c.workspaceId === workspaceId ? { ...c, assigneeId: assigneeId ?? undefined } : c,
      );
      return _conversations.find((c) => c.id === id)!;
    },
  },

  flows: {
    async list(workspaceId) { await wait(); return scoped(_flows, workspaceId); },
    async get(workspaceId, id) { await wait(); return _flows.find((f) => f.id === id && f.workspaceId === workspaceId) ?? null; },
    async create(workspaceId, input) {
      await wait();
      const flow: Flow = {
        id: `fl_${Date.now()}`, workspaceId, status: "draft",
        contactsInFlow: 0, completionRate: 0, updatedAt: new Date().toISOString(),
        name: input.name, trigger: input.trigger, description: input.description,
      };
      _flows = [flow, ..._flows];
      return flow;
    },
    async publish(workspaceId, id) {
      await wait();
      _flows = _flows.map((f) => (f.id === id && f.workspaceId === workspaceId ? { ...f, status: "published" } : f));
      return _flows.find((f) => f.id === id)!;
    },
    async pause(workspaceId, id) {
      await wait();
      _flows = _flows.map((f) => (f.id === id && f.workspaceId === workspaceId ? { ...f, status: "paused" } : f));
      return _flows.find((f) => f.id === id)!;
    },
    async duplicate(workspaceId, id) {
      await wait();
      const src = _flows.find((f) => f.id === id && f.workspaceId === workspaceId);
      if (!src) throw new Error("flow not found");
      const copy: Flow = { ...src, id: `fl_${Date.now()}`, name: `${src.name} (cópia)`, status: "draft", publishedVersionId: undefined };
      _flows = [copy, ..._flows];
      return copy;
    },
    async versions(_workspaceId, flowId) { await wait(); return workflowVersionsMock.filter((v) => v.flowId === flowId); },
    async executions() { await wait(); return []; },
  },

  tags: {
    async list(workspaceId) { await wait(); return scoped(tagsMock, workspaceId); },
    async create(workspaceId, input) {
      await wait();
      return { id: `t_${Date.now()}`, workspaceId, ...input };
    },
  },

  customFields: {
    async list(workspaceId) { await wait(); return scoped(customFieldsMock, workspaceId); },
  },

  team: {
    async list(workspaceId) { await wait(); return scoped(teamMock, workspaceId); },
    async invite(workspaceId, email, role) {
      await wait();
      return { id: `u_${Date.now()}`, workspaceId, name: email.split("@")[0], email, role, status: "offline" };
    },
  },

  channels: { async list(workspaceId) { await wait(); return scoped(channelsMock, workspaceId); } },
  templates: { async list(workspaceId) { await wait(); return scoped(templatesMock, workspaceId); } },
  campaigns: { async list(workspaceId) { await wait(); return scoped(campaignsMock, workspaceId); } },
};
