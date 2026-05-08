/**
 * ADMIN_PASSWORD_HASH 정규화.
 * - 로컬 `.env.local`은 Next dotenv-expand 때문에 `\$2b\$10\$...` 형태일 수 있음.
 * - Vercel UI에는 `$2b$10$...` 그대로 넣는 것이 맞고, 실수로 `\$` 또는 따옴표가 들어간 경우를 보정.
 */
export function normalizeAdminPasswordHash(raw: string | undefined): string | null {
  if (!raw) return null;
  let h = raw.replace(/^\uFEFF/, "").trim();
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
