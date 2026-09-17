import { EcommerceHeroBanners } from "@/components/ecommerce-hero-banners";
import { PopularCategoriesGrid } from "@/components/popular-categories-grid";
import { ProductRail } from "@/components/product-rail";
import { ShopByNeedRail } from "@/components/shop-by-need-rail";
import { StorePerksStrip } from "@/components/store-perks-strip";
import {
  getCategories,
  getHomepageContent,
  getProducts,
} from "@/lib/cms/queries";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const [products, categories, homepage] = await Promise.all([
    getProducts(),
    getCategories(),
    getHomepageContent(),
  ]);
  const bestsellerProducts = products.filter((p) => p.bestseller);
  const newLaunchProducts = products.filter((p) => p.newLaunch);
  const popularProducts = products.filter((p) => p.popular || p.bestseller).slice(0, 10);
  const sameDayProducts = products
    .filter((p) => p.turnaround.toLowerCase().includes("same-day") || p.turnaround.toLowerCase().includes("same day"))
    .slice(0, 10);
  const marketingProducts = products
    .filter((p) => p.category === "marketing-materials" || p.category === "large-format")
    .slice(0, 10);

  return (
    <div className="space-y-6 pb-8 md:space-y-8">
      <EcommerceHeroBanners banners={homepage.heroBanners} />
      <StorePerksStrip perks={homepage.perks} />
      <PopularCategoriesGrid categories={categories} />

      <ProductRail
        eyebrow="Most ordered"
        title="Bestsellers"
        subtitle="Cards, photos and print jobs people reorder"
        products={popularProducts.length ? popularProducts : bestsellerProducts.slice(0, 10)}
        seeAllHref="/products"
      />

      {sameDayProducts.length > 0 ? (
        <ProductRail
          eyebrow="Express"
          title="Same day delivery"
          subtitle="Order this morning, pickup today on select items"
          products={sameDayProducts}
          seeAllHref="/products?q=same-day"
          accent="warm"
        />
      ) : null}

      <ShopByNeedRail needs={homepage.shopNeeds} />

      {newLaunchProducts.length > 0 ? (
        <ProductRail
          eyebrow="Just in"
          title="New arrivals"
          products={newLaunchProducts}
          seeAllHref="/products"
        />
      ) : null}

      <ProductRail
        eyebrow="Brand visibility"
        title="Marketing & signage"
        products={marketingProducts}
        seeAllHref="/products?category=marketing-materials"
      />

      <Link
        href="/corporate"
        className="flex flex-col items-start justify-between gap-4 overflow-hidden rounded-[1.6rem] bg-[#16120c] px-6 py-6 text-white sm:flex-row sm:items-center md:px-8"
      >
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-400">Bulk & brands</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold">Ordering for a team?</p>
          <p className="mt-1 text-sm text-white/65">Cards, apparel, kits and signage — we quote before you pay.</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-extrabold text-ink-950">
          Get a quote
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </Link>
    </div>
  );
}
