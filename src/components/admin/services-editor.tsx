"use client";

import type { Service } from "@/types/product";
import { useEffect, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm shadow-inner focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15";

export function ServicesEditor({ initial }: { initial: Service[] }) {
  const [services, setServices] = useState(initial);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setServices(initial);
  }, [initial]);

  function update(index: number, patch: Partial<Service>) {
    setServices((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  function addService() {
    setServices((prev) => [
      ...prev,
      {
        id: `srv-${Date.now()}`,
        name: "New service",
        description: "",
        category: "Core Printing",
        icon: "Printer",
      },
    ]);
  }

  function removeService(index: number) {
    setServices((prev) => prev.filter((_, i) => i !== index));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(services),
    });
    setSaving(false);
    setMessage(res.ok ? "Services saved." : "Could not save services.");
  }

  return (
    <div className="space-y-4">
      {services.map((service, index) => (
        <div key={service.id + index} className="panel-light grid gap-3 p-4 md:grid-cols-2">
          <label className="block space-y-1 text-sm">
            <span className="font-semibold text-ink-800">Name</span>
            <input className={inputClass} value={service.name} onChange={(e) => update(index, { name: e.target.value })} />
          </label>
          <label className="block space-y-1 text-sm">
            <span className="font-semibold text-ink-800">Category group</span>
            <input className={inputClass} value={service.category} onChange={(e) => update(index, { category: e.target.value })} />
          </label>
          <label className="block space-y-1 text-sm">
            <span className="font-semibold text-ink-800">Icon (Lucide name)</span>
            <input className={inputClass} value={service.icon} onChange={(e) => update(index, { icon: e.target.value })} />
          </label>
          <label className="block space-y-1 text-sm md:col-span-2">
            <span className="font-semibold text-ink-800">Description</span>
            <textarea className={`${inputClass} min-h-20`} value={service.description} onChange={(e) => update(index, { description: e.target.value })} />
          </label>
          <div className="md:col-span-2">
            <button type="button" onClick={() => removeService(index)} className="text-sm font-bold text-red-700 hover:underline">
              Remove service
            </button>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={addService} className="btn-secondary">
          Add service
        </button>
        <button type="button" onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving…" : "Save all services"}
        </button>
      </div>
      {message ? <p className="text-sm font-semibold text-brand-700">{message}</p> : null}
    </div>
  );
}
