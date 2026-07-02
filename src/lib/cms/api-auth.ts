import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyAdminSession } from "./auth";

export async function requireAdminApi(): Promise<NextResponse | null> {
  const jar = await cookies();
  if (!verifyAdminSession(jar.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
