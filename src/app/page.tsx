import { BrandShowcase } from "@/components/brand-showcase";
import { EcommerceHeroBanners } from "@/components/ecommerce-hero-banners";
import { HomeFaq } from "@/components/home-faq";
import { PopularCategoriesGrid } from "@/components/popular-categories-grid";
import { ProductRail } from "@/components/product-rail";
import { ShopByNeedRail } from "@/components/shop-by-need-rail";
import { StorePerksStrip } from "@/components/store-perks-strip";
import { bestsellerProducts, newLaunchProducts, products } from "@/data/products";

export default function Home() {
  const sameDayProducts = products
    .filter((p) => p.turnaround.toLowerCase().includes("same-day") || p.turnaround.toLowerCase().includes("same day"))
    .slice(0, 12);
  const marketingProducts = products
    .filter((p) => p.category === "marketing-materials" || p.category === "large-format")
    .slice(0, 12);

  return (
    <div className="space-y-14 pb-14 md:space-y-16">
      <EcommerceHeroBanners />

      <StorePerksStrip />

      <ShopByNeedRail />

      <PopularCategoriesGrid />

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
