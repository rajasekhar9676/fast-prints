"use client";

import Image from "next/image";
import Link from "next/link";
import type { HeroBanner } from "@/types/cms-content";
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  Zap,
  Clock,
  ShieldCheck,
  FileText,
  MessageCircle,
  CheckCircle2,
  Printer,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";

const QUICK_CATEGORIES = [
  { id: "vc", name: "Visiting Cards", href: "/products/visiting-cards", icon: "🎴", tag: "From ₹1.5/pc" },
  { id: "dp", name: "13x19 Digital Prints", href: "/products/13x19-digital-print", icon: "📄", tag: "Express 300/350GSM" },
  { id: "bnr", name: "Banners & Flex", href: "/products/banners-vinyl-stickers", icon: "🚩", tag: "Star & Vinyl Flex" },
  { id: "bb", name: "Bill Books", href: "/products/single-color-bill-books", icon: "📒", tag: "A4 / A5 Duplicate" },
  { id: "id", name: "ID Cards & Lanyards", href: "/products/id-cards-lanyards", icon: "🏷️", tag: "PVC + Custom Tag" },
  { id: "mug", name: "Mugs & Drinkware", href: "/products/ceramic-magic-mugs", icon: "☕", tag: "Sublimation / Magic" },
  { id: "stamp", name: "Seals & Stamps", href: "/products/seals-stamps", icon: "🔖", tag: "Self-Ink & Rubber" },
];

