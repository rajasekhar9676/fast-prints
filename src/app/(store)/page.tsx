import { BrandShowcase } from "@/components/brand-showcase";
import { CorporateSpotlight } from "@/components/corporate-spotlight";
import { EcommerceHeroBanners } from "@/components/ecommerce-hero-banners";
import { HomeFaq } from "@/components/home-faq";
import { HowItWorks } from "@/components/how-it-works";
import { PopularCategoriesGrid } from "@/components/popular-categories-grid";
import { ProductRail } from "@/components/product-rail";
import { PromiseSection } from "@/components/promise-section";
import { ShopByBudget } from "@/components/shop-by-budget";
import { ShopByNeedRail } from "@/components/shop-by-need-rail";
import { StorePerksStrip } from "@/components/store-perks-strip";
import { TopAudienceBar } from "@/components/top-audience-bar";
import { getCategories, getProducts } from "@/lib/cms/queries";

export default async function Home() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const bestsellerProducts = products.filter((p) => p.bestseller);
  const newLaunchProducts = products.filter((p) => p.newLaunch);
  const popularProducts = products.filter((p) => p.popular || p.bestseller).slice(0, 12);
  const sameDayProducts = products
    .filter((p) => p.turnaround.toLowerCase().includes("same-day") || p.turnaround.toLowerCase().includes("same day"))
    .slice(0, 12);
  const marketingProducts = products
    .filter((p) => p.category === "marketing-materials" || p.category === "large-format")
    .slice(0, 12);
  const corporateProducts = products.filter(
    (p) =>
      p.category === "business-essentials" ||
      p.slug.includes("id-card") ||
      p.slug.includes("letterhead") ||
      p.slug.includes("visiting"),
  );

  return (
    <div className="space-y-14 pb-14 md:space-y-16">
      <TopAudienceBar />

      <EcommerceHeroBanners />

      <CorporateSpotlight corporateProducts={corporateProducts} />

      <StorePerksStrip />

      <PopularCategoriesGrid categories={categories} />

      <ShopByNeedRail />

      <ShopByBudget />

      <ProductRail
        eyebrow="Most loved"
        title="Prints people order again & again"
        subtitle="Top picks from businesses and families across Bengaluru"
        products={popularProducts.length ? popularProducts : bestsellerProducts.slice(0, 12)}
        seeAllHref="/products"
      />

      <HowItWorks />

      <ProductRail
        eyebrow="Top picks"
        title="Best sellers"
        subtitle="Most ordered by businesses across Bengaluru"
        products={bestsellerProducts.slice(0, 12)}
        seeAllHref="/products"
      />

      {sameDayProducts.length > 0 ? (
        <ProductRail
          title="Same day delivery"
          subtitle="Order today, pickup today — select products only"
          products={sameDayProducts}
          seeAllHref="/products?q=same-day"
          accent="express"
        />
      ) : null}

      <PromiseSection />

      <BrandShowcase />

      {newLaunchProducts.length > 0 ? (
        <ProductRail
          eyebrow="Just in"
          title="New launches"
          products={newLaunchProducts}
          seeAllHref="/products"
        />
      ) : null}

      <ProductRail
        title="Marketing & signage"
        subtitle="Pamphlets, wall graphics, bulk print & more"
        products={marketingProducts}
        seeAllHref="/products?category=marketing-materials"
        accent="dark"
      />

      <HomeFaq />
    </div>
  );
}
