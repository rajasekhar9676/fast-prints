import Link from "next/link";
import { Building2, ShoppingBag } from "lucide-react";

export function TopAudienceBar() {
  return (
    <section
      aria-label="Shop by audience"
      className="grid grid-cols-2 gap-2 rounded-2xl border border-ink-100 bg-white p-1.5 shadow-sm sm:gap-3 sm:p-2"
    >
      <Link
        href="/products"
        className="flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-ink-600 transition hover:bg-ink-50 sm:py-3.5"
      >
        <ShoppingBag className="h-4 w-4 shrink-0" aria-hidden />
        <span className="truncate">Personal & retail</span>
      </Link>
      <Link
        href="/corporate"
        className="relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-ink-950 px-3 py-3 text-sm font-bold text-white shadow-md transition hover:bg-ink-800 sm:py-3.5"
      >
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-500/20 via-transparent to-brand-500/10" aria-hidden />
        <Building2 className="relative h-4 w-4 shrink-0 text-brand-400" aria-hidden />
        <span className="relative truncate">Corporate & bulk</span>
      </Link>
    </section>
  );
}
