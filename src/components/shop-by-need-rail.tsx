import Image from "next/image";
import Link from "next/link";
import { shopByNeeds } from "@/data/shop-needs";
import { SectionHeader } from "@/components/section-header";

export function ShopByNeedRail() {
  return (
    <section>
      <SectionHeader
        eyebrow="Find your fit"
        title="Who are you printing for?"
        subtitle="Choose a scenario — we surface the right products for your business or occasion"
        seeAllHref="/products"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {shopByNeeds.map((need) => (
          <Link
            key={need.id}
            href={need.href}
            className="group overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
          >
            <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-b from-brand-50/40 to-white">
              <Image
                src={need.image}
                alt={need.title}
                fill
                className="object-contain object-center p-4 transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
            <div className="border-t border-ink-50 px-4 py-3.5">
              <p className="text-sm font-extrabold text-ink-950 group-hover:text-brand-700">{need.title}</p>
              <p className="mt-0.5 text-xs font-semibold text-brand-600 opacity-0 transition group-hover:opacity-100">
                Explore →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
