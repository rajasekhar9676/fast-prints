import { formatINR } from "@/lib/currency";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export function CompactProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group w-[168px] shrink-0 sm:w-[210px]">
      <article className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
        <div className="relative aspect-[4/5] bg-[radial-gradient(circle_at_50%_35%,#fff_0%,#fff7e6_55%,#f6f4ef_100%)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition duration-500 group-hover:scale-105"
            sizes="210px"
          />
          {product.newLaunch ? (
            <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
              New
            </span>
          ) : product.badge ? (
            <span className="absolute left-3 top-3 rounded-full bg-ink-950 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-300">
              {product.badge}
            </span>
          ) : null}
        </div>
        <div className="space-y-1.5 px-3.5 py-3.5">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-ink-900">
            {product.name}
          </h3>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-extrabold text-ink-950">
              <span className="mr-1 text-[11px] font-semibold text-ink-400">From</span>
              {formatINR(product.basePrice)}
            </p>
            {product.rating ? (
              <p className="flex items-center gap-0.5 text-xs font-semibold text-ink-600">
                <Star className="h-3 w-3 fill-brand-500 text-brand-500" aria-hidden />
                {product.rating}
              </p>
            ) : null}
          </div>
        </div>
      </article>
    </Link>
  );
}
