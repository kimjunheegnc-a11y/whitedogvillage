/**
 * ADMIN_PASSWORD(평문) 정규화 — SITE_GATE_PASSWORD 와 같은 방식으로 env 에 넣기 위함.
 */
export function normalizeAdminPlainPassword(raw: string | undefined): string | null {
  if (!raw) return null;
  let s = raw
    .replace(/^\uFEFF/, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\r/g, "")
    .trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s.length > 0 ? s : null;
}

/**
 * ADMIN_PASSWORD_HASH 정규화.
 * - 로컬 `.env.local`은 Next dotenv-expand 때문에 `\$2b\$10\$...` 형태일 수 있음.
 * - Vercel UI에는 `$2b$10$...` 그대로 넣는 것이 맞고, 실수로 `\$` 또는 따옴표가 들어간 경우를 보정.
 */
export function normalizeAdminPasswordHash(raw: string | undefined): string | null {
  if (!raw) return null;
  let h = raw
    .replace(/^\uFEFF/, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\r/g, "")
    .trim();
  if (
    (h.startsWith('"') && h.endsWith('"')) ||
    (h.startsWith("'") && h.endsWith("'"))
  ) {
    h = h.slice(1, -1).trim();
  }
  if (h.includes("\\$")) {
    h = h.replace(/\\\$/g, "$");
  }
  return h.length > 0 ? h : null;
}

/** bcrypt 해시 한 줄인지 (평문 0000 을 잘못 넣은 경우 구분) */
export function looksLikeBcryptHash(s: string): boolean {
  return /^\$2[aby]\$\d{2}\$/.test(s) && s.length >= 20;
}

