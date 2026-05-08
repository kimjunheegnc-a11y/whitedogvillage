import { normalizeSupabaseProjectUrl } from "@/lib/supabase/normalize-project-url";

export function publicMediaUrl(path: string) {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!raw?.trim()) return "";
  try {
    const base = normalizeSupabaseProjectUrl(raw);
    return `${base}/storage/v1/object/public/media/${encodeURI(path)}`;
  } catch {
    return "";
  }
}
