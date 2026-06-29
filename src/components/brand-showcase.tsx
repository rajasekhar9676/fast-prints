import Image from "next/image";
import Link from "next/link";
import { storeImages } from "@/data/store-images";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
  "Digital & Offset Print",
  "Visiting Cards & Letterheads",
  "ID Cards & Lanyards",
  "Calendars & Photo Print",
  "Signages & Wall Graphics",
  "Pamphlets & Bulk Print",
];

export function BrandShowcase() {
  return (
    <section className="panel-dark overflow-hidden">
      <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-10 lg:p-12">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-400">Think Printing… Think Us</p>
            <div className="gold-line mt-2" />
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold text-white md:text-4xl">
              Your complete print partner in Bengaluru
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">
              From visiting cards to wall murals — Fast Prints handles design, production, and pickup at BTM Layout with
              same-day options on select jobs.
            </p>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-400" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
          <Link href="/services" className="btn-primary inline-flex">
            Explore all services
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="relative flex justify-center">
          <div className="img-frame relative aspect-square w-full max-w-xs animate-float">
            <Image
              src={storeImages.servicesOverview}
              alt="Fast Prints services"
              fill
              className="object-contain p-2"
              sizes="320px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
