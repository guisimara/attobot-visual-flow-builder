-- AttoBot — schema inicial
-- Espelha as entidades de src/types/index.ts, com multi-tenant (tenant_id) e RLS
-- prontos para quando a autenticação real (Supabase Auth) for ligada (README → "Próximos passos", item 1).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tenants (cada cliente/empresa que usa o AttoBot)
-- ---------------------------------------------------------------------------
create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'trial',
  whatsapp_number text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Profiles (equipe / team members) — 1:1 com auth.users
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  email text not null,
  role text not null default 'agent' check (role in ('owner', 'admin', 'agent', 'viewer')),
  avatar_url text,
  status text not null default 'offline' check (status in ('online', 'away', 'offline')),
  created_at timestamptz not null default now()
);

create index if not exists profiles_tenant_id_idx on public.profiles (tenant_id);

-- Helper: tenant do usuário autenticado (usado nas policies abaixo)
create or replace function public.current_tenant_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select tenant_id from public.profiles where id = auth.uid()
$$;

-- ---------------------------------------------------------------------------
-- Tags
-- ---------------------------------------------------------------------------
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  color text not null default '#3B82F6'
);

create index if not exists tags_tenant_id_idx on public.tags (tenant_id);

-- ---------------------------------------------------------------------------
-- Custom fields (campos customizados de contato)
-- ---------------------------------------------------------------------------
create table if not exists public.custom_fields (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  key text not null,
  label text not null,
  type text not null check (type in ('text', 'number', 'date', 'select', 'boolean')),
  options jsonb,
  unique (tenant_id, key)
);

-- ---------------------------------------------------------------------------
-- Flows (fluxos do editor visual)
-- ---------------------------------------------------------------------------
create table if not exists public.flows (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'draft' check (status in ('draft', 'published', 'paused')),
  trigger text not null default '',
  contacts_in_flow integer not null default 0,
  completion_rate numeric not null default 0,
  definition jsonb not null default '{"nodes": [], "edges": []}'::jsonb, -- nodes/edges do @xyflow/react
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists flows_tenant_id_idx on public.flows (tenant_id);

-- ---------------------------------------------------------------------------
-- Contacts
-- ---------------------------------------------------------------------------
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  phone text not null,
  email text,
  avatar_url text,
  source text not null default 'manual',
  status text not null default 'lead' check (status in ('active', 'lead', 'customer', 'archived')),
  owner_id uuid references public.profiles (id) on delete set null,
  current_flow_id uuid references public.flows (id) on delete set null,
  fields jsonb not null default '{}'::jsonb,
  last_interaction_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists contacts_tenant_id_idx on public.contacts (tenant_id);

create table if not exists public.contact_tags (
  contact_id uuid not null references public.contacts (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  primary key (contact_id, tag_id)
);

-- ---------------------------------------------------------------------------
-- Conversations & Messages (inbox)
-- ---------------------------------------------------------------------------
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  contact_id uuid not null references public.contacts (id) on delete cascade,
  channel text not null check (channel in ('whatsapp', 'instagram', 'webchat', 'email')),
  status text not null default 'open' check (status in ('open', 'waiting', 'resolved', 'snoozed')),
  bot_active boolean not null default true,
  assignee_id uuid references public.profiles (id) on delete set null,
  unread integer not null default 0,
  last_message text,
  last_message_at timestamptz not null default now()
);

create index if not exists conversations_tenant_id_idx on public.conversations (tenant_id);
create index if not exists conversations_contact_id_idx on public.conversations (contact_id);

create table if not exists public.conversation_tags (
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  primary key (conversation_id, tag_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  direction text not null check (direction in ('in', 'out', 'system')),
  author_id uuid references public.profiles (id) on delete set null,
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
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  type text not null check (type in ('whatsapp', 'instagram', 'webchat', 'email')),
  label text not null,
  number text,
  status text not null default 'demo' check (status in ('connected', 'demo', 'disconnected'))
);

create table if not exists public.whatsapp_templates (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  category text not null check (category in ('marketing', 'utility', 'authentication')),
  language text not null default 'pt_BR',
  status text not null default 'pending' check (status in ('approved', 'pending', 'rejected')),
  body text not null
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'sent')),
  audience_size integer not null default 0,
  scheduled_at timestamptz,
  template_id uuid references public.whatsapp_templates (id) on delete set null
);

-- ---------------------------------------------------------------------------
-- Row Level Security — isolamento por tenant
-- ---------------------------------------------------------------------------
alter table public.tenants enable row level security;
alter table public.profiles enable row level security;
alter table public.tags enable row level security;
alter table public.custom_fields enable row level security;
alter table public.flows enable row level security;
alter table public.contacts enable row level security;
alter table public.contact_tags enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_tags enable row level security;
alter table public.messages enable row level security;
alter table public.channels enable row level security;
alter table public.whatsapp_templates enable row level security;
alter table public.campaigns enable row level security;

create policy "Ver o próprio tenant" on public.tenants
  for select using (id = public.current_tenant_id());

create policy "Ver perfis do mesmo tenant" on public.profiles
  for select using (tenant_id = public.current_tenant_id());
create policy "Atualizar o próprio perfil" on public.profiles
  for update using (id = auth.uid());

-- Política padrão (CRUD completo) para as demais tabelas: acesso restrito ao tenant do usuário.
create policy "tenant isolation" on public.tags for all
  using (tenant_id = public.current_tenant_id()) with check (tenant_id = public.current_tenant_id());
create policy "tenant isolation" on public.custom_fields for all
  using (tenant_id = public.current_tenant_id()) with check (tenant_id = public.current_tenant_id());
create policy "tenant isolation" on public.flows for all
  using (tenant_id = public.current_tenant_id()) with check (tenant_id = public.current_tenant_id());
create policy "tenant isolation" on public.contacts for all
  using (tenant_id = public.current_tenant_id()) with check (tenant_id = public.current_tenant_id());
create policy "tenant isolation" on public.conversations for all
  using (tenant_id = public.current_tenant_id()) with check (tenant_id = public.current_tenant_id());
create policy "tenant isolation" on public.channels for all
  using (tenant_id = public.current_tenant_id()) with check (tenant_id = public.current_tenant_id());
create policy "tenant isolation" on public.whatsapp_templates for all
  using (tenant_id = public.current_tenant_id()) with check (tenant_id = public.current_tenant_id());
create policy "tenant isolation" on public.campaigns for all
  using (tenant_id = public.current_tenant_id()) with check (tenant_id = public.current_tenant_id());

-- Tabelas de junção herdam o isolamento via join com a tabela "pai"
create policy "tenant isolation via contact" on public.contact_tags for all
  using (exists (select 1 from public.contacts c where c.id = contact_id and c.tenant_id = public.current_tenant_id()))
  with check (exists (select 1 from public.contacts c where c.id = contact_id and c.tenant_id = public.current_tenant_id()));

create policy "tenant isolation via conversation" on public.conversation_tags for all
  using (exists (select 1 from public.conversations conv where conv.id = conversation_id and conv.tenant_id = public.current_tenant_id()))
  with check (exists (select 1 from public.conversations conv where conv.id = conversation_id and conv.tenant_id = public.current_tenant_id()));

create policy "tenant isolation via conversation" on public.messages for all
  using (exists (select 1 from public.conversations conv where conv.id = conversation_id and conv.tenant_id = public.current_tenant_id()))
  with check (exists (select 1 from public.conversations conv where conv.id = conversation_id and conv.tenant_id = public.current_tenant_id()));
