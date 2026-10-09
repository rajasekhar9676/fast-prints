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
  const envFrom = process.env.RESEND_FROM_EMAIL;
  if (envFrom && !envFrom.includes("@gmail.com")) {
    return envFrom;
  }
  return "Fast Prints <onboarding@resend.dev>";
}

function orderItemsHtml(order: Order) {
  return order.items
    .map((item) => {
      const specs = [item.selectedSize, item.selectedFinish].filter(Boolean).join(" · ");
      return `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
            <div style="font-weight:bold;color:#1a140d;font-size:14px;">${item.productName}</div>
            ${specs ? `<div style="font-size:12px;color:#777;margin-top:2px;">Specs: ${specs}</div>` : ""}
            <div style="font-size:12px;color:#888;margin-top:2px;">Qty: ${item.quantity} ${item.selectedUnits || "units"} @ ${formatINR(item.unitPrice)}</div>
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:bold;color:#111;vertical-align:top;font-size:14px;">
            ${formatINR(item.lineTotal)}
          </td>
        </tr>`;
    })
    .join("");
}

export async function sendCustomerOrderEmail(order: Order, settings: SiteSettings, whatsappUrl: string) {
  const resend = getResend();
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping customer email");
    return { sent: false as const, reason: "not_configured" as const };
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"/><title>Order Confirmed — ${order.orderNumber}</title></head>
    <body style="margin:0;padding:0;background-color:#f4f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f4f4f6;padding:30px 10px;">
        <tr>
          <td align="center">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);">
              
              <!-- Header Strip -->
              <tr>
                <td style="background-color:#0d0a08;padding:24px 30px;border-bottom:3px solid #f59e0b;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td>
                        <div style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">FAST PRINTS</div>
                        <div style="font-size:11px;font-weight:700;color:#f59e0b;letter-spacing:2px;margin-top:2px;">BTM 2ND STAGE, BENGALURU</div>
                      </td>
                      <td align="right">
                        <span style="background:rgba(245,158,11,0.2);color:#fbbf24;font-size:11px;font-weight:800;padding:6px 12px;border-radius:20px;border:1px solid rgba(245,158,11,0.4);">
                          ORDER CONFIRMED
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Greeting & Reference -->
              <tr>
                <td style="padding:28px 30px 16px 30px;">
                  <div style="font-size:16px;font-weight:bold;color:#1a140d;">Hi ${order.customer.name},</div>
                  <p style="font-size:14px;color:#4a4a4a;line-height:1.6;margin:8px 0 0 0;">
                    Thank you for ordering with <strong>${settings.businessName}</strong>. Your order has been registered successfully.
                  </p>
                  
                  <div style="margin-top:16px;background:#fef3c7;border:1px solid #fde68a;padding:12px 16px;border-radius:10px;font-size:13px;color:#92400e;">
                    ⚡ <strong>Same-Day Pickup Notice:</strong> For same-day store pickup or express delivery, orders must be placed before <strong>2:00 PM</strong>.
                  </div>
                </td>
              </tr>

              <!-- Order Summary Table -->
              <tr>
                <td style="padding:0 30px;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;margin-top:10px;">
                    <tr style="background:#f9fafb;">
                      <th align="left" style="padding:10px 16px;font-size:11px;font-weight:800;color:#6b7280;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;">Print Items</th>
                      <th align="right" style="padding:10px 16px;font-size:11px;font-weight:800;color:#6b7280;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;">Total</th>
                    </tr>
                    ${orderItemsHtml(order)}
                    <tr style="background:#fafafa;">
                      <td style="padding:14px 16px;font-weight:bold;color:#111;font-size:14px;">Total Order Amount</td>
                      <td align="right" style="padding:14px 16px;font-weight:900;color:#d97706;font-size:18px;">${formatINR(order.subtotal)}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Customer Address Box -->
              <tr>
                <td style="padding:20px 30px;">
                  <div style="background:#f9fafb;border:1px solid #f3f4f6;padding:16px;border-radius:12px;">
                    <div style="font-size:11px;font-weight:800;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Delivery & Contact Details</div>
                    <div style="font-size:13px;color:#1f2937;line-height:1.5;">
                      <strong>${order.customer.name}</strong><br/>
                      📞 ${order.customer.phone} | ✉️ ${order.customer.email}<br/>
                      📍 ${order.customer.address.replace(/\n/g, "<br/>")}
                    </div>
                    ${order.notes ? `<div style="margin-top:8px;font-size:12px;color:#d97706;background:#fffbe0;padding:6px 10px;border-radius:6px;"><strong>Order Notes:</strong> ${order.notes}</div>` : ""}
                  </div>
                </td>
              </tr>

              <!-- Action Button -->
              <tr>
                <td align="center" style="padding:10px 30px 30px 30px;">
                  <a href="${whatsappUrl}" target="_blank" style="display:inline-block;background-color:#25D366;color:#ffffff;font-size:14px;font-weight:800;text-decoration:none;padding:14px 28px;border-radius:10px;box-shadow:0 4px 14px rgba(37,211,102,0.35);">
                    💬 Connect on WhatsApp for Quick Confirmation
                  </a>
                  <div style="font-size:12px;color:#9ca3af;margin-top:16px;">
                    Questions? Call us directly on <strong>${settings.phone}</strong> or visit our BTM 2nd Stage store.
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f9fafb;padding:20px 30px;border-top:1px solid #e5e7eb;text-align:center;font-size:12px;color:#6b7280;">
                  © ${new Date().getFullYear()} ${settings.businessName}. All rights reserved.<br/>
                  ${settings.addressLines.join(", ")}
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  let { error } = await resend.emails.send({
    from: fromAddress(),
    to: order.customer.email,
    subject: `Order confirmed — ${order.orderNumber}`,
    html,
  });

  if (error) {
    console.warn("Customer email to target address failed (Resend Test restriction):", error.message);
    const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL ?? settings.email;

    if (ownerEmail && order.customer.email.toLowerCase() !== ownerEmail.toLowerCase()) {
      console.log(`[TEST FALLBACK] Forwarding customer receipt to owner email: ${ownerEmail}`);
      const retryResult = await resend.emails.send({
        from: fromAddress(),
        to: ownerEmail,
        subject: `[TEST CUSTOMER RECEIPT -> ${order.customer.email}] Order confirmed — ${order.orderNumber}`,
        html: `<p style="background:#fff3cd;padding:10px;border-radius:6px;font-size:12px;color:#856404;">
                ⚠️ <strong>TEST MODE NOTICE:</strong> In Resend test mode, emails can only be sent directly to registered owner address (${ownerEmail}). Below is the copy generated for customer: ${order.customer.email}.
               </p>` + html,
      });
      if (!retryResult.error) {
        return { sent: true as const, redirectedToOwner: true };
      }
    }

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

  const itemsHtmlList = order.items
    .map(
      (item) =>
        `<li style="margin-bottom:6px;color:#111;">
          <strong>${item.productName}</strong> × ${item.quantity} ${item.selectedUnits || "units"} — <span style="color:#d97706;font-weight:bold;">${formatINR(item.lineTotal)}</span>
          ${item.selectedSize || item.selectedFinish ? `<br/><span style="font-size:12px;color:#666;">(${[item.selectedSize, item.selectedFinish].filter(Boolean).join(" · ")})</span>` : ""}
        </li>`,
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"/><title>New Paid Order ${order.orderNumber}</title></head>
    <body style="margin:0;padding:0;background-color:#f4f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f4f4f6;padding:30px 10px;">
        <tr>
          <td align="center">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);">
              
              <!-- Header -->
              <tr>
                <td style="background-color:#0d0a08;padding:20px 30px;border-bottom:3px solid #10b981;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td>
                        <div style="font-size:18px;font-weight:900;color:#ffffff;">NEW PAID STORE ORDER</div>
                        <div style="font-size:13px;font-weight:bold;color:#10b981;margin-top:2px;">Ref: ${order.orderNumber}</div>
                      </td>
                      <td align="right">
                        <div style="font-size:22px;font-weight:900;color:#ffffff;">${formatINR(order.subtotal)}</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Customer Info -->
              <tr>
                <td style="padding:24px 30px 10px 30px;">
                  <div style="font-size:11px;font-weight:800;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Customer Details</div>
                  <div style="background:#f9fafb;border:1px solid #e5e7eb;padding:16px;border-radius:12px;font-size:13px;line-height:1.6;color:#111;">
                    <div style="font-size:15px;font-weight:bold;color:#000;">${order.customer.name}</div>
                    <div>📞 Phone: <strong>${order.customer.phone}</strong></div>
                    <div>✉️ Email: <strong>${order.customer.email}</strong></div>
                    <div>📍 Address: ${order.customer.address.replace(/\n/g, "<br/>")}</div>
                    ${order.notes ? `<div style="margin-top:8px;background:#fef3c7;padding:8px 12px;border-radius:6px;color:#92400e;font-weight:bold;">Notes: ${order.notes}</div>` : ""}
                  </div>
                </td>
              </tr>

              <!-- Order Items List -->
              <tr>
                <td style="padding:10px 30px 20px 30px;">
                  <div style="font-size:11px;font-weight:800;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Ordered Items</div>
                  <div style="background:#fff;border:1px solid #e5e7eb;padding:16px;border-radius:12px;">
                    <ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.6;">
                      ${itemsHtmlList}
                    </ul>
                  </div>
                </td>
              </tr>

              <!-- Action Button -->
              <tr>
                <td align="center" style="padding:10px 30px 30px 30px;">
                  <a href="${customerWhatsAppUrl}" target="_blank" style="display:inline-block;background-color:#25D366;color:#ffffff;font-size:14px;font-weight:800;text-decoration:none;padding:14px 28px;border-radius:10px;box-shadow:0 4px 14px rgba(37,211,102,0.35);">
                    💬 WhatsApp Customer (${order.customer.phone})
                  </a>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
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
