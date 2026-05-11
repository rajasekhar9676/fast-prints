import { ServiceIcon } from "@/components/service-icon";
import { serviceCategoryOrder, services } from "@/data/services";
import Link from "next/link";

function groupServices() {
  const map = new Map<string, typeof services>();
  for (const s of services) {
    const list = map.get(s.category) ?? [];
    list.push(s);
    map.set(s.category, list);
  }
  return map;
}

export default function ServicesPage() {
  const grouped = groupServices();

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
        {serviceCategoryOrder.map((cat) => {
          const items = grouped.get(cat);
          if (!items?.length) return null;
          return (
            <section key={cat} className="space-y-6">
              <div className="flex flex-col gap-2 border-b border-ink-200 pb-4 md:flex-row md:items-end md:justify-between">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink-950">{cat}</h2>
                <p className="text-sm text-ink-500">{items.length} services</p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service) => (
                  <li
                    key={service.id}
                    className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-ink-950">
                      <ServiceIcon name={service.icon} className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-[family-name:var(--font-display)] font-bold text-ink-950">{service.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{service.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="rounded-3xl border border-ink-100 bg-gradient-to-br from-brand-50 to-white px-6 py-10 text-center md:px-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink-950">Need something bespoke?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-ink-600">
          Bring sample references or rough sketches — our desk will suggest stock, finishing, and timeline before we quote.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="rounded-xl bg-ink-950 px-6 py-3 text-sm font-bold text-white hover:bg-ink-900">
            Contact the store
          </Link>
          <a
            href="tel:+919164779922"
            className="rounded-xl border border-ink-200 bg-white px-6 py-3 text-sm font-bold text-ink-950 hover:border-brand-400"
          >
            Call +91 91647 79922
          </a>
        </div>
      </section>
    </div>
  );
}
