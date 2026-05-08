import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-cookie";
import {
  looksLikeBcryptHash,
  normalizeAdminPasswordHash,
  normalizeAdminPlainPassword,
} from "@/lib/admin-password-hash";
import { signAdminSession } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const plainExpected = normalizeAdminPlainPassword(process.env.ADMIN_PASSWORD);
  const hash = normalizeAdminPasswordHash(process.env.ADMIN_PASSWORD_HASH);

  if (!plainExpected && !hash) {
    return NextResponse.json(
      {
        error: "관리자 비밀번호가 설정되지 않았습니다",
        hint:
          "입장 게이트처럼 평문을 쓰려면 Vercel 등에 `ADMIN_PASSWORD`(예: 0000)를 넣으세요. bcrypt 를 쓰려면 `ADMIN_PASSWORD_HASH`에 `npm run hash-password` 출력 한 줄을 넣으세요. 둘 중 하나만 있으면 됩니다. `ADMIN_PASSWORD`가 있으면 평문이 우선합니다.",
      },
      { status: 500 }
    );
  }

  if (!plainExpected && hash && !looksLikeBcryptHash(hash)) {
    return NextResponse.json(
      {
        error: "ADMIN_PASSWORD_HASH 형식 오류",
        hint:
          "평문은 `ADMIN_PASSWORD`에 두세요. bcrypt 를 쓸 때만 `ADMIN_PASSWORD_HASH`에 `npm run hash-password` 출력 `$2b$10$...` 한 줄을 넣습니다.",
      },
      { status: 500 }
    );
  }

  const password = String(body.password ?? "").trim();
  const ok = plainExpected
    ? password === plainExpected
    : bcrypt.compareSync(password, hash!);
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
