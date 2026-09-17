import { requireAdminApi } from "@/lib/cms/api-auth";
import { getHomepageContent, saveHomepageContent } from "@/lib/cms/queries";
import type { HomepageContent } from "@/types/cms-content";
import { NextResponse } from "next/server";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return NextResponse.json(await getHomepageContent());
}

export async function PUT(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const content = (await request.json()) as HomepageContent;
  await saveHomepageContent(content);
  return NextResponse.json(content);
}
