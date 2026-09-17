import { CorporateBulkForm } from "@/components/corporate-bulk-form";
import { CorporateProductCard } from "@/components/corporate-product-card";
import { SectionHeader } from "@/components/section-header";
import {
  categoryLabelFromList,
  getCategories,
  getCorporateContent,
  getProducts,
  getSettings,
} from "@/lib/cms/queries";
import { telHref } from "@/lib/contact";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Building2, CheckCircle2, Gift, Phone, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const corporateCategoryIds = new Set(["business-essentials", "stationery", "marketing-materials", "large-format"]);

const solutionIcons: Record<string, LucideIcon> = {
  Users,
  BarChart3,
  Building2,
  Gift,
};

export default async function CorporatePage() {
  const [products, categories, content, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getCorporateContent(),
    getSettings(),
  ]);
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
        <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl" aria-hidden />
        <div className="relative grid min-h-[360px] lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-6 px-6 py-10 md:px-10 lg:py-14">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-300">
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              {content.heroEyebrow}
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.08] md:text-5xl">
              {content.heroTitle}
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-white/70">{content.heroBody}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#bulk-quote" className="btn-primary">
                Request demo / quote
              </a>
              <a href={telHref(settings.phone)} className="btn-ghost">
                <Phone className="h-4 w-4" aria-hidden />
                Call corporate desk
              </a>
            </div>
          </div>
          <div className="relative hidden items-center justify-center p-8 lg:flex">
            <div className="relative h-72 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl">
              <Image
                src={content.heroImage}
                alt="Corporate ID and print kits"
                fill
                className="object-contain p-3"
                sizes="400px"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Why teams choose us"
          title="Built for HR, marketing &amp; admin"
          subtitle="No checkout pressure — share requirements and we respond with volume pricing and timeline"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.features.map((item) => (
            <div key={item.id} className="card-premium p-5 transition hover:border-brand-200">
              <CheckCircle2 className="h-5 w-5 text-brand-600" aria-hidden />
              <h2 className="mt-3 font-[family-name:var(--font-display)] font-extrabold text-ink-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel-dark overflow-hidden rounded-[1.75rem] p-6 md:p-10">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-400">Solutions</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold text-white md:text-3xl">
            Workflows for every team
          </h2>
          <p className="mt-3 text-sm text-white/60">
            Pick a use case — we handle production, finishing, and follow-up on phone or WhatsApp.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.solutions.map((solution) => {
            const Icon = solutionIcons[solution.icon] ?? Building2;
            return (
              <div
                key={solution.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-brand-500/30 hover:bg-white/10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-ink-950">
                  <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] font-extrabold text-white">
                  {solution.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{solution.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Corporate catalogue"
          title="Popular for businesses"
          subtitle="Browse capabilities — request a quote for volume pricing (prices not shown online)"
          seeAllHref="/products?category=business-essentials"
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {corporateProducts.map((product) => (
            <CorporateProductCard
              key={product.id}
              product={product}
              categoryName={categoryLabelFromList(categories, product.category)}
            />
          ))}
        </div>
      </section>

      <CorporateBulkForm />

      <section className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white px-6 py-8 text-center md:px-10">
        <p className="text-sm font-semibold text-ink-700">Prefer to talk first?</p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink-950">
          {settings.email} · {settings.phone}
        </p>
        <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:underline">
          Visit our BTM store
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>
    </div>
  );
}
