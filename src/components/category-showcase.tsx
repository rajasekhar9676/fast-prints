import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";

export function CategoryShowcase() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-brand-700">Popular categories</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-ink-950 md:text-4xl">
            Everything your brand prints
          </h2>
          <p className="mt-2 max-w-2xl text-ink-600">
            Browse like a modern print marketplace — clear categories, crisp imagery, transparent starting prices.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-ink-950 underline decoration-brand-500 decoration-2 underline-offset-4 hover:text-brand-800"
        >
          View catalogue
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.id}`}
            className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <div className="relative h-36 overflow-hidden">
              <Image
                src={cat.image}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
              <span
                className={`absolute left-3 top-3 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${cat.iconColor}`}
              >
                {cat.name.split(" ")[0]}
              </span>
            </div>
            <div className="space-y-1 p-4">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink-950 group-hover:text-brand-800">
                {cat.name}
              </h3>
              <p className="text-sm text-ink-600">{cat.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
