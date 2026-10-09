"use client";

import type { Product, ProductCategory } from "@/types/product";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useMemo } from "react";
import { calculateConfiguratorPrice } from "@/lib/pricing-calculator";
import { formatINR } from "@/lib/currency";
import { Plus, X, Sparkles, Check, Info } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm shadow-xs focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15";

type ProductFormProps = {
  product: Product;
  categories: ProductCategory[];
  mode: "create" | "edit";
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
  "11 oz Ceramic Mug",
  "55mm Pin Badge",
  "Photo Frame (4 x 6)",
  "Photo Frame (12 x 18)",
  "Round Seal Stamp",
  "Self-Ink Stamp",
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
  "Single-Sided (S/S)",
  "Double-Sided (D/S)",
];

const COMMON_QUANTITY_PRESETS = [1, 10, 24, 50, 100, 200, 500, 1000, 2000];

function splitList(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function splitNumbers(value: string) {
  return splitList(value)
    .map((n) => Number(n))
    .filter((n) => !Number.isNaN(n) && n > 0);
}

export function ProductForm({ product, categories, mode }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState(product);

  // Manage options as arrays for rich chip tags
  const [sizesList, setSizesList] = useState<string[]>(
    product.options.sizes.length ? product.options.sizes : ["Standard"]
  );
  const [finishesList, setFinishesList] = useState<string[]>(
    product.options.finishes.length ? product.options.finishes : ["Matte"]
  );
  const [quantitiesList, setQuantitiesList] = useState<number[]>(
    product.options.quantities.length ? product.options.quantities : [100, 250, 500]
  );

  const [customSizeInput, setCustomSizeInput] = useState("");
  const [customFinishInput, setCustomFinishInput] = useState("");
  const [customQtyInput, setCustomQtyInput] = useState("");

  const [highlights, setHighlights] = useState((product.highlights ?? []).join(", "));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Size tag helpers
  function addSize(size: string) {
    const s = size.trim();
    if (!s || sizesList.includes(s)) return;
    setSizesList([...sizesList, s]);
    setCustomSizeInput("");
  }

  function removeSize(size: string) {
    if (sizesList.length <= 1) return;
    setSizesList(sizesList.filter((item) => item !== size));
  }

  // Finish tag helpers
  function addFinish(finish: string) {
    const f = finish.trim();
    if (!f || finishesList.includes(f)) return;
    setFinishesList([...finishesList, f]);
    setCustomFinishInput("");
  }

  function removeFinish(finish: string) {
    if (finishesList.length <= 1) return;
    setFinishesList(finishesList.filter((item) => item !== finish));
  }

  // Quantity tag helpers
  function addQuantity(qty: number) {
    if (qty <= 0 || quantitiesList.includes(qty)) return;
    setQuantitiesList([...quantitiesList, qty].sort((a, b) => a - b));
    setCustomQtyInput("");
  }

  function removeQuantity(qty: number) {
    if (quantitiesList.length <= 1) return;
    setQuantitiesList(quantitiesList.filter((q) => q !== qty));
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as { ok?: boolean; url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(data.error ?? "Image upload failed");
        setUploading(false);
        return;
      }

      setForm((prev) => ({ ...prev, image: data.url! }));
    } catch {
      setError("Error uploading image file");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload: Product = {
      ...form,
      highlights: splitList(highlights),
      options: {
        sizes: sizesList.length ? sizesList : ["Standard"],
        finishes: finishesList.length ? finishesList : ["Matte"],
        quantities: quantitiesList.length ? quantitiesList : [100],
      },
    };

    const url = mode === "create" ? "/api/admin/products" : `/api/admin/products/${product.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Could not save product");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="panel-light space-y-6 p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block space-y-1.5 text-sm">
          <span className="font-extrabold text-ink-900">Product Name</span>
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Visiting Cards, 13x19 Digital Print..."
            required
          />
        </label>

        <label className="block space-y-1.5 text-sm">
          <span className="font-extrabold text-ink-900">URL Slug</span>
          <input
            className={inputClass}
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="e.g. visiting-cards"
            required
          />
        </label>

        <label className="block space-y-1.5 text-sm">
          <span className="font-extrabold text-ink-900">Category</span>
          <select
            className={inputClass}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as Product["category"] })}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1.5 text-sm">
          <span className="font-extrabold text-ink-900">Base Price Starting (₹)</span>
          <input
            type="number"
            className={inputClass}
            value={form.basePrice}
            onChange={(e) => setForm({ ...form, basePrice: Number(e.target.value) })}
            required
          />
        </label>

        {/* Product Image Upload Container */}
        <div className="space-y-3 rounded-2xl border border-ink-200 bg-ink-50/60 p-4 md:col-span-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-ink-950 text-sm">Product Image Asset</span>
            <span className="text-xs text-ink-500 font-medium">Upload File OR Enter Path</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-ink-700 mb-1">
                  Upload Image File from Computer
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="w-full text-xs text-ink-700 file:mr-3 file:rounded-xl file:border-0 file:bg-ink-950 file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-brand-500 hover:file:text-ink-950 file:cursor-pointer"
                />
                {uploading ? (
                  <p className="mt-1 text-xs text-brand-600 font-bold">Uploading file…</p>
                ) : null}
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-700 mb-1">
                  Image Path / Public URL
                </label>
                <input
                  className={inputClass}
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="/images/visiting-cards.png"
                  required
                />
              </div>
            </div>

            {/* Image Preview Box */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-ink-200 bg-white p-2">
              <p className="text-[10px] font-bold uppercase text-ink-400 mb-1">Preview</p>
              {form.image ? (
                <img
                  src={form.image}
                  alt="Preview"
                  className="h-20 w-20 object-contain rounded-lg border border-ink-100 p-1"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="h-20 w-20 rounded-lg bg-ink-100 flex items-center justify-center text-[10px] text-ink-400">
                  No Image
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Descriptions & Details */}
        <label className="block space-y-1.5 text-sm md:col-span-2">
          <span className="font-extrabold text-ink-900">Short Summary</span>
          <input
            className={inputClass}
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            required
          />
        </label>

        <label className="block space-y-1.5 text-sm md:col-span-2">
          <span className="font-extrabold text-ink-900">Full Description & Specs</span>
          <textarea
            className={`${inputClass} min-h-24`}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </label>

        <label className="block space-y-1.5 text-sm">
          <span className="font-extrabold text-ink-900">Turnaround Time</span>
          <input
            className={inputClass}
            value={form.turnaround}
            onChange={(e) => setForm({ ...form, turnaround: e.target.value })}
            placeholder="e.g. 2–3 days or Same Day"
          />
        </label>

        <label className="block space-y-1.5 text-sm">
          <span className="font-extrabold text-ink-900">Product Badge (Optional)</span>
          <input
            className={inputClass}
            value={form.badge ?? ""}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
            placeholder="e.g. Bestseller, Express, 300GSM"
          />
        </label>

        <label className="block space-y-1.5 text-sm md:col-span-2">
          <span className="font-extrabold text-ink-900">Highlights (comma separated)</span>
          <input
            className={inputClass}
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
            placeholder="GST Invoice, Same Day Delivery, 300GSM Board"
          />
        </label>
      </div>

      {/* --- RICH SIZE & VARIANT MANAGER SECTION --- */}
      <div className="space-y-6 rounded-2xl border-2 border-brand-400/40 bg-gradient-to-br from-brand-50/20 via-white to-amber-50/20 p-5 md:p-6 shadow-xs">
        <div className="border-b border-brand-200 pb-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-700">
            Interactive Product Size & Variant Options
          </span>
          <h3 className="text-lg font-black text-ink-950">
            Sizes, Finishes & Quantity Tiers
          </h3>
          <p className="text-xs text-ink-600 mt-0.5">
            Add or edit all sizes and options available for this product. Customers select from these exact options on the order page!
          </p>
        </div>

        {/* 1. SIZES MANAGER */}
        <div className="space-y-3 rounded-xl border border-brand-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-900">
              📏 Configured Size Formats ({sizesList.length})
            </span>
            <span className="text-[11px] text-ink-500">Click x on chip to remove size</span>
          </div>

          {/* Active Size Chips */}
          <div className="flex flex-wrap gap-2">
            {sizesList.map((size) => (
              <span
                key={size}
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-3.5 py-1.5 text-xs font-extrabold text-ink-950 shadow-xs ring-1 ring-brand-600/30"
              >
                {size}
                <button
                  type="button"
                  onClick={() => removeSize(size)}
                  className="hover:text-red-700 transition-colors"
                  title="Remove size"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>

          {/* Add Size Input */}
          <div className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="Enter custom size (e.g., A4, 12x18 inches, 2x3 ft)..."
              value={customSizeInput}
              onChange={(e) => setCustomSizeInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSize(customSizeInput);
                }
              }}
              className="flex-1 rounded-xl border border-ink-200 bg-ink-50/50 px-3.5 py-2 text-xs sm:text-sm focus:border-brand-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => addSize(customSizeInput)}
              className="btn-primary py-2 px-4 text-xs font-bold shrink-0"
            >
              + Add Size
            </button>
          </div>

          {/* Presets */}
          <div className="pt-1 border-t border-ink-100">
            <p className="text-[11px] font-extrabold text-ink-600 mb-1.5">
              Quick Size Presets (Click to add):
            </p>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_SIZE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => addSize(preset)}
                  className="rounded-lg border border-ink-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-800 hover:border-brand-400 hover:bg-brand-50 transition-colors"
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. FINISHES MANAGER */}
        <div className="space-y-3 rounded-xl border border-amber-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
              ✨ Paper Stock & Finish Options ({finishesList.length})
            </span>
            <span className="text-[11px] text-ink-500">Materials & lamination</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {finishesList.map((finish) => (
              <span
                key={finish}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-300/80 px-3 py-1.5 text-xs font-extrabold text-amber-950 shadow-xs"
              >
                {finish}
                <button
                  type="button"
                  onClick={() => removeFinish(finish)}
                  className="hover:text-red-700"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="Enter custom finish (e.g. 350GSM Texture, Velvet)..."
              value={customFinishInput}
              onChange={(e) => setCustomFinishInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addFinish(customFinishInput);
                }
              }}
              className="flex-1 rounded-xl border border-ink-200 bg-ink-50/50 px-3.5 py-2 text-xs sm:text-sm focus:border-amber-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => addFinish(customFinishInput)}
              className="rounded-xl bg-amber-500 text-ink-950 px-4 py-2 text-xs font-extrabold hover:bg-amber-400"
            >
              + Add Finish
            </button>
          </div>

          <div className="pt-1 border-t border-ink-100">
            <p className="text-[11px] font-extrabold text-ink-600 mb-1.5">
              Quick Finish Presets:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_FINISH_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => addFinish(preset)}
                  className="rounded-lg border border-ink-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-800 hover:border-amber-400 hover:bg-amber-50"
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. QUANTITY TIERS MANAGER */}
        <div className="space-y-3 rounded-xl border border-emerald-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
              📦 Batch Quantity Options ({quantitiesList.length})
            </span>
            <span className="text-[11px] text-ink-500">Order units tiers</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {quantitiesList.map((q) => (
              <span
                key={q}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-200 px-3 py-1 text-xs font-extrabold text-emerald-950"
              >
                {q} units
                <button
                  type="button"
                  onClick={() => removeQuantity(q)}
                  className="hover:text-red-700"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="pt-1 border-t border-ink-100">
            <p className="text-[11px] font-extrabold text-ink-600 mb-1.5">
              Quick Quantity Presets:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_QUANTITY_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => addQuantity(preset)}
                  className="rounded-lg border border-ink-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-800 hover:border-emerald-400 hover:bg-emerald-50"
                >
                  + {preset} units
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. LIVE RATE CALCULATOR MATRIX PREVIEW */}
        <div className="rounded-xl border border-ink-200 bg-white p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-ink-950 tracking-wider">
              📊 Live Customer Price Calculation Matrix
            </span>
            <span className="text-[11px] text-brand-700 font-bold">
              Inclusive of 18% GST Rate
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-xs text-left">
              <thead>
                <tr className="border-b border-ink-100 text-ink-500">
                  <th className="py-1.5 px-2">Size Option</th>
                  <th className="py-1.5 px-2">Selected Finish</th>
                  <th className="py-1.5 px-2">Batch Quantity</th>
                  <th className="py-1.5 px-2">Rate / Unit</th>
                  <th className="py-1.5 px-2 font-bold text-brand-800">
                    Customer Total (incl. 18% GST)
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizesList.slice(0, 4).map((size) => {
                  const finish = finishesList[0] || "Standard";
                  const units = quantitiesList[0] || 100;
                  const price = calculateConfiguratorPrice({
                    productSlug: form.slug || "visiting-cards",
                    selectedSize: size,
                    selectedFinish: finish,
                    selectedUnits: units,
                    quantity: 1,
                  });

                  return (
                    <tr key={size} className="border-b border-ink-50">
                      <td className="py-2 px-2 font-extrabold text-ink-950">{size}</td>
                      <td className="py-2 px-2 text-ink-700">{finish}</td>
                      <td className="py-2 px-2 text-ink-700">{units} units</td>
                      <td className="py-2 px-2 text-ink-800">₹{price.unitPrice} / unit</td>
                      <td className="py-2 px-2 font-black text-brand-700">
                        {formatINR(price.totalWithGst)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Flag Checkboxes */}
      <div className="flex flex-wrap gap-5 pt-2">
        <label className="inline-flex items-center gap-2 text-sm font-semibold text-ink-800 cursor-pointer">
          <input
            type="checkbox"
            checked={!!form.popular}
            onChange={(e) => setForm({ ...form, popular: e.target.checked })}
            className="rounded border-ink-300 text-brand-500 focus:ring-brand-500 h-4 w-4"
          />
          Popular Product
        </label>
        <label className="inline-flex items-center gap-2 text-sm font-semibold text-ink-800 cursor-pointer">
          <input
            type="checkbox"
            checked={!!form.bestseller}
            onChange={(e) => setForm({ ...form, bestseller: e.target.checked })}
            className="rounded border-ink-300 text-brand-500 focus:ring-brand-500 h-4 w-4"
          />
          Best Seller
        </label>
        <label className="inline-flex items-center gap-2 text-sm font-semibold text-ink-800 cursor-pointer">
          <input
            type="checkbox"
            checked={!!form.newLaunch}
            onChange={(e) => setForm({ ...form, newLaunch: e.target.checked })}
            className="rounded border-ink-300 text-brand-500 focus:ring-brand-500 h-4 w-4"
          />
          New Launch
        </label>
      </div>

      {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}

      <div className="flex flex-wrap gap-3 pt-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60 py-3 px-6 text-sm font-bold">
          {saving ? "Saving Product & Sizes…" : mode === "create" ? "Create Product" : "Save Changes"}
        </button>
        <button
          type="button"
          className="btn-secondary py-3 px-6 text-sm font-bold"
          onClick={() => router.push("/admin/products")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
