import type { Product } from "@/types/product";
import { CompactProductCard } from "@/components/compact-product-card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type ProductRailProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  products: Product[];
  seeAllHref?: string;
  accent?: "default" | "warm";
};

export function ProductRail({
  title,
  subtitle,
  eyebrow,
  products,
  seeAllHref = "/products",
  accent = "default",
}: ProductRailProps) {
  if (products.length === 0) return null;

  const warm = accent === "warm";

  return (
    <section className={`rounded-[1.6rem] px-4 py-5 md:px-6 ${warm ? "bg-gradient-to-br from-[#fff8e8] to-white ring-1 ring-brand-200" : "border border-ink-100 bg-white shadow-sm"}`}>
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          {eyebrow ? (
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-700">{eyebrow}</p>
          ) : null}
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-ink-950">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-ink-500">{subtitle}</p> : null}
        </div>
        <Link href={seeAllHref} className="inline-flex shrink-0 items-center gap-0.5 text-sm font-bold text-ink-600 hover:text-ink-950">
          See all
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <div className="scrollbar-thin -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
        {products.map((product) => (
          <CompactProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
