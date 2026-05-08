import { SignJWT } from "jose";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-cookie";
import { verifyAdminSessionEdge } from "@/lib/session-edge";

export function getSessionCookieName() {
  return ADMIN_SESSION_COOKIE;
}

function encodeSecret(): Uint8Array | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) return null;
  return new TextEncoder().encode(s);
}

function requireSecretForSign() {
  const enc = encodeSecret();
  if (!enc) {
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters");
  }
  return enc;
}

export async function signAdminSession() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(requireSecretForSign());
}

export const verifyAdminSession = verifyAdminSessionEdge;
