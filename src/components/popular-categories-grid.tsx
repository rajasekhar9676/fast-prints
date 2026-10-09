import Image from "next/image";
import Link from "next/link";
import type { ProductCategory } from "@/types/product";
import { ArrowUpRight, Grid } from "lucide-react";

export function PopularCategoriesGrid({ categories }: { categories: ProductCategory[] }) {
  return (
    <section className="rounded-[1.8rem] border border-ink-100/80 bg-white p-5 sm:p-6 shadow-sm">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-600">
            <Grid className="h-3 w-3" />
            Categories
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl sm:text-2xl font-extrabold text-ink-950">
            Shop by category
          </h2>
        </div>
        <Link href="/products" className="inline-flex items-center gap-0.5 text-xs sm:text-sm font-bold text-ink-600 hover:text-brand-700 transition-colors">
          View all
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-x-3 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/category/${cat.id}`} className="group flex flex-col items-center text-center">
            <span className="relative flex aspect-square w-full max-w-[84px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50/80 via-amber-50/30 to-white ring-1 ring-ink-100 shadow-xs transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-2 group-hover:ring-brand-400 group-hover:shadow-md">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain p-3.5 transition duration-500 group-hover:scale-110"
                sizes="84px"
              />
            </span>
            <span className="mt-2.5 block line-clamp-2 text-[11px] sm:text-xs font-bold leading-tight text-ink-800 transition-colors group-hover:text-brand-700">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

