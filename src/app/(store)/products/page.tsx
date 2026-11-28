import { ProductCard } from "@/components/product-card";
import {
  categoryLabelFromList,
  getCategories,
  getProducts,
} from "@/lib/cms/queries";
import { MASTER_CATEGORIES, getMasterCategory } from "@/data/master-categories";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Filter,
  Grid,
  Layers,
  Sparkles,
  X,
} from "lucide-react";

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
    q?: string;
    budget?: string;
    speed?: string;
    sort?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const [allProducts, categories] = await Promise.all([getProducts(), getCategories()]);
  const activeCategory = params.category;
  const query = params.q?.trim().toLowerCase();
  const budget = params.budget;
  const speed = params.speed;
  const sort = params.sort || "featured";

  const activeMaster = activeCategory ? getMasterCategory(activeCategory) : undefined;

  // Filter products
  let filtered = allProducts.filter((product) => {
    // 1. Department / Category matching
    if (activeCategory) {
      if (activeMaster) {
        if (!activeMaster.productSlugs.includes(product.slug)) return false;
      } else if (
        product.category !== activeCategory &&
        !product.highlights?.some((h) => h.toLowerCase().includes(activeCategory.toLowerCase()))
      ) {
        return false;
      }
    }

    // 2. Query search
    if (query) {
      const match =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.highlights?.some((h) => h.toLowerCase().includes(query));
      if (!match) return false;
    }

    // 3. Turnaround speed filter
    if (speed === "same-day") {
      const isSameDay =
        product.turnaround.toLowerCase().includes("same-day") ||
        product.turnaround.toLowerCase().includes("same day");
      if (!isSameDay) return false;
    } else if (speed === "standard") {
      const isStandard =
        product.turnaround.toLowerCase().includes("24") ||
        product.turnaround.toLowerCase().includes("48") ||
        product.turnaround.toLowerCase().includes("standard");
      if (!isStandard) return false;
    }

    // 4. Budget filter
    if (budget) {
      const [minStr, maxStr] = budget.split("-");
      const min = parseInt(minStr, 10);
      const max = maxStr ? parseInt(maxStr, 10) : Infinity;
      if (product.basePrice < min || product.basePrice > max) return false;
    }

    return true;
  });

  // Sorting
  if (sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.basePrice - b.basePrice);
  } else if (sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.basePrice - a.basePrice);
  } else if (sort === "popular") {
    filtered = [...filtered].sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
  }

  // Count items per master category
  const masterCounts: Record<string, number> = {};
  for (const master of MASTER_CATEGORIES) {
    masterCounts[master.slug] = allProducts.filter((p) =>
      master.productSlugs.includes(p.slug)
    ).length;
  }

  return (
    <div className="w-full bg-[#fcfcfd] min-h-screen pb-16">
      {/* 1. Breadcrumbs Bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2.5 text-xs text-slate-500 sm:px-6 md:px-8">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <Link
            href="/products"
            className={!activeCategory ? "font-bold text-slate-900" : "hover:text-slate-900"}
          >
            All Products
          </Link>
          {activeMaster && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-bold text-slate-900">{activeMaster.name}</span>
            </>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-6">
        {/* 2. Page Title Header & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Full Printing Catalogue</span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              {activeMaster ? activeMaster.name : "All Products"}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl">
              {activeMaster
                ? activeMaster.description
                : "Explore our complete range of commercial digital prints, outdoor signages, stickers, and corporate merchandise."}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-end">
            <span className="text-xs font-bold text-slate-500">
              {filtered.length} products
            </span>

            {/* Sort Options */}
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs shadow-2xs">
              <span className="text-slate-500 font-medium">Sort:</span>
              <div className="flex items-center gap-1">
                {[
                  { id: "featured", label: "Featured" },
                  { id: "price-asc", label: "Price: Low to High" },
                  { id: "price-desc", label: "Price: High to Low" },
                  { id: "popular", label: "Popular" },
                ].map((s) => {
                  const href = `/products?${new URLSearchParams({
                    ...(activeCategory ? { category: activeCategory } : {}),
                    ...(query ? { q: query } : {}),
                    ...(speed ? { speed } : {}),
                    ...(budget ? { budget } : {}),
                    sort: s.id,
                  }).toString()}`;
                  const isCurrent = sort === s.id;
                  return (
                    <Link
                      key={s.id}
                      href={href}
                      className={`rounded px-2 py-0.5 text-xs font-semibold transition-colors ${
                        isCurrent
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {s.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Main VistaPrint 2-Column Layout (Sidebar Filters + Products Grid) */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: VistaPrint Style Sticky Filters Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                  <Filter className="h-4 w-4 text-amber-500" />
                  <span>Filters</span>
                </div>
                {(activeCategory || query || speed || budget || sort !== "featured") && (
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-800 transition-colors"
                  >
                    <span>Reset</span>
                    <X className="h-3 w-3" />
                  </Link>
                )}
              </div>

              {/* Department Filters */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Departments
                </h3>
                <div className="space-y-1">
                  <Link
                    href="/products"
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
                      !activeCategory
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-[11px] opacity-75">{allProducts.length}</span>
                  </Link>

                  {MASTER_CATEGORIES.map((m) => {
                    const isSelected = activeCategory === m.slug || activeCategory === m.id;
                    const count = masterCounts[m.slug] || 0;
                    return (
                      <Link
                        key={m.id}
                        href={`/products?category=${m.slug}`}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
                          isSelected
                            ? "bg-slate-900 text-white"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate mr-1">{m.name}</span>
                        <span className="text-[11px] opacity-75 shrink-0">{count}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Turnaround / Delivery Speed Filter */}
              <div className="border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Turnaround Speed
                </h3>
                <div className="space-y-1">
                  {[
                    { id: "all", label: "All Turnarounds", value: undefined },
                    { id: "same-day", label: "⚡ Same-Day Ready", value: "same-day" },
                    { id: "standard", label: "Standard (24–48 hrs)", value: "standard" },
                  ].map((item) => {
                    const isSelected = (!speed && !item.value) || speed === item.value;
                    const href = `/products?${new URLSearchParams({
                      ...(activeCategory ? { category: activeCategory } : {}),
                      ...(query ? { q: query } : {}),
                      ...(item.value ? { speed: item.value } : {}),
                      ...(budget ? { budget } : {}),
                      ...(sort !== "featured" ? { sort } : {}),
                    }).toString()}`;

                    return (
                      <Link
                        key={item.id}
                        href={href}
                        className={`block rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                          isSelected
                            ? "bg-amber-50 text-amber-900 font-bold border border-amber-200"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Price / Budget Range Filter */}
              <div className="border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Price Range
                </h3>
                <div className="space-y-1">
                  {[
                    { id: "all", label: "All Prices", value: undefined },
                    { id: "under-250", label: "Under ₹250", value: "0-250" },
                    { id: "250-500", label: "₹250 – ₹500", value: "250-500" },
                    { id: "500-1000", label: "₹500 – ₹1,000", value: "500-1000" },
                    { id: "above-1000", label: "₹1,000 & Above", value: "1000-100000" },
                  ].map((item) => {
                    const isSelected = (!budget && !item.value) || budget === item.value;
                    const href = `/products?${new URLSearchParams({
                      ...(activeCategory ? { category: activeCategory } : {}),
                      ...(query ? { q: query } : {}),
                      ...(speed ? { speed } : {}),
                      ...(item.value ? { budget: item.value } : {}),
                      ...(sort !== "featured" ? { sort } : {}),
                    }).toString()}`;

                    return (
                      <Link
                        key={item.id}
                        href={href}
                        className={`block rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                          isSelected
                            ? "bg-amber-50 text-amber-900 font-bold border border-amber-200"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Need Custom Bulk Order Box */}
            <div className="rounded-xl border border-slate-200 bg-slate-900 p-5 text-white shadow-2xs space-y-2.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                Corporate Volume
              </span>
              <h4 className="font-bold text-sm text-white">Need 500+ pieces or custom sizes?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Get direct wholesale slab rates, GST input credit, and sample proofing.
              </p>
              <Link
                href="/corporate"
                className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-amber-400"
              >
                <span>Request Bulk Quote</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>

          {/* Right Column: Products Grid */}
          <main className="lg:col-span-9">
            {/* If a Master Category is selected: Show Subcategory Quick Links */}
            {activeMaster && activeMaster.subcategories.length > 0 && (
              <div className="mb-6 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase mr-1">
                    Categories:
                  </span>
                  {activeMaster.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={sub.href}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-amber-400 hover:bg-amber-50 hover:text-slate-900 transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Active Filters Bar */}
            {(activeCategory || query || speed || budget) && (
              <div className="mb-5 flex flex-wrap items-center gap-2 rounded-lg bg-slate-100/80 px-3.5 py-2 text-xs text-slate-700">
                <span className="font-bold text-slate-900">Active filters:</span>
                {activeMaster && (
                  <span className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 font-semibold text-slate-800 shadow-2xs">
                    Dept: {activeMaster.name}
                  </span>
                )}
                {query && (
                  <span className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 font-semibold text-slate-800 shadow-2xs">
                    Search: &ldquo;{query}&rdquo;
                  </span>
                )}
                {speed && (
                  <span className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 font-semibold text-slate-800 shadow-2xs">
                    {speed === "same-day" ? "⚡ Same-Day" : "Standard 24-48h"}
                  </span>
                )}
                {budget && (
                  <span className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 font-semibold text-slate-800 shadow-2xs">
                    Budget: ₹{budget.replace("-", " – ₹")}
                  </span>
                )}
                <Link
                  href="/products"
                  className="ml-auto font-bold text-amber-700 hover:underline"
                >
                  Clear all
                </Link>
              </div>
            )}

            {/* Products Grid */}
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-2xs">
                <p className="text-lg font-bold text-slate-900">No products match your criteria</p>
                <p className="mt-1 text-xs text-slate-500">
                  Try clearing some filters or searching with a different term.
                </p>
                <Link
                  href="/products"
                  className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-amber-500 hover:text-slate-950 transition-colors"
                >
                  View All 63 Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryName={categoryLabelFromList(categories, product.category)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}