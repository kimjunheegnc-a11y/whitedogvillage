import { jwtVerify } from "jose";

function encodeSecret(): Uint8Array | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) return null;
  return new TextEncoder().encode(s);
}

/** HS256 verify only — middleware에서 사용 (SignJWT 미포함). */
export async function verifyAdminSessionEdge(token: string | undefined) {
  const secret = encodeSecret();
  if (!secret || !token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "admin") return null;
    return payload;
  } catch {
    return null;
  }
}
