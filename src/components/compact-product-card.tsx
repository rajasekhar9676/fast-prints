import { formatINR } from "@/lib/currency";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

type CompactProductCardProps = {
  product: Product;
};

export function CompactProductCard({ product }: CompactProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group flex w-[172px] shrink-0 flex-col sm:w-[196px]">
      <article className="card-premium overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-white via-brand-50/30 to-ink-50 p-3">
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-white shadow-inner">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain object-center p-1.5 transition duration-500 group-hover:scale-[1.03]"
              sizes="196px"
            />
          </div>
          {product.badge ? (
            <span className="absolute left-3 top-3 rounded-lg bg-ink-950 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-400">
              {product.badge}
            </span>
          ) : null}
          {product.newLaunch ? (
            <span className="absolute right-3 top-3 rounded-lg bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
              New
            </span>
          ) : null}
          <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-ink-950 opacity-0 shadow-lg transition group-hover:opacity-100">
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
        <div className="space-y-1.5 px-4 pb-4 pt-3">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-ink-900 group-hover:text-brand-700">
            {product.name}
          </h3>
          {product.rating ? (
            <p className="flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 fill-brand-500 text-brand-500" aria-hidden />
              <span className="font-bold text-ink-800">{product.rating}</span>
            </p>
          ) : null}
          <p className="font-[family-name:var(--font-display)] text-lg font-extrabold text-ink-950">
            {formatINR(product.basePrice)}
          </p>
        </div>
      </article>
    </Link>
  );
}
