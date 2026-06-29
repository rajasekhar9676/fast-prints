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
    <section className="panel-light overflow-hidden">
      <div className="border-b border-ink-100 bg-gradient-to-r from-brand-50 to-white px-6 py-6 md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-600">Help centre</p>
        <div className="gold-line mt-2" />
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink-950 md:text-3xl">
          Frequently asked questions
        </h2>
      </div>
      <dl className="divide-y divide-ink-100">
        {faqs.map((item, i) => (
          <div
            key={item.q}
            className="group flex gap-5 px-6 py-5 transition hover:bg-brand-50/40 md:px-8 md:py-6"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-sm font-bold text-brand-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <dt className="font-bold text-ink-950">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-500">{item.a}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
