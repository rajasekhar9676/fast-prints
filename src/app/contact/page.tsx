import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const MAP_EMBED =
  "https://www.google.com/maps?q=Landmark+15+20th+Main+Road+BTM+Layout+2nd+Stage+Bengaluru+560076&output=embed";

export default function ContactPage() {
  return (
    <div className="space-y-12 pb-8">
      <section className="space-y-3">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-700">Visit & call</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold text-ink-950">Contact Fast Prints</h1>
        <p className="max-w-2xl text-lg text-ink-600">
          Walk in with a thumb drive, email print files, or call ahead for rush slots — we&apos;re easy to find opposite Metro Pillar 154.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6 rounded-3xl border border-ink-100 bg-white p-8 shadow-sm">
          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-ink-950">
              <MapPin className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="font-[family-name:var(--font-display)] font-bold text-ink-950">Address</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                Landmark: 15, 20th Main Rd,
                <br />
                below Canara Bank, opp. Metro Pillar 154,
                <br />
                BTM 2nd Stage, Kuvempu Nagar,
                <br />
                BTM Layout, Bengaluru, Karnataka 560076
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-brand-400">
              <Phone className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="font-[family-name:var(--font-display)] font-bold text-ink-950">Phone</h2>
              <a href="tel:+919164779922" className="mt-2 inline-block text-lg font-bold text-brand-700 hover:text-brand-800">
                +91 91647 79922
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ink-200 bg-ink-50 text-ink-800">
              <Mail className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="font-[family-name:var(--font-display)] font-bold text-ink-950">Email</h2>
              <p className="mt-2 text-sm text-ink-600">
                Send print-ready PDFs to{" "}
                <a href="mailto:fastprintsbtm@gmail.com" className="font-semibold text-brand-700 hover:underline">
                  fastprintsbtm@gmail.com
                </a>
                {" "}or WhatsApp{" "}
                <a href="https://wa.me/919164779922" className="font-semibold text-brand-700 hover:underline">
                  +91 91647 79922
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/products" className="rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-ink-950 hover:bg-brand-400">
              Browse shop
            </Link>
            <Link href="/cart" className="rounded-xl border border-ink-200 px-5 py-2.5 text-sm font-bold text-ink-950 hover:border-brand-400">
              View cart
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-ink-200 shadow-lg">
          <iframe
            title="Fast Prints Bengaluru location"
            src={MAP_EMBED}
            className="h-[min(420px,70vh)] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <section className="rounded-2xl border border-ink-100 bg-cream px-6 py-8 md:px-10">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink-950">Parking & access</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-700">
          Located on 20th Main near Metro Pillar 154 — look for Landmark building below Canara Bank. Street parking is usually available off-peak; message us if you&apos;re carrying large rigid boards so we can keep holding space ready.
        </p>
      </section>
    </div>
  );
}
