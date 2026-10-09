import { ProductCard } from "@/components/product-card";
import {
  categoryLabelFromList,
  getCategories,
  getProducts,
} from "@/lib/cms/queries";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

const categoryAliasMap: Record<string, string> = {
  "labels-packaging": "packaging",
  "stickers-labels": "packaging",
  "stickers": "packaging",
  "business-cards": "business-essentials",
  "visiting-cards": "business-essentials",
  "banners-signage": "large-format",
  "signage": "large-format",
  "bill-books": "stationery",
  "id-cards": "events",
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const categories = await getCategories();
  const resolvedSlug = categoryAliasMap[categorySlug] || categorySlug;
  const category = categories.find((c) => c.id === resolvedSlug);

  if (!category) {
    return {
      title: "Category Not Found · Fast Prints Bengaluru",
    };
  }

  return {
    title: `${category.name} Printing Bengaluru | Fast Prints BTM`,
    description: `${category.tagline || category.name} — Order ${category.name.toLowerCase()} in Bengaluru with high quality print finish and express delivery.`,
    keywords: [`${category.name} printing Bengaluru`, `BTM ${category.name}`, `Fast Prints ${category.name}`],
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const resolvedSlug = categoryAliasMap[categorySlug] || categorySlug;
  const category = categories.find((c) => c.id === resolvedSlug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.category === resolvedSlug);

  return (
    <div className="space-y-6 pb-12">
      {/* Category Hero Banner */}
      <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#181512] via-[#0f0d0b] to-[#1a1610] p-6 sm:p-8 text-white shadow-lg border border-brand-500/20">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" aria-hidden />
        
        <div className="relative space-y-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-300 hover:text-white transition-colors mb-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All categories
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-300 ring-1 ring-brand-400/30">
            <Sparkles className="h-3 w-3 text-brand-400" />
            Bengaluru Print Shop
          </span>

          <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl font-extrabold text-white">
            {category.name}
          </h1>

          <p className="max-w-2xl text-xs sm:text-sm text-white/75 leading-relaxed">
            {category.tagline || `Browse our complete range of ${category.name.toLowerCase()} printing options with custom sizes, finishes, and fast Bengaluru turnaround.`}
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto py-1">
        <Link
          href="/products"
          className="shrink-0 rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-bold text-ink-700 hover:border-brand-400 hover:text-ink-950 transition"
        >
          All Products
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/category/${c.id}`}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
              c.id === categorySlug
                ? "bg-brand-500 text-ink-950 shadow-md shadow-brand-500/20"
                : "border border-ink-200 bg-white text-ink-700 hover:border-brand-400"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Products Grid */}
      {categoryProducts.length === 0 ? (
        <div className="panel-light px-6 py-16 text-center rounded-2xl">
          <p className="text-xl font-extrabold text-ink-950">No products in this category yet</p>
          <p className="mt-2 text-sm text-ink-500">Explore other categories or contact our BTM team for custom orders.</p>
          <Link href="/products" className="btn-primary mt-6 inline-flex text-xs">
            Browse All Catalogue
          </Link>
        </div>
      ) : (
        <section className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
          {categoryProducts.map((product) => (
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
