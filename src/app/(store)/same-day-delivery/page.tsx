import { ProductCard } from "@/components/product-card";
import { getCategories, getProducts } from "@/lib/cms/queries";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Same Day Printing Bengaluru | Express Pickup & Delivery · Fast Prints",
  description: "Need urgent printing in Bengaluru? Order visiting cards, brochures, banners & stickers with same day delivery or BTM Stage 2 store pickup.",
  keywords: ["same day printing Bengaluru", "express printing BTM", "urgent print shop Bangalore", "Fast Prints express"],
};

export default async function SameDayDeliveryPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const sameDayProducts = products.filter(
    (p) => p.turnaround.toLowerCase().includes("same-day") || p.turnaround.toLowerCase().includes("same day")
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Express Hero Banner */}
      <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#1a1208] via-[#241a0b] to-[#140e06] p-6 sm:p-8 text-white shadow-lg border border-amber-500/30">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-500/25 blur-3xl" aria-hidden />

        <div className="relative space-y-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors mb-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All products
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-300 ring-1 ring-amber-400/40">
            <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            Express 24-Hour Service
          </span>

          <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl font-extrabold text-white">
            Same Day Printing in Bengaluru
          </h1>

          <p className="max-w-2xl text-xs sm:text-sm text-white/80 leading-relaxed">
            Order in the morning and pick up today from our BTM 2nd Stage facility or get express doorstep delivery across Bengaluru.
          </p>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200/60 bg-amber-50/50 p-4">
          <Clock className="h-5 w-5 text-amber-700 shrink-0" />
          <div>
            <p className="text-xs font-bold text-ink-950">Cut-off Time: 1:00 PM</p>
            <p className="text-[11px] text-ink-600">Orders placed before 1 PM dispatch today</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200/60 bg-amber-50/50 p-4">
          <Zap className="h-5 w-5 text-amber-700 shrink-0" />
          <div>
            <p className="text-xs font-bold text-ink-950">BTM Store Pickup</p>
            <p className="text-[11px] text-ink-600">Collect directly from BTM 2nd Stage counter</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200/60 bg-amber-50/50 p-4">
          <Zap className="h-5 w-5 text-amber-700 shrink-0" />
          <div>
            <p className="text-xs font-bold text-ink-950">Rapid Courier</p>
            <p className="text-[11px] text-ink-600">Local express courier &amp; doorstep delivery available</p>
          </div>
        </div>
      </div>

      {/* Express Products Grid */}
      <section className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
        {sameDayProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categoryName={categories.find((c) => c.id === product.category)?.name}
          />
        ))}
      </section>
    </div>
  );
}
