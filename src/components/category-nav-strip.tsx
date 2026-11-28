"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Gift, Megaphone, Printer, ArrowRight, Grid, X } from "lucide-react";
import { MASTER_CATEGORIES, getProductsForMasterCategory } from "@/data/master-categories";
import { products } from "@/data/products";

const iconMap = {
  Printer: Printer,
  Megaphone: Megaphone,
  Gift: Gift,
};

export function CategoryNavStrip() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Map master category products
  const categoryProductsMap = useMemo(() => {
    const map = new Map<string, typeof products>();
    for (const master of MASTER_CATEGORIES) {
      map.set(master.id, getProductsForMasterCategory(products, master.id));
    }
    return map;
  }, []);

  // Handle smooth mouse hover with debounced close
  const handleMouseEnter = (categoryId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(categoryId);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  // Toggle on click (for mobile/touch or click users)
  const handleToggleClick = (categoryId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown((prev) => (prev === categoryId ? null : categoryId));
  };

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const activeMaster = activeDropdown
    ? MASTER_CATEGORIES.find((m) => m.id === activeDropdown)
    : null;
  const activeProducts = activeMaster ? categoryProductsMap.get(activeMaster.id) || [] : [];
  const ActiveIcon = activeMaster ? iconMap[activeMaster.iconName] || Printer : Printer;

  // Responsive column layout so ALL items fit without any scrolling
  // 34 items: 6 cols on lg, 4 cols on md, 3 cols on sm
  // 16 items: 4 cols on lg, 3 cols on md
  // 13 items: 4 cols on lg, 3 cols on md
  const gridColsClass =
    activeProducts.length > 20
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      : activeProducts.length > 10
      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <nav
      ref={containerRef}
      aria-label="Product categories navigation"
      className="relative z-50 border-b border-neutral-200/90 bg-white text-neutral-900 shadow-2xs"
    >
      {/* Centered Category Buttons Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-center px-3 py-1.5 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-6">
          {/* 1. All Products */}
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-ink-700 transition hover:bg-ink-50 hover:text-ink-950"
            onClick={() => setActiveDropdown(null)}
          >
            <Grid className="h-4 w-4 text-ink-400 group-hover:text-brand-600 transition-colors" />
            <span>All Products</span>
          </Link>

          {/* 2. The 3 Master Departments with Hover / Click Dropdowns */}
          {MASTER_CATEGORIES.map((master) => {
            const Icon = iconMap[master.iconName] || Printer;
            const isOpen = activeDropdown === master.id;

            return (
              <div
                key={master.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(master.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={(e) => handleToggleClick(master.id, e)}
                  aria-expanded={isOpen}
                  className={`group inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                    isOpen
                      ? "bg-ink-900 text-white shadow-xs"
                      : "text-ink-800 hover:bg-ink-50 hover:text-brand-600"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-transform ${
                      isOpen ? "text-brand-400 scale-105" : "text-brand-500 group-hover:scale-105"
                    }`}
                  />
                  <span>{master.name}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-white" : "text-ink-400 group-hover:text-ink-700"
                    }`}
                  />
                </button>
              </div>
            );
          })}

          {/* 3. Corporate & Bulk */}
          <Link
            href="/corporate"
            className="inline-flex items-center rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-ink-700 transition hover:bg-ink-50 hover:text-ink-950"
            onClick={() => setActiveDropdown(null)}
          >
            <span>Corporate & Bulk</span>
          </Link>
        </div>
      </div>

      {/* FULL-WIDTH Mega-Menu Panel Spanning Edge-to-Edge with Zero Scrolling */}
      {activeMaster && (
        <div
          className="absolute left-0 right-0 top-full z-50 border-b border-ink-200/90 bg-white shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
          role="menu"
          onMouseEnter={() => handleMouseEnter(activeMaster.id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Mega-Menu Header Bar */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <ActiveIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base font-extrabold text-ink-950">{activeMaster.name}</h3>
                    <span className="hidden sm:inline-block rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800">
                      ⚡ Same-Day Printing in Bengaluru
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-ink-500">{activeMaster.tagline}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/category/${activeMaster.slug}`}
                  onClick={() => setActiveDropdown(null)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-ink-50 border border-ink-200 px-3.5 py-1.5 text-xs font-bold text-ink-900 transition hover:bg-brand-50 hover:border-brand-300 hover:text-brand-800"
                >
                  <span>View Full Department</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveDropdown(null)}
                  className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700 transition"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Complete Flat Product Grid Across Full Width (NO Scrolling - ALL Visible) */}
            <div className={`grid ${gridColsClass} gap-x-5 gap-y-2`}>
              {activeProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={() => setActiveDropdown(null)}
                  className="group flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-all hover:bg-ink-50"
                >
                  <span className="truncate text-xs sm:text-[13px] font-medium text-ink-800 group-hover:text-brand-600 group-hover:font-semibold transition-colors">
                    {product.name}
                  </span>
                  <ArrowRight className="h-3 w-3 shrink-0 text-ink-300 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-brand-600" />
                </Link>
              ))}
            </div>

            {/* Mega-Menu Bottom Bar */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 pt-3.5">
              <p className="text-xs text-ink-500">
                💡 Need custom sizing, spot UV, or bulk volume quotation?{" "}
                <a
                  href="https://wa.me/919900000000?text=Hi%20Fast%20Prints%20Team%2C%20I%20need%20a%20custom%20quote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-600 hover:underline"
                >
                  Chat with our BTM team on WhatsApp
                </a>
              </p>
              <Link
                href={`/category/${activeMaster.slug}`}
                onClick={() => setActiveDropdown(null)}
                className="inline-flex items-center gap-2 rounded-xl bg-ink-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-500 hover:text-ink-950"
              >
                <span>Browse Entire {activeMaster.shortName} Catalog</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
