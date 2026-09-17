import type { FaqItem } from "@/types/cms-content";

export function HomeFaq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-ink-100 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
      <div className="border-b border-ink-100 px-6 py-8 text-center md:px-10 md:py-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Got questions?</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink-950 md:text-3xl">
          We&apos;ve got you covered
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-ink-500">
          Quick answers before you place your order — walk in, call, or checkout online.
        </p>
      </div>
      <dl className="divide-y divide-ink-100">
        {faqs.map((item) => (
          <div key={item.id} className="group px-6 py-5 transition hover:bg-brand-50/30 md:px-10 md:py-6">
            <dt className="font-[family-name:var(--font-display)] text-base font-extrabold text-ink-950 md:text-lg">
              {item.question}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-ink-500">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
