import { ProductConfigurator } from "@/components/product-configurator";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { formatINR } from "@/lib/currency";
import { getProductBySlug } from "@/lib/cms/queries";
import { CheckCircle2, ChevronRight, Clock, MapPin, ShieldCheck, Sparkles, Star, Truck, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryTitles: Record<string, string> = {
    "business-essentials": "Business Essentials",
    "marketing-collateral": "Marketing Collateral",
    "photo-gifting": "Photo & Gifting",
    "large-format": "Large Format",
    "signage-displays": "Signage & Displays",
    stationery: "Stationery",
    packaging: "Packaging",
    "apparel-promotional": "Apparel & Promotional",
  };

  const categoryTitle = categoryTitles[product.category] || "Printing Services";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* 1. Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-ink-500 sm:mb-6 sm:text-sm"
      >
        <Link href="/" className="hover:text-ink-950 font-medium">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-ink-400" aria-hidden />
        <Link href="/products" className="hover:text-ink-950 font-medium">
          Products
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-ink-400" aria-hidden />
        <Link href={`/category/${product.category}`} className="hover:text-ink-950 font-medium">
          {categoryTitle}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-ink-400" aria-hidden />
        <span className="font-semibold text-ink-950 truncate max-w-[200px] sm:max-w-none">{product.name}</span>
      </nav>

      {/* 2. Main 2-Column VistaPrint / Printo Style Product Grid */}
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.15fr_0.85fr] items-start">
        {/* LEFT COLUMN: Clean Image Showcase & Single-Row Thumbnails */}
        <div className="space-y-5">
          <ProductImageGallery
            primaryImage={product.image}
            gallery={product.gallery}
            productName={product.name}
            badge={product.badge}
            turnaround={product.turnaround}
          />

          {/* Left Column Storefront Badges */}
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded-xl border border-ink-100 bg-white p-3.5 shadow-2xs space-y-1">
              <p className="font-extrabold text-ink-950 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> 100% Quality Assurance
              </p>
              <p className="text-ink-600 leading-relaxed">
                Color-calibrated digital &amp; offset presses with precise razor-sharp die-cutting and inspection.
              </p>
            </div>

            <div className="rounded-xl border border-ink-100 bg-white p-3.5 shadow-2xs space-y-1">
              <p className="font-extrabold text-ink-950 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand-600" /> Walk-In Store Pickup
              </p>
              <p className="text-ink-600 leading-relaxed">
                BTM 2nd Stage, Bengaluru facility for direct walk-in pickup or express courier across India.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: VistaPrint / Printo Style Header, Description & Dropdown Configurator */}
        <div className="space-y-5">
          {/* Top Block: Title, Ratings, Overview, Same Day Delivery & Guidelines */}
          <div className="space-y-4 rounded-2xl border border-ink-100 bg-white p-5 sm:p-6 shadow-xs">
            {/* Category Pill & Rating */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                {categoryTitle}
              </span>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-700">
                <div className="flex text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                </div>
                <span className="font-bold">{product.rating ?? 4.8}</span>
                <span className="text-ink-400 font-normal">({product.reviewCount ?? 1895} reviews)</span>
              </div>
            </div>

            {/* Product Title & Subtitle */}
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold text-ink-950 leading-tight">
                {product.name}
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-ink-600 font-medium leading-relaxed">
                Clean, polished, and versatile — personalized cards with a professional look.
              </p>
            </div>

            {/* Structured Bullet Points (Printo / VistaPrint Style) */}
            <div className="space-y-2 border-t border-ink-100 pt-3 text-xs sm:text-sm text-ink-700">
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold">•</span>
                  <span><strong>Sizes:</strong> 3.5 x 2 inches (Standard 85 x 55 mm, Long 90 x 55 mm, Square 55 x 55 mm, Mini 85 x 25 mm)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold">•</span>
                  <span><strong>Paper Stock:</strong> 300GSM / 350GSM premium card with smooth matte or glossy lamination</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold">•</span>
                  <span><strong>Printing:</strong> High-definition digital &amp; offset color printing with sharp typography</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold">•</span>
                  <span><strong>Artwork Options:</strong> Upload print-ready PDF/CDR/AI designs or request free design soft proof</span>
                </li>
              </ul>
            </div>

            {/* Ideal For Callout */}
            <div className="rounded-xl bg-ink-50/70 p-2.5 text-xs text-ink-700 font-medium">
              <strong className="text-ink-950 font-bold">Ideal for:</strong> Startups, Consultants, Corporate Teams, Events &amp; Retail Business
            </div>

            {/* Same Day Delivery Notice (Exact before 12 / after 12 schedule) */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 space-y-1 text-xs">
              <p className="font-extrabold text-amber-950 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-600 fill-amber-500" /> Same Day Delivery in Bengaluru
              </p>
              <p className="text-amber-900/90 leading-relaxed">
                <strong>Order before 12:00 Noon</strong> for same-day delivery within 4–6 hours across Bengaluru. Orders placed after 12:00 Noon will be delivered the next working day.
              </p>
            </div>
          </div>

          {/* Down Side: Clean Dropdown Configurator with Design Upload & Instant Total */}
          <ProductConfigurator product={product} />
        </div>
      </div>
    </div>
  );
}
