import type { Testimonial } from "@/types/cms-content";
import type { TestimonialsContent } from "@/types/cms-content";
import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-brand-500 text-brand-500" : "fill-ink-200 text-ink-200"}`}
          aria-hidden
        />
      ))}
    </div>
  );
}

function InitialAvatar({ name }: { name: string }) {
  const initial = name.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase();
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-extrabold text-ink-950 shadow-md">
      {initial}
    </span>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_40px_rgba(245,180,22,0.1)]">
      <div className="flex items-start justify-between gap-3">
        <Stars rating={testimonial.rating} />
        <Quote className="h-8 w-8 shrink-0 text-brand-200" aria-hidden />
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">&ldquo;{testimonial.text}&rdquo;</p>
      {testimonial.product ? (
        <p className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-700">{testimonial.product}</p>
      ) : null}
      <footer className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
        <InitialAvatar name={testimonial.name} />
        <div>
          <p className="font-bold text-ink-950">{testimonial.name}</p>
          <p className="text-xs text-ink-500">
            {testimonial.role}
            {testimonial.company ? ` · ${testimonial.company}` : ""}
          </p>
          <p className="text-[11px] text-ink-400">{testimonial.location}</p>
        </div>
      </footer>
    </blockquote>
  );
}

type TestimonialsSectionProps = {
  content: TestimonialsContent;
  limit?: number;
  showViewAll?: boolean;
};

export function TestimonialsSection({ content, limit = 3, showViewAll = true }: TestimonialsSectionProps) {
  const items = content.items.filter((t) => t.featured).slice(0, limit);
  const display = items.length ? items : content.items.slice(0, limit);
  const { stats } = content;

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-ink-100 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
      <div className="border-b border-ink-100 bg-gradient-to-r from-brand-50/60 via-white to-brand-50/40 px-6 py-10 md:px-10 md:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Customer stories</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight text-ink-950 md:text-4xl">
              Trusted across Bengaluru
            </h2>
            <p className="text-sm leading-relaxed text-ink-500 md:text-base">
              Families, startups, schools, and corporate teams — real feedback from customers who print with us at BTM
              and online.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {[
              { value: stats.averageRating, label: "Average rating" },
              { value: stats.totalReviews, label: "Happy customers" },
              { value: stats.repeatCustomers, label: "Repeat orders" },
              { value: stats.yearsServing, label: "Years in print" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-ink-100 bg-white px-4 py-3 text-center shadow-sm">
                <p className="font-[family-name:var(--font-display)] text-xl font-extrabold text-brand-600">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 bg-white p-6 md:grid-cols-3 md:p-8">
        {display.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {showViewAll ? (
        <div className="border-t border-ink-100 bg-white px-6 py-5 text-center md:px-10">
          <Link href="/testimonials" className="btn-primary inline-flex">
            Read all reviews
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      ) : null}
    </section>
  );
}