export function EcommerceHeroBanners({ banners }: { banners: HeroBanner[] }) {
  const [active, setActive] = useState(0);
  const slides = banners.length > 0 ? banners : [];

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  const banner = slides[active] ?? slides[0];

  return (
    <section className="space-y-4">
      {/* FULL WIDTH MAIN HERO CARD */}
      <div className="relative w-full overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-[#120e0b] via-[#1a140d] to-[#0d0a08] text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] border border-amber-500/25 ring-1 ring-white/10">
        {/* Glowing Lighting Spheres */}
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-brand-500/30 via-amber-500/20 to-transparent blur-3xl animate-pulse"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-gradient-to-tr from-amber-400/20 via-brand-600/15 to-transparent blur-3xl"
          aria-hidden
        />

        <div className="relative grid min-h-[400px] md:grid-cols-[1.25fr_0.75fr] md:min-h-[450px]">
          {/* Left Hero Content */}
          <div className="flex flex-col justify-between gap-6 p-6 sm:p-9 md:p-11 z-10">
            <div className="space-y-4">
              {/* Location & Speed Status Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500/25 via-amber-500/20 to-brand-400/20 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand-300 ring-1 ring-brand-400/40 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                  </span>
                  BTM 2nd Stage, Bengaluru
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white/80 backdrop-blur-md">
                  <Zap className="h-3 w-3 text-amber-400 fill-amber-400" /> Express Dispatch
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-[3rem] font-black leading-[1.08] tracking-tight text-white drop-shadow-md">
                {banner.label}
              </h1>

              {/* Subtitle */}
              <p className="max-w-xl text-xs sm:text-sm lg:text-base leading-relaxed text-white/80 font-normal">
                {banner.sub}
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-3 pt-1 text-xs text-white/85">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-1.5 ring-1 ring-white/10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-400" /> Upfront Rate Card
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-1.5 ring-1 ring-white/10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-400" /> GST Billing
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-1.5 ring-1 ring-white/10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-400" /> Same-Day Store Pickup
                </span>
              </div>
            </div>

            {/* Action Buttons & Slide Controls */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={banner.href}
                  className="btn-primary py-3.5 px-7 text-xs sm:text-sm font-extrabold group shadow-xl shadow-brand-500/25 ring-2 ring-brand-400/50 hover:scale-[1.02] transition-all"
                >
                  <span>{banner.cta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>

                <Link
                  href="/rate-card"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-5 py-3.5 text-xs sm:text-sm font-bold text-white transition-all ring-1 ring-white/20 backdrop-blur-md"
                >
                  <FileText className="h-4 w-4 text-brand-300" />
                  <span>Rate Card</span>
                </Link>

                <a
                  href="https://wa.me/919676000000?text=Hi%20Fastprints,%20I%20need%20a%20print%20quote"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 px-4 py-3.5 text-xs sm:text-sm font-bold text-emerald-300 transition-all ring-1 ring-emerald-400/30"
                  title="WhatsApp Quick Quote"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Banner Slide Switcher Tabs */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/50">Offers:</span>
                <div className="flex items-center gap-1.5">
                  {slides.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`Show ${item.label}`}
                      onClick={() => setActive(index)}
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        index === active
                          ? "w-9 bg-gradient-to-r from-brand-400 to-amber-400 shadow-md shadow-brand-500/50"
                          : "w-2.5 bg-white/25 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Image Showcase */}
          <div className="relative min-h-[260px] md:min-h-[420px] flex items-center justify-center p-6 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xs border-t md:border-t-0 md:border-l border-white/10">
            {/* Featured Badge */}
            <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3.5 py-1 text-[11px] font-extrabold text-amber-300 border border-amber-400/30 backdrop-blur-md shadow-lg">
              <Sparkles className="h-3 w-3 text-amber-400" />
              Featured Quality
            </div>

            {slides.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 p-6 flex items-center justify-center transition-all duration-700 ${
                  index === active
                    ? "scale-100 opacity-100 translate-y-0"
                    : "scale-90 opacity-0 translate-y-6 pointer-events-none"
                }`}
              >
                <div className="relative h-full w-full max-h-[350px]">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    priority={index === 0}
                    className="object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 90vw, 550px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FULL-WIDTH 2-COLUMN FEATURE STRIP BELOW HERO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Express Pickup & Delivery */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-500/10 via-white to-amber-50/30 p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-amber-300">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-900 ring-1 ring-amber-500/30">
                <Clock className="h-3 w-3 text-amber-600" /> Express Service
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-ink-950">
                Same-Day Print & Store Pickup
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed max-w-lg">
                Need prints urgently in Bengaluru? Order before 2 PM for doorstep delivery or collect directly from BTM 2nd Stage store.
              </p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-ink-950 shadow-md shadow-amber-500/30 font-black text-xl">
              ⚡
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-amber-200/60 pt-3">
            <span className="text-xs font-bold text-ink-600">Visiting Cards, 13x19 Digital & Flex Banners</span>
            <Link
              href="/same-day-delivery"
              className="inline-flex items-center gap-1 text-xs font-extrabold text-brand-700 hover:text-brand-900 group"
            >
              Order Express <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Card 2: Official Transparent Rates */}
        <div className="relative overflow-hidden rounded-2xl border border-brand-200/80 bg-gradient-to-br from-brand-500/10 via-white to-brand-50/30 p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-brand-300">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1 rounded-md bg-brand-500/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-900 ring-1 ring-brand-500/30">
                <FileText className="h-3 w-3 text-brand-600" /> Transparent Pricing
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-ink-950">
                Upfront Itemized Rate Card
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed max-w-lg">
                No hidden fees. View full itemized rate chart for 300/350GSM cards, digital sheets, stamps, ID tags & bill books.
              </p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-ink-950 shadow-md shadow-brand-500/30 font-black text-xl">
              📋
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-brand-200/60 pt-3">
            <span className="text-xs font-bold text-ink-600">Inclusive of 18% GST • Express Local Doorstep Delivery</span>
            <Link
              href="/rate-card"
              className="inline-flex items-center gap-1 text-xs font-extrabold text-brand-700 hover:text-brand-900 group"
            >
              View Full Rate Card <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK INSTANT ORDER CATEGORY SHORTCUT BAR */}
      <div className="rounded-2xl border border-ink-100 bg-white p-3.5 shadow-xs">
        <div className="flex items-center justify-between px-2 pb-2.5 border-b border-ink-100">
          <div className="flex items-center gap-2">
            <Printer className="h-4 w-4 text-brand-600" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-ink-900">
              Quick Instant Order Categories
            </span>
          </div>
          <span className="text-[11px] text-ink-500 font-medium hidden sm:inline">
            Select an item to configure size, quantity & price instantly
          </span>
        </div>

        <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {QUICK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group flex flex-col items-center justify-center text-center p-2.5 rounded-xl border border-ink-100/70 bg-ink-50/40 hover:bg-brand-50 hover:border-brand-300 transition-all duration-200"
            >
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-xs font-extrabold text-ink-900 group-hover:text-brand-800 line-clamp-1">
                {cat.name}
              </span>
              <span className="text-[10px] font-semibold text-ink-500 group-hover:text-brand-600 line-clamp-1">
                {cat.tag}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
