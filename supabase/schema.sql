-- Rode este script no SQL Editor do Supabase.

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  replied boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists featured_projects (
  repo_name text primary key,
  created_at timestamptz not null default now()
);

alter table messages enable row level security;
alter table featured_projects enable row level security;

-- Qualquer visitante pode enviar mensagem; só o dono logado lê e atualiza.
create policy "visitantes enviam mensagens" on messages
  for insert to anon, authenticated with check (true);
create policy "dono le mensagens" on messages
  for select to authenticated using (true);
create policy "dono atualiza mensagens" on messages
  for update to authenticated using (true) with check (true);

-- Destaques: todos leem; só o dono altera.
create policy "todos leem destaques" on featured_projects
  for select to anon, authenticated using (true);
create policy "dono adiciona destaques" on featured_projects
  for insert to authenticated with check (true);
create policy "dono remove destaques" on featured_projects
  for delete to authenticated using (true);

-- Importante: em Authentication > Providers > Email, desative "Allow new users to sign up"
-- e crie apenas o seu usuário manualmente. Assim, só você consegue entrar no dashboard.
