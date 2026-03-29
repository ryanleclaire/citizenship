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

-- Documents table (tracks per-document status, order info, and file uploads)
create table public.documents (
  id uuid default gen_random_uuid() primary key,
  application_id uuid references public.applications(id) on delete cascade not null,
  person_id text not null,
  document_type text not null,
  label text not null,
  status text default 'needed' check (status in ('needed', 'ordered', 'received', 'uploaded')),
  order_info text,
  notes text,
  file_path text,
  file_name text,
  file_size_bytes bigint,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Prevent duplicate document types per person per application
create unique index documents_app_person_type_idx
  on public.documents (application_id, person_id, document_type);

-- Enable RLS
alter table public.documents enable row level security;

-- Users can only access documents belonging to their own applications
create policy "Users can view own documents"
  on public.documents for select
  using (
    application_id in (
      select id from public.applications where user_id = auth.uid()
    )
  );

create policy "Users can insert own documents"
  on public.documents for insert
  with check (
    application_id in (
      select id from public.applications where user_id = auth.uid()
    )
  );

create policy "Users can update own documents"
  on public.documents for update
  using (
    application_id in (
      select id from public.applications where user_id = auth.uid()
    )
  );

create policy "Users can delete own documents"
  on public.documents for delete
  using (
    application_id in (
      select id from public.applications where user_id = auth.uid()
    )
  );

create policy "Service role full access on documents"
  on public.documents for all
  using (auth.role() = 'service_role');

-- Document vault storage bucket (run via Supabase dashboard)
-- insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
-- values (
--   'document-vault',
--   'document-vault',
--   false,
--   10485760,
--   array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
-- );

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

create trigger documents_updated_at
  before update on public.documents
  for each row execute procedure public.update_updated_at();
