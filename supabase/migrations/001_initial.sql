-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Races table (global race database)
create table public.races (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  distance_km numeric(6,1) not null,
  elevation_m integer not null,
  date date not null,
  location text not null,
  country text not null,
  region text not null,
  itra_points integer check (itra_points between 1 and 6),
  registration_url text,
  latitude numeric(9,6) not null,
  longitude numeric(9,6) not null,
  source text not null default 'manual',
  description text,
  created_at timestamptz not null default now()
);

create index races_date_idx on public.races (date);
create index races_country_idx on public.races (country);

-- User races (user's planned races)
create table public.user_races (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  race_id uuid not null references public.races(id) on delete cascade,
  status text not null default 'interested' check (status in ('interested', 'registered', 'completed')),
  notes text,
  created_at timestamptz not null default now(),
  unique(user_id, race_id)
);

create index user_races_user_idx on public.user_races (user_id);

-- Activities (imported from Strava/Garmin)
create table public.activities (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source text not null check (source in ('strava', 'garmin')),
  external_id text not null,
  name text not null,
  distance_m integer not null default 0,
  elevation_m integer not null default 0,
  duration_s integer not null default 0,
  started_at timestamptz not null,
  raw_data jsonb,
  unique(user_id, source, external_id)
);

create index activities_user_idx on public.activities (user_id, started_at desc);

-- OAuth integrations
create table public.integrations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider in ('strava', 'garmin')),
  access_token text not null,
  refresh_token text not null,
  expires_at timestamptz not null,
  unique(user_id, provider)
);

-- RLS policies
alter table public.races enable row level security;
alter table public.user_races enable row level security;
alter table public.activities enable row level security;
alter table public.integrations enable row level security;

-- Races: readable by all authenticated users
create policy "races_select" on public.races for select using (true);

-- User races: only own rows
create policy "user_races_select" on public.user_races for select using (auth.uid() = user_id);
create policy "user_races_insert" on public.user_races for insert with check (auth.uid() = user_id);
create policy "user_races_update" on public.user_races for update using (auth.uid() = user_id);
create policy "user_races_delete" on public.user_races for delete using (auth.uid() = user_id);

-- Activities: only own rows
create policy "activities_select" on public.activities for select using (auth.uid() = user_id);
create policy "activities_insert" on public.activities for insert with check (auth.uid() = user_id);
create policy "activities_delete" on public.activities for delete using (auth.uid() = user_id);

-- Integrations: only own rows
create policy "integrations_select" on public.integrations for select using (auth.uid() = user_id);
create policy "integrations_insert" on public.integrations for insert with check (auth.uid() = user_id);
create policy "integrations_update" on public.integrations for update using (auth.uid() = user_id);
create policy "integrations_delete" on public.integrations for delete using (auth.uid() = user_id);
