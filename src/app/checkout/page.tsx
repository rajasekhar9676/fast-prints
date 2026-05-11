"use client";

import { useCart } from "@/context/cart-context";
import { formatINR } from "@/lib/currency";
import { FormEvent, useState } from "react";
import Link from "next/link";

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
      <section className="mx-auto max-w-xl rounded-3xl border border-ink-100 bg-white px-8 py-14 text-center shadow-xl">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-700">Thank you</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-ink-950">Order received</h1>
        <p className="mt-4 text-ink-600">
          Our team will verify artwork and contact you on <span className="font-semibold text-ink-950">+91 91647 79922</span> to confirm
          finishing and timeline.
        </p>
        <Link
          href="/products"
          className="mt-10 inline-flex rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-ink-950 hover:bg-brand-400"
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-10 pb-8 lg:grid-cols-[1fr_400px]">
      <section className="rounded-3xl border border-ink-100 bg-white p-8 shadow-lg">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-700">Checkout</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-ink-950">Delivery details</h1>
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <input
            required
            name="name"
            placeholder="Full name"
            className="w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
          />
          <input
            required
            name="email"
            placeholder="Email"
            type="email"
            className="w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
          />
          <input
            required
            name="phone"
            placeholder="Phone number"
            className="w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
          />
          <textarea
            required
            name="address"
            placeholder="Delivery address"
            className="h-28 w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
          />
          <textarea
            name="notes"
            placeholder="Order notes (design links, deadlines, branding instructions)"
            className="h-28 w-full rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
          />
          <button
            type="submit"
            disabled={cartItems.length === 0}
            className="w-full rounded-xl bg-brand-500 py-4 text-sm font-bold text-ink-950 shadow-lg shadow-brand-500/25 hover:bg-brand-400 disabled:cursor-not-allowed disabled:bg-ink-300 disabled:shadow-none"
          >
            Place order
          </button>
        </form>
      </section>

      <aside className="h-fit rounded-3xl border border-ink-100 bg-ink-950 p-8 text-white shadow-xl">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold">Order summary</h2>
        <div className="mt-6 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-3 border-b border-white/10 pb-4 text-sm">
              <p className="text-white/85">
                {item.product.name} × {item.quantity}
              </p>
              <p className="shrink-0 font-semibold text-brand-300">{formatINR(item.unitPrice * item.quantity)}</p>
            </div>
          ))}
          {cartItems.length === 0 ? (
            <p className="text-sm text-white/60">Your cart is empty — add products before checkout.</p>
          ) : null}
          <div className="flex items-center justify-between pt-4 font-[family-name:var(--font-display)] text-xl font-bold">
            <span>Total</span>
            <span className="text-brand-400">{formatINR(subtotal)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
