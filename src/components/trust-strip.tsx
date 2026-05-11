import { Clock, IndianRupee, Palette, Truck } from "lucide-react";

const items = [
  {
    icon: Clock,
    title: "Rush-friendly",
    body: "Same-day & express slots on select Bengaluru orders.",
  },
  {
    icon: Palette,
    title: "Colour confidence",
    body: "Calibration & proofs for brand-accurate reproduction.",
  },
  {
    icon: Truck,
    title: "Pickup & dispatch",
    body: "Walk-in at BTM or coordinate delivery across the city.",
  },
  {
    icon: IndianRupee,
    title: "Clear estimates",
    body: "Configurator pricing before you commit — no surprises.",
  },
];

export function TrustStrip() {
  return (
    <section className="grid gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
      {items.map(({ icon: Icon, title, body }) => (
        <div key={title} className="flex gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-ink-950">
            <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
          </span>
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-ink-950">{title}</h3>
            <p className="mt-1 text-sm text-ink-600">{body}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
