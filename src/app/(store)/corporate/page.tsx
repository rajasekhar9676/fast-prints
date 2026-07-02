import { CorporateBulkForm } from "@/components/corporate-bulk-form";
import { ProductCard } from "@/components/product-card";
import { SectionHeader } from "@/components/section-header";
import { categoryLabelFromList, getCategories, getProducts } from "@/lib/cms/queries";
import { storeImages } from "@/data/store-images";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Phone } from "lucide-react";

const corporateCategoryIds = new Set(["business-essentials", "stationery", "marketing-materials", "large-format"]);

export default async function CorporatePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const corporateProducts = products.filter(
    (p) =>
      corporateCategoryIds.has(p.category) ||
      p.slug.includes("id-card") ||
      p.slug.includes("letterhead") ||
      p.slug.includes("visiting"),
  );

  return (
    <div className="space-y-14 pb-14">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-ink-950 text-white">
        <div className="hero-dot-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
        <div className="relative grid min-h-[320px] lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 px-6 py-10 md:px-10 lg:py-14">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-300">
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              Fast Prints Corporate
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight md:text-5xl">
              Bulk print for offices & brands
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-white/70">
              Visiting cards, employee ID kits, letterheads, pamphlets, and signage — with volume pricing and a dedicated
              follow-up from our BTM team.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#bulk-quote" className="btn-primary">
                Get bulk quote
              </a>
              <a href="tel:+919164779922" className="btn-ghost">
                <Phone className="h-4 w-4" aria-hidden />
                Call corporate desk
              </a>
            </div>
          </div>
          <div className="relative hidden items-center justify-center p-8 lg:flex">
            <div className="relative h-64 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
              <Image
                src={storeImages.letterheadsCorporate}
                alt="Corporate letterheads"
                fill
                className="object-contain p-2"
                sizes="400px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { title: "Brand consistency", body: "Matched colours across cards, letterheads, and envelopes." },
          { title: "Volume pricing", body: "Better rates on 500+ visiting cards, ID batches, and campaign print." },
          { title: "Dedicated support", body: "Artwork review, proofs, and timeline confirmation by phone." },
        ].map((item) => (
          <div key={item.title} className="card-premium p-5">
            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-ink-950">{item.title}</h2>
            <p className="mt-2 text-sm text-ink-500">{item.body}</p>
          </div>
        ))}
      </section>

      <section>
        <SectionHeader
          eyebrow="Corporate catalogue"
          title="Popular for businesses"
          subtitle="Order online or request a custom bulk quote below"
          seeAllHref="/products?category=business-essentials"
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {corporateProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName={categoryLabelFromList(categories, product.category)}
            />
          ))}
        </div>
      </section>

      <CorporateBulkForm />

      <section className="rounded-2xl border border-brand-200 bg-brand-50 px-6 py-8 text-center md:px-10">
        <p className="text-sm font-semibold text-ink-700">Prefer to talk first?</p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink-950">
          fastprintsbtm@gmail.com · +91 91647 79922
        </p>
        <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:underline">
          Visit our BTM store
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>
    </div>
  );
}
