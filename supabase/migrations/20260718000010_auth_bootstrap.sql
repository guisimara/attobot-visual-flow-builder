-- Bootstrap de conta: cria o workspace + workspace_member (owner) do usuário
-- recém-cadastrado.
--
-- Por que uma função em vez de dois inserts direto do client:
-- as policies de RLS em "workspaces" e "workspace_members" só permitem
-- SELECT/UPDATE de workspaces dos quais o usuário já é membro (ver
-- is_workspace_member() em 20260718000000_workspace_schema.sql). No primeiro
-- signup o usuário ainda não é membro de nenhum workspace, então ele não
-- conseguiria nem inserir nem reler as próprias linhas. Uma função security
-- definer resolve isso rodando com privilégio de owner do schema, mas
-- continua validando que só o próprio usuário autenticado (auth.uid()) pode
-- chamar e só uma vez (não deixa criar um segundo workspace "owner" vazio
-- toda vez que o client re-chamar por engano).

create or replace function public.bootstrap_owner_workspace(p_workspace_name text, p_full_name text)
returns public.workspace_members
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_email text := (auth.jwt() ->> 'email');
  v_workspace_id uuid;
  v_base_slug text;
  v_slug text;
  v_suffix int := 0;
  v_member public.workspace_members;
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  if exists (select 1 from public.workspace_members where user_id = v_uid) then
    raise exception 'user already belongs to a workspace';
  end if;

  v_base_slug := lower(regexp_replace(coalesce(nullif(trim(p_workspace_name), ''), 'workspace'), '[^a-zA-Z0-9]+', '-', 'g'));
  v_base_slug := trim(both '-' from v_base_slug);
  if v_base_slug = '' then
    v_base_slug := 'workspace';
  end if;

  v_slug := v_base_slug;
  while exists (select 1 from public.workspaces where slug = v_slug) loop
    v_suffix := v_suffix + 1;
    v_slug := v_base_slug || '-' || v_suffix;
  end loop;

  insert into public.workspaces (name, slug)
  values (nullif(trim(p_workspace_name), ''), v_slug)
  returning id into v_workspace_id;

  insert into public.workspace_members (workspace_id, user_id, role, name, email, status, joined_at)
  values (v_workspace_id, v_uid, 'owner', nullif(trim(p_full_name), ''), coalesce(v_email, ''), 'online', now())
  returning * into v_member;

  -- Seed mínimo pra não abrir o app 100% vazio.
  insert into public.tags (workspace_id, name, color) values
    (v_workspace_id, 'Novo lead', '#3B82F6'),
    (v_workspace_id, 'Cliente', '#10B981');

  return v_member;
end;
$$;

grant execute on function public.bootstrap_owner_workspace(text, text) to authenticated;

-- Nota: a policy de INSERT em workspace_members para convites de novos
-- membros ("owner/admin convida membro") já existe em
-- 20260718000000_workspace_schema.sql. Não é necessária aqui — esta função é
-- security definer e roda com privilégio de owner do schema, contornando a
-- RLS para criar a 1ª linha (workspace + membro owner) do próprio usuário.
