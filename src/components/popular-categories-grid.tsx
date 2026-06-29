import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { SectionHeader } from "@/components/section-header";

export function PopularCategoriesGrid() {
  return (
    <section className="panel-light px-5 py-7 md:px-8 md:py-9">
      <SectionHeader
        eyebrow="Browse"
        title="Popular categories"
        subtitle="Every print service Fast Prints offers — tap to explore"
        seeAllHref="/products"
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.id}`}
            className="group flex flex-col items-center text-center"
          >
            <div className="relative mb-3 aspect-square w-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 opacity-0 blur-md transition group-hover:opacity-40" />
              <div className="card-premium relative h-full w-full overflow-hidden p-2">
                <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-white to-brand-50/40">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-contain object-center p-1.5 transition duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, 12vw"
                  />
                </div>
              </div>
            </div>
            <span className="line-clamp-2 text-xs font-bold text-ink-800 transition group-hover:text-brand-700 sm:text-sm">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
