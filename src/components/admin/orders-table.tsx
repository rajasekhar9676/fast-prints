"use client";

import type { Order, OrderStatus } from "@/types/admin";
import { formatINR } from "@/lib/currency";
import { useRouter } from "next/navigation";
import { useState } from "react";

const statuses: OrderStatus[] = ["pending", "confirmed", "in_production", "ready", "delivered", "cancelled"];

export function OrdersTable({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function updateStatus(id: string, status: OrderStatus) {
    setUpdatingId(id);
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdatingId(null);
    router.refresh();
  }

  if (!orders.length) {
    return <p className="text-sm text-ink-500">No orders yet.</p>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <article key={order.id} className="panel-light space-y-4 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-[family-name:var(--font-display)] text-lg font-extrabold text-ink-950">{order.orderNumber}</p>
              <p className="text-sm text-ink-500">{new Date(order.createdAt).toLocaleString("en-IN")}</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-ink-600">Status</label>
              <select
                className="rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm font-semibold"
                value={order.status}
                disabled={updatingId === order.id}
                onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="text-sm text-ink-700">
              <p className="font-bold text-ink-950">{order.customer.name}</p>
              <p>{order.customer.phone}</p>
              <p>{order.customer.email}</p>
              <p className="mt-2 whitespace-pre-line">{order.customer.address}</p>
              {order.notes ? <p className="mt-2 text-ink-500">Notes: {order.notes}</p> : null}
            </div>
            <div>
              <ul className="space-y-2 text-sm">
                {order.items.map((item, i) => (
                  <li key={i} className="flex justify-between gap-3 border-b border-ink-50 pb-2">
                    <span className="text-ink-700">
                      {item.productName} × {item.quantity}
                      <span className="block text-xs text-ink-500">
                        {item.selectedSize} · {item.selectedFinish} · {item.selectedUnits} units
                      </span>
                    </span>
                    <span className="font-semibold text-ink-950">{formatINR(item.lineTotal)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-right font-[family-name:var(--font-display)] text-lg font-extrabold text-ink-950">
                Total {formatINR(order.subtotal)}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
