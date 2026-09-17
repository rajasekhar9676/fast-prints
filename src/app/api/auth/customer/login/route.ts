import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth/password";
import { setCustomerSession, toPublicUser } from "@/lib/auth/customer";
import { getUserByEmail } from "@/lib/cms/queries";
import type { CustomerLoginPayload } from "@/types/user";

export async function POST(request: Request) {
  const body = (await request.json()) as CustomerLoginPayload;
  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const user = await getUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  await setCustomerSession(user.id);

  return NextResponse.json({ ok: true, user: toPublicUser(user) });
}
