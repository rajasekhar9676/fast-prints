import { requireAdminApi } from "@/lib/cms/api-auth";
import { getTestimonialsContent, saveTestimonialsContent } from "@/lib/cms/queries";
import type { TestimonialsContent } from "@/types/cms-content";
import { NextResponse } from "next/server";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return NextResponse.json(await getTestimonialsContent());
}

export async function PUT(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const content = (await request.json()) as TestimonialsContent;
  await saveTestimonialsContent(content);
  return NextResponse.json(content);
}
