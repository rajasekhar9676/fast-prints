import { requireAdminApi } from "@/lib/cms/api-auth";
import { getCategories, saveCategories } from "@/lib/cms/queries";
import type { ProductCategory } from "@/types/product";
import { NextResponse } from "next/server";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return NextResponse.json(await getCategories());
}

export async function PUT(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const categories = (await request.json()) as ProductCategory[];
  await saveCategories(categories);
  return NextResponse.json(categories);
}
