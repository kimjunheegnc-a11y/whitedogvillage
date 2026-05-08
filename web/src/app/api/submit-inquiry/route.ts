import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { sendOwnerEmail } from "@/lib/mail";
import {
  isLikelyKoreanPhone,
  normalizeKoreanPhone,
  RESERVATION_LIMITS,
  supabaseUserHint,
  truncate,
} from "@/lib/reservation-input";

const INQUIRY_MSG_MAX = 5000;

const bodySchema = z
  .object({
    category: z.string().min(1).max(80),
    name: z.string().min(1).max(100),
    phone: z.string().min(1).max(80),
    message: z.string().min(1).max(20000),
  })
  .transform((b) => ({
    category: b.category.trim(),
    name: b.name.trim(),
    phone: normalizeKoreanPhone(b.phone),
    message: truncate(b.message.trim(), INQUIRY_MSG_MAX),
  }))
  .superRefine((b, ctx) => {
    if (b.name.length < 2) {
      ctx.addIssue({ code: "custom", path: ["name"], message: "이름은 2글자 이상 입력해 주세요." });
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
    if (b.message.length < 5) {
      ctx.addIssue({ code: "custom", path: ["message"], message: "문의 내용은 5글자 이상 입력해 주세요." });
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

  let supabase;
  try {
    supabase = createAdminSupabase();
  } catch {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const b = parsed.data;
  const { data: rows, error } = await supabase
    .from("inquiries")
    .insert({
      category: b.category,
      name: b.name,
      phone: b.phone,
      message: b.message,
    })
    .select("id");

  if (error) {
    console.error("[submit-inquiry]", error);
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
    return NextResponse.json(
      {
        error: "저장에 실패했습니다.",
        hint: "DB에 행이 생성되지 않았습니다. inquiries 테이블·Supabase 설정을 확인해 주세요.",
        code: "NO_ROW",
      },
      { status: 500 }
    );
  }

  try {
    await sendOwnerEmail(
      `[하얀 개 마을] 문의 접수 — ${b.category}`,
      [`이름: ${b.name}`, `연락처: ${b.phone}`, `내용:\n${b.message}`, `DB id: ${row.id}`].join("\n")
    );
  } catch (e) {
    console.error("[submit-inquiry] mail", e);
  }

  return NextResponse.json({ ok: true, id: row.id });
}
