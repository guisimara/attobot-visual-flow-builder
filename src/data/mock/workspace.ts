// Demo workspace ("Clínica Aurora"). Everything in the mock layer is scoped
// to this workspace so multi-tenancy is honest from day one.

import type { Workspace, Channel } from "@/types";

export const WORKSPACE_ID = "ws_aurora";

export const workspace: Workspace = {
  id: WORKSPACE_ID,
  name: "Clínica Aurora",
  slug: "clinica-aurora",
  plan: "pro",
  planLabel: "Pro (Demo)",
  createdAt: "2025-01-15T10:00:00Z",
  conversationsUsed: 6800,
  conversationsLimit: 10000,
};

// A second workspace so the UI's WorkspaceSwitcher has something to switch to.
export const secondaryWorkspace: Workspace = {
  id: "ws_atto_demo",
  name: "ATTO Playground",
  slug: "atto-playground",
  plan: "starter",
  planLabel: "Starter (Demo)",
  createdAt: "2025-06-01T10:00:00Z",
  conversationsUsed: 40,
  conversationsLimit: 500,
};

export const workspaces: Workspace[] = [workspace, secondaryWorkspace];

export const channels: Channel[] = [
  {
    id: "ch1",
    workspaceId: WORKSPACE_ID,
    type: "whatsapp",
    label: "WhatsApp Clínica Aurora",
    number: "+55 11 90000-0000",
    status: "demo",
  },
  { id: "ch2", workspaceId: WORKSPACE_ID, type: "instagram", label: "Instagram @clinicaaurora", status: "disconnected" },
  { id: "ch3", workspaceId: WORKSPACE_ID, type: "webchat", label: "Chat do site", status: "disconnected" },
];

// Back-compat alias used by older components.
export const tenant = {
  name: workspace.name,
  plan: workspace.planLabel,
  whatsappNumber: channels[0].number ?? "",
};
