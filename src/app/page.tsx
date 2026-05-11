import { CategoryShowcase } from "@/components/category-showcase";
import { CtaBanner } from "@/components/cta-banner";
import { HeroSection } from "@/components/hero-section";
import { ProductCard } from "@/components/product-card";
import { ShopByNeedSection } from "@/components/shop-by-need";
import { TestimonialsSection } from "@/components/testimonials";
import { TrustStrip } from "@/components/trust-strip";
import { bestsellerProducts, newLaunchProducts, products } from "@/data/products";
import Link from "next/link";

export default function Home() {
  const popularRest = products.filter((p) => p.popular && !p.bestseller && !p.newLaunch).slice(0, 4);

  return (
    <div className="space-y-16 pb-8 md:space-y-20">
      <HeroSection />

      <TrustStrip />

      <CategoryShowcase />

      <ShopByNeedSection />

      <section className="space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-brand-700">Best sellers</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-ink-950 md:text-4xl">
              Crowd favourites this season
            </h2>
          </div>
          <Link href="/products" className="font-bold text-brand-800 underline decoration-brand-400 decoration-2 underline-offset-4 hover:text-brand-900">
            Shop everything →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {bestsellerProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {newLaunchProducts.length > 0 ? (
        <section className="space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">New launches</p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-ink-950 md:text-4xl">
                Fresh on the rack
              </h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {newLaunchProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : null}

      {popularRest.length > 0 ? (
        <section className="space-y-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-brand-700">Popular picks</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-ink-950 md:text-4xl">
              More customer favourites
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {popularRest.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : null}

      <TestimonialsSection />

      <CtaBanner />
    </div>
  );
}
