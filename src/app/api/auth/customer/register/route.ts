import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth/password";
import { setCustomerSession, toPublicUser } from "@/lib/auth/customer";
import { createUser, getUserByEmail } from "@/lib/cms/queries";
import type { CustomerRegisterPayload } from "@/types/user";

export async function POST(request: Request) {
  const body = (await request.json()) as CustomerRegisterPayload;

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const phone = body.phone?.trim();
  const address = body.address?.trim();
  const password = body.password ?? "";

  if (!name || !email || !phone || !address) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  const existing = await getUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    address,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  await createUser(user);
  await setCustomerSession(user.id);

  return NextResponse.json({ ok: true, user: toPublicUser(user) });
}
