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
    <footer className="mt-auto border-t border-ink-800 bg-[#0d0a08] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-brand-500 bg-black shrink-0">
                <Image src="/logo.png" alt="Fast Prints" fill className="object-cover p-1" sizes="48px" />
              </span>
              <div>
                <span className="font-[family-name:var(--font-display)] text-xl font-black tracking-tight text-white block leading-none">
                  {settings.businessName.split(" ")[0]?.toUpperCase() ?? "FAST"} PRINTS
                </span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-400">
                  BTM 2nd Stage, Bengaluru
                </span>
              </div>
            </Link>
            
            <p className="text-xs leading-relaxed text-white/70">
              Think Printing… Think Us. Premium digital printing, Visiting Cards, Flex Banners, Bill Books & Corporate ID Tags.
            </p>

            <div className="space-y-2.5 text-xs text-white/80 pt-1">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden />
                <span>
                  {settings.addressLines.map((line, i) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-400" aria-hidden />
                <a href={telHref(settings.phone)} className="font-bold text-brand-300 hover:underline">
                  {settings.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-400" aria-hidden />
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              </p>
            </div>
          </div>

          {/* Column 2 & 3: Navigation Links */}
          {footerLinks.map((col) => (
            <div key={col.title} className="space-y-3">
              <h3 className="font-[family-name:var(--font-display)] text-xs font-extrabold uppercase tracking-wider text-brand-400 border-b border-white/10 pb-2">
                {col.title}
              </h3>
              <ul className="space-y-2 text-xs">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/70 hover:text-brand-300 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Store Hours & Same-Day Pickup Notice */}
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-display)] text-xs font-extrabold uppercase tracking-wider text-brand-400 border-b border-white/10 pb-2">
              Store Timings & Pickup
            </h3>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <span className="text-base">⚡</span>
                <span>Same-Day Pickup Notice</span>
              </div>
              <p className="text-amber-100/90 leading-relaxed text-[11px]">
                For <strong>Same-Day Store Pickup</strong> or express doorstep delivery, please place your order <strong>before 2:00 PM</strong>.
              </p>
            </div>

            <div className="text-xs space-y-1 text-white/70 pt-1">
              <p className="font-bold text-white">Mon – Sat: <span className="text-brand-300">9:30 AM – 9:00 PM</span></p>
              <p className="text-[11px] text-white/50">BTM 2nd Stage, Outer Ring Road, Bengaluru</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer */}
      <div className="border-t border-white/10 bg-black/60 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-xs text-white/50 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/60">
            <span>GST Billed (18% Input Tax)</span>
            <span>•</span>
            <span>Express Courier / Dunzo Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
