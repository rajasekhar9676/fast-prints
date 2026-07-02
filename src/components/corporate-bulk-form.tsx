"use client";

import { FormEvent, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 shadow-inner focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15";

export function CorporateBulkForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? ""),
      product: String(form.get("product") ?? ""),
      quantity: String(form.get("quantity") ?? ""),
      notes: String(form.get("notes") ?? ""),
    };

    const res = await fetch("/api/corporate-inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStatus(res.ok ? "done" : "error");
    if (res.ok) e.currentTarget.reset();
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center">
        <p className="font-[family-name:var(--font-display)] text-xl font-extrabold text-ink-950">Request received</p>
        <p className="mt-2 text-sm text-ink-600">Our corporate desk will call you shortly to confirm quantity, artwork, and timeline.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-primary mt-6">
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form id="bulk-quote" onSubmit={onSubmit} className="panel-light space-y-4 p-6 md:p-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Bulk quote</p>
        <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink-950">
          Tell us what you need
        </h2>
        <p className="mt-2 text-sm text-ink-500">Share details — we&apos;ll reach out with pricing and samples.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input required name="name" placeholder="Your name" className={inputClass} />
        <input required name="phone" placeholder="Phone number" className={inputClass} />
        <input required name="email" type="email" placeholder="Work email" className={inputClass} />
        <input name="company" placeholder="Company name" className={inputClass} />
        <input required name="product" placeholder="Product (e.g. visiting cards, ID kits)" className={inputClass} />
        <input required name="quantity" placeholder="Quantity needed" className={inputClass} />
      </div>
      <textarea name="notes" placeholder="Artwork status, deadline, delivery location…" className={`${inputClass} min-h-28`} />

      {status === "error" ? (
        <p className="text-sm font-semibold text-red-600">Could not submit. Please call +91 91647 79922.</p>
      ) : null}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full py-3.5 disabled:opacity-60">
        {status === "loading" ? "Sending…" : "Yes, I'm interested"}
      </button>
    </form>
  );
}
