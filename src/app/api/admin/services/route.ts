import { requireAdminApi } from "@/lib/cms/api-auth";
import { getServices, saveServices } from "@/lib/cms/queries";
import type { Service } from "@/types/product";
import { NextResponse } from "next/server";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return NextResponse.json(await getServices());
}

export async function PUT(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const services = (await request.json()) as Service[];
  await saveServices(services);
  return NextResponse.json(services);
}
