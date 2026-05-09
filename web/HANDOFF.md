# 하얀 개 마을 웹 — 운영·연동 체크리스트

**AI·인수인계:** 맥락·기획·담당자 작업 성향은 먼저 [`AI_CONTEXT.md`](./AI_CONTEXT.md)를 읽으세요. 이 파일은 **환경·SQL·배포** 위주입니다.

프로젝트 코드는 `web/` 폴더에 있습니다. 로컬 실행: `cd web && npm install && npm run dev`

로컬에서 환경만 점검할 때: `cd web && npm run check-env` (`.env.local` 없으면 `npm run setup-env` 또는 `cp .env.example .env.local`)

## 1. 환경 변수 (`.env.local`)

`web/.env.example`을 복사해 `.env.local`을 만들고 값을 채웁니다.

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL — **`https://프로젝트.supabase.co` 만** (끝에 `/rest/v1` 등 경로 붙이지 말 것. 코드가 오리진으로 정규화하지만 원본을 맞추는 것이 안전) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon 키 (공개 클라이언트용) |
| `SUPABASE_SERVICE_ROLE_KEY` | **서버 전용** service role 키. Git/브라우저에 노출 금지. |
| `ADMIN_PASSWORD` | (선택) 관리자 **평문** 비밀번호. 입장 게이트 `SITE_GATE_PASSWORD`와 같은 방식. 있으면 bcrypt보다 **우선**. |
| `ADMIN_PASSWORD_HASH` | (선택) bcrypt 해시. 생성: `cd web && npm run hash-password -- '원하는비밀번호'` |
| `ADMIN_SESSION_SECRET` | **32자 이상** 임의 문자열 (세션 JWT 서명) |
| `NEXT_PUBLIC_KAKAO_CHAT_URL` | (선택) 카카오 채널 채팅 URL. 챗봇·헤더·예약 링크에 사용. 비우면 placeholder |
| `OWNER_EMAIL` | 예약·문의 알림을 받을 사장님 이메일 |
| `SMTP_*` | 이메일 발송용 (비우면 메일 단계는 스킵되고 콘솔에 경고만 출력) |
| `GOOGLE_*` | 캘린더 연동 (비우면 일정 생성 스킵; 실패해도 예약 DB insert는 유지됨) |

## 2. Supabase SQL (한 파일만 실행)

Supabase 대시보드 → **SQL Editor** → New query → 아래 파일 **전체**를 복사해 붙여넣고 **Run** 하세요.

- **파일:** [`web/supabase/SUPABASE_ALL_IN_ONE.sql`](web/supabase/SUPABASE_ALL_IN_ONE.sql)

포함 내용: 테이블(`content_blocks`, `media_assets`, `reservations`, `inquiries`, `reviews`), 타입, Storage 버킷 `media`, RLS 정책, 초기 문구 시드.

실행 후 **Project Settings → API**에서 `service_role` 키를 복사해 `SUPABASE_SERVICE_ROLE_KEY`에 넣습니다.

> 참고: `migrations/001_initial.sql`은 동일 스키마의 분할본입니다. **새로 셋업할 때는 `SUPABASE_ALL_IN_ONE.sql`만** 쓰면 됩니다.

예약이 어드민에 안 보일 때: [`web/supabase/DIAGNOSTIC_RESERVATIONS.sql`](web/supabase/DIAGNOSTIC_RESERVATIONS.sql) 을 SQL Editor에서 실행하세요.  
**`inquiry_count`는 문의 테이블**이고, **예약은 `reservation_count`·`reservations` 최근 행**을 보세요.

## 3. 관리자 비밀번호

**평문:** Vercel·로컬에 `ADMIN_PASSWORD=원하는비번` (입장 게이트와 동일한 운영 방식)

**bcrypt:** 터미널에서 `npm run hash-password -- '새비밀번호'` → 출력 한 줄을 `ADMIN_PASSWORD_HASH`에 넣기.

둘 다 있으면 **`ADMIN_PASSWORD`가 우선**입니다.

**Vercel:** bcrypt는 터미널 출력 그대로 `$2b$10$...`만 넣습니다. **앞뒤 따옴표 없이**, 로컬용 `\$` 이스케이프는 Vercel에는 불필요합니다. `ADMIN_SESSION_SECRET`은 **32자 이상**인지 함께 확인하세요.

## 4. 카카오톡 버튼 URL

**권장:** 환경 변수 `NEXT_PUBLIC_KAKAO_CHAT_URL` 에 실제 채널 채팅 URL.

코드 폴백: `web/src/lib/constants.ts`의 `KAKAO_PLACEHOLDER_HREF` (미설정 시 `#`).

## 5. Google Calendar (선택)

1. Google Cloud Console에서 프로젝트 생성 → **Google Calendar API** 활성화  
2. OAuth 클라이언트 (웹) 생성  
3. **승인된 리디렉트 URI**에 로컬/배포 URL 등록 (예: `http://localhost:3000` — 본 프로젝트는 OAuth UI 없이 **refresh_token을 수동으로 발급**해 넣는 방식을 권장합니다. [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)에서 Calendar v3 스코프로 토큰을 받아 refresh_token을 `GOOGLE_REFRESH_TOKEN`에 저장)  
4. `.env.local`에 `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, `GOOGLE_CALENDAR_ID`(기본 `primary`) 설정  

비워 두면 예약은 DB에만 저장되고 캘린더 단계는 건너뜁니다.

## 6. 이메일 알림 (선택)

SMTP 변수를 채우면 예약·문의 시 `OWNER_EMAIL`로 메일이 발송됩니다. 비우면 발송을 건너뜁니다.

## 7. 빌드·경로 참고

- 상위 폴더 이름에 한글이 포함되면 **Turbopack 빌드가 실패**할 수 있어, 본 프로젝트는 `package.json`에서 `next dev` / `next build`를 **webpack 모드**로 두었습니다.
- 배포 시 다른 경로로 옮기면 Turbopack을 다시 켤 수 있습니다.
- `next build` 시 상위 디렉터리에 다른 `package-lock.json`이 있으면 경고가 날 수 있습니다. 필요 시 `next.config.ts`의 `outputFileTracingRoot`를 조정하세요.

## 8. 즉시 알림 요약

예약/문의 제출 → Next API가 Supabase에 insert → 같은 요청에서 **이메일** + **구글 캘린더 일정**을 시도하고, 관리자 대시보드에서 동일 데이터를 확인합니다.
