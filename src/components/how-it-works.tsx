import { Package, Palette, Printer, Truck } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Package,
    title: "Pick a product",
    body: "Browse categories or shop by business need — every item shows starting price and turnaround.",
  },
  {
    step: "02",
    icon: Palette,
    title: "Customise & upload",
    body: "Choose size, finish, and quantity. Email or WhatsApp print-ready files, or visit us with a USB.",
  },
  {
    step: "03",
    icon: Printer,
    title: "We print & proof",
    body: "Our team reviews artwork, confirms colour and stock, then runs your job on digital or offset.",
  },
  {
    step: "04",
    icon: Truck,
    title: "Pickup or delivery",
    body: "Collect at BTM 2nd Stage same day on select items, or coordinate delivery across Bengaluru.",
  },
];

export function HowItWorks() {
  return (
    <section className="panel-light overflow-hidden px-5 py-8 md:px-8 md:py-10">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Simple process</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink-950 md:text-3xl">
          How Fast Prints works
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-ink-500 md:text-base">
          From browsing to holding your finished prints — four easy steps, just like leading online print shops.
        </p>
      </div>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ step, icon: Icon, title, body }) => (
          <li key={step} className="relative rounded-2xl border border-ink-100 bg-white p-5 shadow-sm">
            <span className="absolute right-4 top-4 font-[family-name:var(--font-display)] text-3xl font-extrabold text-brand-100">
              {step}
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-ink-950 shadow-md">
              <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </span>
            <h3 className="mt-4 font-[family-name:var(--font-display)] font-extrabold text-ink-950">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
