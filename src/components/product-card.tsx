import { formatINR } from "@/lib/currency";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

type ProductCardProps = {
  product: Product;
  categoryName?: string;
};

export function ProductCard({ product }: ProductCardProps) {
  const isSameDay =
    product.turnaround.toLowerCase().includes("same-day") ||
    product.turnaround.toLowerCase().includes("same day");

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
      {/* Product Image Area */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-[#f8f9fa]"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-300 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1 z-10">
          {product.bestseller ? (
            <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
              Bestseller
            </span>
          ) : product.newLaunch ? (
            <span className="rounded bg-emerald-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
              New
            </span>
          ) : isSameDay ? (
            <span className="rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-950 shadow-xs">
              ⚡ Same-Day
            </span>
          ) : product.badge ? (
            <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 shadow-xs">
              {product.badge}
            </span>
          ) : null}
        </div>
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="line-clamp-1 text-sm sm:text-base font-bold text-slate-900 transition-colors group-hover:text-brand-600">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-1 text-xs text-slate-500">
            {product.shortDescription || product.turnaround}
          </p>
        </div>

        {/* Pricing & Rating Row */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="block text-[11px] font-medium text-slate-500">Starting at</span>
            <p className="text-sm sm:text-base font-extrabold text-slate-950">
              {formatINR(product.basePrice)}
            </p>
          </div>

          {product.rating ? (
            <div className="flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          ) : (
            <span className="text-[11px] font-medium text-slate-400">
              {product.turnaround}
            </span>
          )}
        </div>

        {/* Action Button */}
        <Link
          href={`/products/${product.slug}`}
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-500 hover:text-slate-950"
        >
          <span>Customize & Order</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
