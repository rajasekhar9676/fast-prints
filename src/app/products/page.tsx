import { ProductCard } from "@/components/product-card";
import { categories } from "@/data/categories";
import { categoryLabel, filterProducts } from "@/lib/filter-products";
import Link from "next/link";

type ProductsPageProps = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const filtered = filterProducts(params.category, params.q);
  const activeCategory = params.category;
  const query = params.q?.trim();

  return (
    <div className="space-y-10 pb-8">
      <section className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-700">Catalogue</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold text-ink-950">
          Shop print products
        </h1>
        <p className="max-w-2xl text-lg text-ink-600">
          Configure size, finish, and quantity — starting prices shown for planning. Final quotes confirmed after artwork review.
        </p>
      </section>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="scrollbar-thin flex flex-wrap gap-2 overflow-x-auto pb-1">
          <Link
            href="/products"
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              !activeCategory ? "bg-ink-950 text-white" : "border border-ink-200 bg-white text-ink-800 hover:border-brand-400"
            }`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/products?category=${c.id}`}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCategory === c.id
                  ? "bg-brand-500 text-ink-950"
                  : "border border-ink-200 bg-white text-ink-800 hover:border-brand-400"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <form action="/products" method="get" className="flex w-full max-w-md gap-2 lg:w-auto">
          {activeCategory ? <input type="hidden" name="category" value={activeCategory} /> : null}
          <input
            name="q"
            defaultValue={query ?? ""}
            placeholder="Search catalogue…"
            className="min-w-0 flex-1 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
          />
          <button type="submit" className="rounded-xl bg-ink-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-ink-900">
            Search
          </button>
        </form>
      </div>

      {(activeCategory || query) && (
        <p className="text-sm text-ink-600">
          Showing{" "}
          <span className="font-semibold text-ink-950">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </span>
          {activeCategory ? (
            <>
              {" "}
              in <span className="font-semibold text-ink-950">{categoryLabel(activeCategory)}</span>
            </>
          ) : null}
          {query ? (
            <>
              {" "}
              for &ldquo;<span className="font-semibold text-ink-950">{query}</span>&rdquo;
            </>
          ) : null}
          .{" "}
          <Link href="/products" className="font-semibold text-brand-700 underline decoration-brand-400 underline-offset-2">
            Clear filters
          </Link>
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center">
          <p className="text-lg font-semibold text-ink-900">No matches yet</p>
          <p className="mt-2 text-ink-600">Try another keyword or browse all categories.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-ink-950"
          >
            Reset catalogue
          </Link>
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </div>
  );
}
