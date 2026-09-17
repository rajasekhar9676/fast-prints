import { getCustomerFromSession } from "@/lib/auth/customer";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCustomerFromSession();
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
