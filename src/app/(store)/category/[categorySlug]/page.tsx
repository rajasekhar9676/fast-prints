import { ProductCard } from "@/components/product-card";
import {
  categoryLabelFromList,
  getCategories,
  getProducts,
} from "@/lib/cms/queries";
import {
  getMasterCategories,
  getMasterCategory,
  isProductInMasterCategory,
} from "@/data/master-categories";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

const categoryAliasMap: Record<string, string> = {
  "labels-packaging": "packaging",
  "stickers-labels": "packaging",
  "stickers": "packaging",
  "business-cards": "digital-prints",
  "visiting-cards": "digital-prints",
  "banners-signage": "banners-signages",
  "signage": "banners-signages",
  "bill-books": "digital-prints",
  "id-cards": "digital-prints",
  "gifts": "gifts-merchandise",
  "merchandise": "gifts-merchandise",
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const categories = await getCategories();
  const resolvedSlug = categoryAliasMap[categorySlug] || categorySlug;
  const master = getMasterCategory(resolvedSlug);
  const category = categories.find((c) => c.id === resolvedSlug);

  if (!category && !master) {
    return {
      title: "Category Not Found · Fast Prints Bengaluru",
    };
  }

  const titleName = master ? master.name : category?.name;
  const tagline = master ? master.tagline : category?.tagline;

  return {
    title: `${titleName} Printing Bengaluru | Fast Prints BTM`,
    description: `${tagline || titleName} — Order ${titleName?.toLowerCase()} in Bengaluru with high quality print finish and express delivery.`,
    keywords: [`${titleName} printing Bengaluru`, `BTM ${titleName}`, `Fast Prints ${titleName}`],
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const resolvedSlug = categoryAliasMap[categorySlug] || categorySlug;
  const master = getMasterCategory(resolvedSlug);
  const category = categories.find((c) => c.id === resolvedSlug);

  if (!category && !master) {
    notFound();
  }

  const categoryName = master ? master.name : category?.name || resolvedSlug;
  const categoryTagline = master ? master.tagline : category?.tagline;
  const categoryBadge = master ? master.badge : "Bengaluru Print Shop";

  // Filter products: If master category, get all products belonging to it; otherwise filter by specific category ID
  const categoryProducts = master
    ? products.filter((p) => isProductInMasterCategory(p, master.id))
    : products.filter((p) => p.category === resolvedSlug);

  const masterList = getMasterCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-7 space-y-6 pb-12">
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

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-300 ring-1 ring-brand-400/30">
              <Sparkles className="h-3 w-3 text-brand-400" />
              {categoryBadge}
            </span>
            <span className="text-xs text-white/50">• {categoryProducts.length} Products Available</span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl font-extrabold text-white">
            {categoryName}
          </h1>

          <p className="max-w-2xl text-xs sm:text-sm text-white/75 leading-relaxed">
            {categoryTagline ||
              `Browse our complete range of ${categoryName.toLowerCase()} printing options with custom sizes, finishes, and fast Bengaluru turnaround.`}
          </p>

          {/* If Master Category: Show Subcategory Shortcuts */}
          {master && master.subcategories.length > 0 && (
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1.5">
                Included in this department:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {master.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={sub.href}
                    className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/90 hover:bg-brand-500 hover:text-ink-950 transition"
                  >
                    <CheckCircle2 className="h-2.5 w-2.5 text-brand-400" />
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3 Master Category Switcher Pills */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto py-1">
        <Link
          href="/products"
          className="shrink-0 rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-bold text-ink-700 hover:border-brand-400 hover:text-ink-950 transition"
        >
          All Products
        </Link>

        {masterList.map((m) => (
          <Link
            key={m.id}
            href={`/category/${m.slug}`}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
              resolvedSlug === m.slug || resolvedSlug === m.id
                ? "bg-brand-500 text-ink-950 shadow-md shadow-brand-500/20"
                : "border border-ink-200 bg-white text-ink-700 hover:border-brand-400 hover:text-ink-950"
            }`}
          >
            {m.name}
          </Link>
        ))}
      </div>

      {/* Products Grid */}
      {categoryProducts.length === 0 ? (
        <div className="panel-light px-6 py-16 text-center rounded-2xl">
          <p className="text-xl font-extrabold text-ink-950">No products in this category yet</p>
          <p className="mt-2 text-sm text-ink-500">
            Explore other categories or contact our BTM team for custom orders.
          </p>
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
