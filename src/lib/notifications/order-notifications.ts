import type { Order } from "@/types/admin";
import { getSettings } from "@/lib/cms/queries";
import { sendCustomerOrderEmail, sendOwnerOrderEmail } from "./email";
import {
  buildCustomerOrderMessage,
  buildOwnerCustomerReplyMessage,
  buildOwnerNewOrderAlert,
  buildWhatsAppUrl,
  trySendWhatsAppApi,
} from "./whatsapp";

export async function sendOrderNotifications(order: Order) {
  const settings = await getSettings();

  const customerChatUrl = buildWhatsAppUrl(
    settings.whatsapp,
    buildCustomerOrderMessage(order, settings.businessName),
  );

  const ownerToCustomerUrl = buildWhatsAppUrl(
    order.customer.phone,
    buildOwnerCustomerReplyMessage(order),
  );

  const [customerEmail, ownerEmail, customerWhatsApp, ownerWhatsApp] = await Promise.all([
    sendCustomerOrderEmail(order, settings, customerChatUrl),
    sendOwnerOrderEmail(order, settings, ownerToCustomerUrl),
    trySendWhatsAppApi(order.customer.phone, buildOwnerCustomerReplyMessage(order)),
    trySendWhatsAppApi(settings.whatsapp, buildOwnerNewOrderAlert(order)),
  ]);

  return {
    customerEmail,
    ownerEmail,
    customerWhatsApp,
    ownerWhatsApp,
    customerChatUrl,
    ownerToCustomerUrl,
  };
}
