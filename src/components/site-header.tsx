"use client";

import { CategoryNavStrip } from "@/components/category-nav-strip";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useCustomerAuth } from "@/context/customer-auth-context";
import { useStoreData } from "@/context/store-data-context";
import { Menu, Search, ShoppingBag, User, X, Zap } from "lucide-react";
import { useMemo, useState } from "react";
export function SiteHeader() {
  const { totalItems } = useCart();
  const { user, loading: authLoading } = useCustomerAuth();
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
      <div className="flex items-center justify-center gap-2 bg-[#131110] py-2 text-center text-xs font-semibold text-white sm:text-sm">
        <Zap className="h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden />
        {settings.promoText}
      </div>

      {/* Main bar */}
      <div className="border-b border-black/10 bg-white shadow-2xs">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-6 md:px-6">
          <Link href="/" className="group flex shrink-0 items-center py-0.5" onClick={() => setMobileOpen(false)}>
            <div className="relative flex items-center">
              <Image
                src="/images/logo/fastprints-official-logo.png"
                alt="Fast Prints - Think Printing... Think Us..."
                width={260}
                height={65}
                className="h-10 sm:h-12 w-auto object-contain transition duration-200 group-hover:opacity-95"
                priority
              />
            </div>
          </Link>

          <div className="hidden min-w-0 flex-1 lg:block">
            <div className="relative mx-auto max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/50" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, standees, boxes, calendars…"
                className="w-full rounded-full border border-black/15 bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-black/40"
                onKeyDown={(e) => {
                  if (e.key === "Enter") window.location.href = shopHref;
                }}
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1">
            {!authLoading && user ? (
              <Link
                href="/account"
                className="hidden items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-ink-600 transition hover:bg-ink-50 md:inline-flex"
              >
                <User className="h-4 w-4 text-brand-600" aria-hidden />
                Account
              </Link>
            ) : !authLoading ? (
              <Link
                href="/login"
                className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-ink-600 transition hover:bg-ink-50 md:inline-flex"
              >
                Sign in
              </Link>
            ) : null}
            <Link
              href="/cart"
              className="relative inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-ink-900 transition hover:bg-ink-50"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden />
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
              { href: "/products", label: "All Products" },
              { href: "/category/digital-prints", label: "🖨️ Digital Prints" },
              { href: "/category/banners-signages", label: "🏢 Banners & Signages" },
              { href: "/category/gifts-merchandise", label: "🎁 Gifts & Merchandise" },
              { href: "/corporate", label: "Corporate & Bulk" },
              { href: "/services", label: "Services" },
              { href: "/contact", label: "Contact Us" },
              ...(user ? [{ href: "/account", label: "My Account" }] : [{ href: "/login", label: "Sign In" }]),
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3 font-semibold text-ink-800 hover:bg-ink-50 transition"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href={shopHref} className="btn-primary mt-4 w-full" onClick={() => setMobileOpen(false)}>
              Search Products
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
