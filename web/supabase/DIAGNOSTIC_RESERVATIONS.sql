-- Supabase → SQL Editor 에 붙여넣어 실행하세요.
-- 예약이 어드민에 안 보일 때: 테이블 존재 여부·건수·최근 행을 확인합니다.

-- 1) 테이블이 없으면 아래 전체 스키마는 web/supabase/SUPABASE_ALL_IN_ONE.sql 를 한 번 실행하세요.
select to_regclass('public.reservations') as reservations_table;

-- 2) 건수
select count(*)::int as reservation_count from public.reservations;

-- 3) 최근 20건 (어드민과 동일 소스)
select id, type, customer_name, phone, left(pet_info, 80) as pet_info_preview, status, created_at
from public.reservations
order by created_at desc
limit 20;

-- 4) 문의 테이블도 함께 확인할 때
select count(*)::int as inquiry_count from public.inquiries;
