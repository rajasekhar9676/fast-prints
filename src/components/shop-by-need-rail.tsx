import Image from "next/image";
import Link from "next/link";
import { shopByNeeds } from "@/data/shop-needs";
import { SectionHeader } from "@/components/section-header";
import { ArrowUpRight } from "lucide-react";

export function ShopByNeedRail() {
  return (
    <section>
      <SectionHeader
        eyebrow="Curated for you"
        title="Shop by business needs"
        subtitle="Industry-ready print kits — pick your scenario and start ordering"
        seeAllHref="/products"
      />
      <div className="scrollbar-thin -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 md:-mx-6 md:px-6">
        {shopByNeeds.map((need) => (
          <Link
            key={need.id}
            href={need.href}
            className="group relative w-[168px] shrink-0 sm:w-[188px]"
          >
            <div className="card-premium overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-brand-50/50 to-white">
                <Image
                  src={need.image}
                  alt={need.title}
                  fill
                  className="object-contain object-center p-3 transition duration-500 group-hover:scale-[1.03]"
                  sizes="188px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                  <p className="text-sm font-bold leading-snug text-white">{need.title}</p>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 text-ink-950 opacity-0 transition group-hover:opacity-100">
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
