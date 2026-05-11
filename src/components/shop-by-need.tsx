import Image from "next/image";
import Link from "next/link";
import { shopByNeeds } from "@/data/shop-needs";

export function ShopByNeedSection() {
  return (
    <section className="rounded-3xl border border-ink-100 bg-gradient-to-br from-cream via-white to-brand-50 px-6 py-12 md:px-10 md:py-14">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-700">Shop by business need</p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-ink-950 md:text-4xl">
          Kits for campuses, startups, retail & events
        </h2>
        <p className="mt-3 text-ink-600">
          Inspired by leading online print journeys — pick a scenario and land on curated SKUs fast.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {shopByNeeds.map((need) => (
          <Link
            key={need.id}
            href={need.href}
            className="group flex overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition hover:shadow-lg"
          >
            <div className="relative hidden w-40 shrink-0 sm:block">
              <Image src={need.image} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="160px" />
            </div>
            <div className="flex flex-1 flex-col justify-center p-5">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink-950 group-hover:text-brand-800">
                {need.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{need.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-700">
                Explore picks
                <span aria-hidden className="transition group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
