create extension if not exists pgcrypto;

create type public.staff_role as enum ('admin', 'editor', 'viewer');
create type public.complaint_status as enum ('submitted', 'under_review', 'in_progress', 'resolved', 'rejected');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role public.staff_role not null default 'viewer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create table if not exists public.sites (
  id text primary key,
  name jsonb not null,
  category text not null,
  commune jsonb not null,
  coordinates jsonb not null,
  description jsonb not null,
  history jsonb not null,
  images jsonb not null default '[]'::jsonb,
  visiting_hours jsonb not null,
  entry_fee jsonb not null,
  amenities jsonb not null default '{}'::jsonb,
  address jsonb not null,
  rating numeric(3,2) not null default 0,
  reviews_count integer not null default 0,
  is_featured boolean not null default false,
  best_time_to_visit jsonb,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id text primary key,
  title jsonb not null,
  type text not null,
  date_start date not null,
  date_end date not null,
  location jsonb not null,
  description jsonb not null,
  image text not null,
  organizer jsonb not null,
  category text not null,
  is_upcoming boolean not null default true,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.artisans (
  id text primary key,
  name jsonb not null,
  craft_category text not null,
  commune jsonb not null,
  address jsonb not null,
  phone text not null,
  whatsapp text,
  photo text not null,
  bio jsonb not null,
  products jsonb not null default '[]'::jsonb,
  is_certified boolean not null default false,
  registration_number text not null,
  experience_years integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.investments (
  id text primary key,
  title jsonb not null,
  category text not null,
  location jsonb not null,
  area_hectares numeric not null,
  zet_zone_name jsonb,
  estimated_cost_dzd text not null,
  status text not null,
  description jsonb not null,
  advantages jsonb not null default '{}'::jsonb,
  image text not null,
  pdf_title text not null,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.news (
  id text primary key,
  title jsonb not null,
  excerpt jsonb not null,
  content jsonb not null,
  published_date date not null,
  category text not null,
  image text not null,
  is_important boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create sequence if not exists public.request_tracking_seq;

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  tracking_number text not null unique,
  service_type text not null,
  full_name text not null,
  national_id_or_passport text not null,
  email text not null,
  phone text not null,
  subject text not null,
  details text not null,
  status public.complaint_status not null default 'submitted',
  admin_response text,
  department_assigned text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
drop trigger if exists sites_set_updated_at on public.sites;
create trigger sites_set_updated_at before update on public.sites for each row execute procedure public.set_updated_at();
drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at before update on public.events for each row execute procedure public.set_updated_at();
drop trigger if exists artisans_set_updated_at on public.artisans;
create trigger artisans_set_updated_at before update on public.artisans for each row execute procedure public.set_updated_at();
drop trigger if exists investments_set_updated_at on public.investments;
create trigger investments_set_updated_at before update on public.investments for each row execute procedure public.set_updated_at();
drop trigger if exists news_set_updated_at on public.news;
create trigger news_set_updated_at before update on public.news for each row execute procedure public.set_updated_at();
drop trigger if exists requests_set_updated_at on public.requests;
create trigger requests_set_updated_at before update on public.requests for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
revoke all on table public.profiles from anon;
grant select on table public.profiles to authenticated;

-- Published content is public.sites enable row level security;
alter table public.events enable row level security;
alter table public.artisans enable row level security;
alter table public.investments enable row level security;
alter table public.news enable row level security;
alter table public.requests enable row level security;

drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
drop policy if exists profiles_admin_write on public.profiles;
create policy profiles_admin_write on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Published content is public. Only staff can create, edit, publish, or delete it.
do $$
declare
  table_name text;
begin
  foreach table_name in array array['sites','events','artisans','investments','news'] loop
    execute format('drop policy if exists %I_public_read on public.%I', table_name, table_name);
    execute format('create policy %I_public_read on public.%I for select to anon, authenticated using (is_published = true or public.is_staff())', table_name, table_name);
    execute format('drop policy if exists %I_staff_write on public.%I', table_name, table_name);
    execute format('create policy %I_staff_write on public.%I for all to authenticated using (public.is_staff()) with check (public.is_staff())', table_name, table_name);
  end loop;
end $$;

drop policy if exists requests_staff_read on public.requests;
create policy requests_staff_read on public.requests for select to authenticated using (public.is_staff());
drop policy if exists requests_staff_update on public.requests;
create policy requests_staff_update on public.requests for update to authenticated using (public.is_staff()) with check (public.is_staff());

create or replace function public.submit_public_request(
  p_service_type text,
  p_full_name text,
  p_national_id_or_passport text,
  p_email text,
  p_phone text,
  p_subject text,
  p_details text
)
returns table (
  id uuid,
  tracking_number text,
  service_type text,
  full_name text,
  national_id_or_passport text,
  email text,
  phone text,
  subject text,
  details text,
  status public.complaint_status,
  created_at timestamptz,
  updated_at timestamptz,
  admin_response text,
  department_assigned text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  created_request public.requests;
begin
  if length(trim(p_full_name)) < 2 or length(trim(p_subject)) < 3 or length(trim(p_details)) < 10 then
    raise exception 'invalid_request_payload' using errcode = '22023';
  end if;
  insert into public.requests (
    tracking_number, service_type, full_name, national_id_or_passport, email, phone, subject, details
  ) values (
    format('ELO-%s-%s', to_char(now(), 'YYYY'), lpad(nextval('public.request_tracking_seq')::text, 6, '0')),
    p_service_type, trim(p_full_name), trim(p_national_id_or_passport), lower(trim(p_email)), trim(p_phone), trim(p_subject), trim(p_details)
  ) returning * into created_request;
  return query select created_request.*;
end;
$$;

create or replace function public.track_public_request(p_tracking_number text)
returns table (
  tracking_number text,
  service_type text,
  subject text,
  status public.complaint_status,
  created_at timestamptz,
  updated_at timestamptz,
  admin_response text,
  department_assigned text
)
language sql
security definer
set search_path = public
as $$
  select r.tracking_number, r.service_type, r.subject, r.status, r.created_at, r.updated_at, r.admin_response, r.department_assigned
  from public.requests r
  where upper(r.tracking_number) = upper(trim(p_tracking_number))
  limit 1;
$$;

revoke all on function public.submit_public_request(text,text,text,text,text,text,text) from public;
grant execute on function public.submit_public_request(text,text,text,text,text,text,text) to anon, authenticated;
revoke all on function public.track_public_request(text) from public;
grant execute on function public.track_public_request(text) to anon, authenticated;

revoke all on sequence public.request_tracking_seq from public;

-- Create one profile for every new Auth user; role remains viewer until an administrator promotes it.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- Shared Ouedna legacy table: preserve existing records while applying the official portal policy.
-- This block is safe to run after the existing places table is present.
alter table if exists public.places enable row level security;
drop policy if exists places_public_read on public.places;
create policy places_public_read on public.places
  for select to anon, authenticated
  using (status = 'منشور' or public.is_staff());

drop policy if exists places_staff_write on public.places;
create policy places_staff_write on public.places
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());
