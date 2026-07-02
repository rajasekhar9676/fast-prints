"use client";

import type { SiteSettings } from "@/types/admin";
import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm shadow-inner focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [settings, setSettings] = useState(initial);
  const [addressText, setAddressText] = useState(initial.addressLines.join("\n"));
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    setMessage("");
    const payload: SiteSettings = {
      ...settings,
      addressLines: addressText.split("\n").map((l) => l.trim()).filter(Boolean),
    };
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      setSettings(payload);
      setMessage("Settings saved. Storefront contact info will update.");
    } else {
      setMessage("Could not save settings.");
    }
  }

  return (
    <form
      className="panel-light space-y-4 p-6"
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <label className="block space-y-1 text-sm">
        <span className="font-semibold text-ink-800">Business name</span>
        <input className={inputClass} value={settings.businessName} onChange={(e) => setSettings({ ...settings, businessName: e.target.value })} />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="font-semibold text-ink-800">Promo strip text (header)</span>
        <input className={inputClass} value={settings.promoText} onChange={(e) => setSettings({ ...settings, promoText: e.target.value })} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-1 text-sm">
          <span className="font-semibold text-ink-800">Phone</span>
          <input className={inputClass} value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-semibold text-ink-800">WhatsApp</span>
          <input className={inputClass} value={settings.whatsapp} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-semibold text-ink-800">Email</span>
          <input className={inputClass} value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-semibold text-ink-800">Website</span>
          <input className={inputClass} value={settings.website} onChange={(e) => setSettings({ ...settings, website: e.target.value })} />
        </label>
      </div>
      <label className="block space-y-1 text-sm">
        <span className="font-semibold text-ink-800">Address (one line per row)</span>
        <textarea className={`${inputClass} min-h-28`} value={addressText} onChange={(e) => setAddressText(e.target.value)} />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="font-semibold text-ink-800">Google Maps embed URL</span>
        <input className={inputClass} value={settings.mapEmbedUrl} onChange={(e) => setSettings({ ...settings, mapEmbedUrl: e.target.value })} />
      </label>
      <label className="block space-y-1 text-sm">
        <span className="font-semibold text-ink-800">Parking & access note</span>
        <textarea className={`${inputClass} min-h-24`} value={settings.parkingNote} onChange={(e) => setSettings({ ...settings, parkingNote: e.target.value })} />
      </label>

      {message ? <p className="text-sm font-semibold text-brand-700">{message}</p> : null}

      <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
        {saving ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
