import Image from "next/image";
import Link from "next/link";
import type { CorporateContent } from "@/types/cms-content";
import { ArrowRight, Building2, Sparkles } from "lucide-react";

export function CorporateSpotlight({ content }: { content: CorporateContent }) {
  const previewFeatures = content.features.slice(0, 4);

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-ink-200 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 px-6 py-10 md:px-10 lg:py-12">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-800">
            <Building2 className="h-3.5 w-3.5" aria-hidden />
            Fast Prints Corporate
          </div>

          <div className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight text-ink-950 md:text-4xl">
              Bulk print for teams &amp; brands
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-ink-500 md:text-base">{content.heroBody}</p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {previewFeatures.map((item) => (
              <li key={item.id} className="rounded-xl border border-ink-100 bg-ink-50/50 p-3">
                <p className="text-sm font-extrabold text-ink-950">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Link href="/corporate" className="btn-primary">
              Explore corporate
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/corporate#bulk-quote" className="btn-secondary">
              Request demo / quote
            </Link>
          </div>
        </div>

        <div className="relative border-t border-ink-100 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 p-6 lg:border-l lg:border-t-0 lg:p-8">
          <div className="hero-dot-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
          <div className="relative space-y-4">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
              <Image
                src={content.heroImage}
                alt="Corporate print samples"
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
            </div>
            <p className="flex items-center gap-2 text-xs font-semibold text-white/60">
              <Sparkles className="h-3.5 w-3.5 text-brand-400" aria-hidden />
              Volume MOQ from 100 pcs · dedicated BTM follow-up
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
