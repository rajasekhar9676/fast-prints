import { Resend } from "resend";
import type { Order, SiteSettings } from "@/types/admin";
import { formatINR } from "@/lib/currency";
import { buildWhatsAppUrl } from "./whatsapp";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function fromAddress() {
  return process.env.RESEND_FROM_EMAIL ?? "Fast Prints <onboarding@resend.dev>";
}

function orderItemsHtml(order: Order) {
  return order.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee;">${item.productName} × ${item.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">${formatINR(item.lineTotal)}</td>
        </tr>`,
    )
    .join("");
}

export async function sendCustomerOrderEmail(order: Order, settings: SiteSettings, whatsappUrl: string) {
  const resend = getResend();
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping customer email");
    return { sent: false as const, reason: "not_configured" as const };
  }

  const html = `
    <div style="font-family:sans-serif;max-width:560px;color:#111;">
      <h2 style="margin:0 0 8px;">Order confirmed</h2>
      <p>Hi ${order.customer.name},</p>
      <p>Thank you for your order at <strong>${settings.businessName}</strong>. Payment received.</p>
      <p><strong>Order reference:</strong> ${order.orderNumber}</p>
      <table style="width:100%;margin:16px 0;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left;padding-bottom:8px;">Item</th>
            <th style="text-align:right;padding-bottom:8px;">Amount</th>
          </tr>
        </thead>
        <tbody>${orderItemsHtml(order)}</tbody>
        <tfoot>
          <tr>
            <td style="padding-top:12px;font-weight:bold;">Total</td>
            <td style="padding-top:12px;font-weight:bold;text-align:right;">${formatINR(order.subtotal)}</td>
          </tr>
        </tfoot>
      </table>
      <p>Our team will contact you to confirm artwork and delivery timeline.</p>
      <p>
        <a href="${whatsappUrl}" style="display:inline-block;background:#25D366;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">
          Chat on WhatsApp
        </a>
      </p>
      <p style="color:#666;font-size:14px;">${settings.phone} · ${settings.email}</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: order.customer.email,
    subject: `Order confirmed — ${order.orderNumber}`,
    html,
  });

  if (error) {
    console.error("Customer email failed:", error);
    return { sent: false as const, reason: "api_error" as const };
  }

  return { sent: true as const };
}

export async function sendOwnerOrderEmail(order: Order, settings: SiteSettings, customerWhatsAppUrl: string) {
  const resend = getResend();
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL ?? settings.email;

  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping owner email");
    return { sent: false as const, reason: "not_configured" as const };
  }

  const itemsText = order.items
    .map((item) => `${item.productName} × ${item.quantity} — ${formatINR(item.lineTotal)}`)
    .join("\n");

  const html = `
    <div style="font-family:sans-serif;max-width:560px;color:#111;">
      <h2 style="margin:0 0 8px;">New paid order</h2>
      <p><strong>${order.orderNumber}</strong> · ${formatINR(order.subtotal)}</p>
      <p>
        <strong>${order.customer.name}</strong><br/>
        ${order.customer.phone}<br/>
        ${order.customer.email}<br/>
        ${order.customer.address.replace(/\n/g, "<br/>")}
      </p>
      ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ""}
      <pre style="background:#f5f5f5;padding:12px;border-radius:8px;white-space:pre-wrap;">${itemsText}</pre>
      <p>
        <a href="${customerWhatsAppUrl}" style="display:inline-block;background:#25D366;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">
          WhatsApp customer
        </a>
      </p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: ownerEmail,
    subject: `New order ${order.orderNumber} — ${formatINR(order.subtotal)}`,
    html,
  });

  if (error) {
    console.error("Owner email failed:", error);
    return { sent: false as const, reason: "api_error" as const };
  }

  return { sent: true as const };
}
