import { EcommerceHeroBanners } from "@/components/ecommerce-hero-banners";
import { ProductCard } from "@/components/product-card";
import { ShopByNeedRail } from "@/components/shop-by-need-rail";
import { getHomepageContent, getProducts } from "@/lib/cms/queries";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Clock,
  Printer,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

const DEPARTMENT_SHOWCASE = [
  {
    id: "digital-prints",
    name: "Digital Prints & Stationery",
    shortName: "Digital Prints",
    slug: "digital-prints",
    productCount: 34,
    heroImage: "/images/products/visiting-cards-studio-pro.jpg",
    featured: [
      {
        name: "Visiting Cards",
        price: "From ₹200",
        href: "/products/visiting-cards",
        image: "/images/products/visiting-cards-studio-pro.jpg",
      },
      {
        name: "Bill Books",
        price: "From ₹280",
        href: "/products/bill-books",
        image: "/images/products/bill-books-1-6th.jpg",
      },
      {
        name: "Die-Cut Stickers",
        price: "From ₹150",
        href: "/products/normal-stickers",
        image: "/images/products/stickers-diecut-pro.jpg",
      },
    ],
  },
  {
    id: "banners-signages",
    name: "Banners & Signages",
    shortName: "Banners & Signs",
    slug: "banners-signages",
    productCount: 16,
    heroImage: "/images/products/rollup-standy-6x3ft-blue.jpg",
    featured: [
      {
        name: "Roll-Up Standees",
        price: "From ₹1,100",
        href: "/products/rollup-standees",
        image: "/images/products/rollup-standy-6x3ft-blue.jpg",
      },
      {
        name: "Star Flex Banners",
        price: "From ₹15/sq.ft",
        href: "/products/flex-banners",
        image: "/images/products/star-flex-banner.jpg",
      },
      {
        name: "Acrylic Signs",
        price: "From ₹220",
        href: "/products/acrylic-stands",
        image: "/images/products/acrylic-stand-a4.jpg",
      },
    ],
  },
  {
    id: "gifts-merchandise",
    name: "Gifts & Merchandise",
    shortName: "Gifts & Merch",
    slug: "gifts-merchandise",
    productCount: 13,
    heroImage: "/images/products/photo-frame-4x4-black.jpg",
    featured: [
      {
        name: "Photo Frames",
        price: "From ₹150",
        href: "/products/photo-frames",
        image: "/images/products/photo-frame-4x4-black.jpg",
      },
      {
        name: "Ceramic Mugs",
        price: "From ₹220",
        href: "/products/ceramic-mug-print",
        image: "/images/products/ceramic-mug-color-wave.jpg",
      },
      {
        name: "Custom T-Shirts",
        price: "From ₹299",
        href: "/products/tshirt-printing",
        image: "/images/products/printed-tshirt-white.jpg",
      },
    ],
  },
];

const CUSTOMER_REVIEWS = [
  {
    name: "Prem Kumar",
    role: "Studio & Retail Founder · Bengaluru",
    text: "I got my promotional posters, menu price book, and visiting cards printed at Fast Prints, and the quality exceeded my expectations. Crisp typography, vibrant colors, and very polite support throughout.",
  },
  {
    name: "David Zennie",
    role: "Creative Director · Bengaluru",
    text: "Fast Prints has been fantastic to work with! The print quality is top-notch, calibrated colors match our design files perfectly, and their same-day delivery in Bengaluru helped us meet tight client deadlines.",
  },
  {
    name: "Adhi Nidhish Gowda",
    role: "Corporate Operations · Bengaluru",
    text: "Placed an order for corporate duplicate bill books and desk calendars. The paper stock and binding were top quality, and the entire consignment was delivered in under 24 hours.",
  },
];

