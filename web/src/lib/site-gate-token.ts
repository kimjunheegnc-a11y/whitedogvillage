import { SignJWT, jwtVerify } from "jose";

function secretKey(): Uint8Array | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) return null;
  return new TextEncoder().encode(s);
}

export async function signSiteGateToken(): Promise<string | null> {
  const key = secretKey();
  if (!key) return null;
  return new SignJWT({ site_gate: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(key);
}

export async function verifySiteGateToken(token: string | undefined): Promise<boolean> {
  const key = secretKey();
  if (!key || !token) return false;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload.site_gate === true;
  } catch {
    return false;
  }
}
