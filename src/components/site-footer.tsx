"use client";

import Image from "next/image";
import Link from "next/link";
import { useStoreData } from "@/context/store-data-context";
import { telHref } from "@/lib/contact";

export function SiteFooter() {
  const { settings } = useStoreData();

  return (
    <footer className="mt-auto bg-[#131110] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:py-16 md:grid-cols-4">
        {/* Column 1: Brand & Contact Info */}
        <div>
          <div className="mb-4 inline-block bg-white px-3 py-2 rounded-sm shadow-xs">
            <Image
              src="/images/logo/fastprints-official-logo.png"
              alt="Fast Prints"
              width={200}
              height={50}
              className="h-8 w-auto object-contain"
            />
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            {settings.businessName}
            <br />
            {settings.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block mt-2">Email: {settings.email}</span>
            <span className="block">
              Contact:{" "}
              <a href={telHref(settings.phone)} className="hover:text-white transition-colors">
                {settings.phone}
              </a>
            </span>
          </p>
        </div>

        {/* Column 2: Company */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Company</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Store Locator
              </Link>
            </li>
            <li>
              <Link href="/rate-card" className="hover:text-white transition-colors">
                Official Rate Card
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Shop */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Shop</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/products/rollup-standees" className="hover:text-white transition-colors">
                Promotional Display &amp; Standees
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition-colors">
                Custom Boxes &amp; Packaging
              </Link>
            </li>
            <li>
              <Link href="/products/table-calendars" className="hover:text-white transition-colors">
                Stationery &amp; Desk Calendars
              </Link>
            </li>
            <li>
              <Link href="/products/brochures" className="hover:text-white transition-colors">
                Marketing Collateral &amp; Brochures
              </Link>
            </li>
            <li>
              <Link href="/products/gold-stickers" className="hover:text-white transition-colors">
                Gold Foil &amp; Die-Cut Stickers
              </Link>
            </li>
            <li>
              <Link href="/products/photo-frames" className="hover:text-white transition-colors">
                Photo Frames &amp; Keepsakes
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Policies */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Policies</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/shipping" className="hover:text-white transition-colors">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                Help &amp; FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Sub-Footer */}
      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <p className="text-white/60">
            Same-Day Dispatch &amp; Express Counter Pickup in Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}
