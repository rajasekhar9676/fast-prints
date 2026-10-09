"use client";

import { rateCardCategories, rateCardData, RateItem } from "@/data/rate-card";
import { formatINR } from "@/lib/currency";
import { Calculator, Download, ExternalLink, FileText, Filter, Printer, Search, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function RateCardPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Items");
  const [query, setQuery] = useState<string>("");

  // Interactive Calculator State
  const [calcItem, setCalcItem] = useState<RateItem>(rateCardData[0]);
  const [calcQty, setCalcQty] = useState<number>(calcItem.quantityNumber || 100);
  const [calcSide, setCalcSide] = useState<"SS" | "DS">("SS");

  // Filtered Rate Card Items
  const filteredItems = useMemo(() => {
    return rateCardData.filter((item) => {
      const matchCat = selectedCategory === "All Items" || item.category === selectedCategory;
      const searchNeedle = query.toLowerCase().trim();
      const matchSearch =
        !searchNeedle ||
        item.particulars.toLowerCase().includes(searchNeedle) ||
        item.qualityOrPaper.toLowerCase().includes(searchNeedle) ||
        item.category.toLowerCase().includes(searchNeedle) ||
        item.quantity.toLowerCase().includes(searchNeedle);

      return matchCat && matchSearch;
    });
  }, [selectedCategory, query]);

  // Calculator Price Calculation
  const calcResult = useMemo(() => {
    let unitRate = calcSide === "DS" && calcItem.rateDS ? calcItem.rateDS : (calcItem.rateSS || 0);
    if (calcItem.fixedPrice) {
      unitRate = calcItem.fixedPrice / (calcItem.quantityNumber || 1);
    }
    const subtotal = calcItem.fixedPrice ? calcItem.fixedPrice : unitRate * calcQty;
    const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
    const total = subtotal + gstAmount;

    return {
      unitRate,
      subtotal,
      gstAmount,
      total,
    };
  }, [calcItem, calcQty, calcSide]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-8 pb-12 pt-2">
      {/* Page Header */}
      <div className="rounded-3xl bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 p-6 md:p-10 text-white shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-300 ring-1 ring-brand-400/30">
              <ShieldCheck className="h-3.5 w-3.5" /> Official Rates & Matrix
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-extrabold tracking-tight">
              Fast Prints Rate Card
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-ink-300">
              Complete, transparent printing rates for Visiting Cards, 13x19 Digital Sheets, Offset Printing, Bill Books, Seals, ID Cards, Lanyards, Mugs, Badges, Photo Frames, Lamination & Signages.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/20 ring-1 ring-white/20"
            >
              <Printer className="h-4 w-4" /> Print Rate Sheet
            </button>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm"
            >
              Contact Office
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Price Estimator / Calculator Widget */}
      <div className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50/70 via-white to-amber-50/50 p-5 md:p-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-brand-200/60 pb-3 mb-4">
          <Calculator className="h-5 w-5 text-brand-600" />
          <h2 className="text-lg font-extrabold text-ink-950">Live Rate Calculator & Estimator</h2>
          <span className="ml-auto text-xs font-bold text-brand-700 bg-brand-100 px-2.5 py-0.5 rounded-full">
            Instant GST Breakdown
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Select Material / Particular */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1.5">
              Material / Product
            </label>
            <select
              value={calcItem.id}
              onChange={(e) => {
                const found = rateCardData.find((item) => item.id === e.target.value);
                if (found) {
                  setCalcItem(found);
                  setCalcQty(found.quantityNumber || 100);
                }
              }}
              className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {rateCardData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.particulars} - {item.qualityOrPaper} ({item.quantity})
                </option>
              ))}
            </select>
          </div>

          {/* Select Print Sides */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1.5">
              Print Options (Side)
            </label>
            <select
              value={calcSide}
              onChange={(e) => setCalcSide(e.target.value as "SS" | "DS")}
              disabled={!calcItem.rateDS}
              className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50"
            >
              <option value="SS">Single-Sided (S/S) Rate</option>
              {calcItem.rateDS ? <option value="DS">Double-Sided (D/S) Rate</option> : null}
            </select>
          </div>

          {/* Select Quantity */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1.5">
              Quantity / Units
            </label>
            <input
              type="number"
              min={1}
              value={calcQty}
              onChange={(e) => setCalcQty(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          {/* Total Calculation Display */}
          <div className="rounded-xl bg-ink-950 p-4 text-white flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs text-ink-400">
              <span>Rate: ₹{calcResult.unitRate} / unit</span>
              <span>GST 18%: {formatINR(calcResult.gstAmount)}</span>
            </div>
            <div className="mt-1">
              <span className="text-[10px] uppercase font-bold text-brand-400">Estimated Total</span>
              <p className="font-[family-name:var(--font-display)] text-2xl font-black text-white">
                {formatINR(calcResult.total)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Strip */}
      <div className="panel-light space-y-4 p-4 md:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search visiting cards, 300gsm, lamination, lanyard, bill book, banner flex…"
              className="w-full rounded-2xl border border-ink-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-ink-600">
            <Filter className="h-4 w-4 text-brand-600" />
            <span>Showing {filteredItems.length} Rate Entries</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="no-scrollbar flex flex-wrap gap-2 overflow-x-auto pt-1">
          {rateCardCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              type="button"
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                selectedCategory === cat
                  ? "bg-ink-950 text-white shadow-sm"
                  : "border border-ink-200 bg-white text-ink-700 hover:border-brand-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Rate Card Data Table */}
      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm">
        {/* Overall GST & Pricing Note Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/80 bg-gradient-to-r from-amber-500/10 via-amber-50/50 to-white px-5 py-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-ink-950">
              %
            </span>
            <span>Note: Standard 18% GST applies to all print rates listed below (Tax invoice provided for business claims).</span>
          </div>
          <span className="text-[11px] font-semibold text-ink-600">
            * Delivery / Courier charges extra as per Dunzo/Porter actuals
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50/80 text-xs font-extrabold uppercase tracking-wider text-ink-800">
                <th scope="col" className="px-4 py-3.5">Material / Particulars</th>
                <th scope="col" className="px-4 py-3.5">Quality of Paper / Board</th>
                <th scope="col" className="px-4 py-3.5">Quantity</th>
                <th scope="col" className="px-4 py-3.5 text-right">Rate Per Unit - S/S</th>
                <th scope="col" className="px-4 py-3.5 text-right">Rate Per Unit - D/S</th>
                <th scope="col" className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-ink-500">
                    <p className="font-bold text-base text-ink-900">No matching rates found</p>
                    <p className="text-xs mt-1">Try adjusting your search terms or filter selection.</p>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="transition hover:bg-brand-50/30">
                    <td className="px-4 py-3.5">
                      <span className="block font-bold text-ink-950">{item.particulars}</span>
                      <span className="text-[11px] font-semibold text-brand-700">{item.category}</span>
                    </td>

                    <td className="px-4 py-3.5 text-ink-700">
                      <span className="font-medium">{item.qualityOrPaper}</span>
                      {item.notes ? (
                        <span className="block text-[11px] font-medium text-amber-700 mt-0.5">
                          Note: {item.notes}
                        </span>
                      ) : null}
                    </td>

                    <td className="px-4 py-3.5 font-semibold text-ink-900">
                      <span className="inline-block rounded-md bg-ink-100 px-2 py-0.5 text-xs">
                        {item.quantity}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-right font-bold text-ink-950">
                      {item.isQuoteOnly ? (
                        <span className="inline-block rounded-md bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-900">
                          Custom Quote
                        </span>
                      ) : item.fixedPrice ? (
                        <span className="text-brand-700">{formatINR(item.fixedPrice)} (Lot)</span>
                      ) : item.rateSS != null ? (
                        <span className="text-ink-950">₹{item.rateSS} <span className="text-[10px] font-normal text-ink-500">/ unit</span></span>
                      ) : (
                        <span className="text-ink-300">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3.5 text-right font-bold text-ink-950">
                      {item.isQuoteOnly ? (
                        <span className="inline-block rounded-md bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-900">
                          Custom Quote
                        </span>
                      ) : item.rateDS != null ? (
                        <span className="text-emerald-700">₹{item.rateDS} <span className="text-[10px] font-normal text-ink-500">/ unit</span></span>
                      ) : (
                        <span className="text-ink-300">—</span>
                      )}
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      {item.isQuoteOnly ? (
                        <Link
                          href="/corporate"
                          className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline"
                        >
                          Request Quote <ExternalLink className="h-3 w-3" />
                        </Link>
                      ) : (
                        <Link
                          href="/products"
                          className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline"
                        >
                          Order <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notice Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-ink-100 bg-white p-4 flex items-start gap-3 shadow-sm">
          <Truck className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-ink-900">Courier Charges Extra</h4>
            <p className="text-xs text-ink-600 mt-0.5">
              Local Dunzo/Porter delivery in Bengaluru or Speed Post / Surface Courier extra at actual weight.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-white p-4 flex items-start gap-3 shadow-sm">
          <FileText className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-ink-900">GST Billed (18%)</h4>
            <p className="text-xs text-ink-600 mt-0.5">
              All listed unit rates are subject to 18% GST with valid tax invoice for corporate claims.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-white p-4 flex items-start gap-3 shadow-sm">
          <ShieldCheck className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-ink-900">Same-Day & 3-Day Turnaround</h4>
            <p className="text-xs text-ink-600 mt-0.5">
              Digital prints & visiting cards ready in 24 hrs. Offset multicolor jobs take 3 working days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
