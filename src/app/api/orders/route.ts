import { getCustomerIdFromSession } from "@/lib/auth/customer";
import { addOrder, getUserById, updateUser } from "@/lib/cms/queries";
import { buildPendingOrder } from "@/lib/orders/helpers";
import { sendOrderNotifications } from "@/lib/notifications/order-notifications";
import { createRazorpayOrder, getRazorpayKeyId } from "@/lib/razorpay";
import type { CreateOrderPayload } from "@/types/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const userId = await getCustomerIdFromSession();
  if (!userId) {
    return NextResponse.json({ error: "Please sign in to place an order" }, { status: 401 });
  }

  const user = await getUserById(userId);
  if (!user) {
    return NextResponse.json({ error: "Account not found. Please sign in again." }, { status: 401 });
  }

  const body = (await request.json()) as CreateOrderPayload;

  if (!body.customer?.name || !body.customer.email || !body.customer.phone || !body.customer.address) {
    return NextResponse.json({ error: "Customer details are required" }, { status: 400 });
  }

  if (body.customer.email.trim().toLowerCase() !== user.email.toLowerCase()) {
    return NextResponse.json({ error: "Order email must match your account email" }, { status: 400 });
  }

  if (!body.items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  if (!body.subtotal || body.subtotal < 1) {
    return NextResponse.json({ error: "Invalid order total" }, { status: 400 });
  }

  await updateUser(userId, {
    name: body.customer.name.trim(),
    phone: body.customer.phone.trim(),
    address: body.customer.address.trim(),
  });

  const order = buildPendingOrder(body, userId);

  /* =========================================================================
   * PAYMENT SECTION COMMENTED OUT FOR TESTING EMAIL & WHATSAPP SERVICES
   * =========================================================================
   * Razorpay payment gateway is bypassed so orders complete immediately.
   * This triggers Resend emails & generates WhatsApp message links.
   * ========================================================================= */
  const bypassPayment = true;

  if (bypassPayment) {
    order.paymentStatus = "paid";
    order.status = "confirmed";
    order.paidAt = new Date().toISOString();
    await addOrder(order);

    // Trigger Email & WhatsApp Notifications Immediately!
    console.log(`[TEST MODE] Sending notifications for order ${order.orderNumber}...`);
    const notifications = await sendOrderNotifications(order);
    console.log(`[TEST MODE] Customer Email Sent:`, notifications.customerEmail);
    console.log(`[TEST MODE] Owner Email Sent:`, notifications.ownerEmail);

    return NextResponse.json({
      ok: true,
      directOrder: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      customerChatUrl: notifications.customerChatUrl,
      notificationsSent: {
        customerEmail: notifications.customerEmail,
        ownerEmail: notifications.ownerEmail,
      },
    });
  }

  /* 
  // --- RAZORPAY PAYMENT SECTION COMMENTED OUT FOR TESTING ---
  try {
    const keyId = getRazorpayKeyId();
    const razorpayOrder = await createRazorpayOrder(order.subtotal, order.orderNumber);
    order.razorpayOrderId = razorpayOrder.id;
    await addOrder(order);

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      razorpayOrderId: razorpayOrder.id,
      keyId,
      customer: order.customer,
    });
  } catch (error) {
    console.error("Create payment order failed:", error);
    const message = error instanceof Error ? error.message : "Could not start payment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
  */
}
