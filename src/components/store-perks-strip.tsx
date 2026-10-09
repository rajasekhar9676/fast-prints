import { Clock3, MapPin, Palette, ShieldCheck } from "lucide-react";
import type { PerkItem } from "@/types/cms-content";
import type { LucideIcon } from "lucide-react";

const icons: LucideIcon[] = [Clock3, MapPin, Palette, ShieldCheck];

export function StorePerksStrip({ perks }: { perks: PerkItem[] }) {
  if (!perks.length) return null;

  return (
    <section className="grid grid-cols-2 overflow-hidden rounded-2xl border border-ink-200/70 bg-gradient-to-r from-white via-amber-50/20 to-white shadow-sm md:grid-cols-4">
      {perks.slice(0, 4).map((perk, index) => {
        const Icon = icons[index % icons.length];
        return (
          <div
            key={perk.id}
            className="flex items-center gap-3.5 border-ink-100 p-4 odd:border-r md:border-r md:last:border-r-0 hover:bg-white/80 transition-colors"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-700 ring-1 ring-brand-500/20 shadow-xs">
              <Icon className="h-5 w-5 text-brand-600" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs sm:text-sm font-extrabold text-ink-950">{perk.label}</p>
              <p className="truncate text-[11px] text-ink-500">{perk.sub}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
