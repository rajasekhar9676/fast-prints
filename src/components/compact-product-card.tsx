import { formatINR } from "@/lib/currency";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export function CompactProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group w-[175px] shrink-0 sm:w-[215px]">
      <article className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
        <div className="relative aspect-[4/3] w-full bg-[#f8f9fa]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-3.5 transition-transform duration-300 group-hover:scale-105"
            sizes="215px"
          />
          {product.newLaunch ? (
            <span className="absolute left-2.5 top-2.5 rounded bg-emerald-700 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
              New
            </span>
          ) : product.bestseller ? (
            <span className="absolute left-2.5 top-2.5 rounded bg-slate-900 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
              Bestseller
            </span>
          ) : product.badge ? (
            <span className="absolute left-2.5 top-2.5 rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold uppercase text-amber-300">
              {product.badge}
            </span>
          ) : null}
        </div>
        <div className="p-3">
          <h3 className="line-clamp-1 text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center justify-between gap-1 pt-2 border-t border-slate-100">
            <div>
              <span className="block text-[10px] text-slate-400">Starting at</span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-950">
                {formatINR(product.basePrice)}
              </p>
            </div>
            {product.rating ? (
              <span className="flex items-center gap-0.5 text-[11px] font-semibold text-slate-600">
                <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                {product.rating}
              </span>
            ) : null}
          </div>
        </div>
      </article>
    </Link>
  );
}
