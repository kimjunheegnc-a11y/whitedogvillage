import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { sendOwnerEmail } from "@/lib/mail";
import { createReservationCalendarEvent } from "@/lib/google-calendar";
import {
  isLikelyKoreanPhone,
  normalizeKoreanPhone,
  RESERVATION_LIMITS,
  supabaseUserHint,
  truncate,
} from "@/lib/reservation-input";

const bodySchema = z
  .object({
    type: z.enum(["adoption", "hotel", "grooming"]),
    customer_name: z.string().min(1).max(RESERVATION_LIMITS.customerNameMax),
    phone: z.string().min(1).max(80),
    pet_info: z.string().max(8000).optional().default(""),
    preferred_at: z.union([z.string(), z.null()]).optional(),
    notes: z.string().max(20000).optional().default(""),
  })
  .transform((b) => ({
    type: b.type,
    customer_name: b.customer_name.trim(),
    phone: normalizeKoreanPhone(b.phone),
    pet_info: truncate(b.pet_info.trim(), RESERVATION_LIMITS.petInfoMax),
    notes: truncate(b.notes.trim(), RESERVATION_LIMITS.notesMax),
    preferred_at: b.preferred_at,
  }))
  .superRefine((b, ctx) => {
    if (b.customer_name.length < 2) {
      ctx.addIssue({ code: "custom", path: ["customer_name"], message: "이름은 2글자 이상 입력해 주세요." });
    }
    if (b.phone.length < 9 || !isLikelyKoreanPhone(b.phone)) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "전화번호 형식을 확인해 주세요. (예: 010-1234-5678)",
      });
    }
    if (b.phone.length > RESERVATION_LIMITS.phoneDigitsMax) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "전화번호가 너무 깁니다." });
    }
  });

function zodIssuesToMessage(err: z.ZodError): string {
  return err.issues.map((i) => i.message).filter(Boolean).join(" ") || "입력을 확인해 주세요.";
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: zodIssuesToMessage(parsed.error) }, { status: 400 });
  }

  const b = parsed.data;
  let preferredAt: string | null = null;
  if (b.preferred_at && typeof b.preferred_at === "string" && b.preferred_at.trim()) {
    const d = new Date(b.preferred_at);
    if (!Number.isNaN(d.getTime())) preferredAt = d.toISOString();
  }

  let supabase;
  try {
    supabase = createAdminSupabase();
  } catch {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const { data: rows, error } = await supabase
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
    .select("id");

  if (error) {
    console.error("[submit-reservation]", error);
    return NextResponse.json(
      {
        error: "저장에 실패했습니다.",
        hint: supabaseUserHint(error.code, error.message ?? ""),
        code: error.code,
      },
      { status: 500 }
    );
  }

  const row = rows?.[0];
  if (!row?.id) {
    console.error("[submit-reservation] no row after insert", rows);
    return NextResponse.json(
      {
        error: "저장에 실패했습니다.",
        hint: "DB에 행이 생성되지 않았습니다. Supabase 연결·테이블(reservations)을 확인해 주세요.",
        code: "NO_ROW",
      },
      { status: 500 }
    );
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
      await supabase.from("reservations").update({ calendar_event_id: cal.eventId }).eq("id", row.id);
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
