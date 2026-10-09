"use client";

import type { Product } from "@/types/product";
import { CompactProductCard } from "@/components/compact-product-card";
import { ProductCard } from "@/components/product-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

type ProductRailProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  products: Product[];
  seeAllHref?: string;
  accent?: "default" | "warm" | "dark";
  displayMode?: "slider" | "grid";
};

export function ProductRail({
  title,
  subtitle,
  eyebrow,
  products,
  seeAllHref = "/products",
  accent = "default",
  displayMode = "slider",
}: ProductRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [products]);

  if (products.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const getContainerStyle = () => {
    if (accent === "warm") {
      return "bg-gradient-to-br from-[#fffdf5] via-[#fffbf0] to-white ring-1 ring-brand-300/40 shadow-sm";
    }
    if (accent === "dark") {
      return "bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 text-white shadow-md border border-ink-800";
    }
    return "border border-ink-100 bg-white shadow-sm";
  };

  return (
    <section className={`rounded-[1.6rem] p-5 sm:p-6 transition duration-300 ${getContainerStyle()}`}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          {eyebrow ? (
            <p className={`text-[11px] font-extrabold uppercase tracking-[0.16em] ${accent === "dark" ? "text-brand-400" : "text-brand-600"}`}>
              {eyebrow}
            </p>
          ) : null}
          <h2 className={`font-[family-name:var(--font-display)] text-xl sm:text-2xl font-extrabold tracking-tight ${accent === "dark" ? "text-white" : "text-ink-950"}`}>
            {title}
          </h2>
          {subtitle ? (
            <p className={`mt-1 text-xs sm:text-sm ${accent === "dark" ? "text-white/70" : "text-ink-500"}`}>
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {displayMode === "slider" ? (
            <div className="hidden sm:flex items-center gap-1.5 mr-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous products"
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${
                  canScrollLeft
                    ? accent === "dark"
                      ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                      : "border-ink-200 bg-white text-ink-800 hover:bg-ink-100 hover:border-ink-300 shadow-sm"
                    : "opacity-30 cursor-not-allowed border-transparent"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next products"
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${
                  canScrollRight
                    ? accent === "dark"
                      ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                      : "border-ink-200 bg-white text-ink-800 hover:bg-ink-100 hover:border-ink-300 shadow-sm"
                    : "opacity-30 cursor-not-allowed border-transparent"
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ) : null}

          <Link
            href={seeAllHref}
            className={`inline-flex shrink-0 items-center gap-1 text-xs sm:text-sm font-bold transition ${
              accent === "dark" ? "text-brand-300 hover:text-white" : "text-ink-600 hover:text-brand-700"
            }`}
          >
            See all
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>

      {displayMode === "grid" ? (
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="no-scrollbar -mx-1 flex gap-3.5 overflow-x-auto px-1 pb-2 scroll-smooth"
        >
          {products.map((product) => (
            <CompactProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

