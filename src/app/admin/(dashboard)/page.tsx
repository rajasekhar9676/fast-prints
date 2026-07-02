import { getCategories, getOrders, getProducts } from "@/lib/cms/queries";
import { formatINR } from "@/lib/currency";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [products, categories, orders] = await Promise.all([getProducts(), getCategories(), getOrders()]);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const revenue = orders.reduce((sum, o) => sum + o.subtotal, 0);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Overview</p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink-950">Dashboard</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Products", value: String(products.length), href: "/admin/products" },
          { label: "Categories", value: String(categories.length), href: "/admin/categories" },
          { label: "Pending orders", value: String(pendingOrders), href: "/admin/orders" },
          { label: "Order value", value: formatINR(revenue), href: "/admin/orders" },
        ].map((card) => (
          <Link key={card.label} href={card.href} className="card-premium block p-5 transition hover:-translate-y-0.5">
            <p className="text-sm font-semibold text-ink-500">{card.label}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink-950">{card.value}</p>
          </Link>
        ))}
      </div>

      <section className="panel-light p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-ink-950">Recent orders</h2>
          <Link href="/admin/orders" className="text-sm font-bold text-brand-700 hover:underline">
            View all
          </Link>
        </div>
        {orders.length === 0 ? (
          <p className="text-sm text-ink-500">No orders yet. They will appear here when customers checkout.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-ink-500">
                  <th className="px-2 py-2 font-semibold">Order</th>
                  <th className="px-2 py-2 font-semibold">Customer</th>
                  <th className="px-2 py-2 font-semibold">Status</th>
                  <th className="px-2 py-2 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 8).map((order) => (
                  <tr key={order.id} className="border-b border-ink-50">
                    <td className="px-2 py-3 font-semibold text-ink-950">{order.orderNumber}</td>
                    <td className="px-2 py-3 text-ink-700">{order.customer.name}</td>
                    <td className="px-2 py-3 capitalize text-ink-600">{order.status.replace("_", " ")}</td>
                    <td className="px-2 py-3 font-semibold text-ink-950">{formatINR(order.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
