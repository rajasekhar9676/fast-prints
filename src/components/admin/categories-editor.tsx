"use client";

import type { ProductCategory } from "@/types/product";
import { useEffect, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm shadow-inner focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15";

export function CategoriesEditor({ initial }: { initial: ProductCategory[] }) {
  const [categories, setCategories] = useState(initial);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCategories(initial);
  }, [initial]);

  function update(index: number, patch: Partial<ProductCategory>) {
    setCategories((prev) => prev.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  }

  function addCategory() {
    setCategories((prev) => [
      ...prev,
      {
        id: `category-${Date.now()}` as ProductCategory["id"],
        name: "New category",
        tagline: "",
        image: "/images/services-overview.png",
        iconColor: "bg-brand-500",
      },
    ]);
  }

  function removeCategory(index: number) {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categories),
    });
    setSaving(false);
    setMessage(res.ok ? "Categories saved." : "Could not save categories.");
  }

  return (
    <div className="space-y-4">
      {categories.map((category, index) => (
        <div key={category.id + index} className="panel-light grid gap-3 p-4 md:grid-cols-2">
          <label className="block space-y-1 text-sm">
            <span className="font-semibold text-ink-800">ID (slug)</span>
            <input className={inputClass} value={category.id} onChange={(e) => update(index, { id: e.target.value as ProductCategory["id"] })} />
          </label>
          <label className="block space-y-1 text-sm">
            <span className="font-semibold text-ink-800">Name</span>
            <input className={inputClass} value={category.name} onChange={(e) => update(index, { name: e.target.value })} />
          </label>
          <label className="block space-y-1 text-sm md:col-span-2">
            <span className="font-semibold text-ink-800">Tagline</span>
            <input className={inputClass} value={category.tagline} onChange={(e) => update(index, { tagline: e.target.value })} />
          </label>
          <label className="block space-y-1 text-sm md:col-span-2">
            <span className="font-semibold text-ink-800">Image path</span>
            <input className={inputClass} value={category.image} onChange={(e) => update(index, { image: e.target.value })} />
          </label>
          <div className="md:col-span-2">
            <button type="button" onClick={() => removeCategory(index)} className="text-sm font-bold text-red-700 hover:underline">
              Remove category
            </button>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={addCategory} className="btn-secondary">
          Add category
        </button>
        <button type="button" onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving…" : "Save all categories"}
        </button>
      </div>
      {message ? <p className="text-sm font-semibold text-brand-700">{message}</p> : null}
    </div>
  );
}
