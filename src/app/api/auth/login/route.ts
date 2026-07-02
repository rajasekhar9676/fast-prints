import { isAdminPasswordValid, setAdminSession } from "@/lib/cms/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };

  if (!body.password || !isAdminPasswordValid(body.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
