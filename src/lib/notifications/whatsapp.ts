import type { Order } from "@/types/admin";
import { formatINR } from "@/lib/currency";

export function normalizePhoneForWhatsApp(phone: string) {
  return phone.replace(/\D/g, "");
}

export function buildWhatsAppUrl(phone: string, message: string) {
  const digits = normalizePhoneForWhatsApp(phone);
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildCustomerOrderMessage(order: Order, businessName: string) {
  const items = order.items
    .map((item) => `• ${item.productName} × ${item.quantity} — ${formatINR(item.lineTotal)}`)
    .join("\n");

  return [
    `Hi ${businessName}!`,
    `I just placed order *${order.orderNumber}*.`,
    ``,
    `*Items:*`,
    items,
    ``,
    `*Total:* ${formatINR(order.subtotal)}`,
    ``,
    `Please confirm artwork and delivery timeline.`,
  ].join("\n");
}

export function buildOwnerCustomerReplyMessage(order: Order) {
  return [
    `Hi ${order.customer.name},`,
    `Thanks for your order *${order.orderNumber}* at Fast Prints Bengaluru.`,
    `We received your payment of ${formatINR(order.subtotal)}.`,
    `Our team will contact you shortly to confirm artwork and delivery.`,
  ].join("\n");
}

export function buildOwnerNewOrderAlert(order: Order) {
  const items = order.items.map((item) => `• ${item.productName} × ${item.quantity}`).join("\n");

  return [
    `*New paid order ${order.orderNumber}*`,
    `Customer: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `Email: ${order.customer.email}`,
    `Total: ${formatINR(order.subtotal)}`,
    ``,
    items,
  ].join("\n");
}

/** Optional WhatsApp Business API (Interakt). Skipped unless INTERAKT_API_KEY is set. */
export async function trySendWhatsAppApi(phone: string, body: string) {
  const apiKey = process.env.INTERAKT_API_KEY;
  if (!apiKey) return { sent: false as const, reason: "not_configured" as const };

  const digits = normalizePhoneForWhatsApp(phone);
  const countryCode = digits.startsWith("91") ? "+91" : `+${digits.slice(0, digits.length - 10)}`;
  const phoneNumber = digits.startsWith("91") ? digits.slice(2) : digits.slice(-10);

  try {
    const res = await fetch("https://api.interakt.ai/v1/public/message/", {
      method: "POST",
      headers: {
        Authorization: `Basic ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCode,
        phoneNumber,
        type: "Text",
        data: { message: body },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Interakt WhatsApp failed:", text);
      return { sent: false as const, reason: "api_error" as const };
    }

    return { sent: true as const };
  } catch (error) {
    console.error("Interakt WhatsApp error:", error);
    return { sent: false as const, reason: "api_error" as const };
  }
}
