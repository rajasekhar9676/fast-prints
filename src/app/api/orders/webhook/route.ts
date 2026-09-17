import { updateOrder } from "@/lib/cms/queries";
import { sendOrderNotifications } from "@/lib/notifications/order-notifications";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { NextResponse } from "next/server";

type RazorpayWebhookPayload = {
  event: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        status?: string;
      };
    };
  };
};

export async function POST(request: Request) {
  const signature = request.headers.get("x-razorpay-signature");
  const rawBody = await request.text();

  if (!signature || !verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const body = JSON.parse(rawBody) as RazorpayWebhookPayload;

  if (body.event !== "payment.captured") {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const payment = body.payload?.payment?.entity;
  const razorpayOrderId = payment?.order_id;
  const razorpayPaymentId = payment?.id;

  if (!razorpayOrderId || !razorpayPaymentId) {
    return NextResponse.json({ error: "Missing payment data" }, { status: 400 });
  }

  const { getOrders } = await import("@/lib/cms/queries");
  const orders = await getOrders();
  const order = orders.find((o) => o.razorpayOrderId === razorpayOrderId);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.paymentStatus === "paid") {
    return NextResponse.json({ ok: true, alreadyPaid: true });
  }

  const paidOrder = await updateOrder(order.id, {
    paymentStatus: "paid",
    status: "confirmed",
    razorpayPaymentId,
    paidAt: new Date().toISOString(),
  });

  if (paidOrder) {
    await sendOrderNotifications(paidOrder);
  }

  return NextResponse.json({ ok: true });
}
