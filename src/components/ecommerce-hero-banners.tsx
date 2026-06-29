"use client";

import Image from "next/image";
import Link from "next/link";
import { heroBanners } from "@/data/store-images";
import { ArrowRight, Clock, MapPin, Sparkles, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";

export function EcommerceHeroBanners() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % heroBanners.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const banner = heroBanners[active];

  return (
    <section className="space-y-5">
      <div className="hero-warm relative overflow-hidden rounded-[1.75rem] border border-brand-200/50 shadow-[0_20px_60px_rgba(245,180,22,0.12)]">
        <div className="hero-dot-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl"
          aria-hidden
        />

        <div className="relative grid min-h-[440px] lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div className="flex flex-col justify-center gap-6 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
            <div className="animate-fade-in-up flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-300/60 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-800 shadow-sm backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-brand-600" aria-hidden />
                Fast Prints · Bengaluru
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-ink-950 px-3 py-1 text-xs font-semibold text-white shadow-md">
                <Star className="h-3 w-3 fill-brand-400 text-brand-400" aria-hidden />
                4.9 rated locally
              </span>
            </div>

            <div className="animate-fade-in-up space-y-4" style={{ animationDelay: "0.08s" }}>
              <div className="gold-line" />
              <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.06] tracking-tight text-ink-950 md:text-5xl lg:text-[3.15rem]">
                {banner.label}
              </h1>
              <p className="max-w-md text-base leading-relaxed text-ink-600 md:text-lg">{banner.sub}</p>
            </div>

            <div className="animate-fade-in-up flex flex-wrap gap-3" style={{ animationDelay: "0.16s" }}>
              <Link href={banner.href} className="btn-primary">
                {banner.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/products" className="btn-secondary">
                Browse all products
              </Link>
            </div>

            <ul
              className="animate-fade-in-up flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-ink-600"
              style={{ animationDelay: "0.24s" }}
            >
              <li className="inline-flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-brand-600" aria-hidden />
                Same-day on select items
              </li>
              <li className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand-600" aria-hidden />
                BTM 2nd Stage pickup
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-600" aria-hidden />
                40+ print services
              </li>
            </ul>
          </div>

          {/* Product showcase */}
          <div className="relative flex items-center justify-center px-6 pb-10 pt-4 lg:px-10 lg:pb-12 lg:pt-10">
            <div className="hero-glow-ring" aria-hidden />
            <Link
              href={banner.href}
              className="animate-float group relative w-full max-w-[320px] sm:max-w-[360px]"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-3 shadow-[0_24px_48px_rgba(0,0,0,0.1)] ring-1 ring-brand-200/40 backdrop-blur-sm transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_32px_64px_rgba(245,180,22,0.2)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-b from-brand-50/80 to-white">
                  {heroBanners.map((b, i) => (
                    <Image
                      key={b.href}
                      src={b.image}
                      alt={b.label}
                      fill
                      priority={i === 0}
                      className={`object-contain object-center p-3 transition-all duration-700 ${
                        i === active ? "scale-100 opacity-100" : "scale-95 opacity-0"
                      }`}
                      sizes="(max-width: 768px) 75vw, 360px"
                    />
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-brand-50 px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-ink-950">{banner.label}</p>
                    <p className="truncate text-xs text-ink-500">Tap to customize & order</p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-ink-950 shadow-md transition group-hover:scale-110">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </div>

              {/* Floating accent cards */}
              <div className="absolute -left-4 top-8 hidden rounded-2xl border border-white bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm sm:block">
                <p className="text-[10px] font-bold uppercase tracking-wider text-brand-700">From</p>
                <p className="font-[family-name:var(--font-display)] text-lg font-extrabold text-ink-950">₹499</p>
              </div>
              <div className="absolute -right-3 bottom-20 hidden rounded-2xl border border-brand-200 bg-brand-500 px-3 py-2 shadow-lg sm:block">
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-900/70">Express</p>
                <p className="text-xs font-extrabold text-ink-950">Same day</p>
              </div>
            </Link>
          </div>
        </div>

        {/* In-hero category tabs */}
        <div className="relative border-t border-brand-200/40 bg-white/50 px-4 py-4 backdrop-blur-sm sm:px-6">
          <div className="grid gap-2 sm:grid-cols-3">
            {heroBanners.map((b, i) => (
              <button
                key={b.href}
                type="button"
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 rounded-2xl border-2 p-2.5 text-left transition-all duration-200 sm:p-3 ${
                  i === active
                    ? "border-brand-500 bg-white shadow-md shadow-brand-500/10"
                    : "border-transparent bg-white/40 hover:border-brand-200 hover:bg-white/80"
                }`}
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-brand-50 ring-1 ring-brand-100">
                  <Image src={b.image} alt="" fill className="object-contain p-1" sizes="48px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm font-bold ${i === active ? "text-ink-950" : "text-ink-700"}`}>
                    {b.label}
                  </p>
                  <p className="truncate text-xs text-ink-500">{b.sub}</p>
                </div>
                {i === active ? (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-brand-500" aria-hidden />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
