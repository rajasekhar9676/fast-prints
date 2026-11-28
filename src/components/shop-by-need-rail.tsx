import Image from "next/image";
import Link from "next/link";
import type { ShopNeedItem } from "@/types/cms-content";
import { ArrowRight } from "lucide-react";

export function ShopByNeedRail({ needs }: { needs: ShopNeedItem[] }) {
  if (!needs || !needs.length) return null;

  // Display the top 4 business solutions prominently as shown in reference
  const displayedNeeds = needs.slice(0, 4);

  return (
    <section className="w-full">
      {/* Header bar matching the user's reference */}
      <div className="mb-6 flex items-baseline justify-between border-b border-neutral-200 pb-4">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Shop by business need
          </h2>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-neutral-900 hover:text-amber-600 transition-colors"
        >
          <span>Browse all</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* 4 Luxury Dark Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {displayedNeeds.map((need) => (
          <Link
            key={need.id}
            href={need.href}
            className="group relative flex aspect-[3/4.2] flex-col justify-between overflow-hidden rounded-[26px] bg-[#141416] border border-neutral-800/90 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-neutral-700 hover:shadow-2xl ring-1 ring-white/5"
          >
            {/* Top Artwork / Mockup Box (Dark Studio Container) */}
            <div className="relative h-[66%] w-full bg-gradient-to-b from-[#221f1b] via-[#1a1815] to-[#141416] p-5 sm:p-6 flex items-center justify-center overflow-hidden">
              <Image
                src={need.image}
                alt={need.title}
                fill
                className="object-contain p-3 drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 flex flex-col justify-end p-5 sm:p-6 space-y-1.5 bg-gradient-to-t from-black via-black/80 to-transparent">
              <span className="w-fit rounded px-2.5 py-0.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-amber-400 text-neutral-950">
                {need.badge || "POPULAR"}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors">
                {need.title}
              </h3>
              <p className="flex items-center gap-1 pt-0.5 text-xs sm:text-sm font-bold text-amber-400 group-hover:text-amber-300 transition-all">
                <span>Explore products</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
