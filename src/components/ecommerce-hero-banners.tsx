"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Printer,
} from "lucide-react";
import { useEffect, useState } from "react";

const AI_HERO_SLIDES = [
  {
    id: "corporate-calendars",
    badge: "2027 Calendar Editions",
    title: "Custom 2027 Desk & Wall Calendars",
    subtitle:
      "Premium 350GSM textured matte card, gold spiral wire-o binding & personalized company dates for 2027.",
    href: "/category/stationery",
    image: "/images/hero/fastprints-2027-desk-calendar.jpg",
  },
  {
    id: "corporate-diaries",
    badge: "2027 Corporate Collection",
    title: "Custom 2027 Corporate Diaries & Planners",
    subtitle:
      "Handbound leatherette journals with metallic gold foil debossing, silk ribbons & custom 2027 company inserts.",
    href: "/corporate",
    image: "/images/hero/fastprints-2027-executive-diaries.jpg",
  },
  {
    id: "corporate-gifts",
    badge: "2027 Executive Gifting",
    title: "Curated 2027 Corporate Gift Sets & Hampers",
    subtitle:
      "Laser-engraved thermal flasks, luxury rollerball pens, ceramic mugs & custom luxury onboarding boxes.",
    href: "/corporate",
    image: "/images/hero/fastprints-2027-corporate-gifts.jpg",
  },
];

const QUICK_CATEGORIES = [
  { id: "diary", name: "Corporate Diaries", href: "/corporate", icon: "📔", tag: "Hardbound & Leather" },
  { id: "cal", name: "Desk Calendars", href: "/category/stationery", icon: "🗓️", tag: "Wire-O & Tent" },
  { id: "gifts", name: "Gift Sets & Hampers", href: "/corporate", icon: "🎁", tag: "Kits & Engraved" },
  { id: "vc", name: "Visiting Cards", href: "/products/visiting-cards", icon: "🎴", tag: "From ₹1.5/pc" },
  { id: "dp", name: "13x19 Digital Prints", href: "/products/13x19-digital-print", icon: "📄", tag: "Express 300/350GSM" },
  { id: "bnr", name: "Banners & Flex", href: "/products/banners-vinyl-stickers", icon: "🚩", tag: "Star & Vinyl Flex" },
  { id: "id", name: "ID Cards & Lanyards", href: "/products/id-cards-lanyards", icon: "🏷️", tag: "PVC + Custom Tag" },
];

export function EcommerceHeroBanners() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = AI_HERO_SLIDES;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const prevSlide = () => setActive((i) => (i - 1 + slides.length) % slides.length);
  const nextSlide = () => setActive((i) => (i + 1) % slides.length);

  return (
    <section className="w-full">
      {/* 1. HOMETOWN.IN STYLE FULL-WIDTH EDGE-TO-EDGE HERO BANNER (NO ROUNDED CORNERS, SLEEK HEIGHT, ZERO CLUTTER) */}
      <div
        className="relative w-full overflow-hidden rounded-none border-b border-ink-100 bg-ink-950"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Proportional HomeTown banner height: h-[240px] on mobile up to h-[460px] on large desktops */}
        <div className="relative h-[240px] sm:h-[320px] md:h-[380px] lg:h-[430px] xl:h-[460px] w-full overflow-hidden">
          {slides.map((slide, index) => {
            const isActive = index === active;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {/* Whole banner slide is an intuitive, seamless clickable link */}
                <Link
                  href={slide.href}
                  className="group relative block h-full w-full focus:outline-none"
                  tabIndex={isActive ? 0 : -1}
                >
                  {/* High-Resolution AI Commercial Photography */}
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-cover object-center w-full h-full transform transition-transform duration-[6000ms] ease-out group-hover:scale-105"
                  />

                  {/* Clean HomeTown.in Style Scrim: Refined left gradient for text readability, clear right for image focus */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent sm:via-black/20 sm:to-transparent" />

                  {/* Sleek, Minimalist Slide Content */}
                  <div className="relative h-full mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 flex flex-col justify-center">
                    <div className="max-w-2xl space-y-2 sm:space-y-3.5">
                      {/* Minimal Elegant Badge */}
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/95 px-3 py-0.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-ink-950 shadow-sm">
                        {slide.badge}
                      </span>

                      {/* Display Headline */}
                      <h1 className="font-[family-name:var(--font-display)] text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-[1.12] tracking-tight text-white drop-shadow-md">
                        {slide.title}
                      </h1>

                      {/* Crisp Subtitle */}
                      <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-lg leading-relaxed drop-shadow-xs font-medium line-clamp-2">
                        {slide.subtitle}
                      </p>

                      {/* Subtle, Ultra-Premium Arrow Prompt (NO clunky multiple buttons) */}
                      <div className="pt-1">
                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-brand-300 tracking-wider uppercase group-hover:text-white transition-colors">
                          <span>Explore Collection</span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}

          {/* HomeTown.in Sleek Navigation Chevrons */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous banner"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/85 hover:bg-white text-ink-950 shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95 border border-white/60"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next banner"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/85 hover:bg-white text-ink-950 shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95 border border-white/60"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
          </button>

          {/* HomeTown.in Bottom Dash / Dot Indicators */}
          <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  index === active
                    ? "w-8 sm:w-10 bg-brand-500 shadow-sm shadow-brand-500/50"
                    : "w-2 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. CONTAINED VALUE PROPOSITION STRIP BELOW HERO */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Express Pickup & Delivery */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-500/10 via-white to-amber-50/30 p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-amber-300">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-900 ring-1 ring-amber-500/30">
                  <Clock className="h-3 w-3 text-amber-600" /> Express Service
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-ink-950">
                  Same-Day Print &amp; Store Pickup
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
              <span className="text-xs font-bold text-ink-600">Visiting Cards, 13x19 Digital &amp; Flex Banners</span>
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
                  No hidden fees. View full itemized rate chart for 300/350GSM cards, digital sheets, stamps, ID tags &amp; bill books.
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
              Select an item to configure size, quantity &amp; price instantly
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
      </div>
    </section>
  );
}
