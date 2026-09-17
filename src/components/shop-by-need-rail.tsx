import Image from "next/image";
import Link from "next/link";
import type { ShopNeedItem } from "@/types/cms-content";

export function ShopByNeedRail({ needs }: { needs: ShopNeedItem[] }) {
  if (!needs.length) return null;

  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-700">For your business</p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-extrabold text-ink-950">Shop by need</h2>
        </div>
        <Link href="/products" className="text-sm font-bold text-ink-500 hover:text-ink-950">
          Browse all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {needs.slice(0, 4).map((need) => (
          <Link
            key={need.id}
            href={need.href}
            className="group relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-[#1c1914] shadow-sm"
          >
            <Image
              src={need.image}
              alt=""
              fill
              className="object-contain p-5 transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-4 pb-4 pt-16">
              <span className="block text-base font-extrabold text-white">{need.title}</span>
              <span className="mt-1 block text-xs font-semibold text-brand-300 opacity-0 transition group-hover:opacity-100">
                Shop now →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
