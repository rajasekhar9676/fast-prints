"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { categories } from "@/data/categories";
import { Menu, Phone, Search, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { totalItems } = useCart();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const shopHref = useMemo(() => {
    const q = query.trim();
    return q ? `/products?q=${encodeURIComponent(q)}` : "/products";
  }, [query]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="border-b border-ink-100 bg-ink-950 text-xs text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <p className="flex items-center gap-2">
            <span className="hidden font-semibold text-brand-400 sm:inline">FAST PRINTS · BENGALURU</span>
            <span className="text-white/70">Landmark, 20th Main · Opp. Metro Pillar 154 · BTM 2nd Stage</span>
          </p>
          <a href="tel:+919164779922" className="inline-flex items-center gap-1.5 font-bold text-brand-400 hover:text-brand-300">
            <Phone className="h-3.5 w-3.5" aria-hidden />
            +91 91647 79922
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:gap-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" onClick={() => setMobileOpen(false)}>
          <span className="relative block h-11 w-11 overflow-hidden rounded-full border-2 border-brand-500 bg-ink-950 shadow-md shadow-brand-500/30">
            <Image src="/logo.png" alt="" fill className="object-cover p-1" sizes="44px" priority />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="font-[family-name:var(--font-display)] text-lg font-extrabold tracking-tight text-ink-950">
              FAST PRINTS
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">Bengaluru</span>
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 md:block">
          <div className="relative mx-auto max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search business cards, banners, tees…"
              className="w-full rounded-xl border border-ink-200 bg-ink-50 py-2.5 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.location.href = shopHref;
                }
              }}
            />
          </div>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                pathname === link.href ? "bg-brand-500 text-ink-950" : "text-ink-700 hover:bg-ink-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-100"
            >
              Categories
              <span className="text-xs" aria-hidden>
                ▾
              </span>
            </button>
            <div className="invisible absolute right-0 top-full z-50 mt-1 w-72 rounded-xl border border-ink-100 bg-white py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/products?category=${c.id}`}
                  className="block px-4 py-2 text-sm text-ink-800 hover:bg-brand-50 hover:text-brand-900"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-xl bg-ink-950 px-3 py-2 text-sm font-bold text-white md:px-4"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-ink-950">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="inline-flex rounded-xl border border-ink-200 p-2 text-ink-800 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-100 bg-white px-4 py-4 lg:hidden">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-xl border border-ink-200 bg-ink-50 py-2.5 pl-10 pr-4 text-sm"
            />
          </div>
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 font-semibold text-ink-900 hover:bg-brand-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-2 px-3 text-xs font-bold uppercase tracking-wide text-ink-500">Categories</p>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.id}`}
                className="rounded-lg px-3 py-2 text-sm text-ink-800 hover:bg-ink-50"
                onClick={() => setMobileOpen(false)}
              >
                {c.name}
              </Link>
            ))}
            <Link
              href={shopHref}
              className="mt-4 rounded-xl bg-brand-500 py-3 text-center text-sm font-bold text-ink-950"
              onClick={() => setMobileOpen(false)}
            >
              Search products
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
