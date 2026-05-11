"use client";

import { useCart } from "@/context/cart-context";
import { formatINR } from "@/lib/currency";
import type { Product } from "@/types/product";
import { useMemo, useState } from "react";

export function ProductConfigurator({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.options.sizes[0]);
  const [selectedFinish, setSelectedFinish] = useState(product.options.finishes[0]);
  const [selectedUnits, setSelectedUnits] = useState(product.options.quantities[0]);
  const [quantity, setQuantity] = useState(1);

  const estimatedPrice = useMemo(() => {
    return product.basePrice * (selectedUnits / product.options.quantities[0]) * quantity;
  }, [product.basePrice, product.options.quantities, quantity, selectedUnits]);

  return (
    <div className="space-y-5 rounded-2xl border border-ink-100 bg-white p-6 shadow-lg">
      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink-950">Customize your order</h3>

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
        <span className="font-semibold text-ink-800">Finish / stock</span>
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

      <label className="block space-y-2 text-sm">
        <span className="font-semibold text-ink-800">Units per line</span>
        <select
          value={selectedUnits}
          onChange={(e) => setSelectedUnits(Number(e.target.value))}
          className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
        >
          {product.options.quantities.map((units) => (
            <option key={units} value={units}>
              {units}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-semibold text-ink-800">Lines (repeat sets)</span>
        <input
          min={1}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
        />
      </label>

      <div className="rounded-xl bg-brand-50 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-800">Estimated</p>
        <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink-950">{formatINR(estimatedPrice)}</p>
        <p className="text-xs text-ink-600">Final quote after artwork approval.</p>
      </div>

      <button
        type="button"
        onClick={() =>
          addToCart({ product, quantity, selectedSize, selectedFinish, selectedUnits })
        }
        className="w-full rounded-xl bg-brand-500 py-3.5 text-sm font-bold text-ink-950 shadow-lg shadow-brand-500/25 transition hover:bg-brand-400"
      >
        Add to cart
      </button>
    </div>
  );
}
