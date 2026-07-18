-- Bootstrap de conta: cria o tenant + profile (owner) do usuário recém-cadastrado.
--
-- Por que uma função em vez de dois inserts direto do client:
-- as policies de RLS em "tenants" e "profiles" só permitem SELECT/UPDATE do
-- próprio tenant/perfil (ver 20260717000000_init_schema.sql). No primeiro
-- signup o usuário ainda não tem profile, então "current_tenant_id()" é nulo
-- e ele não conseguiria nem inserir nem reler as próprias linhas. Uma função
-- security definer resolve isso rodando com privilégio de owner do schema,
-- mas continua validando que só o próprio usuário autenticado (auth.uid())
-- pode chamar e só uma vez (não deixa recriar profile se já existir).

create or replace function public.bootstrap_owner_profile(p_tenant_name text, p_full_name text)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_email text := (auth.jwt() ->> 'email');
  v_tenant_id uuid;
  v_profile public.profiles;
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  if exists (select 1 from public.profiles where id = v_uid) then
    raise exception 'profile already exists for this user';
  end if;

  insert into public.tenants (name)
  values (nullif(trim(p_tenant_name), ''))
  returning id into v_tenant_id;

  insert into public.profiles (id, tenant_id, name, email, role, status)
  values (v_uid, v_tenant_id, nullif(trim(p_full_name), ''), coalesce(v_email, ''), 'owner', 'online')
  returning * into v_profile;

  -- Seed mínimo pra não abrir o app 100% vazio.
  insert into public.tags (tenant_id, name, color) values
    (v_tenant_id, 'Novo lead', '#3B82F6'),
    (v_tenant_id, 'Cliente', '#10B981');

  return v_profile;
end;
$$;

grant execute on function public.bootstrap_owner_profile(text, text) to authenticated;

-- Permite que o dono/admin do tenant convide novos membros (INSERT em profiles)
-- futuramente. Só o próprio bootstrap acima cria a 1ª linha; isso aqui é para
-- convites — um convite real (via Edge Function/Admin API) cria o auth.users
-- e insere o profile já com o tenant_id correto, então liberamos INSERT
-- restrito ao mesmo tenant do usuário que está convidando.
create policy "convidar membro do mesmo tenant" on public.profiles
  for insert
  with check (tenant_id = public.current_tenant_id());
