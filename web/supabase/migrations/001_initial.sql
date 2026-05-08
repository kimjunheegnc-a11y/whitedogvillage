-- 이 파일은 참고용입니다. 새 프로젝트는 아래 한 파일만 실행하세요.
-- → web/supabase/SUPABASE_ALL_IN_ONE.sql

-- 하얀 개 마을 — initial schema + RLS (legacy split)

create extension if not exists "pgcrypto";

-- ─── Tables ─────────────────────────────────────────────────

create table if not exists public.content_blocks (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  alt text default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

do $$ begin
  create type public.reservation_type as enum ('adoption', 'hotel', 'grooming');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  type public.reservation_type not null,
  customer_name text not null,
  phone text not null,
  pet_info text not null default '',
  preferred_at timestamptz,
  notes text not null default '',
  status text not null default 'new'
    check (status in ('new', 'confirmed', 'cancelled', 'done')),
  calendar_event_id text,
  created_at timestamptz not null default now(),
  constraint reservations_name_len check (char_length(customer_name) <= 100),
  constraint reservations_phone_len check (char_length(phone) <= 40),
  constraint reservations_notes_len check (char_length(notes) <= 2000),
  constraint reservations_pet_len check (char_length(pet_info) <= 500)
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  phone text not null,
  message text not null,
  created_at timestamptz not null default now(),
  constraint inquiries_cat_len check (char_length(category) <= 80),
  constraint inquiries_msg_len check (char_length(message) <= 5000)
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  title text default '',
  body text not null,
  rating int check (rating is null or (rating >= 1 and rating <= 5)),
  published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ─── Storage bucket ─────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Public read for gallery images
drop policy if exists "media_select_public" on storage.objects;
create policy "media_select_public"
on storage.objects for select
to public
using (bucket_id = 'media');

-- ─── RLS ─────────────────────────────────────────────────────

alter table public.content_blocks enable row level security;
alter table public.media_assets enable row level security;
alter table public.reservations enable row level security;
alter table public.inquiries enable row level security;
alter table public.reviews enable row level security;

drop policy if exists "content_blocks_select_public" on public.content_blocks;
create policy "content_blocks_select_public"
on public.content_blocks for select
to public
using (true);

drop policy if exists "media_assets_select_public" on public.media_assets;
create policy "media_assets_select_public"
on public.media_assets for select
to public
using (true);

drop policy if exists "reviews_select_published" on public.reviews;
create policy "reviews_select_published"
on public.reviews for select
to public
using (published = true);

-- Inserts only via service_role (Next.js API). No anon insert policies.

-- ─── Seed content (idempotent) ───────────────────────────────

insert into public.content_blocks (key, value) values
  ('hero_title', to_jsonb('하얀개마을은 사랑을 분양합니다!'::text)),
  ('hero_subtitle', to_jsonb('스케줄·요금은 카카오톡으로 편하게 문의해 주세요.'::text)),
  ('hero_badges', '["#365일","#전문분양","#건강검진","#애견호텔","#미용","#종합애견센터"]'::jsonb),
  ('contact_address', to_jsonb('경기 용인시 기흥구'::text)),
  ('contact_hours', to_jsonb('OPEN AM 10:00 / CLOSE PM 9:30 (연중무휴)'::text)),
  ('phone', to_jsonb('031-334-3336'::text)),
  ('page_bunyang_intro', to_jsonb('건강검진을 마친 아이들을 책임지고 분양합니다. 상담은 챗봇·카카오로 연결됩니다.'::text)),
  ('page_hotel_intro', to_jsonb('안전하고 쾌적한 애견호텔. 맞춤 돌봄과 산책 프로그램을 제공합니다.'::text)),
  ('page_grooming_intro', to_jsonb('전문 미용사가 부드럽게 케어합니다. 예약 후 방문해 주세요.'::text)),
  ('page_hospital_intro', to_jsonb('제휴 동물병원 안내 및 건강 상담 연결. 예약은 전화·카카오톡을 이용해 주세요.'::text)),
  ('page_snacks_intro', to_jsonb('신선한 간식과 사료를 엄선했습니다. 결제 없이 매장·문의로 안내드립니다.'::text))
on conflict (key) do nothing;

insert into public.reviews (title, body, rating, published, sort_order)
select '따뜻한 상담', '분양 상담이 친절하고 자세해서 안심됐어요.', 5, true, 1
where not exists (select 1 from public.reviews where title = '따뜻한 상담' limit 1);

insert into public.reviews (title, body, rating, published, sort_order)
select '호텔 이용 후기', '여행 다녀오는 동안 아이가 편안해 보였어요.', 5, true, 2
where not exists (select 1 from public.reviews where title = '호텔 이용 후기' limit 1);

insert into public.reviews (title, body, rating, published, sort_order)
select '미용 만족', '컷 스타일이 딱 제가 원하던 느낌이에요!', 5, true, 3
where not exists (select 1 from public.reviews where title = '미용 만족' limit 1);
