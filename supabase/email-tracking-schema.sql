-- Email engagement tracking
-- Run this in your Supabase SQL Editor

create table public.email_events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  report_id uuid references public.reports on delete cascade,
  recipient_email text not null,
  recipient_name text,
  event_type text not null, -- 'delivered', 'opened', 'clicked', 'bounced'
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- Index for fast lookups
create index idx_email_events_user on public.email_events(user_id);
create index idx_email_events_recipient on public.email_events(recipient_email);
create index idx_email_events_report on public.email_events(report_id);
create index idx_email_events_type on public.email_events(event_type, created_at desc);

-- RLS
alter table public.email_events enable row level security;

create policy "Users can view own email events" on public.email_events
  for select using (auth.uid() = user_id);

create policy "Service role can manage email events" on public.email_events
  for all using (true);
