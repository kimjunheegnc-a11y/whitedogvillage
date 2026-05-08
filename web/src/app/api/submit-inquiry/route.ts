import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { sendOwnerEmail } from "@/lib/mail";

const bodySchema = z.object({
  category: z.string().min(1).max(80),
  name: z.string().min(1).max(100),
  phone: z.string().min(1).max(40),
  message: z.string().min(1).max(5000),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createAdminSupabase();
  } catch {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const b = parsed.data;
  const { data: row, error } = await supabase
    .from("inquiries")
    .insert({
      category: b.category,
      name: b.name,
      phone: b.phone,
      message: b.message,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[submit-inquiry]", error);
    return NextResponse.json({ error: "저장에 실패했습니다." }, { status: 500 });
  }

  try {
    await sendOwnerEmail(
      `[하얀 개 마을] 문의 접수 — ${b.category}`,
      [`이름: ${b.name}`, `연락처: ${b.phone}`, `내용:\n${b.message}`, `DB id: ${row.id}`].join(
        "\n"
      )
    );
  } catch (e) {
    console.error("[submit-inquiry] mail", e);
  }

  return NextResponse.json({ ok: true, id: row.id });
}
