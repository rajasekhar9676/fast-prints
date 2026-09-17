import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import type { BudgetRangeItem } from "@/types/cms-content";
import { IndianRupee } from "lucide-react";

export function ShopByBudget({ ranges }: { ranges: BudgetRangeItem[] }) {
  return (
    <section>
      <SectionHeader
        eyebrow="Transparent pricing"
        title="Shop by budget"
        subtitle="Starting prices upfront — no surprises after artwork review"
        seeAllHref="/products"
        seeAllLabel="Full catalogue"
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {ranges.map((item) => (
          <Link
            key={item.id}
            href={`/products?budget=${item.range}`}
            className={`group rounded-2xl border bg-gradient-to-br p-4 transition hover:-translate-y-0.5 hover:shadow-lg md:p-5 ${item.tone}`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 text-brand-700 shadow-sm">
              <IndianRupee className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </span>
            <p className="mt-4 font-[family-name:var(--font-display)] text-base font-extrabold text-ink-950 md:text-lg">
              {item.label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ink-600 md:text-sm">{item.sub}</p>
            <p className="mt-3 text-xs font-bold text-brand-700 opacity-0 transition group-hover:opacity-100">
              Browse range →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
