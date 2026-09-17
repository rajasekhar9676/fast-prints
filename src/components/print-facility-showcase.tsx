import Image from "next/image";
import Link from "next/link";
import type { PrintFacilityContent } from "@/types/cms-content";
import { ArrowRight, Cog } from "lucide-react";

export function PrintFacilityShowcase({ facility }: { facility: PrintFacilityContent }) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-ink-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
      <div className="hero-dot-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />

      <div className="relative border-b border-ink-100 bg-gradient-to-r from-brand-50/70 via-white to-brand-50/40 px-6 py-10 md:px-10 md:py-12">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-700 shadow-sm">
              <Cog className="h-3.5 w-3.5" aria-hidden />
              {facility.eyebrow}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight text-ink-950 md:text-4xl">
              {facility.title}
            </h2>
            <p className="text-sm leading-relaxed text-ink-600 md:text-base">{facility.body}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {facility.stats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-2xl border border-ink-100 bg-white px-4 py-3 text-center shadow-sm"
              >
                <p className="font-[family-name:var(--font-display)] text-lg font-extrabold text-brand-700 md:text-xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative grid gap-0 bg-white lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[280px] border-b border-ink-100 lg:border-b-0 lg:border-r lg:border-ink-100">
          <Image
            src={facility.overviewImage}
            alt="Fast Prints production facility"
            fill
            className="object-contain p-8 md:p-10"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-50/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-brand-50/70" />
        </div>

        <div className="grid gap-4 bg-ink-50/60 p-4 sm:grid-cols-2 sm:p-6">
          {facility.machines.map((machine) => (
            <article
              key={machine.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_32px_rgba(245,180,22,0.12)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-brand-50/40 to-white">
                <Image
                  src={machine.image}
                  alt={machine.name}
                  fill
                  className="object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
                  sizes="280px"
                />
                <span className="absolute left-3 top-3 rounded-full border border-brand-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-700 shadow-sm">
                  {machine.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-ink-950">
                  {machine.name}
                </h3>
                <p className="flex-1 text-xs leading-relaxed text-ink-600">{machine.description}</p>
                <ul className="flex flex-wrap gap-1.5 pt-1">
                  {machine.specs.map((spec) => (
                    <li
                      key={spec}
                      className="rounded-md border border-ink-100 bg-ink-50 px-2 py-0.5 text-[10px] font-semibold text-ink-700"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-100 bg-white px-6 py-5 md:px-10">
        <p className="text-sm text-ink-500">Production at BTM · Digital, offset, large format & finishing</p>
        <Link href="/corporate" className="btn-primary shrink-0">
          Corporate & bulk orders
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
