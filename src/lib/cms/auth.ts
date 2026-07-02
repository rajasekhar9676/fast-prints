import { cookies } from "next/headers";

export const ADMIN_COOKIE = "fp_admin";

function sessionToken(): string {
  const secret = process.env.ADMIN_SESSION_TOKEN ?? process.env.ADMIN_PASSWORD ?? "fast-prints-dev";
  return Buffer.from(`fp-admin:${secret}`).toString("base64url");
}

export function verifyAdminSession(token?: string | null): boolean {
  if (!token) return false;
  return token === sessionToken();
}

export function isAdminPasswordValid(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "admin123";
  return password === expected;
}

export async function setAdminSession(): Promise<void> {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return verifyAdminSession(jar.get(ADMIN_COOKIE)?.value);
}
