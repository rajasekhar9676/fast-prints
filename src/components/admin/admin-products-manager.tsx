"use client";

import type { Product, ProductCategory } from "@/types/product";
import { formatINR } from "@/lib/currency";
import { calculateConfiguratorPrice } from "@/lib/pricing-calculator";
import Link from "next/link";
import { useState, useMemo } from "react";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import {
  Search,
  Layers,
  Maximize2,
  Tag,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Info,
  Edit,
  Sparkles,
  Zap,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";

type Props = {
  initialProducts: Product[];
  categories: ProductCategory[];
};

const COMMON_SIZE_PRESETS = [
  "Standard (3.5\" x 2\")",
  "Square (2.5\" x 2.5\")",
  "A4 (210 x 297 mm)",
  "A3 (297 x 420 mm)",
  "A5 (148 x 210 mm)",
  "12\" x 18\" Digital Sheet",
  "13\" x 19\" Super Sheet",
  "2 x 3 ft Banner",
  "3 x 6 ft Banner",
  "4 x 8 ft Flex",
  "11 oz Ceramic",
  "55mm Pin Badge",
  "44mm Pin Badge",
  "4 x 6 inch Frame",
  "A4 Single Color",
  "A5 Single Color",
  "Round Rubber Seal",
  "Self-Ink Medium",
];

const COMMON_FINISH_PRESETS = [
  "300GSM Board",
  "350GSM Board",
  "Matte Lamination",
  "Gloss Lamination",
  "Velvet / Soft Touch",
  "Non-Tearable Sheet",
  "Texture Paper",
  "Star Flex Banner",
  "Normal Flex Banner",
  "Vinyl Sticker",
];

export function AdminProductsManager({ initialProducts, categories }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Quick Modal State for editing sizes directly
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [modalSizes, setModalSizes] = useState<string[]>([]);
  const [modalFinishes, setModalFinishes] = useState<string[]>([]);
  const [modalQuantities, setModalQuantities] = useState<number[]>([]);
  const [newSizeInput, setNewSizeInput] = useState("");
  const [modalSaving, setModalSaving] = useState(false);
  const [modalError, setModalError] = useState("");

  const categoryMap = useMemo(
    () => new Map(categories.map((c) => [c.id, c.name])),
    [categories]
  );

  // Stats
  const totalProducts = products.length;
  const totalSizesCount = useMemo(
    () => products.reduce((acc, p) => acc + (p.options.sizes?.length || 0), 0),
    [products]
  );
  const totalFinishesCount = useMemo(
    () => products.reduce((acc, p) => acc + (p.options.finishes?.length || 0), 0),
    [products]
  );
  const totalVariantsCount = useMemo(
    () =>
      products.reduce(
        (acc, p) =>
          acc +
          (p.options.sizes?.length || 1) *
            (p.options.finishes?.length || 1) *
            (p.options.quantities?.length || 1),
        0
      ),
    [products]
  );

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategory === "all" || p.category === selectedCategory;
      const q = search.trim().toLowerCase();
      if (!q) return matchCat;

      const matchName = p.name.toLowerCase().includes(q);
      const matchSlug = p.slug.toLowerCase().includes(q);
      const matchCategory = (categoryMap.get(p.category) || "")
        .toLowerCase()
        .includes(q);
      const matchSizes = p.options.sizes.some((s) => s.toLowerCase().includes(q));
      const matchFinishes = p.options.finishes.some((f) =>
        f.toLowerCase().includes(q)
      );

      return matchCat && (matchName || matchSlug || matchCategory || matchSizes || matchFinishes);
    });
  }, [products, selectedCategory, search, categoryMap]);

  // Open Quick Edit Modal for sizes
  function openQuickEdit(product: Product) {
    setEditingProduct(product);
    setModalSizes([...product.options.sizes]);
    setModalFinishes([...product.options.finishes]);
    setModalQuantities([...product.options.quantities]);
    setNewSizeInput("");
    setModalError("");
  }

  function addModalSize(sizeName: string) {
    const trimmed = sizeName.trim();
    if (!trimmed || modalSizes.includes(trimmed)) return;
    setModalSizes([...modalSizes, trimmed]);
    setNewSizeInput("");
  }

  function removeModalSize(sizeName: string) {
    setModalSizes(modalSizes.filter((s) => s !== sizeName));
  }

  function addModalFinish(finishName: string) {
    const trimmed = finishName.trim();
    if (!trimmed || modalFinishes.includes(trimmed)) return;
    setModalFinishes([...modalFinishes, trimmed]);
  }

  function removeModalFinish(finishName: string) {
    setModalFinishes(modalFinishes.filter((f) => f !== finishName));
  }

  async function handleSaveQuickEdit() {
    if (!editingProduct) return;
    setModalSaving(true);
    setModalError("");

    const updatedProduct: Product = {
      ...editingProduct,
      options: {
        sizes: modalSizes.length > 0 ? modalSizes : ["Standard"],
        finishes: modalFinishes.length > 0 ? modalFinishes : ["Standard"],
        quantities: modalQuantities.length > 0 ? modalQuantities : [100],
      },
    };

    try {
      const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setModalError(data.error ?? "Failed to save product options");
        setModalSaving(false);
        return;
      }

      const saved: Product = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === saved.id ? saved : p))
      );
      setEditingProduct(null);
    } catch {
      setModalError("Network error while saving sizes");
    } finally {
      setModalSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Stat Counters */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-ink-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-500">
              Core Products
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              📦
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-ink-950">{totalProducts}</p>
          <p className="text-[11px] text-ink-500 mt-0.5">Base print categories</p>
        </div>

        <div className="rounded-2xl border border-brand-200/80 bg-gradient-to-br from-brand-50/40 via-white to-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Configured Sizes
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/20 text-brand-700 font-bold">
              📏
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-brand-950">{totalSizesCount}</p>
          <p className="text-[11px] text-brand-700 mt-0.5">
            Active size options across products
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/40 via-white to-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Finishes & Stocks
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-800 font-bold">
              ✨
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-amber-950">{totalFinishesCount}</p>
          <p className="text-[11px] text-amber-800 mt-0.5">
            Paper GSM, laminations & textures
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/40 via-white to-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Pricing Combinations
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-800 font-bold">
              ⚡
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-emerald-950">{totalVariantsCount}</p>
          <p className="text-[11px] text-emerald-800 mt-0.5">
            Live size x finish x quantity tiers
          </p>
        </div>
      </div>

      {/* Explanatory Banner: How Single Products & Sizes Work */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-300/80 bg-gradient-to-r from-amber-500/10 via-amber-50/50 to-white p-4 text-ink-900 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-800 font-extrabold">
            💡
          </span>
          <div className="space-y-1">
            <h3 className="text-sm font-extrabold text-ink-950">
              How Product Sizes & Variants Work in Fastprints
            </h3>
            <p className="text-xs text-ink-700 leading-relaxed max-w-4xl">
              Each item in your list (like <strong>Visiting Cards</strong>, <strong>13x19 Digital Print</strong>, or <strong>Banners</strong>) acts as a single core product that contains all its <strong>Size Options</strong> (e.g. A4, A3, 12x18, 2x3ft), <strong>Finishes</strong>, and <strong>Quantity Rate Tiers</strong>. Customers select their desired size on the store page configurator! Click <span className="font-bold text-brand-700">"View Sizes & Rates"</span> on any product below to inspect its sizes or click <span className="font-bold text-brand-700">"⚡ Quick Edit Sizes"</span> to add new sizes!
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="panel-light p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            placeholder="Search product, slug, or size (e.g. A4, 3.5x2, 12x18)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
          />
          {search ? (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-400 hover:text-ink-700"
            >
              Clear
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-xs sm:text-sm text-ink-800 font-semibold focus:border-brand-400 focus:outline-none"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <Link href="/admin/products/new" className="btn-primary py-2.5 text-xs sm:text-sm font-bold shrink-0">
            <Plus className="h-4 w-4 mr-1" /> Add Product
          </Link>
        </div>
      </div>

      {/* Main Products Table */}
      <div className="panel-light overflow-x-auto p-4">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-ink-100">
          <span className="text-xs font-bold text-ink-600 uppercase tracking-wider">
            Showing {filteredProducts.length} of {products.length} Products
          </span>
          <span className="text-[11px] text-ink-400">
            Click "View Sizes & Rates" to expand size details
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-12 text-center text-ink-500 space-y-2">
            <p className="font-bold text-sm">No products found matching your search</p>
            <p className="text-xs text-ink-400">Try searching for another keyword or clearing filters.</p>
          </div>
        ) : (
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-ink-200/80 text-ink-500 uppercase text-[11px] tracking-wider font-extrabold">
                <th className="px-3 py-3">Product</th>
                <th className="px-3 py-3">Category</th>
                <th className="px-3 py-3">Base Price</th>
                <th className="px-3 py-3">Available Sizes & Options</th>
                <th className="px-3 py-3">Flags</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filteredProducts.map((product) => {
                const isExpanded = expandedId === product.id;
                const sizesCount = product.options.sizes?.length || 0;
                const finishesCount = product.options.finishes?.length || 0;

                return (
                  <tr key={product.id} className="group hover:bg-ink-50/50 transition-colors">
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-3">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt=""
                            className="h-10 w-10 shrink-0 rounded-lg border border-ink-200 bg-white object-contain p-1"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="h-10 w-10 shrink-0 rounded-lg border border-ink-200 bg-ink-100 flex items-center justify-center text-[10px] text-ink-400 font-bold">
                            IMG
                          </div>
                        )}
                        <div>
                          <p className="font-extrabold text-ink-950 group-hover:text-brand-700 transition-colors">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-ink-400 font-mono">{product.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-3.5 font-semibold text-ink-700">
                      <span className="inline-flex items-center rounded-md bg-ink-100/80 px-2 py-0.5 text-xs text-ink-800">
                        {categoryMap.get(product.category) ?? product.category}
                      </span>
                    </td>

                    <td className="px-3 py-3.5 font-bold text-ink-950">
                      {formatINR(product.basePrice)}
                      <span className="block text-[10px] text-ink-400 font-normal">base rate</span>
                    </td>

                    {/* Sizes & Finishes Column */}
                    <td className="px-3 py-3.5">
                      <div className="space-y-1 max-w-xs">
                        <div className="flex flex-wrap items-center gap-1">
                          <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-extrabold text-brand-800 ring-1 ring-brand-200">
                            📏 {sizesCount} {sizesCount === 1 ? "Size" : "Sizes"}
                          </span>
                          {product.options.sizes.slice(0, 2).map((size) => (
                            <span
                              key={size}
                              className="inline-block truncate max-w-[120px] rounded bg-ink-100/70 px-1.5 py-0.5 text-[10px] font-semibold text-ink-800"
                            >
                              {size}
                            </span>
                          ))}
                          {sizesCount > 2 ? (
                            <span className="text-[10px] font-bold text-ink-400">
                              +{sizesCount - 2} more
                            </span>
                          ) : null}
                        </div>

                        <div className="text-[10px] text-ink-500 truncate">
                          Finishes: {product.options.finishes.join(", ")}
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-3.5 text-xs font-medium text-ink-600">
                      <div className="flex flex-wrap gap-1">
                        {product.bestseller ? (
                          <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-extrabold text-amber-900">
                            ★ Bestseller
                          </span>
                        ) : null}
                        {product.popular ? (
                          <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[10px] font-extrabold text-brand-900">
                            Popular
                          </span>
                        ) : null}
                        {product.newLaunch ? (
                          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-900">
                            New
                          </span>
                        ) : null}
                      </div>
                    </td>

                    <td className="px-3 py-3.5 text-right">
                      <div className="flex flex-wrap justify-end items-center gap-1.5">
                        {/* Toggle Size Matrix button */}
                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? null : product.id)}
                          className={`rounded-lg px-2.5 py-1.5 text-xs font-extrabold transition-all border ${
                            isExpanded
                              ? "bg-brand-500 text-white border-brand-600"
                              : "bg-ink-50 text-ink-800 border-ink-200 hover:border-brand-400 hover:bg-brand-50"
                          }`}
                        >
                          {isExpanded ? (
                            <span className="flex items-center gap-1">
                              Hide Sizes <ChevronUp className="h-3.5 w-3.5" />
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              View Sizes <ChevronDown className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </button>

                        {/* Quick Size Edit Button */}
                        <button
                          type="button"
                          onClick={() => openQuickEdit(product)}
                          className="rounded-lg border border-amber-300 bg-amber-50 px-2 py-1.5 text-xs font-bold text-amber-900 hover:bg-amber-100 transition-colors"
                          title="Edit size list and options directly"
                        >
                          ⚡ Sizes
                        </button>

                        {/* Full Edit Page Button */}
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-xs font-bold hover:border-brand-400 hover:text-brand-800"
                        >
                          Edit
                        </Link>

                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Expanded Row Accordion Details when active */}
        {expandedId ? (
          <div className="mt-4 rounded-2xl border-2 border-brand-400/50 bg-gradient-to-br from-brand-50/30 via-white to-amber-50/20 p-5 shadow-md space-y-4">
            {(() => {
              const p = products.find((prod) => prod.id === expandedId);
              if (!p) return null;

              return (
                <div>
                  <div className="flex items-center justify-between border-b border-brand-200/60 pb-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700">
                        Product Variant Matrix Breakdown
                      </span>
                      <h4 className="text-base font-black text-ink-950 flex items-center gap-2">
                        {p.name} — Size & Price Options
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openQuickEdit(p)}
                        className="btn-primary py-1.5 px-3 text-xs font-bold shadow-xs"
                      >
                        ⚡ Edit Size List & Rates
                      </button>
                      <button
                        onClick={() => setExpandedId(null)}
                        className="rounded-lg border border-ink-200 p-1.5 text-ink-500 hover:bg-ink-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-6 md:grid-cols-3">
                    {/* Sizes List Box */}
                    <div className="space-y-2 rounded-xl border border-brand-200 bg-white p-3.5">
                      <p className="text-xs font-extrabold text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
                        📏 Configured Sizes ({p.options.sizes.length})
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.options.sizes.map((s) => (
                          <span
                            key={s}
                            className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-extrabold text-brand-900 border border-brand-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-ink-500 pt-1">
                        Customers select from these exact size options on the product order page.
                      </p>
                    </div>

                    {/* Finishes List Box */}
                    <div className="space-y-2 rounded-xl border border-amber-200 bg-white p-3.5">
                      <p className="text-xs font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                        ✨ Paper & Finishes ({p.options.finishes.length})
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.options.finishes.map((f) => (
                          <span
                            key={f}
                            className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-extrabold text-amber-900 border border-amber-200"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-ink-500 pt-1">
                        Materials, paper thickness, lamination, and print textures.
                      </p>
                    </div>

                    {/* Quantities List Box */}
                    <div className="space-y-2 rounded-xl border border-emerald-200 bg-white p-3.5">
                      <p className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                        📦 Quantity Tiers ({p.options.quantities.length})
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.options.quantities.map((q) => (
                          <span
                            key={q}
                            className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-extrabold text-emerald-900 border border-emerald-200"
                          >
                            {q} units
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-ink-500 pt-1">
                        Available batch quantities per order line.
                      </p>
                    </div>
                  </div>

                  {/* Sample Customer Price Matrix Preview */}
                  <div className="mt-4 rounded-xl border border-ink-200 bg-white p-4 space-y-3">
                    <p className="text-xs font-extrabold text-ink-900 uppercase tracking-wider">
                      📊 Customer Rate Calculator Output Preview
                    </p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-ink-100 text-ink-500">
                            <th className="py-1.5 px-2">Size Option</th>
                            <th className="py-1.5 px-2">Finish Option</th>
                            <th className="py-1.5 px-2">Units Batch</th>
                            <th className="py-1.5 px-2">Rate / Unit</th>
                            <th className="py-1.5 px-2 font-bold">Total with 18% GST</th>
                          </tr>
                        </thead>
                        <tbody>
                          {p.options.sizes.slice(0, 3).map((size) => {
                            const finish = p.options.finishes[0] || "Standard";
                            const units = p.options.quantities[0] || 100;
                            const calc = calculateConfiguratorPrice({
                              productSlug: p.slug,
                              selectedSize: size,
                              selectedFinish: finish,
                              selectedUnits: units,
                              quantity: 1,
                            });

                            return (
                              <tr key={size} className="border-b border-ink-50">
                                <td className="py-2 px-2 font-bold text-ink-950">{size}</td>
                                <td className="py-2 px-2 text-ink-700">{finish}</td>
                                <td className="py-2 px-2 text-ink-700">{units} units</td>
                                <td className="py-2 px-2 text-ink-800">₹{calc.unitPrice} / unit</td>
                                <td className="py-2 px-2 font-extrabold text-brand-700">
                                  {formatINR(calc.totalWithGst)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : null}
      </div>

      {/* QUICK SIZE EDIT MODAL */}
      {editingProduct ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl space-y-5 border border-ink-200">
            <div className="flex items-center justify-between border-b border-ink-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase text-brand-600">
                  Quick Size & Variant Manager
                </span>
                <h3 className="text-lg font-black text-ink-950">
                  Manage Sizes for "{editingProduct.name}"
                </h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="rounded-xl p-2 text-ink-400 hover:bg-ink-100 hover:text-ink-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {/* Size Tags Section */}
              <div className="space-y-2 rounded-xl border border-ink-200 bg-ink-50/50 p-4">
                <label className="block text-xs font-extrabold uppercase text-ink-800 tracking-wider">
                  Configured Product Sizes ({modalSizes.length})
                </label>

                {/* Active Size Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {modalSizes.map((size) => (
                    <span
                      key={size}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-bold text-ink-950 shadow-xs ring-1 ring-brand-600/30"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => removeModalSize(size)}
                        className="hover:text-red-700 transition-colors"
                        title="Remove size"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                  {modalSizes.length === 0 ? (
                    <p className="text-xs text-red-600 font-bold">
                      Please add at least one size format.
                    </p>
                  ) : null}
                </div>

                {/* Add Custom Size Input */}
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Enter custom size (e.g., A4, 12x18, 2x3 ft)..."
                    value={newSizeInput}
                    onChange={(e) => setNewSizeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addModalSize(newSizeInput);
                      }
                    }}
                    className="flex-1 rounded-xl border border-ink-300 bg-white px-3 py-2 text-xs sm:text-sm focus:border-brand-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => addModalSize(newSizeInput)}
                    className="btn-primary py-2 px-4 text-xs font-bold shrink-0"
                  >
                    + Add Size
                  </button>
                </div>

                {/* Quick Presets Bar */}
                <div className="pt-2">
                  <p className="text-[11px] font-bold text-ink-500 mb-1">
                    Quick Common Size Presets (Click to add):
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {COMMON_SIZE_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => addModalSize(preset)}
                        className="rounded-md border border-ink-200 bg-white px-2 py-1 text-[11px] font-semibold text-ink-700 hover:border-brand-400 hover:bg-brand-50 transition-colors"
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Finishes Tags Section */}
              <div className="space-y-2 rounded-xl border border-ink-200 bg-ink-50/50 p-4">
                <label className="block text-xs font-extrabold uppercase text-ink-800 tracking-wider">
                  Paper Stock & Finishes ({modalFinishes.length})
                </label>
                <div className="flex flex-wrap gap-2">
                  {modalFinishes.map((finish) => (
                    <span
                      key={finish}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-amber-200 px-3 py-1 text-xs font-bold text-amber-950"
                    >
                      {finish}
                      <button
                        type="button"
                        onClick={() => removeModalFinish(finish)}
                        className="hover:text-red-700"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <p className="text-[11px] font-bold text-ink-500 mb-1">
                    Quick Finish Presets:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {COMMON_FINISH_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => addModalFinish(preset)}
                        className="rounded-md border border-ink-200 bg-white px-2 py-1 text-[11px] font-semibold text-ink-700 hover:border-amber-400 hover:bg-amber-50"
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {modalError ? (
              <p className="text-xs font-bold text-red-600">{modalError}</p>
            ) : null}

            <div className="flex items-center justify-end gap-3 border-t border-ink-100 pt-3">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="btn-secondary py-2 px-4 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={modalSaving}
                onClick={handleSaveQuickEdit}
                className="btn-primary py-2 px-5 text-xs font-bold disabled:opacity-50"
              >
                {modalSaving ? "Saving Sizes…" : "Save Sizes & Update"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
