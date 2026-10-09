import { ProductCard } from "@/components/product-card";
import {
  categoryLabelFromList,
  filterProductsList,
  getCategories,
  getProducts,
} from "@/lib/cms/queries";
import Link from "next/link";

type ProductsPageProps = {
  searchParams: Promise<{ category?: string; q?: string; budget?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const filtered = filterProductsList(products, categories, params.category, params.q, params.budget);
  const activeCategory = params.category;
  const query = params.q?.trim();
  const budget = params.budget;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-ink-950">All products</h1>
        <p className="text-sm text-ink-500">{filtered.length} items</p>
      </div>

      <div className="panel-light p-3 md:p-4">
        <div className="no-scrollbar flex flex-wrap gap-2 overflow-x-auto">
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
              href={`/category/${c.id}`}
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
      </div>

      {(activeCategory || query || budget) && (
        <p className="text-sm text-ink-500">
          Showing{" "}
          <span className="font-bold text-ink-950">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </span>
          {activeCategory ? (
            <> in <span className="font-bold text-ink-950">{categoryLabelFromList(categories, activeCategory)}</span></>
          ) : null}
          {budget ? (
            <> in budget range <span className="font-bold text-ink-950">{budget.replace("-", " – ₹")}</span></>
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
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName={categoryLabelFromList(categories, product.category)}
            />
          ))}
        </section>
      )}
    </div>
  );
}
