import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { href: "/products", label: "All products" },
      { href: "/products?category=business-essentials", label: "Business essentials" },
      { href: "/products?category=large-format", label: "Large format" },
      { href: "/cart", label: "Cart" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/services", label: "All services" },
      { href: "/contact", label: "Contact & map" },
      { href: "/checkout", label: "Checkout" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ink-200 bg-ink-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-5">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-brand-500 bg-black">
              <Image src="/logo.png" alt="" fill className="object-cover p-1.5" sizes="56px" />
            </span>
            <span>
              <span className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight">FAST PRINTS</span>
              <span className="mt-0.5 block text-xs font-semibold uppercase tracking-[0.25em] text-brand-400">Bengaluru</span>
            </span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            Full-service printing in BTM Layout — digital, offset, wide format, apparel finishing, and design support for teams who need dependable turnaround.
          </p>
          <div className="space-y-3 text-sm">
            <p className="flex gap-2 text-white/90">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden />
              <span>
                Landmark: 15, 20th Main Rd, below Canara Bank,
                <br />
                opp. Metro Pillar 154, BTM 2nd Stage, Kuvempu Nagar,
                <br />
                BTM Layout, Bengaluru, Karnataka 560076
              </span>
            </p>
            <a href="tel:+919164779922" className="inline-flex items-center gap-2 font-bold text-brand-400 hover:text-brand-300">
              <Phone className="h-4 w-4" aria-hidden />
              +91 91647 79922
            </a>
          </div>
        </div>

        {footerLinks.map((col) => (
          <div key={col.title}>
            <h3 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider text-brand-400">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/75 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Fast Prints, Bengaluru. All rights reserved.</p>
          <p className="text-white/40">
            Product imagery uses high-quality stock photos for demo purposes — replace with your store shots anytime.
          </p>
        </div>
      </div>
    </footer>
  );
}
