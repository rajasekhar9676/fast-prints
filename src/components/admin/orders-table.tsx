"use client";

import type { Order, OrderItem, OrderStatus } from "@/types/admin";
import { formatINR } from "@/lib/currency";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  Image as ImageIcon,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Printer,
  Search,
  User,
  X,
  Zap,
} from "lucide-react";

const statuses: OrderStatus[] = [
  "pending_payment",
  "pending",
  "confirmed",
  "in_production",
  "ready",
  "delivered",
  "cancelled",
];

function paymentBadge(status: Order["paymentStatus"]) {
  if (status === "paid") return "bg-emerald-100 text-emerald-800 border-emerald-300";
  if (status === "failed") return "bg-red-100 text-red-800 border-red-300";
  return "bg-amber-100 text-amber-800 border-amber-300";
}

export type ExtractedArtwork = {
  productName: string;
  fileName: string;
  fileUrl?: string;
  isWhatsApp?: boolean;
};

export function extractArtworks(order: Order): ExtractedArtwork[] {
  const artworks: ExtractedArtwork[] = [];

  // 1. From item records
  for (const item of order.items) {
    if (item.designFileUrl || item.designFileName) {
      artworks.push({
        productName: item.productName,
        fileName: item.designFileName || "Print Artwork File",
        fileUrl: item.designFileUrl,
        isWhatsApp: item.designFileName?.toLowerCase().includes("whatsapp") || false,
      });
    }
  }

  // 2. From order notes if legacy or external format
  if (artworks.length === 0 && order.notes) {
    const regex = /\[Artwork File\]:\s*(.*?)\s*->\s*(.*?)\s*\((.*?)\)/g;
    let match;
    while ((match = regex.exec(order.notes)) !== null) {
      artworks.push({
        productName: match[1]?.trim() || "Item",
        fileName: match[2]?.trim() || "Design Artwork",
        fileUrl: match[3]?.trim(),
        isWhatsApp: false,
      });
    }
  }

  return artworks;
}

