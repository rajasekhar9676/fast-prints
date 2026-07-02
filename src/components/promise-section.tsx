import { Heart, ShieldCheck, Sparkles } from "lucide-react";

const promises = [
  {
    icon: Sparkles,
    title: "Customised your way",
    body: "Choose size, finish, and quantity on every product — upload artwork or brief our design desk for proofs.",
    accent: "bg-gradient-to-br from-brand-100 to-brand-50",
    iconBg: "bg-brand-500 text-ink-950",
  },
  {
    icon: Heart,
    title: "100% satisfaction focus",
    body: "We check files before print, match brand colours where needed, and call you if anything needs fixing.",
    accent: "bg-gradient-to-br from-rose-50 to-orange-50",
    iconBg: "bg-rose-500 text-white",
  },
  {
    icon: ShieldCheck,
    title: "Production you can trust",
    body: "Digital & offset capability under one roof at BTM — same quality whether you walk in or order online.",
    accent: "bg-gradient-to-br from-sky-50 to-indigo-50",
    iconBg: "bg-ink-950 text-brand-400",
  },
];

export function PromiseSection() {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-ink-100 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
      <div className="border-b border-ink-100 bg-gradient-to-r from-brand-50/80 via-white to-brand-50/50 px-6 py-8 text-center md:px-10 md:py-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Our promise to you</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink-950 md:text-3xl">
          Print quality you can count on
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-500 md:text-base">
          Inspired by the best online print experiences — clear pricing, honest timelines, and a team that picks up the phone.
        </p>
      </div>
      <div className="grid gap-0 md:grid-cols-3 md:divide-x md:divide-ink-100">
        {promises.map(({ icon: Icon, title, body, accent, iconBg }) => (
          <div key={title} className={`flex flex-col gap-4 p-6 md:p-8 ${accent}`}>
            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-md ${iconBg}`}>
              <Icon className="h-6 w-6" strokeWidth={2.25} aria-hidden />
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-ink-950">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
