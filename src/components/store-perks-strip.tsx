import { Clock3, MapPin, Palette, ShieldCheck } from "lucide-react";
import type { PerkItem } from "@/types/cms-content";
import type { LucideIcon } from "lucide-react";

const icons: LucideIcon[] = [Clock3, MapPin, Palette, ShieldCheck];

export function StorePerksStrip({ perks }: { perks: PerkItem[] }) {
  if (!perks.length) return null;

  return (
    <section className="grid grid-cols-2 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm md:grid-cols-4">
      {perks.slice(0, 4).map((perk, index) => {
        const Icon = icons[index % icons.length];
        return (
          <div
            key={perk.id}
            className="flex items-center gap-3 border-ink-100 px-4 py-3.5 odd:border-r md:border-r md:last:border-r-0"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-ink-950">{perk.label}</p>
              <p className="truncate text-xs text-ink-500">{perk.sub}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
