create extension if not exists pgcrypto;

create table if not exists public.noor_contributions (
 id uuid primary key default gen_random_uuid(),
 type text not null check (type in ('hug','flower','note','coffee','chocolate','teddy','sparkle','highfive','joke','song','escape')),
 sender_name text not null default 'Anonymous',
 content text not null default '',
 mood text not null default 'just-because',
 meta jsonb not null default '{}'::jsonb,
 is_read boolean not null default false,
 is_favorite boolean not null default false,
 is_hidden boolean not null default false,
 created_at timestamptz not null default now()
);

create table if not exists public.noor_daily_polls (
 id uuid primary key default gen_random_uuid(), question text not null, options jsonb not null default '[]'::jsonb, active boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.noor_poll_votes (
 id uuid primary key default gen_random_uuid(), poll_id uuid not null references public.noor_daily_polls(id) on delete cascade, voter_name text not null default 'Anonymous', option_index integer not null, created_at timestamptz not null default now()
);
create table if not exists public.noor_awards (
 id uuid primary key default gen_random_uuid(), title text not null, description text not null default '', nominee text not null default 'Noor', votes integer not null default 0, created_at timestamptz not null default now()
);
create table if not exists public.noor_memories (
 id uuid primary key default gen_random_uuid(), title text not null, body text not null default '', emoji text not null default '🌻', author text not null default 'Anonymous', created_at timestamptz not null default now()
);
create table if not exists public.noor_settings (
 id boolean primary key default true, submissions_open boolean not null default true, allow_anonymous boolean not null default true, updated_at timestamptz not null default now()
);
insert into public.noor_settings(id) values(true) on conflict(id) do nothing;

alter table public.noor_contributions enable row level security;
alter table public.noor_daily_polls enable row level security;
alter table public.noor_poll_votes enable row level security;
alter table public.noor_awards enable row level security;
alter table public.noor_memories enable row level security;
alter table public.noor_settings enable row level security;

create policy "public can read visible contributions" on public.noor_contributions for select using (is_hidden=false);
create policy "public can read active polls" on public.noor_daily_polls for select using (active=true);
create policy "public can insert poll votes" on public.noor_poll_votes for insert with check (true);
create policy "public can read awards" on public.noor_awards for select using (true);
create policy "public can read memories" on public.noor_memories for select using (true);
create policy "public can read settings" on public.noor_settings for select using (true);

alter publication supabase_realtime add table public.noor_contributions;