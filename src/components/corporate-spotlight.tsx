import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { storeImages } from "@/data/store-images";
import { ArrowRight, Building2, CheckCircle2, FileStack, Users } from "lucide-react";

const highlights = [
  "Visiting cards, letterheads & envelopes",
  "Employee ID cards + lanyard kits",
  "Bulk pamphlets, signage & stationery",
  "Brand colour matching & design support",
];

type CorporateSpotlightProps = {
  corporateProducts?: Product[];
};

export function CorporateSpotlight({ corporateProducts = [] }: CorporateSpotlightProps) {
  const preview = corporateProducts.slice(0, 3);

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-ink-200 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center gap-6 px-6 py-10 md:px-10 lg:py-12">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-300">
            <Building2 className="h-3.5 w-3.5" aria-hidden />
            Corporate solutions
          </div>

          <div className="space-y-3">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight md:text-4xl">
              Printing for teams, offices & events
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
              Bulk visiting cards, ID kits, letterheads, and campaign print — with quotes tailored for your quantity.
              Like Zoomin&apos;s corporate desk, our team reaches out for large orders.
            </p>
          </div>

          <ul className="grid gap-2 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/85">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Link href="/corporate" className="btn-primary">
              Explore corporate
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/corporate#bulk-quote" className="btn-ghost border-white/20">
              Get bulk quote
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 border-t border-white/10 pt-5 text-sm">
            <div className="flex items-center gap-2 text-white/75">
              <Users className="h-4 w-4 text-brand-400" aria-hidden />
              HR & admin teams
            </div>
            <div className="flex items-center gap-2 text-white/75">
              <FileStack className="h-4 w-4 text-brand-400" aria-hidden />
              MOQ from 100 pcs
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-ink-950/50 p-6 lg:border-l lg:border-t-0 lg:p-8">
          <div className="relative mx-auto aspect-[4/3] max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3">
            <Image
              src={storeImages.idCardLanyardSet}
              alt="Corporate ID cards and lanyards"
              fill
              className="object-contain object-center p-2"
              sizes="(max-width: 1024px) 90vw, 400px"
            />
          </div>

          {preview.length > 0 ? (
            <div className="mt-5 grid grid-cols-3 gap-2">
              {preview.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group rounded-xl border border-white/10 bg-white/5 p-2 transition hover:border-brand-500/40 hover:bg-white/10"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
                    <Image src={product.image} alt={product.name} fill className="object-contain p-1" sizes="96px" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-[10px] font-bold leading-tight text-white/90 group-hover:text-brand-300">
                    {product.name}
                  </p>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
