# AI·차기 작업자용 — 맥락 없이 이어받기

이 문서는 **채팅 기록이 없을 때** Cursor 등의 AI나 새 담당자가 프로젝트를 이해하도록 정리한 것입니다.  
**운영 체크리스트·환경 변수 상세**는 [`HANDOFF.md`](./HANDOFF.md)와 [`.env.example`](./.env.example)를 함께 보세요.

---

## 1. 이 프로젝트가 하는 일

- **브랜드:** 하얀 개 마을 (용인 애견 센터 — 분양·호텔·미용·간식·병원 안내 등)
- **형태:** Next.js 15(App Router) 기반 **마케팅·예약 접수·간단 CMS** 웹앱
- **주요 사용자:** 방문자(정보·예약·챗봇), 운영자(사전 오픈 게이트·`/admin` 대시보드)

---

## 2. 저장소·배포 (고정 정보)

| 항목 | 값 |
|------|-----|
| GitHub | `kimjunheegnc-a11y/whitedogvillage` |
| Next 앱 경로 | **`web/`** (저장소 루트가 아님) |
| Vercel | **Root Directory = `web`** |
| Supabase | 스키마·RLS·시드는 **`web/supabase/SUPABASE_ALL_IN_ONE.sql`** 한 파일 실행 |

로컬: `cd web && npm install && npm run dev`  
환경 점검: `npm run check-env` (비번까지: `npm run check-env -- '0000'`)

---

## 3. 담당자(오너) 성향 — 협업 시 참고

대화·요청 패턴에서 추출한 **작업 스타일**입니다 (개인 성격 전체가 아님).

- **언어:** 한국어로 설명·UI 문구를 다룸.
- **실행:** “직접 해 달라”는 쪽에 가깝고, 가능하면 **코드 수정·빌드·git push까지** 에이전트가 끝내길 기대함.
- **품질:** 실사용 수준을 원함 — 폼 **유효성(전화번호 형식 등)**, API 실패 시 **구체적인 힌트**, 어드민에서 **Supabase 조회 오류 표시**.
- **배포:** Vercel·Supabase 환경 변수를 자주 맞추는 편이며, **로컬 `.env.local`과 프로덕션 변수가 다르다**는 점에서 오는 이슈(예약만 안 됨 등)가 나올 수 있음.
- **디자인:** 핑크/악센트 계열, 모바일 하단 **전화·카카오 퀵바**, 우측 **챗봇**이 중요 UX.
- **연락 채널:** 카카오 상담 URL은 **`NEXT_PUBLIC_KAKAO_CHAT_URL`** (없으면 placeholder 링크).

---

## 4. 기획·정보 구조 (요약)

### 내비 순서 (`src/lib/constants.ts`의 `NAV`)

`홈 → 병원 → 미용 → 호텔 → 분양 → 간식 → 후기`

### 사전 오픈 게이트

- `SITE_GATE_PASSWORD`가 설정되어 있으면 미들웨어에서 입장 비밀번호 요구.
- 정식 오픈 시 **변수 삭제 또는 비우기**.

### 관리자 `/admin`

- **`ADMIN_PASSWORD`:** 입장 게이트와 같이 **평문** 가능 (우선 적용).
- **`ADMIN_PASSWORD_HASH`:** bcrypt 한 줄 (`npm run hash-password -- '비번'`). 둘 다 있으면 **평문이 우선**.
- **`ADMIN_SESSION_SECRET`:** 32자 이상.
- 대시보드: `content_blocks`, 갤러리(`media` 버킷), `reservations`, `inquiries`, `reviews` 편집.
- **Vercel에는 반드시** `SUPABASE_SERVICE_ROLE_KEY` + `NEXT_PUBLIC_SUPABASE_*` — 없으면 어드민·예약 API가 실패함.

### 예약·문의

