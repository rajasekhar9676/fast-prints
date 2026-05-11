import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-ink-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-brand-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brand-400/15 blur-3xl" />

      <div className="relative grid gap-10 px-6 py-14 md:grid-cols-[1.15fr_1fr] md:px-12 md:py-16 lg:gap-14">
        <div className="flex flex-col justify-center space-y-6 animate-fade-in-up">
          <div className="inline-flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-950">
              Bengaluru · BTM Layout
            </span>
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/90">
              Same-day pickup on select jobs
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.25rem]">
            Print that moves{" "}
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 bg-clip-text text-transparent">
              at Fast Prints speed
            </span>
          </h1>

          <p className="max-w-xl text-lg text-white/75 md:text-xl">
            Business cards to wide-format banners — design support, colour-accurate production, and reliable turnaround from
            Kuvempu Nagar.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-ink-950 shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
            >
              Shop all products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Visit store / Call now
            </Link>
          </div>

          <dl className="grid gap-4 pt-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <dt className="text-xs font-medium uppercase tracking-wide text-brand-300">Rating</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold">4.9★</dd>
              <dd className="text-xs text-white/60">Trusted locally</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <dt className="text-xs font-medium uppercase tracking-wide text-brand-300">Turnaround</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold">Same-day</dd>
              <dd className="text-xs text-white/60">On select SKUs</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <dt className="text-xs font-medium uppercase tracking-wide text-brand-300">Services</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold">40+</dd>
              <dd className="text-xs text-white/60">Print disciplines</dd>
            </div>
          </dl>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-400/40 via-transparent to-brand-600/20 blur-2xl" />
            <div className="relative mx-auto flex aspect-square max-h-[340px] max-w-[340px] items-center justify-center rounded-full border-4 border-brand-500/80 bg-ink-900/80 p-8 shadow-2xl shadow-black/50 md:max-h-[380px] md:max-w-[380px]">
              <Image src="/logo.png" alt="Fast Prints Bengaluru logo" width={280} height={280} className="h-auto w-[85%] drop-shadow-lg" priority />
            </div>
            <div className="absolute -bottom-2 left-1/2 hidden w-[90%] -translate-x-1/2 rounded-2xl border border-white/10 bg-ink-900/90 px-4 py-3 text-center text-xs text-white/80 shadow-xl backdrop-blur-md sm:block">
              <span className="font-semibold text-brand-300">Landmark · BTM 2nd Stage</span>
              <span className="mx-2 text-white/40">·</span>
              Opp. Metro Pillar 154
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
