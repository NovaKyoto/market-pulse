-- MarketPulse Schema
-- Run this in your Supabase SQL Editor

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  business_name text,
  logo_url text,
  brand_color text default '#2563eb',
  zip_codes text[] default '{}',
  onboarding_complete boolean default false,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text default 'trialing',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Recipients (people who receive the reports)
create table public.recipients (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  email text not null,
  name text,
  active boolean default true,
  created_at timestamptz default now()
);

-- Reports (generated market reports)
create table public.reports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  zip_code text not null,
  title text not null,
  summary text,
  market_data jsonb,
  ai_insights text,
  pdf_url text,
  status text default 'pending',
  sent_at timestamptz,
  created_at timestamptz default now()
);

-- Market data cache
create table public.market_data_cache (
  id uuid default gen_random_uuid() primary key,
  zip_code text not null,
  data_type text not null,
  data jsonb not null,
  fetched_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '7 days')
);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.recipients enable row level security;
alter table public.reports enable row level security;
alter table public.market_data_cache enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can view own recipients" on public.recipients
  for select using (auth.uid() = user_id);

create policy "Users can manage own recipients" on public.recipients
  for all using (auth.uid() = user_id);

create policy "Users can view own reports" on public.reports
  for select using (auth.uid() = user_id);

create policy "Users can manage own reports" on public.reports
  for all using (auth.uid() = user_id);

create policy "Anyone can read cached market data" on public.market_data_cache
  for select using (true);

create policy "Service role can manage market data cache" on public.market_data_cache
  for all using (true);

-- Indexes
create index idx_recipients_user on public.recipients(user_id);
create index idx_reports_user on public.reports(user_id);
create index idx_market_cache_zip on public.market_data_cache(zip_code, data_type);
create index idx_market_cache_expiry on public.market_data_cache(expires_at);

-- Trigger to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
