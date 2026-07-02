import { addOrder } from "@/lib/cms/queries";
import type { CreateOrderPayload, Order, OrderItem } from "@/types/admin";
import { NextResponse } from "next/server";

function orderNumber() {
  const now = new Date();
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `FP-${stamp}-${rand}`;
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateOrderPayload;

  if (!body.customer?.name || !body.customer.email || !body.customer.phone || !body.customer.address) {
    return NextResponse.json({ error: "Customer details are required" }, { status: 400 });
  }

  if (!body.items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const items: OrderItem[] = body.items.map((item) => ({
    productId: item.product.id,
    productName: item.product.name,
    productSlug: item.product.slug,
    quantity: item.quantity,
    selectedSize: item.selectedSize,
    selectedFinish: item.selectedFinish,
    selectedUnits: item.selectedUnits,
    unitPrice: item.unitPrice,
    lineTotal: item.unitPrice * item.quantity,
  }));

  const order: Order = {
    id: crypto.randomUUID(),
    orderNumber: orderNumber(),
    createdAt: new Date().toISOString(),
    status: "pending",
    customer: body.customer,
    notes: body.notes,
    items,
    subtotal: body.subtotal,
  };

  await addOrder(order);

  return NextResponse.json({ ok: true, orderNumber: order.orderNumber, orderId: order.id });
}
