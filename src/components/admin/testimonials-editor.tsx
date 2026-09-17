"use client";

import type { Testimonial, TestimonialsContent } from "@/types/cms-content";
import { useEffect, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm shadow-inner focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15";

export function TestimonialsEditor({ initial }: { initial: TestimonialsContent }) {
  const [content, setContent] = useState(initial);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => setContent(initial), [initial]);

  function updateItem(index: number, patch: Partial<Testimonial>) {
    setContent((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }));
  }

  function addItem() {
    setContent((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `review-${Date.now()}`,
          name: "Customer name",
          role: "Role",
          location: "Bengaluru",
          rating: 5,
          text: "Write the review here.",
          featured: false,
        },
      ],
    }));
  }

  function removeItem(index: number) {
    setContent((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setMessage(res.ok ? "Testimonials saved." : "Could not save testimonials.");
  }

  return (
    <div className="space-y-6">
      <section className="panel-light grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block space-y-1 text-sm">
          <span className="font-semibold text-ink-800">Average rating</span>
          <input
            type="number"
            step="0.1"
            className={inputClass}
            value={content.stats.averageRating}
            onChange={(e) =>
              setContent((prev) => ({
                ...prev,
                stats: { ...prev.stats, averageRating: Number(e.target.value) || 0 },
              }))
            }
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-semibold text-ink-800">Total reviews label</span>
          <input
            className={inputClass}
            value={content.stats.totalReviews}
            onChange={(e) => setContent((prev) => ({ ...prev, stats: { ...prev.stats, totalReviews: e.target.value } }))}
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-semibold text-ink-800">Repeat customers</span>
          <input
            className={inputClass}
            value={content.stats.repeatCustomers}
            onChange={(e) =>
              setContent((prev) => ({ ...prev, stats: { ...prev.stats, repeatCustomers: e.target.value } }))
            }
          />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-semibold text-ink-800">Years serving</span>
          <input
            className={inputClass}
            value={content.stats.yearsServing}
            onChange={(e) => setContent((prev) => ({ ...prev, stats: { ...prev.stats, yearsServing: e.target.value } }))}
          />
        </label>
      </section>

      {content.items.map((item, index) => (
        <div key={item.id} className="panel-light grid gap-3 p-4 md:grid-cols-2">
          <input className={inputClass} value={item.name} onChange={(e) => updateItem(index, { name: e.target.value })} placeholder="Name" />
          <input className={inputClass} value={item.role} onChange={(e) => updateItem(index, { role: e.target.value })} placeholder="Role" />
          <input
            className={inputClass}
            value={item.company ?? ""}
            onChange={(e) => updateItem(index, { company: e.target.value })}
            placeholder="Company (optional)"
          />
          <input className={inputClass} value={item.location} onChange={(e) => updateItem(index, { location: e.target.value })} placeholder="Location" />
          <input
            className={inputClass}
            value={item.product ?? ""}
            onChange={(e) => updateItem(index, { product: e.target.value })}
            placeholder="Product mentioned"
          />
          <label className="flex items-center gap-3 text-sm font-semibold text-ink-800">
            Rating
            <input
              type="number"
              min={1}
              max={5}
              className="w-20 rounded-xl border border-ink-200 px-3 py-2"
              value={item.rating}
              onChange={(e) => updateItem(index, { rating: Math.min(5, Math.max(1, Number(e.target.value) || 5)) })}
            />
            <input
              type="checkbox"
              checked={Boolean(item.featured)}
              onChange={(e) => updateItem(index, { featured: e.target.checked })}
            />
            Featured on homepage
          </label>
          <textarea
            className={`${inputClass} min-h-24 md:col-span-2`}
            value={item.text}
            onChange={(e) => updateItem(index, { text: e.target.value })}
          />
          <button type="button" onClick={() => removeItem(index)} className="text-left text-sm font-bold text-red-700 hover:underline md:col-span-2">
            Remove review
          </button>
        </div>
      ))}

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={addItem} className="btn-secondary">
          Add review
        </button>
        <button type="button" onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving…" : "Save testimonials"}
        </button>
      </div>
      {message ? <p className="text-sm font-semibold text-brand-700">{message}</p> : null}
    </div>
  );
}
