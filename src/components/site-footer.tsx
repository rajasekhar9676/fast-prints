"use client";

import Image from "next/image";
import Link from "next/link";
import { useStoreData } from "@/context/store-data-context";
import { telHref, websiteHref } from "@/lib/contact";
import { Globe, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  const { settings } = useStoreData();

  const footerLinks = [
    {
      title: "Quick Shop",
      links: [
        { href: "/products", label: "All Print Products" },
        { href: "/rate-card", label: "Official Rate Card" },
        { href: "/products/visiting-cards", label: "Visiting Cards" },
        { href: "/products/13x19-digital-print", label: "13x19 Digital Sheets" },
        { href: "/products/banners-vinyl-stickers", label: "Flex & Vinyl Banners" },
        { href: "/cart", label: "Shopping Cart" },
      ],
    },
    {
      title: "Popular Services",
      links: [
        { href: "/products/single-color-bill-books", label: "Bill Books & Receipts" },
        { href: "/products/id-cards-lanyards", label: "ID Cards & Lanyards" },
        { href: "/products/seals-stamps", label: "Self-Ink Stamps" },
        { href: "/products/photo-print-with-frame", label: "Photo Frames" },
        { href: "/services", label: "All Printing Services" },
        { href: "/contact", label: "Contact & Store Location" },
      ],
    },
  ];

  return (
    <footer className="mt-auto border-t border-ink-200/80 bg-white text-ink-950 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center group">
              <Image
                src="/logo.png"
                alt="Fast Prints - Think Printing... Think Us..."
                width={210}
                height={46}
                className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>
            
            <p className="text-xs leading-relaxed text-ink-600">
              Think Printing… Think Us. Premium digital printing, Visiting Cards, Flex Banners, Bill Books &amp; Corporate ID Tags.
            </p>

            <div className="space-y-2.5 text-xs text-ink-700 pt-1">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                <span>
                  {settings.addressLines.map((line, i) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                <a href={telHref(settings.phone)} className="font-extrabold text-ink-950 hover:text-brand-600 transition-colors">
                  {settings.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                <a href={`mailto:${settings.email}`} className="text-ink-700 hover:text-brand-600 font-medium transition-colors">
                  {settings.email}
                </a>
              </p>
            </div>
          </div>

          {/* Column 2 & 3: Navigation Links */}
          {footerLinks.map((col) => (
            <div key={col.title} className="space-y-3">
              <h3 className="font-[family-name:var(--font-display)] text-xs font-extrabold uppercase tracking-wider text-ink-950 border-b border-ink-100 pb-2">
                {col.title}
              </h3>
              <ul className="space-y-2.5 text-xs">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-ink-600 hover:text-ink-950 hover:translate-x-0.5 font-medium transition-all inline-block">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Store Hours & Same-Day Pickup Notice */}
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-display)] text-xs font-extrabold uppercase tracking-wider text-ink-950 border-b border-ink-100 pb-2">
              Store Timings &amp; Pickup
            </h3>

            <div className="rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 p-4 space-y-2 text-xs shadow-xs">
              <div className="flex items-center gap-1.5 font-extrabold text-amber-900">
                <span className="text-sm">⚡</span>
                <span>Same-Day Pickup Notice</span>
              </div>
              <p className="text-amber-950/80 leading-relaxed text-[11px]">
                For <strong>Same-Day Store Pickup</strong> or express doorstep delivery, please place your order <strong>before 2:00 PM</strong>.
              </p>
            </div>

            <div className="text-xs space-y-1 text-ink-700 pt-1">
              <p className="font-bold text-ink-950">Mon – Sat: <span className="text-brand-700 font-extrabold">9:30 AM – 9:00 PM</span></p>
              <p className="text-[11px] text-ink-500">BTM 2nd Stage, Outer Ring Road, Bengaluru</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer */}
      <div className="border-t border-ink-100 bg-[#fbfaf8] py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-xs text-ink-500 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-ink-600 font-semibold">
            <span className="inline-flex items-center gap-1">🛡️ GST Billed (18% Input Tax)</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">🚀 Express Courier / Dunzo Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
