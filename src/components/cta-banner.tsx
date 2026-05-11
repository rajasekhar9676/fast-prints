import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 text-center md:px-12">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="pointer-events-none absolute -top-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-brand-500/30 blur-3xl" />
      <div className="relative mx-auto max-w-3xl space-y-5">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-white md:text-4xl">
          Ready for artwork review?
        </h2>
        <p className="text-lg text-white/75">
          Upload print-ready PDFs or brief our desk — we&apos;ll confirm stock, finishing, and timeline before production locks.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/products"
            className="inline-flex rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-ink-950 shadow-lg shadow-brand-500/25 hover:bg-brand-400"
          >
            Start an order
          </Link>
          <Link
            href="tel:+919164779922"
            className="inline-flex rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15"
          >
            Call +91 91647 79922
          </Link>
        </div>
      </div>
    </section>
  );
}
