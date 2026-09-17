import { SectionHeader } from "@/components/section-header";
import { AccountOrders } from "@/components/account-orders";
import { getCustomerFromSession } from "@/lib/auth/customer";
import { getOrdersForUser } from "@/lib/cms/queries";
import Link from "next/link";
import { AccountLogoutButton } from "@/components/account-logout-button";

export const metadata = {
  title: "My account",
};

export default async function AccountPage() {
  const user = await getCustomerFromSession();
  if (!user) return null;

  const orders = await getOrdersForUser(user.id);

  return (
    <div className="space-y-10 pb-10">
      <SectionHeader
        eyebrow="Account"
        title={`Hello, ${user.name.split(" ")[0]}`}
        subtitle="Your profile and order history in one place."
      />

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="panel-light h-fit space-y-4 p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Profile</p>
            <p className="mt-2 font-bold text-ink-950">{user.name}</p>
            <p className="text-sm text-ink-600">{user.email}</p>
            <p className="text-sm text-ink-600">{user.phone}</p>
            <p className="mt-3 whitespace-pre-line text-sm text-ink-500">{user.address}</p>
          </div>
          <AccountLogoutButton />
          <Link href="/products" className="btn-primary inline-flex w-full justify-center">
            Continue shopping
          </Link>
        </aside>

        <section className="space-y-4">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-ink-950">
            Your orders
          </h2>
          <AccountOrders orders={orders} />
        </section>
      </div>
    </div>
  );
}
