# 하얀 개 마을 마케팅 / 웹사이트

Next.js 앱은 **`web/`** 디렉터리에 있습니다.

## 빠른 시작

```bash
cd web
# .env.local 이 없을 때만 (있으면 건너뜀)
npm run setup-env
# 키를 채운 뒤 점검 — 비밀번호까지 확인: npm run check-env -- '0000'
npm run check-env
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) — 관리자: [http://localhost:3000/admin](http://localhost:3000/admin)

Supabase DB는 **`web/supabase/SUPABASE_ALL_IN_ONE.sql`** 파일 하나를 SQL Editor에 붙여넣어 실행하면 됩니다. 이후 운영 체크는 **`web/HANDOFF.md`**를 따르세요.

## GitHub · Vercel

원격 저장소: [kimjunheegnc-a11y/whitedogvillage](https://github.com/kimjunheegnc-a11y/whitedogvillage)

**최초 업로드(이미 로컬에 코드가 있을 때)** — 저장소 루트(`web`의 상위 폴더)에서:

```bash
git init
git remote add origin https://github.com/kimjunheegnc-a11y/whitedogvillage.git
git add -A
git commit -m "Initial commit: 하얀 개 마을 Next.js"
git branch -M main
git push -u origin main
```

GitHub 인증이 필요합니다. [GitHub CLI](https://cli.github.com) `gh auth login` 후 다시 푸시하거나, SSH를 쓰려면 `git remote set-url origin git@github.com:kimjunheegnc-a11y/whitedogvillage.git` 로 바꾼 뒤 푸시하세요.

**다른 PC**에서는 `git clone https://github.com/kimjunheegnc-a11y/whitedogvillage.git` 후 `cd web && npm install` 하면 됩니다.

**Vercel**

1. [Vercel](https://vercel.com) → New Project → 위 GitHub 저장소 Import
2. **Root Directory**를 `web`으로 설정 (프로젝트 루트가 아니라 `web` 폴더가 Next 앱)
3. Environment Variables에 `web/.env.example`에 나온 변수를 넣되, 로컬 전용 값은 Vercel에 복사:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`
   - 필요 시 `OWNER_EMAIL`, `SMTP_*`, `GOOGLE_*`, `NEXT_PUBLIC_APP_URL`(프로덕션 도메인)
4. bcrypt 해시는 Vercel UI에 그대로 `$2b$10$...` 형태로 붙여넣어도 됩니다(로컬 `.env.local`처럼 `\$` 이스케이프 불필요).
5. Deploy — 이후 `main` 푸시마다 자동 배포
