-- ODYSSEY Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- PROFILES
-- =============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  avatar_url text,
  xp integer default 0,
  streak_count integer default 0,
  last_active_date date,
  preferred_lang text default 'id' check (preferred_lang in ('id', 'en')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- =============================================
-- LEVELS
-- =============================================
create table public.levels (
  id text primary key,
  "order" integer unique not null,
  emoji text not null,
  title_id text not null,
  title_en text not null,
  theme_id text not null,
  theme_en text not null,
  badge_name_id text not null,
  badge_name_en text not null,
  badge_icon text not null,
  created_at timestamptz default now()
);

alter table public.levels enable row level security;

create policy "Levels are public read-only"
  on public.levels for select
  using (true);

-- =============================================
-- MODULES
-- =============================================
create table public.modules (
  id text primary key,
  level_id text references public.levels(id) on delete cascade not null,
  "order" integer not null,
  title_id text not null,
  title_en text not null,
  description_id text not null,
  description_en text not null,
  created_at timestamptz default now(),
  unique(level_id, "order")
);

alter table public.modules enable row level security;

create policy "Modules are public read-only"
  on public.modules for select
  using (true);

-- =============================================
-- QUESTS
-- =============================================
create table public.quests (
  id text primary key,
  level_id text references public.levels(id) on delete cascade not null,
  module_id text references public.modules(id) on delete cascade not null,
  "order" integer not null,
  type text not null check (type in ('lesson', 'checkpoint', 'final_review', 'project')),
  title_id text not null,
  title_en text not null,
  description_id text not null,
  description_en text not null,
  content_id text,
  content_en text,
  xp_reward integer default 20,
  source_references text[],
  created_at timestamptz default now(),
  unique(module_id, "order")
);

alter table public.quests enable row level security;

create policy "Quests are public read-only"
  on public.quests for select
  using (true);

-- =============================================
-- QUIZ QUESTIONS
-- =============================================
create table public.quiz_questions (
  id text primary key,
  quest_id text references public.quests(id) on delete cascade not null,
  question_id text not null,
  question_en text not null,
  type text default 'multiple_choice' check (type in ('multiple_choice', 'drag_drop', 'interactive')),
  explanation_id text,
  explanation_en text,
  "order" integer default 1,
  created_at timestamptz default now()
);

alter table public.quiz_questions enable row level security;

create policy "Quiz questions are public read-only"
  on public.quiz_questions for select
  using (true);

-- =============================================
-- QUIZ OPTIONS
-- =============================================
create table public.quiz_options (
  id text primary key,
  question_id text references public.quiz_questions(id) on delete cascade not null,
  text_id text not null,
  text_en text not null,
  is_correct boolean default false,
  "order" integer default 1,
  created_at timestamptz default now()
);

alter table public.quiz_options enable row level security;

create policy "Quiz options are public read-only"
  on public.quiz_options for select
  using (true);

-- =============================================
-- USER PROGRESS
-- =============================================
create table public.user_progress (
  user_id uuid references public.profiles(id) on delete cascade not null,
  quest_id text references public.quests(id) on delete cascade not null,
  status text default 'locked' check (status in ('locked', 'unlocked', 'in_progress', 'completed')),
  quiz_score integer,
  completed_at timestamptz,
  created_at timestamptz default now(),
  primary key (user_id, quest_id)
);

alter table public.user_progress enable row level security;

create policy "Users can view own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- =============================================
-- USER BADGES
-- =============================================
create table public.user_badges (
  user_id uuid references public.profiles(id) on delete cascade not null,
  level_id text references public.levels(id) on delete cascade not null,
  earned_at timestamptz default now(),
  primary key (user_id, level_id)
);

alter table public.user_badges enable row level security;

create policy "Users can view own badges"
  on public.user_badges for select
  using (auth.uid() = user_id);

create policy "Users can insert own badges"
  on public.user_badges for insert
  with check (auth.uid() = user_id);

-- =============================================
-- INDEXES
-- =============================================
create index idx_modules_level on public.modules(level_id, "order");
create index idx_quests_module on public.quests(module_id, "order");
create index idx_quiz_questions_quest on public.quiz_questions(quest_id, "order");
create index idx_quiz_options_question on public.quiz_options(question_id, "order");
create index idx_user_progress_user on public.user_progress(user_id);
create index idx_user_progress_quest on public.user_progress(quest_id);
create index idx_user_badges_user on public.user_badges(user_id);

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

-- =============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- =============================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