export default async function Home() {
  const [products, homepage] = await Promise.all([
    getProducts(),
    getHomepageContent(),
  ]);

  // Fast Prints customer favorite products
  const popularSlugs = [
    "visiting-cards",
    "flex-banners",
    "rollup-standees",
    "id-cards-pvc",
    "lanyard-tags",
    "rubber-stamps",
    "self-inking-seals",
    "gold-stickers",
  ];

  const popularProducts = popularSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as typeof products;

  return (
    <div className="w-full bg-white space-y-16 sm:space-y-20 pb-20">
      {/* 1. Fast Prints Polished Hero Stage + 3-Card Seasonal Feature + Category Carousel */}
      <EcommerceHeroBanners />

      {/* 2. Shop By Business Need (User's Popular Luxury Dark Cards Rail) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <ShopByNeedRail needs={homepage.shopNeeds} />
      </div>

      {/* 3. Customer Favorites / Our Most Popular Products */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <section>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-neutral-200/80 pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Customer Favorites</span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold text-[#131110] tracking-tight">
                Our Most Popular Products
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-neutral-500">
                Explore the daily printing essentials businesses and creators rely on every day.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#131110] hover:text-amber-600 transition-colors shrink-0"
            >
              <span>Explore all 63 products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>

      {/* 4. Shop by Department (Digital Prints, Banners, Merchandise) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <section>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-neutral-200/80 pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Production Wings</span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold text-[#131110] tracking-tight">
                Shop by Department
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-neutral-500">
                Commercial print facilities with same-day dispatch and counter pickup in Bengaluru.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#131110] hover:text-amber-600 transition-colors shrink-0"
            >
              <span>View all categories</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {DEPARTMENT_SHOWCASE.map((dept) => (
              <div
                key={dept.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg"
              >
                {/* Photographic Hero Banner */}
                <Link
                  href={`/category/${dept.slug}`}
                  className="relative aspect-[16/9] w-full bg-[#f8f7f5] overflow-hidden block"
                >
                  <Image
                    src={dept.heroImage}
                    alt={dept.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Badges */}
                  <span className="absolute top-3.5 left-3.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold text-neutral-900 shadow-xs border border-neutral-200/80">
                    {dept.productCount} Products
                  </span>
                  <span className="absolute top-3.5 right-3.5 rounded-full bg-amber-400 text-neutral-950 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shadow-xs">
                    Same-Day Available
                  </span>

                  {/* Title overlay */}
                  <div className="absolute bottom-3.5 left-4 right-4">
                    <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                      {dept.name}
                    </h3>
                  </div>
                </Link>

                {/* Bottom Body: Visual Mini-Grid of Featured Products */}
                <div className="p-5 sm:p-6 space-y-4 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-2.5">
                      Popular Products in this Department
                    </span>

                    <div className="grid grid-cols-3 gap-2.5">
                      {dept.featured.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group/item flex flex-col items-center text-center p-2 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors border border-neutral-100"
                        >
                          <div className="relative aspect-square w-full rounded-lg bg-white overflow-hidden mb-1.5 border border-neutral-200/60 flex items-center justify-center p-1">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-1 group-hover/item:scale-105 transition-transform"
                              sizes="80px"
                            />
                          </div>
                          <span className="text-[11px] font-bold text-neutral-900 line-clamp-1 group-hover/item:text-amber-600 transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-bold text-neutral-500">
                            {item.price}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/category/${dept.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs mt-2"
                  >
                    <span>Browse {dept.shortName}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 5. Editorial Brand Craft Statement: Clean, spacious typography */}
      <section className="border-y border-black/5 bg-[#f8f6f0] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-neutral-800 border border-black/10 shadow-2xs">
            <span>Fast Prints Bengaluru · Est. 2018</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#131110]">
            Think Printing… Think Fast Prints
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-neutral-600">
            From sharp 350GSM visiting cards and carbonless duplicate bill books to large outdoor flex
            banners, roll-up standees, acrylic signs, and executive corporate gifts — we produce
            everything under one roof with calibrated color accuracy, precision die-cutting, and
            reliable same-day turnaround in Bengaluru.
          </p>

          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-[#131110] hover:bg-neutral-800 text-white px-7 py-3 text-sm font-bold shadow-sm transition-all"
            >
              <span>Explore All 63 Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. What Our Customers Say (Real Reviews) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <section>
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#131110]">
              What Our Customers Say
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-500">
              Real reviews from businesses, startups, and creators across Bengaluru.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {CUSTOMER_REVIEWS.map((review) => (
              <div
                key={review.name}
                className="flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-7 shadow-2xs hover:shadow-md transition-all"
              >
                <div>
                  <div className="mb-3.5 flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500" />
                    ))}
                  </div>

                  <p className="mb-5 text-xs sm:text-sm leading-relaxed text-neutral-700 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="border-t border-neutral-100 pt-3">
                  <p className="font-bold text-sm text-[#131110]">{review.name}</p>
                  <p className="text-xs text-neutral-500">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 7. The Fast Prints Guarantee */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <section className="rounded-2xl border border-neutral-200/90 bg-[#f8f6f0] p-7 sm:p-12 shadow-2xs">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold text-[#131110] tracking-tight">
              The Fast Prints Guarantee
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-500">
              Trusted by startups, retail stores, corporations, and agencies across Bengaluru.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 mb-3.5">
                <Truck className="h-6 w-6" />
              </span>
              <h4 className="font-bold text-sm text-[#131110]">Fast Local Dispatch</h4>
              <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                Same-day &amp; 24-hr turnaround with local courier or express counter collection.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 mb-3.5">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <h4 className="font-bold text-sm text-[#131110]">100% Quality Assurance</h4>
              <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                Premium 300/350GSM card stocks, calibrated color profiles, and razor-sharp cuts.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 mb-3.5">
                <Printer className="h-6 w-6" />
              </span>
              <h4 className="font-bold text-sm text-[#131110]">Complimentary Prepress Check</h4>
              <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                Our technicians inspect file resolution, cut bleed &amp; margins before printing.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 mb-3.5">
                <Award className="h-6 w-6" />
              </span>
              <h4 className="font-bold text-sm text-[#131110]">Corporate &amp; GST Invoicing</h4>
              <p className="mt-1 text-xs text-neutral-500 leading-relaxed">
                Input tax credit on every order, dedicated account support, and bulk volume rates.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
