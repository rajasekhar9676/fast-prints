import { getOrderById, updateOrder } from "@/lib/cms/queries";
import { sendOrderNotifications } from "@/lib/notifications/order-notifications";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { NextResponse } from "next/server";

type VerifyPayload = {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as VerifyPayload;

  if (!body.orderId || !body.razorpayOrderId || !body.razorpayPaymentId || !body.razorpaySignature) {
    return NextResponse.json({ error: "Payment verification data is incomplete" }, { status: 400 });
  }

  const valid = verifyPaymentSignature(
    body.razorpayOrderId,
    body.razorpayPaymentId,
    body.razorpaySignature,
  );

  if (!valid) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  const order = await getOrderById(body.orderId);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.paymentStatus === "paid") {
    return NextResponse.json({
      ok: true,
      orderNumber: order.orderNumber,
      alreadyPaid: true,
    });
  }

  if (order.razorpayOrderId && order.razorpayOrderId !== body.razorpayOrderId) {
    return NextResponse.json({ error: "Order payment mismatch" }, { status: 400 });
  }

  const paidOrder = await updateOrder(order.id, {
    paymentStatus: "paid",
    status: "confirmed",
    razorpayOrderId: body.razorpayOrderId,
    razorpayPaymentId: body.razorpayPaymentId,
    paidAt: new Date().toISOString(),
  });

  if (!paidOrder) {
    return NextResponse.json({ error: "Could not update order" }, { status: 500 });
  }

  const notifications = await sendOrderNotifications(paidOrder);

  return NextResponse.json({
    ok: true,
    orderNumber: paidOrder.orderNumber,
    customerChatUrl: notifications.customerChatUrl,
  });
}
