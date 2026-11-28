import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift, Megaphone, Printer, Sparkles } from "lucide-react";
import { MASTER_CATEGORIES } from "@/data/master-categories";

const iconMap = {
  Printer: Printer,
  Megaphone: Megaphone,
  Gift: Gift,
};

export function MasterCategoryGateway() {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-600">
            <Sparkles className="h-3.5 w-3.5" />
            Core Printing Departments
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold text-ink-950">
            What are you printing today?
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-ink-500 max-w-md">
          Explore our 3 primary departments tailored for startups, retail brands, exhibitions, and corporate gifting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {MASTER_CATEGORIES.map((cat, idx) => {
          const Icon = iconMap[cat.iconName] || Printer;
          return (
            <div
              key={cat.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[1.8rem] border border-ink-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10"
            >
              {/* Background gradient decorative glow */}
              <div
                className={`pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20 ${
                  idx === 0
                    ? "bg-blue-600"
                    : idx === 1
                    ? "bg-amber-600"
                    : "bg-rose-600"
                }`}
                aria-hidden
              />

              <div className="space-y-4">
                {/* Header with Icon + Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-inner ${
                      idx === 0
                        ? "bg-blue-50 text-blue-600 ring-1 ring-blue-100"
                        : idx === 1
                        ? "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
                        : "bg-rose-50 text-rose-600 ring-1 ring-rose-100"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wide ring-1 ${cat.accentBadgeColor}`}
                  >
                    {cat.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-extrabold text-ink-950 transition-colors group-hover:text-brand-600">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-ink-600 leading-relaxed line-clamp-2">
                    {cat.tagline}
                  </p>
                </div>

                {/* Popular Item Quick Pills */}
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-ink-400">
                    Popular in this section:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories.slice(0, 5).map((sub) => (
                      <Link
                        key={sub.id}
                        href={sub.href}
                        className="inline-flex items-center rounded-lg border border-ink-100 bg-ink-50/70 px-2.5 py-1 text-[11px] font-semibold text-ink-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-ink-950"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-ink-100/80">
                <Link
                  href={`/category/${cat.slug}`}
                  className="inline-flex w-full items-center justify-between rounded-xl bg-ink-950 px-4 py-3 text-xs sm:text-sm font-extrabold text-white transition-all duration-200 group-hover:bg-brand-600 group-hover:shadow-md group-hover:shadow-brand-500/20"
                >
                  <span>Explore {cat.shortName}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