export function OrdersTable({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filter States
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "yesterday" | "week" | "month" | "custom">("all");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Print Job Slip Modal State
  const [activePrintOrder, setActivePrintOrder] = useState<Order | null>(null);

  async function updateStatus(id: string, status: OrderStatus) {
    setUpdatingId(id);
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdatingId(null);
    router.refresh();
  }

  // Filtered Orders Calculation
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // 1. Status Filter
      if (statusFilter !== "all" && order.status !== statusFilter) {
        return false;
      }

      // 2. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesOrderNumber = order.orderNumber.toLowerCase().includes(query);
        const matchesCustomer =
          order.customer.name.toLowerCase().includes(query) ||
          order.customer.phone.toLowerCase().includes(query) ||
          order.customer.email.toLowerCase().includes(query);
        const matchesAddress = order.customer.address.toLowerCase().includes(query);
        const matchesItems = order.items.some(
          (item) =>
            item.productName.toLowerCase().includes(query) ||
            item.selectedSize.toLowerCase().includes(query) ||
            item.selectedFinish.toLowerCase().includes(query)
        );
        const matchesNotes = order.notes?.toLowerCase().includes(query) || false;

        if (!matchesOrderNumber && !matchesCustomer && !matchesAddress && !matchesItems && !matchesNotes) {
          return false;
        }
      }

      // 3. Date Filter
      const orderDate = new Date(order.createdAt);
      const now = new Date();
      const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const todayStart = startOfDay(now);
      const orderDayStart = startOfDay(orderDate);

      if (dateFilter === "today") {
        if (orderDayStart.getTime() !== todayStart.getTime()) return false;
      } else if (dateFilter === "yesterday") {
        const yesterday = new Date(todayStart);
        yesterday.setDate(yesterday.getDate() - 1);
        if (orderDayStart.getTime() !== yesterday.getTime()) return false;
      } else if (dateFilter === "week") {
        const sevenDaysAgo = new Date(todayStart);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        if (orderDate < sevenDaysAgo || orderDate > now) return false;
      } else if (dateFilter === "month") {
        if (orderDate.getFullYear() !== now.getFullYear() || orderDate.getMonth() !== now.getMonth()) {
          return false;
        }
      } else if (dateFilter === "custom") {
        if (customStart) {
          const start = new Date(`${customStart}T00:00:00`);
          if (orderDate < start) return false;
        }
        if (customEnd) {
          const end = new Date(`${customEnd}T23:59:59`);
          if (orderDate > end) return false;
        }
      }

      return true;
    });
  }, [orders, statusFilter, searchQuery, dateFilter, customStart, customEnd]);

  // Today's orders count for quick badge
  const todayCount = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return orders.filter((o) => o.createdAt.slice(0, 10) === today).length;
  }, [orders]);

  // Excel / CSV Export
  const handleExportCSV = () => {
    const headers = [
      "Order Number",
      "Date & Time",
      "Status",
      "Payment Status",
      "Customer Name",
      "Phone",
      "Email",
      "Shipping Address",
      "Items & Specifications",
      "Artwork File Names",
      "Artwork Download URLs",
      "Subtotal (INR)",
      "Notes",
    ];

    const escapeCsv = (val: unknown) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = filteredOrders.map((order) => {
      const artworks = extractArtworks(order);
      const itemsList = order.items
        .map(
          (item) =>
            `${item.productName} (Qty: ${item.quantity}, Size: ${item.selectedSize}, Finish: ${item.selectedFinish}, Units: ${item.selectedUnits})`
        )
        .join(" | ");

      const artNames = artworks.map((a) => a.fileName).join(" ; ");
      const artUrls = artworks
        .map((a) =>
          a.fileUrl
            ? typeof window !== "undefined"
              ? `${window.location.origin}${a.fileUrl}`
              : a.fileUrl
            : a.isWhatsApp
            ? "Customer sending on WhatsApp"
            : "No file"
        )
        .join(" ; ");

      return [
        escapeCsv(order.orderNumber),
        escapeCsv(new Date(order.createdAt).toLocaleString("en-IN")),
        escapeCsv(order.status),
        escapeCsv(order.paymentStatus || "pending"),
        escapeCsv(order.customer.name),
        escapeCsv(order.customer.phone),
        escapeCsv(order.customer.email),
        escapeCsv(order.customer.address),
        escapeCsv(itemsList),
        escapeCsv(artNames || "None"),
        escapeCsv(artUrls || "None"),
        escapeCsv(order.subtotal.toFixed(2)),
        escapeCsv(order.notes || ""),
      ].join(",");
    });

    // UTF-8 BOM (\uFEFF) for clean Excel formatting
    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute("href", url);
    link.setAttribute("download", `fast-prints-orders-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalFilteredRevenue = useMemo(() => {
    return filteredOrders.reduce((sum, o) => sum + o.subtotal, 0);
  }, [filteredOrders]);

  return (
    <div className="space-y-5">
      {/* SECTION: Filter Bar & Action Header */}
      <div className="rounded-2xl border border-ink-100 bg-white p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Controls: Search, Export, Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order #, Customer, Phone, Item..."
              className="w-full rounded-xl border border-ink-200 bg-ink-50/50 pl-10 pr-4 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Right Action: CSV Export & Stats */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-ink-50 px-3 py-1.5 text-xs text-ink-700 font-semibold border border-ink-100">
              <span>Showing:</span>
              <strong className="text-ink-950">{filteredOrders.length}</strong> of {orders.length} orders
              <span className="text-ink-300">|</span>
              <span className="text-emerald-700 font-bold">{formatINR(totalFilteredRevenue)}</span>
            </div>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors shadow-xs cursor-pointer"
              title="Download orders in Excel CSV format"
            >
              <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
              Export to Excel (CSV)
            </button>
          </div>
        </div>

        {/* Date Filter Tabs & Status Filter Dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-ink-100">
          {/* Date Range Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-ink-500 mr-1 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> Date:
            </span>

            {[
              { id: "all", label: "All Orders" },
              { id: "today", label: `Today ${todayCount > 0 ? `(${todayCount})` : ""}` },
              { id: "yesterday", label: "Yesterday" },
              { id: "week", label: "Last 7 Days" },
              { id: "month", label: "This Month" },
              { id: "custom", label: "Custom Range" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setDateFilter(tab.id as typeof dateFilter)}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  dateFilter === tab.id
                    ? "bg-brand-500 text-ink-950 shadow-xs ring-1 ring-brand-500"
                    : "bg-ink-50 text-ink-600 hover:bg-ink-100 hover:text-ink-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-ink-500 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" /> Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="all">All Statuses ({orders.length})</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom Date Pickers (Visible when custom is selected) */}
        {dateFilter === "custom" && (
          <div className="flex flex-wrap items-center gap-3 pt-2 bg-ink-50/70 p-3 rounded-xl border border-ink-100 text-xs">
            <span className="font-bold text-ink-700">From Date:</span>
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="rounded-lg border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium focus:outline-none"
            />
            <span className="font-bold text-ink-700">To Date:</span>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="rounded-lg border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium focus:outline-none"
            />
            {(customStart || customEnd) && (
              <button
                type="button"
                onClick={() => {
                  setCustomStart("");
                  setCustomEnd("");
                }}
                className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
              >
                Reset Dates
              </button>
            )}
          </div>
        )}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-12 text-center space-y-2">
          <p className="font-bold text-ink-700">No orders match your filter criteria.</p>
          <p className="text-xs text-ink-500">Try changing the date filter or clearing the search query.</p>
          <button
            type="button"
            onClick={() => {
              setDateFilter("all");
              setStatusFilter("all");
              setSearchQuery("");
              setCustomStart("");
              setCustomEnd("");
            }}
            className="mt-2 text-xs font-bold text-brand-600 hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        filteredOrders.map((order) => {
          const artworks = extractArtworks(order);
          const isTodayOrder = new Date(order.createdAt).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10);

          return (
            <article
              key={order.id}
              className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6 shadow-xs hover:border-ink-200 transition-all space-y-4"
            >
              {/* Header: Order ID, Date, Priority Tag, Status & Print Button */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink-100 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <p className="font-[family-name:var(--font-display)] text-lg font-black text-ink-950">
                      {order.orderNumber}
                    </p>
                    {isTodayOrder && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 text-amber-900 border border-amber-300 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                        <Zap className="h-3 w-3 text-amber-600 fill-amber-500" />
                        Today / Same Day
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ink-500 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-ink-400" />
                    {new Date(order.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Payment Badge */}
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${paymentBadge(
                      order.paymentStatus ?? "pending"
                    )}`}
                  >
                    {order.paymentStatus ?? "pending"}
                  </span>

                  {/* Status Dropdown */}
                  <select
                    className="rounded-xl border border-ink-200 bg-ink-50/70 px-3 py-1.5 text-xs font-bold text-ink-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    value={order.status}
                    disabled={updatingId === order.id}
                    onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>

                  {/* Print Job Slip Button */}
                  <button
                    type="button"
                    onClick={() => setActivePrintOrder(order)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-3 py-1.5 text-xs font-bold text-ink-800 hover:bg-ink-50 hover:text-ink-950 transition-colors shadow-xs cursor-pointer"
                    title="Open printable job ticket for press operator"
                  >
                    <Printer className="h-3.5 w-3.5 text-ink-600" />
                    Print Job Slip
                  </button>
                </div>
              </div>

              {/* Body: Customer Details, Items Specs, Artwork Download Banner */}
              <div className="grid gap-6 lg:grid-cols-12">
                {/* Customer Details Column (4 cols) */}
                <div className="lg:col-span-4 space-y-2 text-xs text-ink-700 bg-ink-50/50 p-3.5 rounded-xl border border-ink-100">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-sm text-ink-950 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-ink-400" />
                      {order.customer.name}
                    </p>
                    {order.userId ? (
                      <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200">
                        Registered
                      </span>
                    ) : null}
                  </div>

                  <p className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-ink-400" />
                    <a href={`tel:${order.customer.phone}`} className="hover:text-brand-700 font-semibold">
                      {order.customer.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-ink-400" />
                    <a href={`mailto:${order.customer.email}`} className="hover:text-brand-700 font-semibold truncate">
                      {order.customer.email}
                    </a>
                  </p>
                  <div className="flex items-start gap-1.5 pt-1 border-t border-ink-200/50">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-ink-400 mt-0.5" />
                    <p className="whitespace-pre-line text-[11px] leading-relaxed text-ink-600">
                      {order.customer.address}
                    </p>
                  </div>
                  {order.notes ? (
                    <div className="pt-1.5 border-t border-ink-200/50">
                      <p className="text-[10px] font-bold uppercase text-ink-400">Order Notes:</p>
                      <p className="text-[11px] text-ink-600 italic whitespace-pre-line mt-0.5">{order.notes}</p>
                    </div>
                  ) : null}
                </div>

                {/* Items & Artwork Column (8 cols) */}
                <div className="lg:col-span-8 space-y-3">
                  {/* Items list */}
                  <ul className="space-y-2 text-xs">
                    {order.items.map((item, i) => (
                      <li key={i} className="rounded-xl border border-ink-100 bg-white p-3 space-y-1.5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="font-extrabold text-ink-950 text-sm">
                              {item.productName}
                            </span>
                            <span className="ml-2 font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded text-[11px]">
                              Qty: {item.quantity} ({item.selectedUnits} units)
                            </span>
                          </div>
                          <span className="font-black text-sm text-ink-950">{formatINR(item.lineTotal)}</span>
                        </div>

                        {/* Detailed Specs */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink-600">
                          <span>
                            <strong>Size:</strong> {item.selectedSize}
                          </span>
                          <span>
                            <strong>Material &amp; Finish:</strong> {item.selectedFinish}
                          </span>
                        </div>

                        {/* Item Artwork Download Badge if item-specific */}
                        {(item.designFileUrl || item.designFileName) && (
                          <div className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 text-xs text-emerald-950 mt-1">
                            <div className="flex items-center gap-2 truncate">
                              <ImageIcon className="h-4 w-4 shrink-0 text-emerald-600" />
                              <span className="font-bold truncate">{item.designFileName || "Design file"}</span>
                            </div>
                            {item.designFileUrl ? (
                              <a
                                href={item.designFileUrl}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-emerald-700 shadow-xs"
                              >
                                <Download className="h-3 w-3" />
                                Download File for Print
                              </a>
                            ) : (
                              <span className="text-[11px] font-semibold text-emerald-800">Sent on WhatsApp</span>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* Artwork Download Hero Banner for Operator (if artworks present) */}
                  {artworks.length > 0 && (
                    <div className="rounded-xl border-2 border-brand-500/40 bg-brand-50/40 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-brand-700" />
                          <p className="text-xs font-black uppercase tracking-wider text-ink-950">
                            Print-Ready Artwork Files ({artworks.length})
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-brand-800 bg-brand-200/80 px-2 py-0.5 rounded-full">
                          Ready for CTP / Press
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {artworks.map((art, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between rounded-lg bg-white border border-brand-200 p-2 text-xs"
                          >
                            <div className="flex items-center gap-2 truncate pr-2">
                              <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[10px] font-black text-brand-900 uppercase">
                                {art.fileName.split(".").pop() || "FILE"}
                              </span>
                              <div className="truncate">
                                <p className="font-bold text-ink-900 truncate">{art.fileName}</p>
                                <p className="text-[10px] text-ink-500">{art.productName}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {art.fileUrl ? (
                                <>
                                  <a
                                    href={art.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-lg border border-ink-200 bg-ink-50 px-2.5 py-1 text-[11px] font-bold text-ink-800 hover:bg-ink-100"
                                    title="View / Inspect file"
                                  >
                                    <Eye className="h-3 w-3" />
                                    Preview
                                  </a>
                                  <a
                                    href={art.fileUrl}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1 text-[11px] font-extrabold text-white hover:bg-emerald-700 shadow-xs"
                                    title="Download original file for printing"
                                  >
                                    <Download className="h-3 w-3" />
                                    Download Print File
                                  </a>
                                </>
                              ) : (
                                <a
                                  href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-900 hover:bg-emerald-200"
                                >
                                  <MessageCircle className="h-3 w-3 text-emerald-700" />
                                  Open WhatsApp Chat
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Order Total */}
                  <div className="flex items-baseline justify-end gap-2 pt-1">
                    <span className="text-xs font-bold text-ink-500 uppercase tracking-wider">Total Payable:</span>
                    <span className="font-[family-name:var(--font-display)] text-xl font-black text-ink-950">
                      {formatINR(order.subtotal)}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })
      )}

      {/* =========================================================================
       * PRINTABLE JOB TICKET / WORK ORDER MODAL
       * Clean A4 layout for press operator & thermal receipt printers
       * ========================================================================= */}
      {activePrintOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
          {/* Modal Container */}
          <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-ink-200 overflow-hidden my-8">
            {/* Top Toolbar (Hidden when printing via @media print) */}
            <div className="flex items-center justify-between bg-ink-950 px-6 py-4 text-white print:hidden">
              <div className="flex items-center gap-2">
                <Printer className="h-5 w-5 text-brand-400" />
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold">
                  Print Job Ticket / Work Order — {activePrintOrder.orderNumber}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2 text-xs font-black text-ink-950 hover:bg-brand-400 transition-colors shadow-sm cursor-pointer"
                >
                  <Printer className="h-4 w-4" />
                  Print Now
                </button>
                <button
                  type="button"
                  onClick={() => setActivePrintOrder(null)}
                  className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Print Sheet Content (Targets #printable-ticket) */}
            <div id="printable-ticket" className="p-8 sm:p-10 space-y-6 text-black bg-white">
              {/* Slip Header */}
              <div className="flex items-start justify-between border-b-2 border-black pb-4">
                <div>
                  <h1 className="font-[family-name:var(--font-display)] text-2xl font-black tracking-tight">
                    FAST PRINTS
                  </h1>
                  <p className="text-xs font-semibold text-gray-700">Digital Offset, Vinyl, Corporate &amp; Visiting Cards</p>
                  <p className="text-[11px] text-gray-600 mt-1">
                    #24, 7th Cross, 24th Main, BTM Layout 2nd Stage, Bengaluru - 560076
                  </p>
                  <p className="text-[11px] text-gray-600">
                    Phone: +91 63669 12357 | Email: fastprintsdigital@gmail.com | GSTIN: 29AABCF1234F1Z5
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <span className="inline-block border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase">
                    PRODUCTION JOB SLIP
                  </span>
                  <p className="font-mono text-base font-black tracking-wider mt-1">{activePrintOrder.orderNumber}</p>
                  <p className="text-xs text-gray-600">
                    {new Date(activePrintOrder.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <span className="inline-block rounded bg-black px-2 py-0.5 text-[10px] font-black uppercase text-white">
                    {activePrintOrder.status.replaceAll("_", " ")}
                  </span>
                </div>
              </div>

              {/* Delivery Schedule Priority Banner */}
              <div className="flex items-center justify-between rounded border border-black bg-gray-50 px-4 py-2 text-xs">
                <div>
                  <strong>DELIVERY PRIORITY: </strong>
                  <span className="font-bold text-black uppercase">
                    {new Date(activePrintOrder.createdAt).getHours() < 12
                      ? "SAME DAY DISPATCH (Order Before 12:00 Noon)"
                      : "NEXT DAY DELIVERY (Standard Schedule)"}
                  </span>
                </div>
                <div>
                  <strong>PAYMENT: </strong>
                  <span className="font-black uppercase">{activePrintOrder.paymentStatus ?? "PENDING"}</span>
                </div>
              </div>

              {/* Customer & Shipping Information */}
              <div className="grid grid-cols-2 gap-4 rounded border border-gray-300 p-4 text-xs">
                <div>
                  <p className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">CUSTOMER DETAILS</p>
                  <p className="font-bold text-sm text-black mt-0.5">{activePrintOrder.customer.name}</p>
                  <p className="text-gray-700 mt-1">Phone: <strong>{activePrintOrder.customer.phone}</strong></p>
                  <p className="text-gray-700">Email: {activePrintOrder.customer.email}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">SHIPPING / DELIVERY ADDRESS</p>
                  <p className="text-gray-900 mt-0.5 whitespace-pre-line leading-relaxed font-medium">
                    {activePrintOrder.customer.address}
                  </p>
                  {activePrintOrder.notes && (
                    <p className="mt-2 text-gray-600 text-[11px] italic">
                      Special Note: {activePrintOrder.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Production Specifications Table */}
              <div>
                <p className="font-bold text-xs uppercase tracking-wider text-black mb-2">
                  JOB SPECIFICATIONS &amp; QUANTITIES
                </p>
                <table className="w-full border-collapse border border-black text-xs">
                  <thead>
                    <tr className="bg-gray-100 border-b border-black text-left">
                      <th className="border-r border-black p-2 font-bold">#</th>
                      <th className="border-r border-black p-2 font-bold">Item Description</th>
                      <th className="border-r border-black p-2 font-bold">Size / Dimensions</th>
                      <th className="border-r border-black p-2 font-bold">Stock &amp; Finish</th>
                      <th className="border-r border-black p-2 font-bold text-center">Sets × Units</th>
                      <th className="p-2 font-bold text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activePrintOrder.items.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-300">
                        <td className="border-r border-black p-2 text-center font-bold">{idx + 1}</td>
                        <td className="border-r border-black p-2 font-extrabold">
                          {item.productName}
                          {item.designFileName && (
                            <span className="block font-normal text-[11px] text-gray-600">
                              Artwork: {item.designFileName}
                            </span>
                          )}
                        </td>
                        <td className="border-r border-black p-2">{item.selectedSize}</td>
                        <td className="border-r border-black p-2">{item.selectedFinish}</td>
                        <td className="border-r border-black p-2 text-center font-bold">
                          {item.quantity} set ({item.selectedUnits} pcs)
                        </td>
                        <td className="p-2 text-right font-black">{item.lineTotal.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-black font-bold">
                      <td colSpan={5} className="border-r border-black p-2 text-right uppercase">
                        Total Amount Payable (incl. 18% GST)
                      </td>
                      <td className="p-2 text-right font-black text-sm">
                        ₹{activePrintOrder.subtotal.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Press Operator Quality & Workflow Checkpoints */}
              <div className="rounded border border-black p-4 space-y-2">
                <p className="font-bold text-xs uppercase tracking-wider text-black">
                  OPERATOR PRODUCTION CHECKLIST
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-black" />
                    <span>File RIP &amp; 300 DPI</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-black" />
                    <span>Digital Press Run</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-black" />
                    <span>Matte/Gloss Lamination</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-black" />
                    <span>Guillotine Cutting</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-black" />
                    <span>Corner Rounding</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-black" />
                    <span>Count Verification</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-black" />
                    <span>QC &amp; Packing</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 rounded border-black" />
                    <span>Courier / Handover</span>
                  </label>
                </div>
              </div>

              {/* Signatures & Footer */}
              <div className="flex justify-between items-end pt-6 text-xs text-gray-700">
                <div>
                  <div className="h-10 border-b border-black w-44" />
                  <p className="mt-1 font-bold text-[11px] uppercase">Operator Signature</p>
                </div>
                <div className="text-right">
                  <div className="h-10 border-b border-black w-44 ml-auto" />
                  <p className="mt-1 font-bold text-[11px] uppercase">Receiver / Customer Sign</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for @media print */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-ticket,
          #printable-ticket * {
            visibility: visible !important;
          }
          #printable-ticket {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 24px !important;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  );
}
