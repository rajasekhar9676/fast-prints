const quotes = [
  {
    name: "Priya S.",
    role: "Marketing Manager",
    text: "Our launch flyers and standees were ready faster than the venue setup. Colour popped exactly like the PDF proof.",
  },
  {
    name: "Arjun M.",
    role: "Startup Founder",
    text: "Cards + tees for the team in one place. Fast Prints handled the sizing chaos so we could focus on demos.",
  },
  {
    name: "Neha R.",
    role: "Bride-to-be",
    text: "Invitation folio with foil detail — guests keep asking where we printed. Stunning finish.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-700">Customers say</p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-ink-950 md:text-4xl">
          Rated for speed &amp; finish
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {quotes.map((q) => (
          <blockquote
            key={q.name}
            className="flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
          >
            <p className="flex-1 text-sm leading-relaxed text-ink-700">&ldquo;{q.text}&rdquo;</p>
            <footer className="mt-6 border-t border-ink-100 pt-4">
              <p className="font-semibold text-ink-950">{q.name}</p>
              <p className="text-xs text-ink-500">{q.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
