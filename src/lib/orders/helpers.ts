import type { CreateOrderPayload, Order, OrderItem } from "@/types/admin";

export function generateOrderNumber() {
  const now = new Date();
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `FP-${stamp}-${rand}`;
}

export function buildOrderItems(body: CreateOrderPayload): OrderItem[] {
  return body.items.map((item) => ({
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
}

export function buildPendingOrder(body: CreateOrderPayload, userId?: string): Order {
  return {
    id: crypto.randomUUID(),
    orderNumber: generateOrderNumber(),
    createdAt: new Date().toISOString(),
    status: "pending_payment",
    paymentStatus: "pending",
    userId,
    customer: body.customer,
    notes: body.notes,
    items: buildOrderItems(body),
    subtotal: body.subtotal,
  };
}
