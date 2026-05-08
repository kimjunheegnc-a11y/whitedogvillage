import { createServerSupabase } from "@/lib/supabase/server";

export async function loadContentMap(): Promise<Record<string, unknown>> {
  try {
    const sb = await createServerSupabase();
    const { data, error } = await sb.from("content_blocks").select("key, value");
    if (error || !data) return {};
    const out: Record<string, unknown> = {};
    for (const row of data) {
      out[row.key as string] = row.value;
    }
    return out;
  } catch {
    return {};
  }
}

export async function loadMediaGallery() {
  try {
    const sb = await createServerSupabase();
    const { data, error } = await sb
      .from("media_assets")
      .select("*")
      .order("sort_order", { ascending: true })
      .limit(12);
    if (error || !data) return [];
    return data as { id: string; path: string; alt: string | null; sort_order: number }[];
  } catch {
    return [];
  }
}

export async function loadPublishedReviews() {
  try {
    const sb = await createServerSupabase();
    const { data, error } = await sb
      .from("reviews")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error || !data) return [];
    return data as {
      id: string;
      title: string | null;
      body: string;
      rating: number | null;
      created_at: string;
    }[];
  } catch {
    return [];
  }
}
