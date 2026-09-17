import { requireAdminApi } from "@/lib/cms/api-auth";
import { getCorporateContent, saveCorporateContent } from "@/lib/cms/queries";
import type { CorporateContent } from "@/types/cms-content";
import { NextResponse } from "next/server";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return NextResponse.json(await getCorporateContent());
}

export async function PUT(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const content = (await request.json()) as CorporateContent;
  await saveCorporateContent(content);
  return NextResponse.json(content);
}
