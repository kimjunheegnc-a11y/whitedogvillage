import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { sendOwnerEmail } from "@/lib/mail";
import { createReservationCalendarEvent } from "@/lib/google-calendar";

const bodySchema = z.object({
  type: z.enum(["adoption", "hotel", "grooming"]),
  customer_name: z.string().min(1).max(100),
  phone: z.string().min(1).max(40),
  pet_info: z.string().max(500).optional().default(""),
  preferred_at: z.string().max(40).optional().nullable(),
  notes: z.string().max(2000).optional().default(""),
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

  const b = parsed.data;
  let preferredAt: string | null = null;
  if (b.preferred_at) {
    const d = new Date(b.preferred_at);
    if (!Number.isNaN(d.getTime())) preferredAt = d.toISOString();
  }

  let supabase;
  try {
    supabase = createAdminSupabase();
  } catch {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const { data: row, error } = await supabase
    .from("reservations")
    .insert({
      type: b.type,
      customer_name: b.customer_name,
      phone: b.phone,
      pet_info: b.pet_info,
      preferred_at: preferredAt,
      notes: b.notes,
      status: "new",
    })
    .select("id")
    .single();

  if (error) {
    console.error("[submit-reservation]", error);
    return NextResponse.json({ error: "저장에 실패했습니다." }, { status: 500 });
  }

  const typeLabel =
    b.type === "adoption" ? "분양" : b.type === "hotel" ? "호텔" : "미용";
  const start = preferredAt ? new Date(preferredAt) : new Date();
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  try {
    const mail = await sendOwnerEmail(
      `[하얀 개 마을] ${typeLabel} 예약 접수`,
      [
        `유형: ${typeLabel}`,
        `이름: ${b.customer_name}`,
        `연락처: ${b.phone}`,
        `반려 정보: ${b.pet_info || "-"}`,
        `희망 일시: ${preferredAt ?? "미입력"}`,
        `요청: ${b.notes || "-"}`,
        `DB id: ${row.id}`,
      ].join("\n")
    );

    const cal = await createReservationCalendarEvent({
      title: `[하얀개마을] ${typeLabel} — ${b.customer_name}`,
      description: `연락처: ${b.phone}\n${b.notes || ""}\n예약 id: ${row.id}`,
      start,
      end,
    });

    if (cal.eventId) {
      await supabase
        .from("reservations")
        .update({ calendar_event_id: cal.eventId })
        .eq("id", row.id);
    }

    if (mail.skipped) {
      console.warn("[submit-reservation] email skipped (SMTP not set)");
    }
    if (cal.skipped) {
      console.warn("[submit-reservation] calendar skipped (Google not set)");
    }
  } catch (e) {
    console.error("[submit-reservation] notify error", e);
  }

  return NextResponse.json({ ok: true, id: row.id });
}
