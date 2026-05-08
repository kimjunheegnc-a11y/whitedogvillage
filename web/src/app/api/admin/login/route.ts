import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-cookie";
import { normalizeAdminPasswordHash } from "@/lib/admin-password-hash";
import { signAdminSession } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const hash = normalizeAdminPasswordHash(process.env.ADMIN_PASSWORD_HASH);
  if (!hash) {
    return NextResponse.json(
      {
        error: "ADMIN_PASSWORD_HASH not configured",
        hint:
          "배포 환경(Vercel 등)에 환경 변수 ADMIN_PASSWORD_HASH 가 없습니다. Vercel → 해당 프로젝트 → Settings → Environment Variables 에 이름을 정확히 ADMIN_PASSWORD_HASH 로 추가하고, 값은 npm run hash-password 로 만든 bcrypt 한 줄을 넣은 뒤 Redeploy 하세요. Production·Preview 둘 다에 넣었는지 확인하세요.",
      },
      { status: 500 }
    );
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
    return NextResponse.json(
      {
        error: "세션 설정 오류 (ADMIN_SESSION_SECRET)",
        hint:
          "Vercel 환경 변수 ADMIN_SESSION_SECRET 이 없거나 32자 미만입니다. 임의의 긴 문자열(32자 이상)을 넣고 다시 배포하세요.",
      },
      { status: 500 }
    );
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