- API: `POST /api/submit-reservation`, `POST /api/submit-inquiry` — 서버에서 **service role**로 Supabase insert.
- **`NEXT_PUBLIC_SUPABASE_URL`:** 반드시 `https://xxxx.supabase.co` **오리진만** (끝에 `/rest/v1` 붙이면 “Invalid path specified in request URL” 등 오류). 코드에서 `normalizeSupabaseProjectUrl()`로 보정함 (`src/lib/supabase/normalize-project-url.ts`).
- 클라이언트 검증·서버 truncate·전화 정규화: `src/lib/reservation-input.ts`.

### 챗봇 (`src/components/ChatbotWidget.tsx`)

- 흐름: 상담 분야 → 강아지/고양이 → (강아지면) 체급 → 나이 → 성별·중성화 → 보호자명·전화·아이 이름·희망일시·문의(최소 글자 수 등).
- 카카오 유도 문구 + 링크.
- 기타 문의는 별도 폼.

### 후기 `/reviews`

- DB `reviews` published 건 + **10건 미만이면** `src/lib/demo-reviews.ts`의 예시 후기로 패딩.
- 10건 이상이면 DB만 표시.

### 이미지

- 대부분 **`src/lib/stock-photos.ts`**의 Unsplash URL. **ID가 만료·404가 나면** 브라우저에서 깨짐 — 교체 시 `curl -I` 등으로 확인 권장.
- 분양 카드 데이터: `src/lib/adoption-puppies.ts` (이미지는 `stock` 참조로 통일).

### Google 캘린더

- `src/lib/google-calendar.ts` — OAuth 미설정이면 스킵. **insert 실패해도 예약 DB 저장은 유지**하도록 try/catch 처리됨.

---

## 5. 진행 상황 스냅샷 (대화·커밋 기준, 이후는 git log로 확인)

이미 반영된 것으로 알려진 범위:

- 사이트 게이트, 어드민 로그인(평문/해시), 대시보드·예약/문의 목록·오류 표시
- 챗봇 다단계 + 검증 + 카카오 CTA
- 예약 API 안정화(URL 정규화, 길이 제한, 전화 검증, 캘린더 실패 격리)
- 네비 순서, 후기 더미 패딩, 스톡 URL 정리, 분양 ‘솔’ 카드 이미지·브러싱 섹션 제거 등

**알 수 없는 부분은 git으로 추적:** `git log --oneline -30`

---

## 6. 코드 지도 (자주 건드리는 파일)

| 영역 | 경로 |
|------|------|
| 내비·사이트명·카카오 기본 | `src/lib/constants.ts` |
| 스톡 이미지 URL | `src/lib/stock-photos.ts` |
| Supabase URL 정규화 | `src/lib/supabase/normalize-project-url.ts` |
| 서버 Supabase(관리자·API) | `src/lib/supabase/admin.ts`, `server.ts` |
| 예약 API | `src/app/api/submit-reservation/route.ts` |
| 입력 검증 공용 | `src/lib/reservation-input.ts` |
| 챗봇 | `src/components/ChatbotWidget.tsx` |
| 미들웨어(게이트) | `src/middleware.ts` |
| DB 전체 스크립트 | `supabase/SUPABASE_ALL_IN_ONE.sql` |
| 예약 진단 SQL | `supabase/DIAGNOSTIC_RESERVATIONS.sql` |

---

## 7. 다음에 할 만한 일 (아이디어)

- 실제 **카카오 채널 URL**·**실촬영 사진**으로 교체 (`stock-photos` / `content_blocks`).
- 카카오 URL을 **CMS(`content_blocks`)**로 빼서 코드 배포 없이 변경.
- 후기: 더미 패딩 **옵션 플래그** 또는 “예시” 라벨 정책 정리.
- E2E·접근성 점검.

---

## 8. 문서 읽는 순서 (추천)

1. **이 파일** (`AI_CONTEXT.md`) — 맥락·기획·성향  
2. [`HANDOFF.md`](./HANDOFF.md) — SQL, SMTP, Calendar, 빌드 주의  
3. [`.env.example`](./.env.example) — 변수 목록  

질문이 “운영/키/배포”면 `HANDOFF.md`를, “왜 이렇게 짰는지/사람 취향”이면 이 파일을 우선하세요.
