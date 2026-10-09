"use client";

import { useCart } from "@/context/cart-context";
import { useRequireCustomerLogin } from "@/context/customer-auth-context";
import { formatINR } from "@/lib/currency";
import { calculateConfiguratorPrice } from "@/lib/pricing-calculator";
import type { Product } from "@/types/product";
import { useMemo, useState } from "react";

export function ProductConfigurator({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { gate, loading } = useRequireCustomerLogin();
  const [selectedSize, setSelectedSize] = useState(product.options.sizes[0] || "");
  const [selectedFinish, setSelectedFinish] = useState(product.options.finishes[0] || "");
  const [selectedUnits, setSelectedUnits] = useState(product.options.quantities[0] || 1);
  const [quantity, setQuantity] = useState(1);
  const [printSide, setPrintSide] = useState<"Single-Sided (S/S)" | "Double-Sided (D/S)">("Single-Sided (S/S)");

  const priceDetails = useMemo(() => {
    return calculateConfiguratorPrice({
      productSlug: product.slug,
      selectedSize,
      selectedFinish,
      selectedUnits,
      quantity,
      printSide,
    });
  }, [product.slug, selectedSize, selectedFinish, selectedUnits, quantity, printSide]);

  const hasBothSidesOption =
    product.slug === "visiting-cards" ||
    product.slug === "13x19-digital-print" ||
    product.slug === "13x19-sticker-sheets";

  return (
    <div className="space-y-4 rounded-2xl border border-ink-100 p-4 md:p-5">
      <h3 className="text-sm font-extrabold text-ink-950">Choose options</h3>

      <label className="block space-y-2 text-sm">
        <span className="font-semibold text-ink-800">Size / format</span>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
        >
          {product.options.sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-semibold text-ink-800">Finish / paper stock</span>
        <select
          value={selectedFinish}
          onChange={(e) => setSelectedFinish(e.target.value)}
          className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
        >
          {product.options.finishes.map((finish) => (
            <option key={finish} value={finish}>
              {finish}
            </option>
          ))}
        </select>
      </label>

      {hasBothSidesOption && (
        <label className="block space-y-2 text-sm">
          <span className="font-semibold text-ink-800">Print sides</span>
          <select
            value={printSide}
            onChange={(e) => setPrintSide(e.target.value as "Single-Sided (S/S)" | "Double-Sided (D/S)")}
            className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
          >
            <option value="Single-Sided (S/S)">Single-Sided (S/S)</option>
            <option value="Double-Sided (D/S)">Double-Sided (D/S)</option>
          </select>
        </label>
      )}

      <label className="block space-y-2 text-sm">
        <span className="font-semibold text-ink-800">Units per set</span>
        <select
          value={selectedUnits}
          onChange={(e) => setSelectedUnits(Number(e.target.value))}
          className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
        >
          {product.options.quantities.map((units) => (
            <option key={units} value={units}>
              {units} units / sheets
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-semibold text-ink-800">Sets (repeat lines)</span>
        <input
          min={1}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
        />
      </label>

      <div className="rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/50 p-4 ring-1 ring-brand-200/50">
        <div className="flex items-baseline justify-between">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-700">Rate Breakdown</p>
          <span className="text-xs font-medium text-ink-600">₹{priceDetails.unitPrice} / unit</span>
        </div>
        <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold text-ink-950">
          {formatINR(priceDetails.totalWithGst)}
        </p>
        <div className="mt-2 flex flex-wrap justify-between text-xs text-ink-600 border-t border-brand-200/40 pt-2">
          <span>Subtotal: {formatINR(priceDetails.subtotal)}</span>
          <span>GST (18%): {formatINR(priceDetails.gstAmount)}</span>
        </div>
        <p className="mt-1 text-[11px] text-ink-500">Official rate list price inclusive of 18% GST. Courier extra.</p>
      </div>

      <button
        type="button"
        onClick={() =>
          gate(`/products/${product.slug}`, () =>
            addToCart({
              product: {
                ...product,
                basePrice: priceDetails.totalWithGst / (quantity || 1),
              },
              quantity,
              selectedSize,
              selectedFinish: `${selectedFinish}${hasBothSidesOption ? ` (${printSide})` : ""}`,
              selectedUnits,
            }),
          )
        }
        disabled={loading}
        className="btn-primary w-full disabled:opacity-60"
      >
        {loading ? "Loading…" : "Add to cart"}
      </button>
    </div>
  );
}
