import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-cookie";
import { verifyAdminSessionEdge } from "@/lib/session-edge";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await verifyAdminSessionEdge(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  let supabase;
  try {
    supabase = createAdminSupabase();
  } catch {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await supabase.storage.from("media").upload(path, buf, {
    contentType: file.type || "application/octet-stream",
    upsert: true,
  });
  if (upErr) {
    console.error(upErr);
    return NextResponse.json({ error: "업로드 실패" }, { status: 500 });
  }

  const { error: dbErr } = await supabase.from("media_assets").insert({
    path,
    alt: String(form.get("alt") ?? ""),
    sort_order: Number(form.get("sort_order") ?? 0) || 0,
  });
  if (dbErr) {
    console.error(dbErr);
    return NextResponse.json({ error: "DB 기록 실패" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, path });
}
