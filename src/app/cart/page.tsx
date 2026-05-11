"use client";

import { useCart } from "@/context/cart-context";
import { formatINR } from "@/lib/currency";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, subtotal } = useCart();

  return (
    <div className="space-y-10 pb-8">
      <section className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-700">Basket</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold text-ink-950">Your cart</h1>
        <p className="text-ink-600">Review line items before placing your print order.</p>
      </section>

      {cartItems.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-ink-200 bg-white px-8 py-16 text-center shadow-sm">
          <p className="text-lg font-semibold text-ink-900">Your cart is empty</p>
          <p className="mt-2 text-ink-600">Browse the catalogue and add customised print jobs.</p>
          <Link
            href="/products"
            className="mt-8 inline-flex rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-ink-950 hover:bg-brand-400"
          >
            Browse products
          </Link>
        </section>
      ) : (
        <section className="space-y-5">
          {cartItems.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition hover:border-brand-200"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink-950">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-ink-600">
                    Size: {item.selectedSize} · Finish: {item.selectedFinish} · Units: {item.selectedUnits}
                  </p>
                  <p className="text-sm font-medium text-ink-800">Lines: {item.quantity}</p>
                </div>
                <div className="flex flex-col gap-3 sm:items-end">
                  <p className="font-[family-name:var(--font-display)] text-xl font-bold text-ink-950">
                    {formatINR(item.unitPrice * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-xl border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 hover:border-red-200 hover:bg-red-50 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
          <div className="flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-lg sm:flex-row sm:items-center">
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink-950">
              Subtotal: {formatINR(subtotal)}
            </p>
            <Link
              href="/checkout"
              className="inline-flex justify-center rounded-xl bg-ink-950 px-8 py-3.5 text-center text-sm font-bold text-white hover:bg-ink-900"
            >
              Proceed to checkout
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
