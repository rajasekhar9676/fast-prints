import { formatINR } from "@/lib/currency";
import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

type ProductCardProps = {
  product: Product;
  categoryName?: string;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] bg-[radial-gradient(circle_at_50%_35%,#fff_0%,#fff7e6_55%,#f6f4ef_100%)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-5 transition duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 50vw, 25vw"
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
      </Link>
      <div className="space-y-2.5 px-3.5 py-3.5">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.6rem] text-sm font-semibold leading-snug text-ink-900">
            {product.name}
          </h3>
        </Link>
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
        <Link
          href={`/products/${product.slug}`}
          className="flex w-full items-center justify-center rounded-xl bg-ink-950 py-2 text-xs font-bold text-white transition hover:bg-brand-500 hover:text-ink-950"
        >
          Order
        </Link>
      </div>
    </article>
  );
}
