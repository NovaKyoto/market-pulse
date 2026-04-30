-- Teams Tier Waitlist
-- Stores brokerage/agency signups interested in the Teams tier (multi-seat MarketPulse)
create table if not exists teams_waitlist (
  id uuid primary key default gen_random_uuid(),
  brokerage_name text not null,
  contact_name text not null,
  contact_email text not null,
  agent_count text not null,
  message text,
  utm_source text,
  created_at timestamp with time zone default now()
);

create index if not exists idx_teams_waitlist_email on teams_waitlist(contact_email);
create index if not exists idx_teams_waitlist_created on teams_waitlist(created_at desc);

-- RLS: only service role writes (via API), no public reads
alter table teams_waitlist enable row level security;

-- Drop any existing policies first
drop policy if exists "service role manages waitlist" on teams_waitlist;

create policy "service role manages waitlist"
  on teams_waitlist for all
  to service_role
  using (true);

comment on table teams_waitlist is 'Brokerage/agency waitlist signups for Teams tier';
