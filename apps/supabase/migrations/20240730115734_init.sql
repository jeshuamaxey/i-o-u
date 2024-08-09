create table profiles (
  id uuid primary key,
  user_id uuid not null references auth.users on delete cascade,
  username text not null,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create type currency as enum ('USD', 'EUR', 'GBP');

create table groups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  name text not null,
  owner_id uuid not null references profiles,
  currency currency not null default 'GBP',
  archived_at timestamp with time zone,
  simplified_debts_enabled boolean default false
);

create table group_members (
  created_at timestamp with time zone default now(),
  group_id uuid not null references groups,
  name text,
  user_id uuid not null references profiles,

  primary key (group_id, user_id)
);

create table expenses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  created_by uuid not null references profiles,
  group_id uuid not null references groups,
  amount numeric not null,
  description text not null,
  date date not null,
  paid_for_by uuid not null references profiles(id),
  split_between jsonb not null default '[]'::jsonb
);
