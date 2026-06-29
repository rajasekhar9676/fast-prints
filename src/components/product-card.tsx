import { categories } from "@/data/categories";
import { formatINR } from "@/lib/currency";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

function categoryName(id: string) {
  return categories.find((c) => c.id === id)?.name ?? id;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="card-premium group flex h-full flex-col overflow-hidden">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-gradient-to-br from-white via-brand-50/20 to-ink-50 p-3">
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-white shadow-inner">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain object-center p-2 transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </div>
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.badge ? (
            <span className="rounded-lg bg-ink-950 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-400">
              {product.badge}
            </span>
          ) : null}
          {product.newLaunch ? (
            <span className="rounded-lg bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
              New
            </span>
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-600">
          {categoryName(product.category)}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold leading-snug text-ink-950 group-hover:text-brand-700">
            {product.name}
          </h3>
        </Link>
        <p className="flex-1 text-sm leading-relaxed text-ink-500">{product.shortDescription}</p>
        {product.rating ? (
          <p className="flex items-center gap-1 text-xs font-semibold text-ink-700">
            <Star className="h-3.5 w-3.5 fill-brand-500 text-brand-500" aria-hidden />
            {product.rating}
            {product.reviewCount ? (
              <span className="font-normal text-ink-400">({product.reviewCount})</span>
            ) : null}
          </p>
        ) : null}
        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="font-[family-name:var(--font-display)] text-xl font-extrabold text-ink-950">
            {formatINR(product.basePrice)}
          </p>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-ink-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-brand-500 hover:text-ink-950"
          >
            Order
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
