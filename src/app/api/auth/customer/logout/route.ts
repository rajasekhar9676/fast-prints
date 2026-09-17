import { clearCustomerSession } from "@/lib/auth/customer";
import { NextResponse } from "next/server";

export async function POST() {
  await clearCustomerSession();
  return NextResponse.json({ ok: true });
}
