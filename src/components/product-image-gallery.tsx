"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

type ProductImageGalleryProps = {
  primaryImage: string;
  gallery?: string[];
  productName: string;
  badge?: string;
  turnaround?: string;
};

export function ProductImageGallery({
  primaryImage,
  gallery,
  productName,
  badge,
  turnaround,
}: ProductImageGalleryProps) {
  // Combine primary and gallery into a clean, deduplicated list
  const allImages = Array.from(
    new Set([primaryImage, ...(gallery ?? [])].filter(Boolean))
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = allImages[activeIndex] || primaryImage;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + allImages.length) % allImages.length;
    setActiveIndex(nextIdx);
    scrollToThumbnail(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % allImages.length;
    setActiveIndex(nextIdx);
    scrollToThumbnail(nextIdx);
  };

  const scrollToThumbnail = (idx: number) => {
    if (scrollContainerRef.current) {
      const children = scrollContainerRef.current.children;
      if (children[idx]) {
        (children[idx] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -160, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 160, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Main Showcase Display (Top) */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-xs">
        {/* Main Canvas Box */}
        <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full bg-gradient-to-b from-ink-50/40 via-white to-ink-50/20 flex items-center justify-center p-3 sm:p-6">
          <Image
            src={activeImage}
            alt={`${productName} - View ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 680px"
            className="object-contain p-2 sm:p-4 transition-all duration-300 drop-shadow-xs"
          />

          {/* Left / Right Chevron Controls */}
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110 active:scale-95 border border-ink-100"
              >
                <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110 active:scale-95 border border-ink-100"
              >
                <ChevronRight className="h-4 w-4 stroke-[2.5]" />
              </button>

              {/* Bottom Image Counter Pill */}
              <div className="absolute bottom-3 right-3 rounded-full bg-ink-950/75 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white tracking-wider">
                {activeIndex + 1} / {allImages.length}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 2. Down Side Thumbnails (Single Row with Left/Right Arrow Marks & No Text Labels) */}
      {allImages.length > 1 && (
        <div className="relative flex items-center gap-1.5 pt-1">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={handleScrollLeft}
            aria-label="Scroll left thumbnails"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 shadow-2xs hover:bg-ink-50 hover:text-ink-950 transition-all active:scale-95"
          >
            <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
          </button>

          {/* Single Row Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex flex-nowrap gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1 px-0.5 flex-1"
          >
            {allImages.map((img, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={img + idx}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    scrollToThumbnail(idx);
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  aria-label={`View image option ${idx + 1}`}
                  className={`group relative h-16 w-16 sm:h-18 sm:w-18 shrink-0 overflow-hidden rounded-xl border-2 p-1 transition-all duration-200 focus:outline-none ${
                    isActive
                      ? "border-brand-500 bg-brand-50/30 ring-2 ring-brand-500/30 shadow-xs scale-102"
                      : "border-ink-200/80 bg-white hover:border-ink-400 hover:bg-ink-50/40 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-lg bg-ink-50/50">
                    <Image
                      src={img}
                      alt={`${productName} thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain p-0.5 transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={handleScrollRight}
            aria-label="Scroll right thumbnails"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 shadow-2xs hover:bg-ink-50 hover:text-ink-950 transition-all active:scale-95"
          >
            <ChevronRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>
      )}
    </div>
  );
}
