import { requireAdminApi } from "@/lib/cms/api-auth";
import { getSettings, saveSettings } from "@/lib/cms/queries";
import type { SiteSettings } from "@/types/admin";
import { NextResponse } from "next/server";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return NextResponse.json(await getSettings());
}

export async function PUT(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const settings = (await request.json()) as SiteSettings;
  await saveSettings(settings);
  return NextResponse.json(settings);
}
