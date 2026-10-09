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
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

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
    <div className="space-y-6 pb-12 md:space-y-8 overflow-x-hidden">
      {/* Hero Section */}
      <EcommerceHeroBanners banners={homepage.heroBanners} />

      {/* Store Perks Strip */}
      <StorePerksStrip perks={homepage.perks} />

      {/* Official Rate Card Banner */}
      <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-r from-[#14110c] via-[#1f1a14] to-[#14110c] p-6 text-white shadow-lg ring-1 ring-brand-500/30">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" aria-hidden />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-brand-300 ring-1 ring-brand-400/40">
                <Zap className="h-3 w-3 text-brand-400" />
                Official Price List
              </span>
              <span className="hidden sm:inline text-xs text-white/50">• BTM 2nd Stage Store</span>
            </div>
            
            <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-extrabold text-white">
              Looking for complete itemized printing rates?
            </h3>
            
            <p className="text-xs sm:text-sm text-white/75 max-w-2xl leading-relaxed">
              Visiting Cards, 13x19 Digital Sheets, Offset Print, Bill Books, Stamps, ID Cards, Lanyards, Mugs & Signages — view upfront pricing.
            </p>
          </div>

          <Link
            href="/rate-card"
            className="btn-primary shrink-0 self-start md:self-center px-6 py-3 text-xs sm:text-sm font-extrabold group shadow-lg shadow-brand-500/20"
          >
            View Rate Card
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>

      {/* Categories */}
      <PopularCategoriesGrid categories={categories} />

      {/* Business Printing Category Showcase */}
      <ProductRail
        eyebrow="Essential print categories"
        title="Business & Commercial Printing"
        subtitle="Visiting cards, 13x19 digital sheets, letterheads, bill books & ID cards"
        products={popularProducts.length ? popularProducts : bestsellerProducts.slice(0, 8)}
        seeAllHref="/category/business-essentials"
        displayMode="grid"
      />

      {/* Same Day Express Section in a clean grid */}
      {sameDayProducts.length > 0 ? (
        <ProductRail
          eyebrow="Express service"
          title="Same day delivery & pickup"
          subtitle="Order early today, collect or receive at your doorstep in Bengaluru"
          products={sameDayProducts}
          seeAllHref="/same-day-delivery"
          accent="warm"
          displayMode="grid"
        />
      ) : null}

      {/* Shop by Need */}
      <ShopByNeedRail needs={homepage.shopNeeds} />

      {/* New Arrivals */}
      {newLaunchProducts.length > 0 ? (
        <ProductRail
          eyebrow="Just added"
          title="New print launches"
          subtitle="Discover our latest materials, textures and customized products"
          products={newLaunchProducts}
          seeAllHref="/products"
          displayMode="grid"
        />
      ) : null}

      {/* Marketing & Signage */}
      <ProductRail
        eyebrow="Business visibility"
        title="Marketing & signage"
        subtitle="Banners, standees, vinyl graphics and display boards for events & retail"
        products={marketingProducts}
        seeAllHref="/category/marketing-materials"
        displayMode="grid"
      />

      {/* Corporate & Bulk Orders CTA */}
      <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-r from-[#14120f] via-[#1d1811] to-[#14120f] p-7 text-white shadow-xl border border-brand-500/20">
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-brand-500/15 blur-3xl" aria-hidden />

        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-300 ring-1 ring-brand-400/30">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-400" />
              Corporate & Business Printing
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Bulk orders or corporate team packages?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Visiting cards, employee onboarding kits, customized apparel, and event signage. Custom quotes & GST invoices guaranteed.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-1 text-xs text-brand-200 font-semibold">
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand-400" /> GST Billing</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand-400" /> Custom Proofing</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand-400" /> Volume Discounts</span>
            </div>
          </div>

          <Link
            href="/corporate"
            className="btn-primary shrink-0 px-7 py-3.5 text-xs sm:text-sm font-extrabold shadow-lg shadow-brand-500/25 group"
          >
            Get Custom Quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

