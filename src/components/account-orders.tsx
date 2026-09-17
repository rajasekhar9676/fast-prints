"use client";

import type { Order } from "@/types/admin";
import { formatINR } from "@/lib/currency";

export function AccountOrders({ orders }: { orders: Order[] }) {
  if (!orders.length) {
    return (
      <div className="panel-light px-8 py-16 text-center">
        <p className="font-bold text-ink-950">No orders yet</p>
        <p className="mt-2 text-sm text-ink-500">When you place an order, it will show up here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <article key={order.id} className="card-premium space-y-3 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-[family-name:var(--font-display)] text-lg font-extrabold text-ink-950">
                {order.orderNumber}
              </p>
              <p className="text-sm text-ink-500">{new Date(order.createdAt).toLocaleString("en-IN")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-ink-700">
                {order.status.replaceAll("_", " ")}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                  order.paymentStatus === "paid"
                    ? "bg-emerald-100 text-emerald-800"
                    : order.paymentStatus === "failed"
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-800"
                }`}
              >
                {order.paymentStatus ?? "pending"}
              </span>
            </div>
          </div>
          <ul className="space-y-1 text-sm text-ink-600">
            {order.items.map((item) => (
              <li key={`${order.id}-${item.productId}-${item.selectedSize}`}>
                {item.productName} × {item.quantity} — {formatINR(item.lineTotal)}
              </li>
            ))}
          </ul>
          <p className="font-bold text-ink-950">Total: {formatINR(order.subtotal)}</p>
        </article>
      ))}
    </div>
  );
}
