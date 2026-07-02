import { requireAdminApi } from "@/lib/cms/api-auth";
import { getOrders } from "@/lib/cms/queries";
import { NextResponse } from "next/server";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return NextResponse.json(await getOrders());
}
