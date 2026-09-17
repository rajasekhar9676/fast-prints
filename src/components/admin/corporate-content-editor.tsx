"use client";

import type { CorporateContent, CorporateFeature, CorporateSolution } from "@/types/cms-content";
import { useEffect, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm shadow-inner focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15";

export function CorporateContentEditor({ initial }: { initial: CorporateContent }) {
  const [content, setContent] = useState(initial);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => setContent(initial), [initial]);

  function updateFeature(index: number, patch: Partial<CorporateFeature>) {
    setContent((prev) => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    }));
  }

  function updateSolution(index: number, patch: Partial<CorporateSolution>) {
    setContent((prev) => ({
      ...prev,
      solutions: prev.solutions.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/corporate", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setMessage(res.ok ? "Corporate content saved." : "Could not save corporate content.");
  }

  return (
    <div className="space-y-8">
      <section className="panel-light space-y-3 p-4">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-ink-950">Corporate hero</h2>
        <input
          className={inputClass}
          value={content.heroEyebrow}
          onChange={(e) => setContent((prev) => ({ ...prev, heroEyebrow: e.target.value }))}
          placeholder="Eyebrow"
        />
        <input
          className={inputClass}
          value={content.heroTitle}
          onChange={(e) => setContent((prev) => ({ ...prev, heroTitle: e.target.value }))}
          placeholder="Title"
        />
        <textarea
          className={`${inputClass} min-h-24`}
          value={content.heroBody}
          onChange={(e) => setContent((prev) => ({ ...prev, heroBody: e.target.value }))}
        />
        <input
          className={inputClass}
          value={content.heroImage}
          onChange={(e) => setContent((prev) => ({ ...prev, heroImage: e.target.value }))}
          placeholder="Hero image path"
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-ink-950">Features</h2>
        {content.features.map((feature, index) => (
          <div key={feature.id} className="panel-light space-y-3 p-4">
            <input className={inputClass} value={feature.title} onChange={(e) => updateFeature(index, { title: e.target.value })} />
            <textarea className={`${inputClass} min-h-20`} value={feature.body} onChange={(e) => updateFeature(index, { body: e.target.value })} />
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-ink-950">Solutions</h2>
        {content.solutions.map((solution, index) => (
          <div key={solution.id} className="panel-light grid gap-3 p-4 md:grid-cols-2">
            <input className={inputClass} value={solution.title} onChange={(e) => updateSolution(index, { title: e.target.value })} />
            <input className={inputClass} value={solution.icon} onChange={(e) => updateSolution(index, { icon: e.target.value })} placeholder="Lucide icon" />
            <textarea
              className={`${inputClass} min-h-20 md:col-span-2`}
              value={solution.body}
              onChange={(e) => updateSolution(index, { body: e.target.value })}
            />
          </div>
        ))}
      </section>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving…" : "Save corporate content"}
        </button>
        {message ? <p className="text-sm font-semibold text-brand-700">{message}</p> : null}
      </div>
    </div>
  );
}
