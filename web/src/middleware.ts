import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-cookie";
import { verifyAdminSessionEdge } from "@/lib/session-edge";

export async function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin/dashboard")) {
    return NextResponse.next();
  }
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const ok = await verifyAdminSessionEdge(token);
  if (!ok) {
    const u = new URL("/admin", req.url);
    u.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(u);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
