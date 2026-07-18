// Tipos gerados manualmente a partir de supabase/migrations/20260717000000_init_schema.sql.
//
// Se preferir gerar automaticamente no futuro (requer login na CLI):
//   bunx supabase login
//   bunx supabase gen types typescript --project-id unqnqghyigmeghcxtdnf > src/lib/supabase/types.ts

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          name: string;
          plan: string;
          whatsapp_number: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          plan?: string;
          whatsapp_number?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tenants"]["Insert"]>;
      };
      profiles: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          email: string;
          role: "owner" | "admin" | "agent" | "viewer";
          avatar_url: string | null;
          status: "online" | "away" | "offline";
          created_at: string;
        };
        Insert: {
          id: string;
          tenant_id: string;
          name: string;
          email: string;
          role?: "owner" | "admin" | "agent" | "viewer";
          avatar_url?: string | null;
          status?: "online" | "away" | "offline";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      tags: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          color: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          color?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tags"]["Insert"]>;
      };
      custom_fields: {
        Row: {
          id: string;
          tenant_id: string;
          key: string;
          label: string;
          type: "text" | "number" | "date" | "select" | "boolean";
          options: Json | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
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
          tenant_id: string;
          name: string;
          description: string | null;
          status: "draft" | "published" | "paused";
          trigger: string;
          contacts_in_flow: number;
          completion_rate: number;
          definition: Json;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          description?: string | null;
          status?: "draft" | "published" | "paused";
          trigger?: string;
          contacts_in_flow?: number;
          completion_rate?: number;
          definition?: Json;
          updated_at?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["flows"]["Insert"]>;
      };
      contacts: {
        Row: {
          id: string;
          tenant_id: string;
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
          tenant_id: string;
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
          tenant_id: string;
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
          tenant_id: string;
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
          tenant_id: string;
          type: "whatsapp" | "instagram" | "webchat" | "email";
          label: string;
          number: string | null;
          status: "connected" | "demo" | "disconnected";
        };
        Insert: {
          id?: string;
          tenant_id: string;
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
          tenant_id: string;
          name: string;
          category: "marketing" | "utility" | "authentication";
          language: string;
          status: "approved" | "pending" | "rejected";
          body: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
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
          tenant_id: string;
          name: string;
          status: "draft" | "scheduled" | "sent";
          audience_size: number;
          scheduled_at: string | null;
          template_id: string | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
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
      bootstrap_owner_profile: {
        Args: { p_tenant_name: string; p_full_name: string };
        Returns: Database["public"]["Tables"]["profiles"]["Row"];
      };
    };
    Enums: Record<string, never>;
  };
}
