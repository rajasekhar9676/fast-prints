import { categories } from "@/data/categories";
import { formatINR } from "@/lib/currency";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

function categoryName(id: string) {
  return categories.find((c) => c.id === id)?.name ?? id;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.badge ? (
            <span className="rounded-full bg-brand-500 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink-950 shadow-sm">
              {product.badge}
            </span>
          ) : null}
          {product.newLaunch ? (
            <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
              New
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-brand-700">{categoryName(product.category)}</p>
        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold leading-snug text-ink-950 group-hover:text-brand-800">
          {product.name}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-ink-600">{product.shortDescription}</p>
        {product.rating ? (
          <p className="flex items-center gap-1 text-xs font-semibold text-ink-700">
            <Star className="h-3.5 w-3.5 fill-brand-500 text-brand-500" aria-hidden />
            {product.rating}
            {product.reviewCount ? (
              <span className="font-normal text-ink-500">({product.reviewCount} reviews)</span>
            ) : null}
          </p>
        ) : null}
        <p className="font-[family-name:var(--font-display)] text-lg font-bold text-ink-950">
          From {formatINR(product.basePrice)}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex w-full items-center justify-center rounded-xl bg-ink-950 py-3 text-sm font-bold text-white transition hover:bg-ink-900"
        >
          Customize & order
        </Link>
      </div>
    </article>
  );
}
