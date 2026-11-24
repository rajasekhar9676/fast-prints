"use client";

import { useCart } from "@/context/cart-context";
import { useRequireCustomerLogin } from "@/context/customer-auth-context";
import { formatINR } from "@/lib/currency";
import { calculateConfiguratorPrice } from "@/lib/pricing-calculator";
import type { Product } from "@/types/product";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileCheck2,
  Loader2,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  UploadCloud,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

export function ProductConfigurator({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { gate, loading } = useRequireCustomerLogin();

  const [selectedSize, setSelectedSize] = useState(product.options.sizes[0] || "");
  const [selectedFinish, setSelectedFinish] = useState(product.options.finishes[0] || "");
  const [selectedUnits, setSelectedUnits] = useState(product.options.quantities[0] || 100);
  const [printSide, setPrintSide] = useState<"Single-Sided (S/S)" | "Double-Sided (D/S)">("Single-Sided (S/S)");

  // Design Upload State
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [designFileUrl, setDesignFileUrl] = useState<string | null>(null);
  const [uploadingDesign, setUploadingDesign] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"upload" | "whatsapp">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic Cart Preview Modal State
  const [showCartModal, setShowCartModal] = useState(false);

  const priceDetails = useMemo(() => {
    return calculateConfiguratorPrice({
      productSlug: product.slug,
      selectedSize,
      selectedFinish,
      selectedUnits,
      quantity: 1,
      printSide,
    });
  }, [product.slug, selectedSize, selectedFinish, selectedUnits, printSide]);

  const hasBothSidesOption =
    product.slug === "visiting-cards" ||
    product.slug === "13x19-digital-print" ||
    product.slug === "13x19-sticker-sheets";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDesignFile(file);
      setUploadingDesign(true);
      setUploadError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (res.ok && data.url) {
          setDesignFileUrl(data.url);
        } else {
          setUploadError(data.error || "Upload failed. Please try again.");
        }
      } catch (err) {
        setUploadError("Network error while uploading. File can also be shared on WhatsApp.");
      } finally {
        setUploadingDesign(false);
      }
    }
  };

  const handleAddToCart = () => {
    gate(`/products/${product.slug}`, () => {
      addToCart({
        product: {
          ...product,
          basePrice: priceDetails.totalWithGst,
        },
        quantity: 1,
        selectedSize,
        selectedFinish: `${selectedFinish}${hasBothSidesOption ? ` (${printSide === "Double-Sided (D/S)" ? "Double-Sided" : "Single-Sided"})` : ""}`,
        selectedUnits,
        designFileName: designFile ? designFile.name : uploadMethod === "whatsapp" ? "Submitting on WhatsApp" : undefined,
        designFileUrl: designFileUrl || undefined,
      });
      setShowCartModal(true);
    });
  };

  // WhatsApp prefilled message
  const whatsappUrl = useMemo(() => {
    const text = encodeURIComponent(
      `Hi Fast Prints, I want to order ${product.name} / send my design:\n` +
      `• Product: ${product.name}\n` +
      `• Size: ${selectedSize}\n` +
      `• Finish / Material: ${selectedFinish}\n` +
      (hasBothSidesOption ? `• Print Sides: ${printSide === "Double-Sided (D/S)" ? "Double-Sided (Front & Back)" : "Single-Sided (Front Only)"}\n` : "") +
      `• Quantity: ${selectedUnits} units\n` +
      `• Estimated Price: ${formatINR(priceDetails.totalWithGst)} (inclusive of 18% GST)\n` +
      `• Artwork: ${designFile ? `Uploaded ${designFile.name}` : "Sharing file directly on WhatsApp"}\n` +
      `Please confirm soft proof & delivery!`
    );
    return `https://wa.me/916366912357?text=${text}`;
  }, [product.name, selectedSize, selectedFinish, hasBothSidesOption, printSide, selectedUnits, designFile, priceDetails.totalWithGst]);

  return (
    <div className="space-y-5">
      {/* SECTION 1: Form Dropdowns */}
      <div className="space-y-4 rounded-2xl border border-ink-100 bg-white p-5 sm:p-6 shadow-xs">
        <div className="border-b border-ink-100 pb-3">
          <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-ink-950 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-600" />
            Select Options &amp; Specifications
          </h3>
          <p className="text-xs text-ink-500 mt-0.5">
            Choose your size, paper stock, sides, and quantity from the dropdowns.
          </p>
        </div>

        <div className="space-y-3.5">
          {/* 1. Size Dropdown */}
          {product.options.sizes?.length > 0 && (
            <div className="space-y-1.5">
              <label htmlFor="select-size" className="text-xs font-bold uppercase tracking-wider text-ink-700 flex justify-between">
                <span>Size / Dimensions</span>
                <span className="text-brand-600 font-extrabold normal-case text-xs">Standard Guide</span>
              </label>
              <div className="relative">
                <select
                  id="select-size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-ink-200 bg-ink-50/70 px-4 py-3 pr-10 text-xs sm:text-sm font-semibold text-ink-950 transition-colors focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/25 cursor-pointer shadow-2xs"
                >
                  {product.options.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-500" />
              </div>
            </div>
          )}

          {/* 2. Paper Stock & Finish Dropdown */}
          {product.options.finishes?.length > 0 && (
            <div className="space-y-1.5">
              <label htmlFor="select-finish" className="text-xs font-bold uppercase tracking-wider text-ink-700 flex justify-between">
                <span>Material &amp; Finish</span>
                <span className="text-brand-600 font-extrabold normal-case text-xs">Premium Quality</span>
              </label>
              <div className="relative">
                <select
                  id="select-finish"
                  value={selectedFinish}
                  onChange={(e) => setSelectedFinish(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-ink-200 bg-ink-50/70 px-4 py-3 pr-10 text-xs sm:text-sm font-semibold text-ink-950 transition-colors focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/25 cursor-pointer shadow-2xs"
                >
                  {product.options.finishes.map((finish) => (
                    <option key={finish} value={finish}>
                      {finish}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-500" />
              </div>
            </div>
          )}

          {/* 3. Print Sides Dropdown */}
          {hasBothSidesOption && (
            <div className="space-y-1.5">
              <label htmlFor="select-sides" className="text-xs font-bold uppercase tracking-wider text-ink-700 flex justify-between">
                <span>Print Sides</span>
                <span className="text-brand-600 font-extrabold normal-case text-xs">Full Color</span>
              </label>
              <div className="relative">
                <select
                  id="select-sides"
                  value={printSide}
                  onChange={(e) => setPrintSide(e.target.value as "Single-Sided (S/S)" | "Double-Sided (D/S)")}
                  className="w-full appearance-none rounded-xl border border-ink-200 bg-ink-50/70 px-4 py-3 pr-10 text-xs sm:text-sm font-semibold text-ink-950 transition-colors focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/25 cursor-pointer shadow-2xs"
                >
                  <option value="Single-Sided (S/S)">Single-Sided — Front Printing Only</option>
                  <option value="Double-Sided (D/S)">Double-Sided — Front &amp; Back Full Printing</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-500" />
              </div>
            </div>
          )}

          {/* 4. Quantity Dropdown */}
          <div className="space-y-1.5">
            <label htmlFor="select-qty" className="text-xs font-bold uppercase tracking-wider text-ink-700 flex justify-between">
              <span>Quantity (Units)</span>
              <span className="text-emerald-700 font-bold text-xs">Bulk Discount Applied</span>
            </label>
            <div className="relative">
              <select
                id="select-qty"
                value={selectedUnits}
                onChange={(e) => setSelectedUnits(Number(e.target.value))}
                className="w-full appearance-none rounded-xl border border-ink-200 bg-ink-50/70 px-4 py-3 pr-10 text-xs sm:text-sm font-semibold text-ink-950 transition-colors focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/25 cursor-pointer shadow-2xs"
              >
                {product.options.quantities.map((units) => (
                  <option key={units} value={units}>
                    {units} units {units === selectedUnits ? `— ₹${priceDetails.unitPrice.toFixed(2)} per unit` : ""}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-500" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Design Upload Option (Printo & VistaPrint Standard) */}
      <div className="space-y-3 rounded-2xl border border-ink-100 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-ink-100 pb-3">
          <h3 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-extrabold text-ink-950 flex items-center gap-2">
            <UploadCloud className="h-4 w-4 text-brand-600" />
            Upload Your Design / Artwork
          </h3>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            Free Soft Proof
          </span>
        </div>

        {/* Tab switch: Upload ready artwork vs WhatsApp assist */}
        <div className="grid grid-cols-2 gap-2 text-xs font-extrabold">
          <button
            type="button"
            onClick={() => setUploadMethod("upload")}
            className={`py-2 px-3 rounded-xl border text-center transition-all ${
              uploadMethod === "upload"
                ? "border-brand-500 bg-brand-50/50 text-ink-950 ring-1 ring-brand-500/30"
                : "border-ink-200 text-ink-600 hover:bg-ink-50"
            }`}
          >
            Upload Ready File
          </button>
          <button
            type="button"
            onClick={() => setUploadMethod("whatsapp")}
            className={`py-2 px-3 rounded-xl border text-center transition-all ${
              uploadMethod === "whatsapp"
                ? "border-brand-500 bg-brand-50/50 text-ink-950 ring-1 ring-brand-500/30"
                : "border-ink-200 text-ink-600 hover:bg-ink-50"
            }`}
          >
            Send via WhatsApp
          </button>
        </div>

        {uploadMethod === "upload" ? (
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.ai,.cdr,.psd,.eps,.jpg,.jpeg,.png,.svg,.zip"
              className="hidden"
            />

            {!designFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-200 p-5 text-center transition-all hover:border-brand-500 hover:bg-brand-50/20 cursor-pointer"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-100 text-ink-600 group-hover:bg-brand-500 group-hover:text-ink-950 transition-colors">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <p className="mt-2 text-xs font-extrabold text-ink-900">
                  Click to Browse or Drag &amp; Drop Design File
                </p>
                <p className="mt-0.5 text-[11px] text-ink-500">
                  Supports PDF, AI, CDR, PSD, PNG, JPG (up to 50MB)
                </p>
              </div>
            ) : uploadingDesign ? (
              <div className="flex items-center gap-3 rounded-xl border border-brand-300 bg-brand-50/60 p-4 text-xs">
                <Loader2 className="h-5 w-5 shrink-0 animate-spin text-brand-600" />
                <div>
                  <p className="font-extrabold text-ink-900">Uploading {designFile.name}...</p>
                  <p className="text-[10px] text-ink-500">Preparing high-resolution file for print team</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-emerald-300 bg-emerald-50/70 p-3 text-xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <FileCheck2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    <div className="truncate">
                      <p className="font-extrabold text-emerald-950 truncate">{designFile.name}</p>
                      <p className="text-[10px] text-emerald-700">
                        {(designFile.size / (1024 * 1024)).toFixed(2)} MB · Ready for digital print
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {designFileUrl && (
                      <a
                        href={designFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-2 py-1 text-[11px] font-bold text-emerald-800 hover:bg-emerald-200"
                        title="Preview uploaded design"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Preview
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setDesignFile(null);
                        setDesignFileUrl(null);
                        setUploadError(null);
                      }}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-ink-400 hover:bg-emerald-100 hover:text-ink-700"
                      title="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {uploadError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-[11px] text-red-700">
                    {uploadError}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-xs text-emerald-900 space-y-2">
            <p className="leading-relaxed">
              Don&apos;t have a print-ready file? No problem! Place your order and send your logo/text directly to our BTM design team on WhatsApp for free soft proofing.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-emerald-800 hover:underline"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
              Chat with Designer (+91 63669 12357)
            </a>
          </div>
        )}
      </div>

      {/* SECTION 3: Clean Price & Action Block (No bulky static summary matrix) */}
      <div className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        {/* Price Row (VistaPrint & Printo Style) */}
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-500">Total Payable Amount</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-black text-ink-950">
                {formatINR(priceDetails.totalWithGst)}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Incl. 18% GST ({formatINR(priceDetails.gstAmount)})
              </span>
            </div>
            <p className="text-[11px] text-ink-500 mt-1">
              ₹{priceDetails.unitPrice} per card · Official GST tax invoice included
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 px-4 font-extrabold text-sm sm:text-base text-ink-950 bg-brand-500 hover:bg-brand-400 transition-all active:scale-[0.99] shadow-md"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart — {formatINR(priceDetails.totalWithGst)}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50/80 py-3 px-4 font-extrabold text-xs sm:text-sm text-emerald-800 transition-all hover:bg-emerald-100 hover:border-emerald-400 shadow-2xs"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            Order on WhatsApp &amp; Get Free Soft Proof
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 text-[11px] font-semibold text-ink-600 border-t border-ink-100 pt-3">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> 100% Quality Print
          </span>
          <span className="flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-400" /> Same-Day Available
          </span>
          <span className="flex items-center gap-1">
            <Truck className="h-3.5 w-3.5 text-blue-600" /> BTM 2nd Stage
          </span>
        </div>
      </div>

      {/* SECTION 4: Dynamic Cart Preview Modal (Appears after clicking Add to Cart) */}
      {showCartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-5 sm:p-6 shadow-2xl border border-ink-100 space-y-4">
            <button
              type="button"
              onClick={() => setShowCartModal(false)}
              aria-label="Close modal"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-700"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2.5 text-emerald-600">
              <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
              <h3 className="font-[family-name:var(--font-display)] text-lg font-black text-ink-950">
                Added to Cart Successfully!
              </h3>
            </div>

            {/* Dynamic Specification Recap */}
            <div className="rounded-xl border border-ink-100 bg-ink-50/70 p-4 space-y-2 text-xs">
              <p className="font-extrabold text-sm text-ink-950 border-b border-ink-200/60 pb-2">
                {product.name}
              </p>
              <div className="grid grid-cols-2 gap-2 text-ink-700 pt-1">
                <div>
                  <span className="text-[10px] font-bold uppercase text-ink-400 block">Size</span>
                  <span className="font-semibold text-ink-900">{selectedSize}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-ink-400 block">Quantity</span>
                  <span className="font-semibold text-ink-900">{selectedUnits} units</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-ink-400 block">Finish</span>
                  <span className="font-semibold text-ink-900">{selectedFinish}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-ink-400 block">Print Sides</span>
                  <span className="font-semibold text-ink-900">
                    {printSide === "Double-Sided (D/S)" ? "Double-Sided" : "Single-Sided"}
                  </span>
                </div>
                <div className="col-span-2 border-t border-ink-200/50 pt-1.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-ink-400 block">Artwork Status</span>
                    <span className="font-semibold text-ink-900">
                      {designFile ? `Uploaded: ${designFile.name}` : "Sending via WhatsApp"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-ink-400 block">Total Payable</span>
                    <span className="font-black text-base text-ink-950">{formatINR(priceDetails.totalWithGst)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Same Day Delivery Schedule Reminder */}
            <div className="rounded-xl bg-amber-50 border border-amber-200/80 p-2.5 text-[11px] text-amber-900 flex items-center gap-2">
              <Zap className="h-4 w-4 shrink-0 text-amber-600 fill-amber-500" />
              <span>
                <strong>Bengaluru Delivery:</strong> Order before 12 Noon for same-day delivery within 4–6 hrs!
              </span>
            </div>

            {/* Modal Actions */}
            <div className="space-y-2 pt-1">
              <Link
                href="/cart"
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 font-extrabold text-sm text-ink-950 bg-brand-500 hover:bg-brand-400 transition-all shadow-sm"
              >
                <ShoppingCart className="h-4 w-4" />
                View Cart &amp; Checkout ({formatINR(priceDetails.totalWithGst)})
              </Link>

              <button
                type="button"
                onClick={() => setShowCartModal(false)}
                className="w-full py-2.5 text-center text-xs font-bold text-ink-600 hover:text-ink-950"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
