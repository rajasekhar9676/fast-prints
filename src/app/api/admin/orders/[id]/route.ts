import { requireAdminApi } from "@/lib/cms/api-auth";
import { getOrders, saveOrders } from "@/lib/cms/queries";
import type { OrderStatus } from "@/types/admin";
import { NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteContext) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;
  const { status } = (await request.json()) as { status: OrderStatus };
  const orders = await getOrders();
  const index = orders.findIndex((o) => o.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  orders[index] = { ...orders[index], status };
  await saveOrders(orders);
  return NextResponse.json(orders[index]);
}
