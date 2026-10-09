import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";

type CorporateProductCardProps = {
  product: Product;
  categoryName?: string;
};

/** Printo-style corporate card — no public price, quote-first CTA */
export function CorporateProductCard({ product, categoryName }: CorporateProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-xs transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-gradient-to-br from-ink-50 via-white to-amber-50/20">
        <div className="relative m-3 h-[calc(100%-1.5rem)] overflow-hidden rounded-xl bg-white p-2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2 transition duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        {product.badge ? (
          <span className="absolute left-4 top-4 rounded-lg bg-ink-950 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-brand-300">
            {product.badge}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-4 pt-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-600">
          {categoryName ?? product.category.replaceAll("-", " ")}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold leading-tight text-ink-950 group-hover:text-brand-700 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="flex-1 text-xs leading-relaxed text-ink-500 line-clamp-2">{product.shortDescription}</p>

        <div className="rounded-xl border border-dashed border-amber-300/80 bg-amber-50/50 p-2.5">
          <p className="text-[11px] font-bold text-ink-900">Volume pricing on request</p>
          <p className="text-[10px] text-ink-500">MOQ &amp; bulk rates shared instantly</p>
        </div>

        <div className="flex gap-2 pt-0.5">
          <Link
            href="/corporate#bulk-quote"
            className="btn-primary flex-1 py-2 text-xs font-bold"
          >
            <MessageSquare className="h-3.5 w-3.5" aria-hidden />
            Get Quote
          </Link>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-1 rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs font-bold text-ink-800 transition hover:border-brand-300 hover:text-brand-700"
          >
            View
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
