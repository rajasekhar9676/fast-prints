"use client";

import type {
  BudgetRangeItem,
  FaqItem,
  HeroBanner,
  HomepageContent,
  HowItWorksStep,
  PerkItem,
  PrintMachine,
  PromiseItem,
  ShopNeedItem,
} from "@/types/cms-content";
import { useEffect, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm shadow-inner focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-ink-950">{children}</h2>
  );
}

export function HomepageContentEditor({ initial }: { initial: HomepageContent }) {
  const [content, setContent] = useState(initial);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => setContent(initial), [initial]);

  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/homepage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setMessage(res.ok ? "Homepage content saved. Storefront will update." : "Could not save homepage content.");
  }

  function updateBanner(index: number, patch: Partial<HeroBanner>) {
    setContent((prev) => ({
      ...prev,
      heroBanners: prev.heroBanners.map((b, i) => (i === index ? { ...b, ...patch } : b)),
    }));
  }

  function addBanner() {
    setContent((prev) => ({
      ...prev,
      heroBanners: [
        ...prev.heroBanners,
        {
          id: `banner-${Date.now()}`,
          href: "/products",
          label: "New banner",
          sub: "Short description",
          cta: "Shop now",
          image: "/images/visiting-cards.png",
        },
      ],
    }));
  }

  function removeBanner(index: number) {
    setContent((prev) => ({
      ...prev,
      heroBanners: prev.heroBanners.filter((_, i) => i !== index),
    }));
  }

  function updatePerk(index: number, patch: Partial<PerkItem>) {
    setContent((prev) => ({
      ...prev,
      perks: prev.perks.map((p, i) => (i === index ? { ...p, ...patch } : p)),
    }));
  }

  function updateStep(index: number, patch: Partial<HowItWorksStep>) {
    setContent((prev) => ({
      ...prev,
      howItWorks: prev.howItWorks.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }));
  }

  function updatePromise(index: number, patch: Partial<PromiseItem>) {
    setContent((prev) => ({
      ...prev,
      promises: prev.promises.map((p, i) => (i === index ? { ...p, ...patch } : p)),
    }));
  }

  function updateFaq(index: number, patch: Partial<FaqItem>) {
    setContent((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    }));
  }

  function addFaq() {
    setContent((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { id: `faq-${Date.now()}`, question: "New question?", answer: "Answer here." }],
    }));
  }

  function removeFaq(index: number) {
    setContent((prev) => ({ ...prev, faqs: prev.faqs.filter((_, i) => i !== index) }));
  }

  function updateNeed(index: number, patch: Partial<ShopNeedItem>) {
    setContent((prev) => ({
      ...prev,
      shopNeeds: prev.shopNeeds.map((n, i) => (i === index ? { ...n, ...patch } : n)),
    }));
  }

  function updateBudget(index: number, patch: Partial<BudgetRangeItem>) {
    setContent((prev) => ({
      ...prev,
      budgetRanges: prev.budgetRanges.map((b, i) => (i === index ? { ...b, ...patch } : b)),
    }));
  }

  function updateMachine(index: number, patch: Partial<PrintMachine>) {
    setContent((prev) => ({
      ...prev,
      facility: {
        ...prev.facility,
        machines: prev.facility.machines.map((m, i) => (i === index ? { ...m, ...patch } : m)),
      },
    }));
  }

  function addMachine() {
    setContent((prev) => ({
      ...prev,
      facility: {
        ...prev.facility,
        machines: [
          ...prev.facility.machines,
          {
            id: `machine-${Date.now()}`,
            name: "New machine",
            tag: "Capability",
            description: "Describe this equipment.",
            specs: ["Spec 1", "Spec 2"],
            image: "/images/services-overview.png",
          },
        ],
      },
    }));
  }

  function removeMachine(index: number) {
    setContent((prev) => ({
      ...prev,
      facility: {
        ...prev.facility,
        machines: prev.facility.machines.filter((_, i) => i !== index),
      },
    }));
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <SectionTitle>Hero banners</SectionTitle>
        <p className="text-sm text-ink-500">Rotating homepage banners. Image path like /images/visiting-cards.png</p>
        {content.heroBanners.map((banner, index) => (
          <div key={banner.id} className="panel-light grid gap-3 p-4 md:grid-cols-2">
            <label className="block space-y-1 text-sm">
              <span className="font-semibold text-ink-800">Title</span>
              <input className={inputClass} value={banner.label} onChange={(e) => updateBanner(index, { label: e.target.value })} />
            </label>
            <label className="block space-y-1 text-sm">
              <span className="font-semibold text-ink-800">CTA button</span>
              <input className={inputClass} value={banner.cta} onChange={(e) => updateBanner(index, { cta: e.target.value })} />
            </label>
            <label className="block space-y-1 text-sm md:col-span-2">
              <span className="font-semibold text-ink-800">Subtitle</span>
              <input className={inputClass} value={banner.sub} onChange={(e) => updateBanner(index, { sub: e.target.value })} />
            </label>
            <label className="block space-y-1 text-sm">
              <span className="font-semibold text-ink-800">Link href</span>
              <input className={inputClass} value={banner.href} onChange={(e) => updateBanner(index, { href: e.target.value })} />
            </label>
            <label className="block space-y-1 text-sm">
              <span className="font-semibold text-ink-800">Image path</span>
              <input className={inputClass} value={banner.image} onChange={(e) => updateBanner(index, { image: e.target.value })} />
            </label>
            <button type="button" onClick={() => removeBanner(index)} className="text-left text-sm font-bold text-red-700 hover:underline md:col-span-2">
              Remove banner
            </button>
          </div>
        ))}
        <button type="button" onClick={addBanner} className="btn-secondary">
          Add hero banner
        </button>
      </section>

      <section className="space-y-4">
        <SectionTitle>Store perks</SectionTitle>
        {content.perks.map((perk, index) => (
          <div key={perk.id} className="panel-light grid gap-3 p-4 md:grid-cols-3">
            <input className={inputClass} value={perk.label} onChange={(e) => updatePerk(index, { label: e.target.value })} placeholder="Label" />
            <input className={inputClass} value={perk.sub} onChange={(e) => updatePerk(index, { sub: e.target.value })} placeholder="Sub text" />
            <input className={inputClass} value={perk.gradient} onChange={(e) => updatePerk(index, { gradient: e.target.value })} placeholder="Gradient classes" />
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <SectionTitle>How it works</SectionTitle>
        {content.howItWorks.map((step, index) => (
          <div key={step.id} className="panel-light grid gap-3 p-4 md:grid-cols-2">
            <input className={inputClass} value={step.step} onChange={(e) => updateStep(index, { step: e.target.value })} placeholder="01" />
            <input className={inputClass} value={step.title} onChange={(e) => updateStep(index, { title: e.target.value })} placeholder="Title" />
            <input className={inputClass} value={step.icon} onChange={(e) => updateStep(index, { icon: e.target.value })} placeholder="Lucide icon" />
            <textarea className={`${inputClass} min-h-20 md:col-span-2`} value={step.body} onChange={(e) => updateStep(index, { body: e.target.value })} />
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <SectionTitle>Our promise</SectionTitle>
        {content.promises.map((item, index) => (
          <div key={item.id} className="panel-light grid gap-3 p-4">
            <input className={inputClass} value={item.title} onChange={(e) => updatePromise(index, { title: e.target.value })} />
            <input className={inputClass} value={item.icon} onChange={(e) => updatePromise(index, { icon: e.target.value })} placeholder="Lucide icon" />
            <textarea className={`${inputClass} min-h-20`} value={item.body} onChange={(e) => updatePromise(index, { body: e.target.value })} />
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <SectionTitle>FAQ</SectionTitle>
        {content.faqs.map((faq, index) => (
          <div key={faq.id} className="panel-light space-y-3 p-4">
            <input className={inputClass} value={faq.question} onChange={(e) => updateFaq(index, { question: e.target.value })} />
            <textarea className={`${inputClass} min-h-20`} value={faq.answer} onChange={(e) => updateFaq(index, { answer: e.target.value })} />
            <button type="button" onClick={() => removeFaq(index)} className="text-sm font-bold text-red-700 hover:underline">
              Remove FAQ
            </button>
          </div>
        ))}
        <button type="button" onClick={addFaq} className="btn-secondary">
          Add FAQ
        </button>
      </section>

      <section className="space-y-4">
        <SectionTitle>Shop by need</SectionTitle>
        {content.shopNeeds.map((need, index) => (
          <div key={need.id} className="panel-light grid gap-3 p-4 md:grid-cols-3">
            <input className={inputClass} value={need.title} onChange={(e) => updateNeed(index, { title: e.target.value })} />
            <input className={inputClass} value={need.href} onChange={(e) => updateNeed(index, { href: e.target.value })} />
            <input className={inputClass} value={need.image} onChange={(e) => updateNeed(index, { image: e.target.value })} />
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <SectionTitle>Shop by budget</SectionTitle>
        {content.budgetRanges.map((item, index) => (
          <div key={item.id} className="panel-light grid gap-3 p-4 md:grid-cols-2">
            <input className={inputClass} value={item.label} onChange={(e) => updateBudget(index, { label: e.target.value })} />
            <input className={inputClass} value={item.range} onChange={(e) => updateBudget(index, { range: e.target.value })} placeholder="0-499" />
            <input className={inputClass} value={item.sub} onChange={(e) => updateBudget(index, { sub: e.target.value })} />
            <input className={inputClass} value={item.tone} onChange={(e) => updateBudget(index, { tone: e.target.value })} placeholder="Tailwind tone classes" />
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <SectionTitle>Print facility</SectionTitle>
        <div className="panel-light grid gap-3 p-4">
          <input
            className={inputClass}
            value={content.facility.eyebrow}
            onChange={(e) => setContent((prev) => ({ ...prev, facility: { ...prev.facility, eyebrow: e.target.value } }))}
            placeholder="Eyebrow"
          />
          <input
            className={inputClass}
            value={content.facility.title}
            onChange={(e) => setContent((prev) => ({ ...prev, facility: { ...prev.facility, title: e.target.value } }))}
            placeholder="Title"
          />
          <textarea
            className={`${inputClass} min-h-20`}
            value={content.facility.body}
            onChange={(e) => setContent((prev) => ({ ...prev, facility: { ...prev.facility, body: e.target.value } }))}
          />
          <input
            className={inputClass}
            value={content.facility.overviewImage}
            onChange={(e) => setContent((prev) => ({ ...prev, facility: { ...prev.facility, overviewImage: e.target.value } }))}
            placeholder="Overview image path"
          />
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {content.facility.stats.map((stat, index) => (
              <div key={stat.id} className="space-y-2 rounded-xl border border-ink-100 p-3">
                <input
                  className={inputClass}
                  value={stat.value}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      facility: {
                        ...prev.facility,
                        stats: prev.facility.stats.map((s, i) => (i === index ? { ...s, value: e.target.value } : s)),
                      },
                    }))
                  }
                  placeholder="Value"
                />
                <input
                  className={inputClass}
                  value={stat.label}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      facility: {
                        ...prev.facility,
                        stats: prev.facility.stats.map((s, i) => (i === index ? { ...s, label: e.target.value } : s)),
                      },
                    }))
                  }
                  placeholder="Label"
                />
              </div>
            ))}
          </div>
        </div>

        {content.facility.machines.map((machine, index) => (
          <div key={machine.id} className="panel-light grid gap-3 p-4 md:grid-cols-2">
            <input className={inputClass} value={machine.name} onChange={(e) => updateMachine(index, { name: e.target.value })} />
            <input className={inputClass} value={machine.tag} onChange={(e) => updateMachine(index, { tag: e.target.value })} />
            <textarea className={`${inputClass} min-h-20 md:col-span-2`} value={machine.description} onChange={(e) => updateMachine(index, { description: e.target.value })} />
            <input className={inputClass} value={machine.image} onChange={(e) => updateMachine(index, { image: e.target.value })} />
            <input
              className={inputClass}
              value={machine.specs.join(", ")}
              onChange={(e) =>
                updateMachine(index, {
                  specs: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              placeholder="Specs (comma separated)"
            />
            <button type="button" onClick={() => removeMachine(index)} className="text-left text-sm font-bold text-red-700 hover:underline md:col-span-2">
              Remove machine
            </button>
          </div>
        ))}
        <button type="button" onClick={addMachine} className="btn-secondary">
          Add machine
        </button>
      </section>

      <section className="space-y-4">
        <SectionTitle>Brand showcase</SectionTitle>
        <div className="panel-light grid gap-3 p-4">
          <input
            className={inputClass}
            value={content.brandShowcase.eyebrow}
            onChange={(e) => setContent((prev) => ({ ...prev, brandShowcase: { ...prev.brandShowcase, eyebrow: e.target.value } }))}
          />
          <input
            className={inputClass}
            value={content.brandShowcase.title}
            onChange={(e) => setContent((prev) => ({ ...prev, brandShowcase: { ...prev.brandShowcase, title: e.target.value } }))}
          />
          <textarea
            className={`${inputClass} min-h-20`}
            value={content.brandShowcase.body}
            onChange={(e) => setContent((prev) => ({ ...prev, brandShowcase: { ...prev.brandShowcase, body: e.target.value } }))}
          />
          <input
            className={inputClass}
            value={content.brandShowcase.image}
            onChange={(e) => setContent((prev) => ({ ...prev, brandShowcase: { ...prev.brandShowcase, image: e.target.value } }))}
          />
          <textarea
            className={`${inputClass} min-h-24`}
            value={content.brandShowcase.services.join("\n")}
            onChange={(e) =>
              setContent((prev) => ({
                ...prev,
                brandShowcase: {
                  ...prev.brandShowcase,
                  services: e.target.value
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                },
              }))
            }
            placeholder="One service per line"
          />
        </div>
      </section>

      <div className="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-2xl border border-ink-100 bg-white/95 p-4 shadow-lg backdrop-blur">
        <button type="button" onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving…" : "Save homepage content"}
        </button>
        {message ? <p className="text-sm font-semibold text-brand-700">{message}</p> : null}
      </div>
    </div>
  );
}
