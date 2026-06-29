import { ProductCard } from "@/components/product-card";
import { SectionHeader } from "@/components/section-header";
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
    <div className="space-y-10 pb-10">
      <SectionHeader
        eyebrow="Catalogue"
        title="Shop print products"
        subtitle="Configure size, finish, and quantity — starting prices for planning. Final quotes confirmed after artwork review."
      />

      <div className="panel-light flex flex-col gap-4 p-5 md:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="scrollbar-thin flex flex-wrap gap-2 overflow-x-auto">
          <Link
            href="/products"
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
              !activeCategory
                ? "bg-ink-950 text-white shadow-md"
                : "border border-ink-200 bg-white text-ink-700 hover:border-brand-400"
            }`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/products?category=${c.id}`}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                activeCategory === c.id
                  ? "bg-brand-500 text-ink-950 shadow-md shadow-brand-500/20"
                  : "border border-ink-200 bg-white text-ink-700 hover:border-brand-400"
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
            className="min-w-0 flex-1 rounded-2xl border border-ink-200 bg-white px-4 py-2.5 text-sm shadow-inner focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
          />
          <button type="submit" className="btn-primary shrink-0 px-5 py-2.5 text-sm">
            Search
          </button>
        </form>
      </div>

      {(activeCategory || query) && (
        <p className="text-sm text-ink-500">
          Showing{" "}
          <span className="font-bold text-ink-950">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </span>
          {activeCategory ? (
            <> in <span className="font-bold text-ink-950">{categoryLabel(activeCategory)}</span></>
          ) : null}
          {query ? (
            <> for &ldquo;<span className="font-bold text-ink-950">{query}</span>&rdquo;</>
          ) : null}
          .{" "}
          <Link href="/products" className="font-bold text-brand-600 hover:underline">
            Clear filters
          </Link>
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="panel-light px-6 py-20 text-center">
          <p className="text-xl font-extrabold text-ink-950">No matches yet</p>
          <p className="mt-2 text-ink-500">Try another keyword or browse all categories.</p>
          <Link href="/products" className="btn-primary mt-8 inline-flex">
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
