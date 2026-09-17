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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_40px_rgba(245,180,22,0.12)]">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-gradient-to-br from-ink-50 via-white to-brand-50/30">
        <div className="relative m-4 h-[calc(100%-2rem)] overflow-hidden rounded-xl bg-white shadow-inner">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-3 transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </div>
        {product.badge ? (
          <span className="absolute left-5 top-5 rounded-lg bg-ink-950 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-400">
            {product.badge}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5 pt-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-600">
          {categoryName ?? product.category.replaceAll("-", " ")}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold leading-snug text-ink-950 group-hover:text-brand-700">
            {product.name}
          </h3>
        </Link>
        <p className="flex-1 text-sm leading-relaxed text-ink-500">{product.shortDescription}</p>

        <div className="rounded-xl border border-dashed border-brand-200 bg-brand-50/50 px-3 py-2.5">
          <p className="text-xs font-bold text-ink-800">Volume pricing on request</p>
          <p className="mt-0.5 text-[11px] text-ink-500">MOQ &amp; rates shared after you submit a quote</p>
        </div>

        <div className="flex gap-2 pt-1">
          <Link
            href="/corporate#bulk-quote"
            className="btn-primary flex-1 py-2.5 text-xs"
          >
            <MessageSquare className="h-3.5 w-3.5" aria-hidden />
            Request quote
          </Link>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-1 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-xs font-bold text-ink-800 transition hover:border-brand-300 hover:text-brand-700"
          >
            Details
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
