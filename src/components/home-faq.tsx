const faqs = [
  {
    q: "Does Fast Prints offer same-day delivery?",
    a: "Yes — selected products like flyers, pamphlets, photo prints, and document prints can be ready for same-day pickup at our BTM Layout store.",
  },
  {
    q: "Can I order small quantities?",
    a: "Absolutely. Many products start from single pieces (photo prints, passport photos) or low MOQs (100 visiting cards, 25 ID cards).",
  },
  {
    q: "How do I send my design files?",
    a: "Email print-ready PDFs to fastprintsbtm@gmail.com, WhatsApp +91 91647 79922, or walk in with a USB drive at the store.",
  },
  {
    q: "What are your most popular products?",
    a: "Visiting cards, pamphlets, ID cards, lanyards, photo prints, calendars, and wall signage are our top sellers.",
  },
];

export function HomeFaq() {
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
          <div key={item.q} className="group px-6 py-5 transition hover:bg-brand-50/30 md:px-10 md:py-6">
            <dt className="font-[family-name:var(--font-display)] text-base font-extrabold text-ink-950 md:text-lg">
              {item.q}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-ink-500">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
