import Link from "next/link";
import { navCategories } from "@/data/nav-categories";

export function CategoryNavStrip() {
  return (
    <nav aria-label="Product categories" className="border-b border-ink-100 bg-white">
      <div className="scrollbar-thin mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2.5 md:px-6">
        {navCategories.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
              item.highlight
                ? "bg-ink-950 text-white"
                : "bg-ink-50 text-ink-700 hover:bg-brand-50 hover:text-ink-950"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
