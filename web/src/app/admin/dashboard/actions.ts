"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getSessionCookieName, verifyAdminSession } from "@/lib/session";
import { createAdminSupabase } from "@/lib/supabase/admin";

async function requireAdminSb() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  if (!(await verifyAdminSession(token))) {
    throw new Error("Unauthorized");
  }
  return createAdminSupabase();
}

function revalidatePublic() {
  revalidatePath("/", "layout");
  revalidatePath("/bunyang");
  revalidatePath("/hotel");
  revalidatePath("/grooming");
  revalidatePath("/hospital");
  revalidatePath("/snacks");
  revalidatePath("/reviews");
}

export async function upsertContentBlock(key: string, value: unknown) {
  const sb = await requireAdminSb();
  const { error } = await sb.from("content_blocks").upsert(
    {
      key,
      value,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" }
  );
  if (error) throw new Error(error.message);
  revalidatePublic();
}

export async function saveHeroBadges(formData: FormData) {
  const sb = await requireAdminSb();
  const raw = String(formData.get("hero_badges") ?? "");
  const items = raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.startsWith("#") ? s : `#${s}`));
  const { error } = await sb.from("content_blocks").upsert(
    {
      key: "hero_badges",
      value: items,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" }
  );
  if (error) throw new Error(error.message);
  revalidatePublic();
}

const ALLOWED_TEXT_KEYS = new Set([
  "hero_title",
  "hero_subtitle",
  "contact_address",
  "contact_hours",
  "phone",
  "page_bunyang_intro",
  "page_hotel_intro",
  "page_grooming_intro",
  "page_hospital_intro",
  "page_snacks_intro",
]);

export async function saveContentFromForm(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  const value = String(formData.get("value") ?? "");
  if (!ALLOWED_TEXT_KEYS.has(key)) throw new Error("허용되지 않은 키입니다.");
  await upsertContentBlock(key, value);
}

export async function deleteMediaAsset(id: string) {
  const sb = await requireAdminSb();
  const { data: row } = await sb.from("media_assets").select("path").eq("id", id).maybeSingle();
  if (row?.path) {
    await sb.storage.from("media").remove([row.path]);
  }
  const { error } = await sb.from("media_assets").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
  revalidatePublic();
}

export async function upsertReview(formData: FormData) {
  const sb = await requireAdminSb();
  const id = (formData.get("id") as string) || "";
  const title = String(formData.get("title") ?? "");
  const body = String(formData.get("body") ?? "");
  const rating = Number(formData.get("rating") ?? 5);
  const published = formData.get("published") === "on" || formData.get("published") === "true";
  const sort_order = Number(formData.get("sort_order") ?? 0) || 0;
  if (!body.trim()) throw new Error("본문을 입력하세요.");

  if (id) {
    const { error } = await sb
      .from("reviews")
      .update({ title, body, rating, published, sort_order })
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await sb.from("reviews").insert({
      title,
      body,
      rating,
      published,
      sort_order,
    });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/reviews");
  revalidatePath("/admin/dashboard");
}

export async function deleteReview(id: string) {
  const sb = await requireAdminSb();
  const { error } = await sb.from("reviews").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/reviews");
  revalidatePath("/admin/dashboard");
}

export async function updateReservationStatus(id: string, status: string) {
  const sb = await requireAdminSb();
  const { error } = await sb.from("reservations").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
}

export async function updateReservationFromForm(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !status) throw new Error("잘못된 요청");
  await updateReservationStatus(id, status);
}
