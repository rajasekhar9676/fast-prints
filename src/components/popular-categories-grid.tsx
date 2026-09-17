import Image from "next/image";
import Link from "next/link";
import type { ProductCategory } from "@/types/product";

export function PopularCategoriesGrid({ categories }: { categories: ProductCategory[] }) {
  return (
    <section className="rounded-[1.6rem] border border-ink-100 bg-white px-4 py-5 shadow-sm md:px-6">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-700">Categories</p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-extrabold text-ink-950">Shop by category</h2>
        </div>
        <Link href="/products" className="text-sm font-bold text-ink-500 hover:text-ink-950">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-x-3 gap-y-5 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/products?category=${cat.id}`} className="group text-center">
            <span className="relative mx-auto flex aspect-square items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-brand-50 to-white ring-1 ring-ink-100 transition group-hover:ring-2 group-hover:ring-brand-400">
              <Image
                src={cat.image}
                alt=""
                fill
                className="object-contain p-3 transition duration-300 group-hover:scale-110"
                sizes="96px"
              />
            </span>
            <span className="mt-2 block line-clamp-2 text-[11px] font-bold leading-tight text-ink-800 group-hover:text-brand-800 sm:text-xs">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
