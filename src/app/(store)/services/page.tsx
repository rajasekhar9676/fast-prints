import { ServiceIcon } from "@/components/service-icon";
import { serviceCategoryOrder } from "@/data/services";
import { getServices } from "@/lib/cms/queries";
import Link from "next/link";

function groupServices(services: Awaited<ReturnType<typeof getServices>>) {
  const map = new Map<string, typeof services>();
  for (const s of services) {
    const list = map.get(s.category) ?? [];
    list.push(s);
    map.set(s.category, list);
  }
  return map;
}

export default async function ServicesPage() {
  const services = await getServices();
  const grouped = groupServices(services);

  return (
    <div className="space-y-14 pb-8">
      <section className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-14 text-white md:px-12">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative max-w-3xl space-y-4">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-400">Capabilities</p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold md:text-5xl">
            Every discipline under one roof
          </h1>
          <p className="text-lg text-white/75">
            From digital short runs to offset volumes, finishing, signage, apparel, and design — Fast Prints covers the full stack your marketing team needs.
          </p>
          <Link
            href="/products"
            className="inline-flex rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-ink-950 shadow-lg shadow-brand-500/30 hover:bg-brand-400"
          >
            Jump to shop
          </Link>
        </div>
      </section>

      <div className="space-y-16">
        {[...serviceCategoryOrder, ...[...grouped.keys()].filter((k) => !serviceCategoryOrder.includes(k))].map(
          (category) => {
            const list = grouped.get(category);
            if (!list?.length) return null;
            return (
              <section key={category} className="space-y-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink-950">{category}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((service) => (
                    <article key={service.id} className="card-premium flex gap-4 p-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                        <ServiceIcon name={service.icon} className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] font-bold text-ink-950">{service.name}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-600">{service.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          },
        )}
      </div>
    </div>
  );
}
