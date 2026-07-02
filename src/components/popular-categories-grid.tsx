import Image from "next/image";
import Link from "next/link";
import type { ProductCategory } from "@/types/product";
import { SectionHeader } from "@/components/section-header";
import { ArrowRight } from "lucide-react";

export function PopularCategoriesGrid({ categories }: { categories: ProductCategory[] }) {
  return (
    <section>
      <SectionHeader
        eyebrow="Shop all"
        title="Explore print categories"
        subtitle="Photobooks to signage — every discipline under one roof, like a full-service print marketplace"
        seeAllHref="/products"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.id}`}
            className="group overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white to-brand-50/30">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain object-center p-4 transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-ink-50 px-4 py-3.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-ink-950 group-hover:text-brand-700">{cat.name}</p>
                <p className="truncate text-xs text-ink-500">{cat.tagline}</p>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-950 text-brand-400 transition group-hover:bg-brand-500 group-hover:text-ink-950">
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
