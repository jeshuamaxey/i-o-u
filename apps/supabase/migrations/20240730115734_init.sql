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
  id uuid primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  owner_id uuid not null references profiles on delete cascade,
  currency currency default 'GBP',
  archived_at timestamp with time zone
);

create table group_members (
  created_at timestamp with time zone default now(),
  group_id uuid not null references groups,
  user_id uuid not null references profiles on delete cascade,

  primary key (group_id, user_id)
);

create table expenses (
  id uuid primary key,
  created_at timestamp with time zone default now(),
  group_id uuid not null references groups,
  amount numeric not null,
  description text not null,
  date date not null,
  paid_for_by uuid not null references profiles,
  split_between jsonb not null default '[]'::jsonb
);
