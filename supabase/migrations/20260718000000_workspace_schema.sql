-- AttoBot — schema alinhado ao domínio "workspace" (ver docs/DOMAIN_MODEL.md
-- e src/services/contracts.ts). Substitui o schema antigo baseado em
-- "tenant" (supabase/migrations/*.draft.sql, não aplicado).
--
-- Principais diferenças do schema anterior:
--   - tenant_id  → workspace_id
--   - profiles   → workspace_members (papel fica aqui, nunca junto do usuário)
--   - flows ganham versionamento imutável: workflow_versions + workflow_executions + node_outputs

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Workspaces
-- ---------------------------------------------------------------------------
create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  plan text not null default 'starter' check (plan in ('starter', 'pro', 'business', 'agency')),
  plan_label text not null default 'Starter',
  conversations_used integer not null default 0,
  conversations_limit integer not null default 500,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Workspace members — 1 linha por (usuário, workspace). O papel mora aqui,
-- nunca em uma tabela de "profile" do usuário (regra de segurança do domínio).
-- Também carrega os dados de exibição do TeamMember (nome, e-mail, avatar,
-- status), já que no mock cada workspace tem sua própria "cópia" do membro.
-- ---------------------------------------------------------------------------
create table if not exists public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  user_id uuid references auth.users (id) on delete cascade,
  role text not null default 'agent' check (role in ('owner', 'admin', 'agent', 'viewer')),
  name text not null,
  email text not null,
  avatar_url text,
  status text not null default 'offline' check (status in ('online', 'away', 'offline')),
  invited_at timestamptz not null default now(),
  joined_at timestamptz,
  unique (workspace_id, user_id)
);

create index if not exists workspace_members_workspace_id_idx on public.workspace_members (workspace_id);
create index if not exists workspace_members_user_id_idx on public.workspace_members (user_id);

-- Helpers usados pelas policies abaixo.
create or replace function public.is_workspace_member(p_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.workspace_members wm
    where wm.workspace_id = p_workspace_id and wm.user_id = auth.uid()
  )
$$;

create or replace function public.has_role(p_workspace_id uuid, p_roles text[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.workspace_members wm
    where wm.workspace_id = p_workspace_id
      and wm.user_id = auth.uid()
      and wm.role = any(p_roles)
  )
$$;

-- ---------------------------------------------------------------------------
-- Tags / Custom fields
-- ---------------------------------------------------------------------------
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  name text not null,
  color text not null default '#3B82F6'
);

create index if not exists tags_workspace_id_idx on public.tags (workspace_id);

create table if not exists public.custom_fields (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  key text not null,
  label text not null,
  type text not null check (type in ('text', 'number', 'date', 'select', 'boolean')),
  options jsonb,
  unique (workspace_id, key)
);

-- ---------------------------------------------------------------------------
-- Flows + versionamento imutável
-- ---------------------------------------------------------------------------
create table if not exists public.flows (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'draft' check (status in ('draft', 'published', 'paused')),
  trigger text not null default '',
  contacts_in_flow integer not null default 0,
  completion_rate numeric not null default 0,
  published_version_id uuid, -- FK adicionada depois de workflow_versions existir (evita dependência circular)
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists flows_workspace_id_idx on public.flows (workspace_id);

create table if not exists public.workflow_versions (
  id uuid primary key default gen_random_uuid(),
  flow_id uuid not null references public.flows (id) on delete cascade,
  version integer not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  nodes jsonb not null default '[]'::jsonb,
  edges jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  published_at timestamptz,
  created_by uuid references public.workspace_members (id) on delete set null,
  unique (flow_id, version)
);

alter table public.flows
  add constraint flows_published_version_id_fkey
  foreign key (published_version_id) references public.workflow_versions (id) on delete set null;

create table if not exists public.workflow_executions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  flow_id uuid not null references public.flows (id) on delete cascade,
  version_id uuid not null references public.workflow_versions (id) on delete cascade,
  contact_id uuid, -- FK adicionada depois de contacts existir
  conversation_id uuid, -- FK adicionada depois de conversations existir
  status text not null default 'running' check (status in ('running', 'waiting', 'completed', 'failed', 'cancelled')),
  current_node_id text,
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create index if not exists workflow_executions_workspace_id_idx on public.workflow_executions (workspace_id);

create table if not exists public.node_outputs (
  id uuid primary key default gen_random_uuid(),
  execution_id uuid not null references public.workflow_executions (id) on delete cascade,
  node_id text not null,
  output text not null,
  at timestamptz not null default now(),
  data jsonb
);

create index if not exists node_outputs_execution_id_idx on public.node_outputs (execution_id);

-- ---------------------------------------------------------------------------
-- Contacts
-- ---------------------------------------------------------------------------
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  name text not null,
  phone text not null,
  email text,
  avatar_url text,
  source text not null default 'manual',
  status text not null default 'lead' check (status in ('active', 'lead', 'customer', 'archived')),
  owner_id uuid references public.workspace_members (id) on delete set null,
  current_flow_id uuid references public.flows (id) on delete set null,
  fields jsonb not null default '{}'::jsonb,
  last_interaction_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists contacts_workspace_id_idx on public.contacts (workspace_id);

create table if not exists public.contact_tags (
  contact_id uuid not null references public.contacts (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  primary key (contact_id, tag_id)
);

alter table public.workflow_executions
  add constraint workflow_executions_contact_id_fkey
  foreign key (contact_id) references public.contacts (id) on delete cascade;

-- ---------------------------------------------------------------------------
-- Conversations & Messages
-- ---------------------------------------------------------------------------
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  contact_id uuid not null references public.contacts (id) on delete cascade,
  channel text not null check (channel in ('whatsapp', 'instagram', 'webchat', 'email')),
  status text not null default 'open' check (status in ('open', 'waiting', 'resolved', 'snoozed')),
  bot_active boolean not null default true,
  assignee_id uuid references public.workspace_members (id) on delete set null,
  unread integer not null default 0,
  last_message text,
  last_message_at timestamptz not null default now()
);

create index if not exists conversations_workspace_id_idx on public.conversations (workspace_id);
create index if not exists conversations_contact_id_idx on public.conversations (contact_id);

alter table public.workflow_executions
  add constraint workflow_executions_conversation_id_fkey
  foreign key (conversation_id) references public.conversations (id) on delete set null;

create table if not exists public.conversation_tags (
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  primary key (conversation_id, tag_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  direction text not null check (direction in ('in', 'out', 'system')),
  author_id uuid references public.workspace_members (id) on delete set null,
  author_name text,
  content text not null,
  status text check (status in ('sent', 'delivered', 'read')),
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_id_idx on public.messages (conversation_id);

-- ---------------------------------------------------------------------------
-- Channels, WhatsApp templates, Campaigns
-- ---------------------------------------------------------------------------
create table if not exists public.channels (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  type text not null check (type in ('whatsapp', 'instagram', 'webchat', 'email')),
  label text not null,
  number text,
  status text not null default 'demo' check (status in ('connected', 'demo', 'disconnected'))
);

create table if not exists public.whatsapp_templates (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  name text not null,
  category text not null check (category in ('marketing', 'utility', 'authentication')),
  language text not null default 'pt_BR',
  status text not null default 'pending' check (status in ('approved', 'pending', 'rejected')),
  body text not null
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  name text not null,
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'sent')),
  audience_size integer not null default 0,
  scheduled_at timestamptz,
  template_id uuid references public.whatsapp_templates (id) on delete set null
);

-- ---------------------------------------------------------------------------
-- Row Level Security — isolamento por workspace (membership)
-- ---------------------------------------------------------------------------
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.tags enable row level security;
alter table public.custom_fields enable row level security;
alter table public.flows enable row level security;
alter table public.workflow_versions enable row level security;
alter table public.workflow_executions enable row level security;
alter table public.node_outputs enable row level security;
alter table public.contacts enable row level security;
alter table public.contact_tags enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_tags enable row level security;
alter table public.messages enable row level security;
alter table public.channels enable row level security;
alter table public.whatsapp_templates enable row level security;
alter table public.campaigns enable row level security;

create policy "ver workspace do qual sou membro" on public.workspaces
  for select using (public.is_workspace_member(id));
create policy "owner/admin atualiza workspace" on public.workspaces
  for update using (public.has_role(id, array['owner', 'admin']));

create policy "ver membros do meu workspace" on public.workspace_members
  for select using (public.is_workspace_member(workspace_id));
create policy "owner/admin convida membro" on public.workspace_members
  for insert with check (public.has_role(workspace_id, array['owner', 'admin']));
create policy "atualizar o próprio registro de membro" on public.workspace_members
  for update using (user_id = auth.uid());

create policy "isolamento por workspace" on public.tags for all
  using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "isolamento por workspace" on public.custom_fields for all
  using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "isolamento por workspace" on public.flows for all
  using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "isolamento por workspace" on public.contacts for all
  using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "isolamento por workspace" on public.conversations for all
  using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "isolamento por workspace" on public.channels for all
  using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "isolamento por workspace" on public.whatsapp_templates for all
  using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "isolamento por workspace" on public.campaigns for all
  using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "isolamento por workspace" on public.workflow_executions for all
  using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));

create policy "isolamento via flow" on public.workflow_versions for all
  using (exists (select 1 from public.flows f where f.id = flow_id and public.is_workspace_member(f.workspace_id)))
  with check (exists (select 1 from public.flows f where f.id = flow_id and public.is_workspace_member(f.workspace_id)));

create policy "isolamento via execution" on public.node_outputs for all
  using (exists (select 1 from public.workflow_executions e where e.id = execution_id and public.is_workspace_member(e.workspace_id)))
  with check (exists (select 1 from public.workflow_executions e where e.id = execution_id and public.is_workspace_member(e.workspace_id)));

create policy "isolamento via contact" on public.contact_tags for all
  using (exists (select 1 from public.contacts c where c.id = contact_id and public.is_workspace_member(c.workspace_id)))
  with check (exists (select 1 from public.contacts c where c.id = contact_id and public.is_workspace_member(c.workspace_id)));

create policy "isolamento via conversation" on public.conversation_tags for all
  using (exists (select 1 from public.conversations conv where conv.id = conversation_id and public.is_workspace_member(conv.workspace_id)))
  with check (exists (select 1 from public.conversations conv where conv.id = conversation_id and public.is_workspace_member(conv.workspace_id)));

create policy "isolamento via conversation" on public.messages for all
  using (exists (select 1 from public.conversations conv where conv.id = conversation_id and public.is_workspace_member(conv.workspace_id)))
  with check (exists (select 1 from public.conversations conv where conv.id = conversation_id and public.is_workspace_member(conv.workspace_id)));
