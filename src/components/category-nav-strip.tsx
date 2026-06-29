import Link from "next/link";
import { navCategories } from "@/data/nav-categories";
import { Zap } from "lucide-react";

export function CategoryNavStrip() {
  return (
    <nav aria-label="Product categories" className="border-b border-ink-100 bg-ink-950">
      <div className="scrollbar-thin mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 py-2.5 md:px-6">
        {navCategories.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              item.highlight
                ? "bg-brand-500 text-ink-950 shadow-md shadow-brand-500/30 hover:bg-brand-400"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.highlight ? <Zap className="h-3.5 w-3.5" aria-hidden /> : null}
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
