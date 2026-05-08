/**
 * Supabase JS 클라이언트는 프로젝트 루트만 필요합니다.
 * 환경 변수에 `/rest/v1` 등이 붙어 있으면 요청 URL이 꼬여
 * "Invalid path specified in request URL" 오류가 날 수 있습니다.
 */
export function normalizeSupabaseProjectUrl(raw: string | undefined): string {
  if (!raw?.trim()) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }
  let u = raw.trim();
  if ((u.startsWith('"') && u.endsWith('"')) || (u.startsWith("'") && u.endsWith("'"))) {
    u = u.slice(1, -1).trim();
  }
  const parsed = new URL(u);
  if (!parsed.hostname) {
    throw new Error("Invalid NEXT_PUBLIC_SUPABASE_URL");
  }
  if (parsed.hostname.endsWith("supabase.co")) {
    return parsed.origin;
  }
  const path = parsed.pathname.replace(/\/+$/, "");
  return path ? `${parsed.origin}${path}` : parsed.origin;
}
