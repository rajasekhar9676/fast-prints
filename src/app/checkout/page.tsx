"use client";

import { SectionHeader } from "@/components/section-header";
import { useCart } from "@/context/cart-context";
import { formatINR } from "@/lib/currency";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 shadow-inner transition focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15";

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <section className="card-premium mx-auto max-w-xl px-8 py-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
          <CheckCircle2 className="h-8 w-8 text-brand-600" aria-hidden />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Thank you</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink-950">
          Order received
        </h1>
        <p className="mt-4 text-ink-500">
          Our team will verify artwork and contact you on{" "}
          <span className="font-bold text-ink-950">+91 91647 79922</span> to confirm finishing and timeline.
        </p>
        <Link href="/products" className="btn-primary mt-10 inline-flex">
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      <SectionHeader eyebrow="Checkout" title="Delivery details" />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <section className="panel-light p-6 md:p-8">
          <form className="space-y-4" onSubmit={onSubmit}>
            <input required name="name" placeholder="Full name" className={inputClass} />
            <input required name="email" placeholder="Email" type="email" className={inputClass} />
            <input required name="phone" placeholder="Phone number" className={inputClass} />
            <textarea required name="address" placeholder="Delivery address" className={`${inputClass} h-28`} />
            <textarea
              name="notes"
              placeholder="Order notes (design links, deadlines, branding instructions)"
              className={`${inputClass} h-28`}
            />
            <button type="submit" disabled={cartItems.length === 0} className="btn-primary w-full py-4 disabled:opacity-50">
              Place order
            </button>
          </form>
        </section>

        <aside className="card-dark h-fit p-6 md:p-8">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white">Order summary</h2>
          <div className="gold-line my-5" />
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-3 border-b border-white/10 pb-4 text-sm">
                <p className="text-white/80">
                  {item.product.name} × {item.quantity}
                </p>
                <p className="shrink-0 font-bold text-brand-300">{formatINR(item.unitPrice * item.quantity)}</p>
              </div>
            ))}
            {cartItems.length === 0 ? (
              <p className="text-sm text-white/50">Your cart is empty — add products before checkout.</p>
            ) : null}
            <div className="flex items-center justify-between pt-2 font-[family-name:var(--font-display)] text-xl font-extrabold text-white">
              <span>Total</span>
              <span className="text-brand-400">{formatINR(subtotal)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
