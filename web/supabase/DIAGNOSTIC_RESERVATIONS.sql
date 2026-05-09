-- ============================================================
-- 예약·문의 진단 (Supabase → SQL Editor 에 붙여넣어 한 번에 실행)
-- ============================================================
--
-- [중요] 두 테이블은 다릅니다.
--   • reservation_count → 사이트/챗봇 "예약 접수" (분양·호텔·미용) = public.reservations
--   • inquiry_count       → "기타 문의" 등 = public.inquiries
-- 예약만 테스트했다면 inquiry_count 가 0 인 것은 정상일 수 있습니다.
-- 반드시 reservation_count 를 같이 보세요.
-- ============================================================

-- 1) 테이블 존재 (null 이면 SUPABASE_ALL_IN_ONE.sql 미실행)
select to_regclass('public.reservations') as reservations_table,
       to_regclass('public.inquiries') as inquiries_table;

-- 2) 건수 한 줄로 (가장 먼저 확인할 결과)
select
  (select count(*)::bigint from public.reservations) as reservation_count,
  (select count(*)::bigint from public.inquiries) as inquiry_count;

-- 3) 예약 최근 20건
select id, type, customer_name, phone, left(pet_info, 80) as pet_info_preview, status, created_at
from public.reservations
order by created_at desc
limit 20;

-- 4) 문의 최근 10건 (없으면 0건)
select id, category, name, phone, left(message, 60) as message_preview, created_at
from public.inquiries
order by created_at desc
limit 10;

-- ============================================================
-- 5) (선택) DB에 직접 넣어서 테이블·CHECK 제약만 검증
--    아래 주석을 해제해 실행 → id 가 나오면 INSERT 자체는 됨.
--    테스트 행은 대시보드에서 삭제하거나 아래 DELETE 로 지우세요.
-- ============================================================
--
-- insert into public.reservations (type, customer_name, phone, pet_info, notes, status)
-- values ('grooming', 'SQL진단테스트', '01099998888', '테스트', '테스트메모', 'new')
-- returning id, created_at;
--
-- delete from public.reservations where customer_name = 'SQL진단테스트';

-- ============================================================
-- 예약 API(Vercel)가 여전히 실패할 때
-- ============================================================
-- • Vercel 환경 변수: SUPABASE_SERVICE_ROLE_KEY = service_role (secret),
--   anon 키를 잘못 넣으면 RLS 때문에 insert 가 막힐 수 있습니다.
-- • NEXT_PUBLIC_SUPABASE_URL 은 https://xxxx.supabase.co 만 (경로 /rest/v1 붙이지 않기)
-- • 브라우저에서 예약 시 네트워크 탭: POST /api/submit-reservation 의 status·응답 JSON 확인
