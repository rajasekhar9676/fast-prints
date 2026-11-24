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
    designFileName: item.designFileName,
    designFileUrl: item.designFileUrl,
  }));
}

export function buildPendingOrder(body: CreateOrderPayload, userId?: string): Order {
  const items = buildOrderItems(body);

  // Compile artwork files into notes if available for legacy/external integrations
  const artworkNotes = items
    .filter((item) => item.designFileName || item.designFileUrl)
    .map(
      (item) =>
        `[Artwork File]: ${item.productName} -> ${item.designFileName || "Design file"} (${item.designFileUrl || "Shared via WhatsApp"})`
    );

  const combinedNotes = [body.notes, ...artworkNotes].filter(Boolean).join("\n");

  return {
    id: crypto.randomUUID(),
    orderNumber: generateOrderNumber(),
    createdAt: new Date().toISOString(),
    status: "pending_payment",
    paymentStatus: "pending",
    userId,
    customer: body.customer,
    notes: combinedNotes || undefined,
    items,
    subtotal: body.subtotal,
  };
}
