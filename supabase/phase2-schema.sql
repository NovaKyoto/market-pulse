-- Phase 2: AI tone, referral program
-- Run this in your Supabase SQL Editor

-- Add AI tone preference
alter table public.profiles
  add column if not exists ai_tone text default 'professional';

-- Add referral columns
alter table public.profiles
  add column if not exists referral_code text unique,
  add column if not exists referred_by text;

-- Auto-generate referral codes for existing and new profiles
create or replace function public.generate_referral_code()
returns trigger as $$
begin
  if new.referral_code is null then
    new.referral_code := lower(substr(md5(random()::text || new.id::text), 1, 8));
  end if;
  return new;
end;
$$ language plpgsql;

-- Trigger for new profiles
drop trigger if exists set_referral_code on public.profiles;
create trigger set_referral_code
  before insert on public.profiles
  for each row execute function public.generate_referral_code();

-- Backfill existing profiles that don't have a referral code
update public.profiles
set referral_code = lower(substr(md5(random()::text || id::text), 1, 8))
where referral_code is null;
