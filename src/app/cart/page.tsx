"use client";

import { SectionHeader } from "@/components/section-header";
import { useCart } from "@/context/cart-context";
import { formatINR } from "@/lib/currency";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, subtotal } = useCart();

  return (
    <div className="space-y-10 pb-10">
      <SectionHeader
        eyebrow="Basket"
        title="Your cart"
        subtitle="Review line items before placing your print order."
      />

      {cartItems.length === 0 ? (
        <section className="panel-light px-8 py-20 text-center">
          <p className="text-xl font-extrabold text-ink-950">Your cart is empty</p>
          <p className="mt-2 text-ink-500">Browse the catalogue and add customised print jobs.</p>
          <Link href="/products" className="btn-primary mt-8 inline-flex">
            Browse products
          </Link>
        </section>
      ) : (
        <section className="space-y-5">
          {cartItems.map((item) => (
            <article key={item.id} className="card-premium p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-ink-950">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-ink-500">
                    Size: {item.selectedSize} · Finish: {item.selectedFinish} · Units: {item.selectedUnits}
                  </p>
                  <p className="text-sm font-semibold text-ink-700">Lines: {item.quantity}</p>
                </div>
                <div className="flex flex-col gap-3 sm:items-end">
                  <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-ink-950">
                    {formatINR(item.unitPrice * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-xl border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
          <div className="card-dark flex flex-col items-stretch justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
              Subtotal: <span className="text-brand-400">{formatINR(subtotal)}</span>
            </p>
            <Link href="/checkout" className="btn-primary inline-flex justify-center px-8 py-3.5">
              Proceed to checkout
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
