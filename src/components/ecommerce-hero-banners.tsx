"use client";

import Image from "next/image";
import Link from "next/link";
import type { HeroBanner } from "@/types/cms-content";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

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
  const sideBanners = slides.filter((_, index) => index !== active).slice(0, 2);

  return (
    <section className="grid gap-3 lg:grid-cols-[1.55fr_0.75fr]">
      <div className="relative overflow-hidden rounded-[1.6rem] bg-[#16120c] text-white shadow-[0_18px_50px_rgba(22,18,12,0.18)]">
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-brand-500/30 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-amber-200/10 blur-3xl" aria-hidden />

        <div className="relative grid min-h-[340px] md:grid-cols-[1fr_1fr] md:min-h-[390px]">
          <div className="flex flex-col justify-between gap-6 px-6 py-7 sm:px-8 md:py-9">
            <div className="space-y-4">
              <span className="inline-flex w-fit rounded-full bg-brand-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-950">
                Bengaluru store
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl">
                {banner.label}
              </h1>
              <p className="max-w-xs text-sm leading-relaxed text-white/70">{banner.sub}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={banner.href} className="btn-primary py-2.5">
                {banner.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <div className="flex gap-1.5">
                {slides.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show ${item.label}`}
                    onClick={() => setActive(index)}
                    className={`h-1.5 rounded-full transition ${index === active ? "w-7 bg-brand-400" : "w-2 bg-white/30 hover:bg-white/60"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <Link href={banner.href} className="relative min-h-[220px]">
            {slides.map((item, index) => (
              <Image
                key={item.id}
                src={item.image}
                alt={item.label}
                fill
                priority={index === 0}
                className={`object-contain object-center p-6 transition-all duration-500 ${
                  index === active ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
                sizes="(max-width: 768px) 90vw, 420px"
              />
            ))}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        {(sideBanners.length ? sideBanners : slides.slice(0, 2)).map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group flex min-h-[140px] items-center gap-3 overflow-hidden rounded-[1.35rem] border border-ink-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 to-white">
              <Image src={item.image} alt="" fill className="object-contain p-2 transition group-hover:scale-105" sizes="96px" />
            </div>
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm font-extrabold leading-snug text-ink-950">{item.label}</p>
              <p className="mt-1 line-clamp-2 text-xs text-ink-500">{item.sub}</p>
              <p className="mt-2 text-xs font-bold text-brand-700">{item.cta} →</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
