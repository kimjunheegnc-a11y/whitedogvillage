import { createBrowserClient } from "@supabase/ssr";
import { normalizeSupabaseProjectUrl } from "@/lib/supabase/normalize-project-url";

export function createBrowserSupabase() {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  const url = normalizeSupabaseProjectUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  return createBrowserClient(url, key);
}
