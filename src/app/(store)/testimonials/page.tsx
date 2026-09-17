import { TestimonialCard } from "@/components/testimonials";
import { SectionHeader } from "@/components/section-header";
import { getSettings, getTestimonialsContent } from "@/lib/cms/queries";
import { telHref, whatsappHref } from "@/lib/contact";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read what Bengaluru customers say about Fast Prints — visiting cards, signage, ID kits, pamphlets, and same-day print at BTM Layout.",
};

export default async function TestimonialsPage() {
  const [content, settings] = await Promise.all([getTestimonialsContent(), getSettings()]);

  return (
    <div className="space-y-14 pb-14">
      <section className="relative overflow-hidden rounded-[1.75rem] bg-ink-950 px-6 py-12 text-white md:px-10 md:py-16">
        <div className="hero-dot-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm font-bold text-brand-300">
            <Star className="h-4 w-4 fill-brand-400 text-brand-400" aria-hidden />
            {content.stats.averageRating} average · {content.stats.totalReviews} customers
          </div>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight md:text-5xl">
            What our customers say
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Honest feedback from businesses, families, and event teams across Bengaluru. Walk-in at BTM or order online —
            same quality, same care.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="btn-primary">
              Browse products
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={whatsappHref(settings.whatsapp, "Hi Fast Prints, I read your reviews and want to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Reviews"
          title="Rated for speed, colour & finish"
          subtitle="From visiting cards to wall signage — customers return because we pick up the phone and deliver on time"
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {content.items.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white px-6 py-10 text-center md:px-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink-950 md:text-3xl">
          Had a great experience with us?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-ink-600 md:text-base">
          Tell us on Google or WhatsApp — your feedback helps other Bengaluru customers find reliable print.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={telHref(settings.phone)} className="btn-primary">
            Call {settings.phone}
          </a>
          <Link href="/contact" className="btn-secondary">
            Visit BTM store
          </Link>
        </div>
      </section>
    </div>
  );
}
