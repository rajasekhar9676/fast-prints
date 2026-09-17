import { getCustomerIdFromSession } from "@/lib/auth/customer";
import { addOrder, getUserById, updateUser } from "@/lib/cms/queries";
import { buildPendingOrder } from "@/lib/orders/helpers";
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

  try {
    const razorpayOrder = await createRazorpayOrder(order.subtotal, order.orderNumber);
    order.razorpayOrderId = razorpayOrder.id;
    await addOrder(order);

    const keyId = getRazorpayKeyId();
    if (!keyId) {
      return NextResponse.json({ error: "Payment gateway is not configured" }, { status: 503 });
    }

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
}
