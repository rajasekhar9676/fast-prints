"use client";

import { CategoryNavStrip } from "@/components/category-nav-strip";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useStoreData } from "@/context/store-data-context";
import { Menu, Phone, Search, ShoppingBag, X, Zap, Building2 } from "lucide-react";
import { useMemo, useState } from "react";

export function SiteHeader() {
  const { totalItems } = useCart();
  const { settings, categories } = useStoreData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const shopHref = useMemo(() => {
    const q = query.trim();
    return q ? `/products?q=${encodeURIComponent(q)}` : "/products";
  }, [query]);

  return (
    <header className="sticky top-0 z-50">
      {/* Promo strip */}
      <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 py-2.5 text-center text-xs font-bold text-ink-950 sm:text-sm">
        <Zap className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {settings.promoText}
      </div>

      {/* Main bar */}
      <div className="border-b border-ink-100/80 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3.5 md:gap-6 md:px-6">
          <Link href="/" className="group flex shrink-0 items-center gap-3" onClick={() => setMobileOpen(false)}>
            <span className="relative block h-11 w-11 overflow-hidden rounded-full border-2 border-brand-500 bg-ink-950 shadow-md shadow-brand-500/30 transition group-hover:shadow-brand-500/50">
              <Image src="/logo.png" alt="Fast Prints" fill className="object-cover p-0.5" sizes="44px" priority />
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="font-[family-name:var(--font-display)] text-base font-extrabold tracking-tight text-ink-950">
                FAST PRINTS
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">
                Bengaluru
              </span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 lg:block">
            <div className="relative mx-auto max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search visiting cards, pamphlets, calendars…"
                className="w-full rounded-2xl border border-ink-200 bg-ink-50/80 py-3 pl-11 pr-4 text-sm shadow-inner transition focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/15"
                onKeyDown={(e) => {
                  if (e.key === "Enter") window.location.href = shopHref;
                }}
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/corporate"
              className="hidden items-center gap-1.5 rounded-xl border border-brand-300/60 bg-brand-50 px-3 py-2 text-sm font-bold text-ink-900 transition hover:border-brand-400 hover:bg-brand-100 md:inline-flex"
            >
              <Building2 className="h-4 w-4 text-brand-700" aria-hidden />
              Corporate
            </Link>
            <a
              href="tel:+919164779922"
              className="hidden items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-ink-600 transition hover:bg-ink-50 hover:text-ink-950 md:inline-flex"
            >
              <Phone className="h-4 w-4 text-brand-600" aria-hidden />
              Call us
            </a>
            <Link
              href="/contact"
              className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-ink-600 transition hover:bg-ink-50 md:inline-flex"
            >
              Store
            </Link>
            <Link
              href="/cart"
              className="relative inline-flex items-center gap-2 rounded-2xl bg-ink-950 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-ink-950/25 transition hover:bg-ink-800"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 ? (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-ink-950 ring-2 ring-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              className="inline-flex rounded-xl border border-ink-200 p-2.5 text-ink-800 transition hover:bg-ink-50 lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <CategoryNavStrip />

      {mobileOpen ? (
        <div className="border-t border-ink-100 bg-white px-4 py-5 shadow-xl lg:hidden">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-2xl border border-ink-200 bg-ink-50 py-3 pl-11 pr-4 text-sm"
            />
          </div>
          <nav className="flex flex-col gap-1">
            {[
              { href: "/corporate", label: "Corporate & bulk", bold: true },
              { href: "/products", label: "All products" },
              { href: "/services", label: "Services" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-3 ${link.bold ? "bg-ink-950 font-bold text-white hover:bg-ink-800" : "font-semibold text-ink-700 hover:bg-ink-50"}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-3 px-4 text-xs font-bold uppercase tracking-wider text-ink-400">Categories</p>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.id}`}
                className="rounded-xl px-4 py-2.5 text-sm text-ink-700 hover:bg-ink-50"
                onClick={() => setMobileOpen(false)}
              >
                {c.name}
              </Link>
            ))}
            <Link href={shopHref} className="btn-primary mt-4 w-full" onClick={() => setMobileOpen(false)}>
              Search products
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
