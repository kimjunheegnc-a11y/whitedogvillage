import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-cookie";
import { verifyAdminSessionEdge } from "@/lib/session-edge";
import { SITE_GATE_COOKIE } from "@/lib/site-gate-cookie";
import { verifySiteGateToken } from "@/lib/site-gate-token";

/** /public 정적 파일 등 — 게이트 없이 통과 */
const STATIC_EXT = /\.(ico|png|jpe?g|svg|webp|gif|woff2?|ttf|eot|json|xml|txt)$/i;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next/static") || pathname.startsWith("/_next/image")) {
    return NextResponse.next();
  }
  if (pathname === "/favicon.ico" || pathname === "/robots.txt" || pathname === "/sitemap.xml") {
    return NextResponse.next();
  }
  if (STATIC_EXT.test(pathname)) {
    return NextResponse.next();
  }
  if (pathname === "/gate" || pathname.startsWith("/api/site-gate")) {
    return NextResponse.next();
  }

  const gatePassword = process.env.SITE_GATE_PASSWORD?.trim();
  if (gatePassword) {
    const gateOk = await verifySiteGateToken(req.cookies.get(SITE_GATE_COOKIE)?.value);
    if (!gateOk) {
      const u = new URL("/gate", req.url);
      u.searchParams.set("next", `${pathname}${req.nextUrl.search}`);
      return NextResponse.redirect(u);
    }
  }

  if (pathname.startsWith("/admin/dashboard")) {
    const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const ok = await verifyAdminSessionEdge(token);
    if (!ok) {
      const u = new URL("/admin", req.url);
      u.searchParams.set("next", req.nextUrl.pathname);
      return NextResponse.redirect(u);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
