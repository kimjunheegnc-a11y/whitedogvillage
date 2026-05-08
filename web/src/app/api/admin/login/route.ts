import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-cookie";
import { normalizeAdminPasswordHash } from "@/lib/admin-password-hash";
import { signAdminSession } from "@/lib/session";

export async function POST(req: Request) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const hash = normalizeAdminPasswordHash(process.env.ADMIN_PASSWORD_HASH);
  if (!hash) {
    return NextResponse.json({ error: "ADMIN_PASSWORD_HASH not configured" }, { status: 500 });
  }

  const password = String(body.password ?? "").trim();
  const ok = bcrypt.compareSync(password, hash);
  if (!ok) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  let token: string;
  try {
    token = await signAdminSession();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "세션 설정 오류 (ADMIN_SESSION_SECRET)" }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
