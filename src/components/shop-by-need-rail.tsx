import Image from "next/image";
import Link from "next/link";
import type { ShopNeedItem } from "@/types/cms-content";
import { ArrowRight, Sparkles } from "lucide-react";

export function ShopByNeedRail({ needs }: { needs: ShopNeedItem[] }) {
  if (!needs.length) return null;

  return (
    <section className="rounded-[1.8rem] border border-ink-100/80 bg-white p-5 sm:p-6 shadow-sm">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-600">
            <Sparkles className="h-3 w-3" />
            Curated solutions
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl sm:text-2xl font-extrabold text-ink-950">
            Shop by business need
          </h2>
        </div>
        <Link href="/products" className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-ink-600 hover:text-brand-700 transition-colors">
          Browse all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {needs.slice(0, 4).map((need) => (
          <Link
            key={need.id}
            href={need.href}
            className="group relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-[#1c1813] to-[#0e0c0a] shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ring-1 ring-white/10"
          >
            <Image
              src={need.image}
              alt={need.title}
              fill
              className="object-contain p-6 transition duration-700 group-hover:scale-108"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 flex flex-col justify-end">
              <span className="inline-block w-fit rounded-full bg-brand-500/20 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-300 ring-1 ring-brand-400/30 mb-1.5">
                Popular
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug drop-shadow-sm">{need.title}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs font-bold text-brand-400 opacity-90 group-hover:translate-x-1 transition-transform">
                Explore products →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

