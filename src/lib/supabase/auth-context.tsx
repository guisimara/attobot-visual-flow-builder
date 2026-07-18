import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./client";
import type { Database } from "./types";

export type WorkspaceMember = Database["public"]["Tables"]["workspace_members"]["Row"];

interface AuthState {
  session: Session | null;
  member: WorkspaceMember | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  signOut: () => Promise<void>;
  refreshMember: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function loadMember(userId: string): Promise<WorkspaceMember | null> {
  const { data, error } = await supabase.from("workspace_members").select("*").eq("user_id", userId).maybeSingle();
  if (error) {
    // eslint-disable-next-line no-console
    console.error("[auth] failed to load workspace member", error);
    return null;
  }
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ session: null, member: null, loading: true });

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const member = session ? await loadMember(session.user.id) : null;
      if (mounted) setState({ session, member, loading: false });
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const member = session ? await loadMember(session.user.id) : null;
      if (mounted) setState({ session, member, loading: false });
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function refreshMember() {
    setState((s) => {
      if (!s.session) return s;
      return s;
    });
    const userId = state.session?.user.id;
    if (!userId) return;
    const member = await loadMember(userId);
    setState((s) => ({ ...s, member }));
  }

  return (
    <AuthContext.Provider value={{ ...state, signOut, refreshMember }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an <AuthProvider>");
  return ctx;
}
