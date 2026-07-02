import { clearAdminSession } from "@/lib/cms/auth";
import { NextResponse } from "next/server";

export async function POST() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
