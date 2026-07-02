"use client";

import type { Product, ProductCategory } from "@/types/product";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm shadow-inner focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15";

type ProductFormProps = {
  product: Product;
  categories: ProductCategory[];
  mode: "create" | "edit";
};

function splitList(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function splitNumbers(value: string) {
  return splitList(value).map((n) => Number(n)).filter((n) => !Number.isNaN(n));
}

export function ProductForm({ product, categories, mode }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState(product);
  const [sizes, setSizes] = useState(product.options.sizes.join(", "));
  const [finishes, setFinishes] = useState(product.options.finishes.join(", "));
  const [quantities, setQuantities] = useState(product.options.quantities.join(", "));
  const [highlights, setHighlights] = useState((product.highlights ?? []).join(", "));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload: Product = {
      ...form,
      highlights: splitList(highlights),
      options: {
        sizes: splitList(sizes),
        finishes: splitList(finishes),
        quantities: splitNumbers(quantities),
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
    <form onSubmit={onSubmit} className="panel-light space-y-5 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-1 text-sm">
          <span className="font-semibold text-ink-800">Name</span>
          <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-semibold text-ink-800">Slug</span>
          <input className={inputClass} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-semibold text-ink-800">Category</span>
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
        <label className="block space-y-1 text-sm">
          <span className="font-semibold text-ink-800">Base price (₹)</span>
          <input
            type="number"
            className={inputClass}
            value={form.basePrice}
            onChange={(e) => setForm({ ...form, basePrice: Number(e.target.value) })}
            required
          />
        </label>
        <label className="block space-y-1 text-sm md:col-span-2">
          <span className="font-semibold text-ink-800">Image path</span>
          <input className={inputClass} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
        </label>
        <label className="block space-y-1 text-sm md:col-span-2">
          <span className="font-semibold text-ink-800">Short description</span>
          <input
            className={inputClass}
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            required
          />
        </label>
        <label className="block space-y-1 text-sm md:col-span-2">
          <span className="font-semibold text-ink-800">Description</span>
          <textarea
            className={`${inputClass} min-h-24`}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-semibold text-ink-800">Turnaround</span>
          <input className={inputClass} value={form.turnaround} onChange={(e) => setForm({ ...form, turnaround: e.target.value })} />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-semibold text-ink-800">Badge</span>
          <input className={inputClass} value={form.badge ?? ""} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
        </label>
        <label className="block space-y-1 text-sm md:col-span-2">
          <span className="font-semibold text-ink-800">Highlights (comma separated)</span>
          <input className={inputClass} value={highlights} onChange={(e) => setHighlights(e.target.value)} />
        </label>
        <label className="block space-y-1 text-sm md:col-span-2">
          <span className="font-semibold text-ink-800">Sizes (comma separated)</span>
          <input className={inputClass} value={sizes} onChange={(e) => setSizes(e.target.value)} required />
        </label>
        <label className="block space-y-1 text-sm md:col-span-2">
          <span className="font-semibold text-ink-800">Finishes (comma separated)</span>
          <input className={inputClass} value={finishes} onChange={(e) => setFinishes(e.target.value)} required />
        </label>
        <label className="block space-y-1 text-sm md:col-span-2">
          <span className="font-semibold text-ink-800">Quantities (comma separated numbers)</span>
          <input className={inputClass} value={quantities} onChange={(e) => setQuantities(e.target.value)} required />
        </label>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700">
          <input type="checkbox" checked={!!form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} />
          Popular
        </label>
        <label className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700">
          <input type="checkbox" checked={!!form.bestseller} onChange={(e) => setForm({ ...form, bestseller: e.target.checked })} />
          Best seller
        </label>
        <label className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700">
          <input type="checkbox" checked={!!form.newLaunch} onChange={(e) => setForm({ ...form, newLaunch: e.target.checked })} />
          New launch
        </label>
      </div>

      {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving…" : mode === "create" ? "Create product" : "Save changes"}
        </button>
        <button type="button" className="btn-secondary" onClick={() => router.push("/admin/products")}>
          Cancel
        </button>
      </div>
    </form>
  );
}
