"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface HeroBannerSlide {
  id: string;
  alt: string;
  href: string;
  image: string;
}

const FULL_WIDTH_HERO_SLIDES: HeroBannerSlide[] = [
  {
    id: "brand-packaging",
    alt: "Printing that builds your brand - Fast Prints",
    href: "/products",
    image: "/images/banners/hero-brand-packaging.jpg",
  },
  {
    id: "diaries",
    alt: "2027 Diaries - Customised Just for You",
    href: "/products/diaries-planners",
    image: "/images/banners/hero-diaries.jpg",
  },
  {
    id: "calendars",
    alt: "2027 Calendars - Plan Your Year. Your Way.",
    href: "/products/table-calendars",
    image: "/images/banners/hero-calendars.jpg",
  },
];

interface CategoryCardItem {
  id: string;
  name: string;
  href: string;
  image?: string;
  isDealsCard?: boolean;
}

const EXPLORE_CATEGORIES: CategoryCardItem[] = [
  {
    id: "deals",
    name: "Deals",
    href: "/products",
    isDealsCard: true,
  },
  {
    id: "visiting-cards",
    name: "Visiting Cards",
    href: "/products/visiting-cards",
    image: "/images/products/visiting-cards-studio-pro.jpg",
  },
  {
    id: "apparel",
    name: "Custom T-Shirts & Apparel",
    href: "/products/tshirt-printing",
    image: "/images/products/printed-tshirt-white.jpg",
  },
  {
    id: "calendars-diaries",
    name: "Calendars, Notebooks & Diaries",
    href: "/category/stationery",
    image: "/images/products/executive-diary-gold-leaf.jpg",
  },
  {
    id: "stamps-ink",
    name: "Custom Stamps & Ink",
    href: "/products/self-inking-seals",
    image: "/images/products/self-ink-stamp-box.jpg",
  },
  {
    id: "standees",
    name: "Roll-Up Standees & Banners",
    href: "/products/rollup-standees",
    image: "/images/products/rollup-standy-6x3ft-blue.jpg",
  },
  {
    id: "stickers",
    name: "Stickers & Labels",
    href: "/products/normal-stickers",
    image: "/images/products/stickers-diecut-pro.jpg",
  },
  {
    id: "photo-frames",
    name: "Photo Frames & Gifts",
    href: "/products/photo-frames",
    image: "/images/products/photo-frame-4x4-black.jpg",
  },
  {
    id: "id-cards",
    name: "ID Cards & Lanyards",
    href: "/products/id-cards-pvc",
    image: "/images/products/id-cards-pvc-pair.jpg",
  },
  {
    id: "acrylic-displays",
    name: "Acrylic Displays & Signs",
    href: "/products/acrylic-stands",
    image: "/images/products/acrylic-stand-a4.jpg",
  },
  {
    id: "bill-books",
    name: "Bill Books & Registers",
    href: "/products/bill-books",
    image: "/images/products/bill-books-1-6th.jpg",
  },
  {
    id: "brochures",
    name: "Brochures & Flyers",
    href: "/products/brochures",
    image: "/images/products/brochures-trifold-pro.jpg",
  },
];

