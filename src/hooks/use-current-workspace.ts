/**
 * Small React hook that returns the ID of the workspace the UI is currently
 * scoped to. For now this always resolves to the demo workspace, but every
 * feature reads through the hook so a real switcher only needs to update
 * one place (localStorage, URL, or context).
 */

import { useEffect, useState } from "react";
import { WORKSPACE_ID, workspaces } from "@/data/mock";

const STORAGE_KEY = "attobot.workspaceId";

export function useCurrentWorkspaceId(): string {
  const [id, setId] = useState<string>(WORKSPACE_ID);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && workspaces.some((w) => w.id === stored)) setId(stored);
  }, []);

  return id;
}

export function setCurrentWorkspaceId(id: string) {
  if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, id);
}

export function useCurrentWorkspace() {
  const id = useCurrentWorkspaceId();
  return workspaces.find((w) => w.id === id) ?? workspaces[0];
}
