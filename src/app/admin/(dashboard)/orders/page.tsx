import { OrdersTable } from "@/components/admin/orders-table";
import { getOrders } from "@/lib/cms/queries";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Sales</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink-950">Orders</h1>
        <p className="mt-2 text-sm text-ink-500">Customer orders from checkout appear here for follow-up.</p>
      </div>
      <OrdersTable orders={orders} />
    </div>
  );
}
