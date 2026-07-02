"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Wrench,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Box },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/settings", label: "Site settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen bg-surface lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-ink-100 bg-white lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3 border-b border-ink-100 px-5 py-5">
          <span className="relative block h-10 w-10 overflow-hidden rounded-full border-2 border-brand-500 bg-ink-950">
            <Image src="/logo.png" alt="Fast Prints" fill className="object-cover p-0.5" sizes="40px" />
          </span>
          <div>
            <p className="font-[family-name:var(--font-display)] text-sm font-extrabold text-ink-950">Admin Panel</p>
            <p className="text-xs text-ink-500">Fast Prints Bengaluru</p>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto p-3 lg:flex-col lg:overflow-visible">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  active ? "bg-brand-500 text-ink-950" : "text-ink-700 hover:bg-ink-50"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden border-t border-ink-100 p-3 lg:block">
          <Link href="/" className="mb-2 block rounded-xl px-3 py-2 text-sm font-semibold text-ink-600 hover:bg-ink-50">
            ← View storefront
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Log out
          </button>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="flex items-center justify-between border-b border-ink-100 bg-white/90 px-4 py-4 backdrop-blur md:px-8">
          <p className="text-sm text-ink-500">Manage products, orders & store content</p>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-ink-200 px-3 py-1.5 text-sm font-semibold text-ink-700 lg:hidden"
          >
            Log out
          </button>
        </header>
        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
