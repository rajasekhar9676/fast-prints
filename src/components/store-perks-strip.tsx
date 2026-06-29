import { ShieldCheck, Sparkles, Truck, Zap } from "lucide-react";

const perks = [
  {
    icon: Zap,
    label: "Same-day pickup",
    sub: "On select products",
    gradient: "from-amber-400 to-brand-500",
  },
  {
    icon: Truck,
    label: "BTM walk-in store",
    sub: "Opp. Metro Pillar 154",
    gradient: "from-sky-400 to-blue-500",
  },
  {
    icon: Sparkles,
    label: "Design support",
    sub: "Artwork & proofs",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    icon: ShieldCheck,
    label: "Colour accurate",
    sub: "Brand-matched print",
    gradient: "from-emerald-400 to-teal-500",
  },
];

export function StorePerksStrip() {
  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {perks.map(({ icon: Icon, label, sub, gradient }) => (
        <div
          key={label}
          className="card-premium group flex items-center gap-3.5 px-4 py-4"
        >
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-md transition group-hover:scale-105`}
          >
            <Icon className="h-5 w-5" strokeWidth={2.5} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-ink-900">{label}</p>
            <p className="truncate text-xs text-ink-500">{sub}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
