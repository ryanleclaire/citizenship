-- Profiles table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  subscription_tier text default 'free' check (subscription_tier in ('free', 'individual', 'family')),
  stripe_customer_id text,
  stripe_subscription_id text,
  eligibility_result jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Users can read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Service role can do anything (for Stripe webhooks)
create policy "Service role full access"
  on public.profiles for all
  using (auth.role() = 'service_role');

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Applications table (saved family chains + checklists)
create table public.applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text default 'My Application',
  generation text,
  chain_data jsonb default '[]'::jsonb,
  checklist_data jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.applications enable row level security;

-- Users can CRUD their own applications
create policy "Users can view own applications"
  on public.applications for select
  using (auth.uid() = user_id);

create policy "Users can create own applications"
  on public.applications for insert
  with check (auth.uid() = user_id);

create policy "Users can update own applications"
  on public.applications for update
  using (auth.uid() = user_id);

create policy "Users can delete own applications"
  on public.applications for delete
  using (auth.uid() = user_id);

-- Service role full access
create policy "Service role full access on applications"
  on public.applications for all
  using (auth.role() = 'service_role');

-- Updated_at trigger
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at();

create trigger applications_updated_at
  before update on public.applications
  for each row execute procedure public.update_updated_at();
