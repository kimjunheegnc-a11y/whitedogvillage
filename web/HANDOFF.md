# 하얀 개 마을 웹 — 운영·연동 체크리스트

프로젝트 코드는 `web/` 폴더에 있습니다. 로컬 실행: `cd web && npm install && npm run dev`

## 1. 환경 변수 (`.env.local`)

`web/.env.example`을 복사해 `.env.local`을 만들고 값을 채웁니다.

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon 키 (공개 클라이언트용) |
| `SUPABASE_SERVICE_ROLE_KEY` | **서버 전용** service role 키. Git/브라우저에 노출 금지. |
| `ADMIN_PASSWORD_HASH` | 관리자 비밀번호 bcrypt 해시. 생성: `cd web && npm run hash-password -- '원하는비밀번호'` |
| `ADMIN_SESSION_SECRET` | **32자 이상** 임의 문자열 (세션 JWT 서명) |
| `OWNER_EMAIL` | 예약·문의 알림을 받을 사장님 이메일 |
| `SMTP_*` | 이메일 발송용 (비우면 메일 단계는 스킵되고 콘솔에 경고만 출력) |
| `GOOGLE_*` | 캘린더 연동 (비우면 일정 생성 스킵) |

## 2. Supabase SQL (한 파일만 실행)

Supabase 대시보드 → **SQL Editor** → New query → 아래 파일 **전체**를 복사해 붙여넣고 **Run** 하세요.

- **파일:** [`web/supabase/SUPABASE_ALL_IN_ONE.sql`](web/supabase/SUPABASE_ALL_IN_ONE.sql)

포함 내용: 테이블(`content_blocks`, `media_assets`, `reservations`, `inquiries`, `reviews`), 타입, Storage 버킷 `media`, RLS 정책, 초기 문구 시드.

실행 후 **Project Settings → API**에서 `service_role` 키를 복사해 `SUPABASE_SERVICE_ROLE_KEY`에 넣습니다.

> 참고: `migrations/001_initial.sql`은 동일 스키마의 분할본입니다. **새로 셋업할 때는 `SUPABASE_ALL_IN_ONE.sql`만** 쓰면 됩니다.

## 3. 관리자 비밀번호 변경

1. 터미널에서 `npm run hash-password -- '새비밀번호'`
2. 출력된 해시를 `ADMIN_PASSWORD_HASH`에 붙여넣기
3. 서버 재시작

## 4. 카카오톡 버튼 URL

준비되면 `web/src/lib/constants.ts`의 `KAKAO_PLACEHOLDER_HREF`를 실제 채널 채팅 URL로 바꾸거나, 관리자에서 별도 필드를 두고 싶으면 `content_blocks`에 키를 추가해 연동할 수 있습니다.

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
