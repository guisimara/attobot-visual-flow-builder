// Tipos gerados manualmente a partir de
// supabase/migrations/20260718000000_workspace_schema.sql +
// supabase/migrations/20260718000010_auth_bootstrap.sql.
//
// Se preferir gerar automaticamente no futuro (requer login na CLI):
//   bunx supabase login
//   bunx supabase gen types typescript --project-id unqnqghyigmeghcxtdnf > src/lib/supabase/types.ts

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string;
          name: string;
          slug: string;
          plan: "starter" | "pro" | "business" | "agency";
          plan_label: string;
          conversations_used: number;
          conversations_limit: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          plan?: "starter" | "pro" | "business" | "agency";
          plan_label?: string;
          conversations_used?: number;
          conversations_limit?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["workspaces"]["Insert"]>;
      };
      workspace_members: {
        Row: {
          id: string;
          workspace_id: string;
          user_id: string | null;
          role: "owner" | "admin" | "agent" | "viewer";
          name: string;
          email: string;
          avatar_url: string | null;
          status: "online" | "away" | "offline";
          invited_at: string;
          joined_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          user_id?: string | null;
          role?: "owner" | "admin" | "agent" | "viewer";
          name: string;
          email: string;
          avatar_url?: string | null;
          status?: "online" | "away" | "offline";
          invited_at?: string;
          joined_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["workspace_members"]["Insert"]>;
      };
      tags: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          color: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          name: string;
          color?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tags"]["Insert"]>;
      };
      custom_fields: {
        Row: {
          id: string;
          workspace_id: string;
          key: string;
          label: string;
          type: "text" | "number" | "date" | "select" | "boolean";
          options: Json | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          key: string;
          label: string;
          type: "text" | "number" | "date" | "select" | "boolean";
          options?: Json | null;
        };
        Update: Partial<Database["public"]["Tables"]["custom_fields"]["Insert"]>;
      };
      flows: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          description: string | null;
          status: "draft" | "published" | "paused";
          trigger: string;
          contacts_in_flow: number;
          completion_rate: number;
          published_version_id: string | null;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          name: string;
          description?: string | null;
          status?: "draft" | "published" | "paused";
          trigger?: string;
          contacts_in_flow?: number;
          completion_rate?: number;
          published_version_id?: string | null;
          updated_at?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["flows"]["Insert"]>;
      };
      workflow_versions: {
        Row: {
          id: string;
          flow_id: string;
          version: number;
          status: "draft" | "published";
          nodes: Json;
          edges: Json;
          created_at: string;
          published_at: string | null;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          flow_id: string;
          version: number;
          status?: "draft" | "published";
          nodes?: Json;
          edges?: Json;
          created_at?: string;
          published_at?: string | null;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["workflow_versions"]["Insert"]>;
      };
      workflow_executions: {
        Row: {
          id: string;
          workspace_id: string;
          flow_id: string;
          version_id: string;
          contact_id: string | null;
          conversation_id: string | null;
          status: "running" | "waiting" | "completed" | "failed" | "cancelled";
          current_node_id: string | null;
          started_at: string;
          ended_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          flow_id: string;
          version_id: string;
          contact_id?: string | null;
          conversation_id?: string | null;
          status?: "running" | "waiting" | "completed" | "failed" | "cancelled";
          current_node_id?: string | null;
          started_at?: string;
          ended_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["workflow_executions"]["Insert"]>;
      };
      node_outputs: {
        Row: {
          id: string;
          execution_id: string;
          node_id: string;
          output: string;
          at: string;
          data: Json | null;
        };
        Insert: {
          id?: string;
          execution_id: string;
          node_id: string;
          output: string;
          at?: string;
          data?: Json | null;
        };
        Update: Partial<Database["public"]["Tables"]["node_outputs"]["Insert"]>;
      };
      contacts: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          phone: string;
          email: string | null;
          avatar_url: string | null;
          source: string;
          status: "active" | "lead" | "customer" | "archived";
          owner_id: string | null;
          current_flow_id: string | null;
          fields: Json;
          last_interaction_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          name: string;
          phone: string;
          email?: string | null;
          avatar_url?: string | null;
          source?: string;
          status?: "active" | "lead" | "customer" | "archived";
          owner_id?: string | null;
          current_flow_id?: string | null;
          fields?: Json;
          last_interaction_at?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contacts"]["Insert"]>;
      };
      contact_tags: {
        Row: { contact_id: string; tag_id: string };
        Insert: { contact_id: string; tag_id: string };
        Update: Partial<Database["public"]["Tables"]["contact_tags"]["Insert"]>;
      };
      conversations: {
        Row: {
          id: string;
          workspace_id: string;
          contact_id: string;
          channel: "whatsapp" | "instagram" | "webchat" | "email";
          status: "open" | "waiting" | "resolved" | "snoozed";
          bot_active: boolean;
          assignee_id: string | null;
          unread: number;
          last_message: string | null;
          last_message_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          contact_id: string;
          channel: "whatsapp" | "instagram" | "webchat" | "email";
          status?: "open" | "waiting" | "resolved" | "snoozed";
          bot_active?: boolean;
          assignee_id?: string | null;
          unread?: number;
          last_message?: string | null;
          last_message_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["conversations"]["Insert"]>;
      };
      conversation_tags: {
        Row: { conversation_id: string; tag_id: string };
        Insert: { conversation_id: string; tag_id: string };
        Update: Partial<Database["public"]["Tables"]["conversation_tags"]["Insert"]>;
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          direction: "in" | "out" | "system";
          author_id: string | null;
          author_name: string | null;
          content: string;
          status: "sent" | "delivered" | "read" | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          direction: "in" | "out" | "system";
          author_id?: string | null;
          author_name?: string | null;
          content: string;
          status?: "sent" | "delivered" | "read" | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
      };
      channels: {
        Row: {
          id: string;
          workspace_id: string;
          type: "whatsapp" | "instagram" | "webchat" | "email";
          label: string;
          number: string | null;
          status: "connected" | "demo" | "disconnected";
        };
        Insert: {
          id?: string;
          workspace_id: string;
          type: "whatsapp" | "instagram" | "webchat" | "email";
          label: string;
          number?: string | null;
          status?: "connected" | "demo" | "disconnected";
        };
        Update: Partial<Database["public"]["Tables"]["channels"]["Insert"]>;
      };
      whatsapp_templates: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          category: "marketing" | "utility" | "authentication";
          language: string;
          status: "approved" | "pending" | "rejected";
          body: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          name: string;
          category: "marketing" | "utility" | "authentication";
          language?: string;
          status?: "approved" | "pending" | "rejected";
          body: string;
        };
        Update: Partial<Database["public"]["Tables"]["whatsapp_templates"]["Insert"]>;
      };
      campaigns: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          status: "draft" | "scheduled" | "sent";
          audience_size: number;
          scheduled_at: string | null;
          template_id: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          name: string;
          status?: "draft" | "scheduled" | "sent";
          audience_size?: number;
          scheduled_at?: string | null;
          template_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["campaigns"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      bootstrap_owner_workspace: {
        Args: { p_workspace_name: string; p_full_name: string };
        Returns: Database["public"]["Tables"]["workspace_members"]["Row"];
      };
      is_workspace_member: {
        Args: { p_workspace_id: string };
        Returns: boolean;
      };
      has_role: {
        Args: { p_workspace_id: string; p_roles: string[] };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
  };
}