export function EcommerceHeroBanners() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const slides = FULL_WIDTH_HERO_SLIDES;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const prevSlide = () => setActive((i) => (i - 1 + slides.length) % slides.length);
  const nextSlide = () => setActive((i) => (i + 1) % slides.length);

  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -400 : 400;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-white">
      {/* 1. FULL-WIDTH HERO BANNER SLIDER (Clean Image Banners - No Overlay Text) */}
      <div
        className="relative w-full overflow-hidden bg-neutral-950 aspect-[1024/340] sm:aspect-[1600/532]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((slide, idx) => (
          <Link
            key={slide.id}
            href={slide.href}
            className={`absolute inset-0 block transition-opacity duration-700 ease-in-out ${
              idx === active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              unoptimized
              priority
              className="object-cover object-center w-full h-full"
              sizes="100vw"
            />
          </Link>
        ))}

        {/* Previous / Next Arrow Navigation Controls */}
        <button
          type="button"
          aria-label="Previous banner"
          onClick={(e) => {
            e.preventDefault();
            prevSlide();
          }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/35 hover:bg-black/65 text-white backdrop-blur-xs transition-all shadow-md"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          aria-label="Next banner"
          onClick={(e) => {
            e.preventDefault();
            nextSlide();
          }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/35 hover:bg-black/65 text-white backdrop-blur-xs transition-all shadow-md"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Bottom Dot Navigation Indicators */}
        <div className="absolute inset-x-0 bottom-4 sm:bottom-6 z-20 flex justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Switch to banner ${idx + 1}`}
              onClick={() => setActive(idx)}
              className={`h-2.5 transition-all duration-300 rounded-full shadow-sm ${
                idx === active ? "w-8 bg-white" : "w-2.5 bg-white/60 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. VISTAPRINT SIGNATURE: "Explore all categories" Carousel */}
      <div className="border-b border-neutral-200/80 bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Section Heading Bar */}
          <div className="mb-5 sm:mb-6 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl md:text-[26px] font-bold text-neutral-900 tracking-tight">
              Explore all categories
            </h2>
            <Link
              href="/products"
              className="text-xs sm:text-sm font-bold text-neutral-800 hover:text-amber-600 inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View all 63 products</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Cards Carousel Container */}
          <div className="relative group/carousel">
            {/* Scroll Left Button */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-neutral-800 shadow-md border border-neutral-200 hover:bg-neutral-50 hover:shadow-lg transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {/* Scroll Right Button */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-neutral-800 shadow-md border border-neutral-200 hover:bg-neutral-50 hover:shadow-lg transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}

            {/* Horizontal Scrollable Row */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-3 pt-1 scrollbar-none snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {EXPLORE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className="group flex-shrink-0 w-[170px] sm:w-[195px] md:w-[210px] snap-start flex flex-col rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-2xs hover:border-neutral-300 hover:shadow-md transition-all duration-200"
                >
                  {/* Upper Image Box (Beige Background / Red for Deals) */}
                  {cat.isDealsCard ? (
                    <div className="relative aspect-[4/3.8] w-full bg-[#9c182f] flex flex-col items-center justify-center text-white p-4 overflow-hidden rounded-t-2xl group-hover:brightness-95 transition-all">
                      <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-white/10 group-hover:scale-105 transition-transform duration-300">
                        <svg
                          viewBox="0 0 64 64"
                          className="h-14 w-14 sm:h-16 sm:w-16 fill-white"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path d="M28.5 6.2a4 4 0 0 0-2.8 1.2L6.8 26.3a4 4 0 0 0 0 5.6l25.3 25.3a4 4 0 0 0 5.6 0l18.9-18.9a4 4 0 0 0 1.2-2.8V10.2a4 4 0 0 0-4-4H28.5zm19.3 11.5a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6zm-17.1 9.7a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm-8 15a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm11.5-16.5l-15 15a2 2 0 1 1-2.8-2.8l15-15a2 2 0 1 1 2.8 2.8z" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-[4/3.8] w-full bg-[#f4efe8] flex items-center justify-center p-3 sm:p-4 overflow-hidden rounded-t-2xl group-hover:brightness-[0.98] transition-all">
                      {cat.image && (
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-contain p-2.5 sm:p-3 group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 170px, (max-width: 768px) 195px, 210px"
                        />
                      )}
                    </div>
                  )}

                  {/* Lower Title Box (Outside the image container, clean white background) */}
                  <div className="bg-white px-3.5 py-3 sm:py-3.5 min-h-[58px] sm:min-h-[64px] flex items-center border-t border-neutral-100 rounded-b-2xl">
                    <span className="text-[14px] sm:text-[15px] font-semibold text-neutral-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-2">
                      {cat.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
