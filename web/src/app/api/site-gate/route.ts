import { NextResponse } from "next/server";
import { SITE_GATE_COOKIE } from "@/lib/site-gate-cookie";
import { signSiteGateToken } from "@/lib/site-gate-token";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const expected = process.env.SITE_GATE_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: "입장 게이트가 비활성화되어 있습니다." }, { status: 400 });
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const password = String(body.password ?? "").trim();
  if (password !== expected) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const token = await signSiteGateToken();
  if (!token) {
    return NextResponse.json({ error: "ADMIN_SESSION_SECRET(32자 이상)이 필요합니다." }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SITE_GATE_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
