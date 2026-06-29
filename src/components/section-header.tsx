import Link from "next/link";
import { ChevronRight } from "lucide-react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  seeAllHref?: string;
  seeAllLabel?: string;
  dark?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  seeAllHref,
  seeAllLabel = "See all",
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="space-y-2">
        {eyebrow ? (
          <p className={`text-xs font-bold uppercase tracking-[0.15em] ${dark ? "text-brand-400" : "text-brand-600"}`}>
            {eyebrow}
          </p>
        ) : null}
        <div className="gold-line" />
        <h2
          className={`font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight md:text-3xl ${
            dark ? "text-white" : "text-ink-950"
          }`}
        >
          {title}
        </h2>
        {subtitle ? (
          <p className={`max-w-xl text-sm md:text-base ${dark ? "text-white/65" : "text-ink-500"}`}>{subtitle}</p>
        ) : null}
      </div>
      {seeAllHref ? (
        <Link
          href={seeAllHref}
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-4 py-2 text-sm font-bold transition ${
            dark
              ? "border border-white/20 bg-white/10 text-white hover:bg-white/20"
              : "border border-ink-200 bg-white text-ink-800 shadow-sm hover:border-brand-400 hover:text-brand-700"
          }`}
        >
          {seeAllLabel}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      ) : null}
    </div>
  );
}
