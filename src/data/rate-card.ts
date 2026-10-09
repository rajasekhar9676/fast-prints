export type RateItem = {
  id: string;
  category: string;
  particulars: string;
  qualityOrPaper: string;
  quantity: string;
  quantityNumber?: number;
  rateSS?: number | null;
  rateDS?: number | null;
  fixedPrice?: number | null;
  gstRate: string;
  unitLabel?: string;
  isQuoteOnly?: boolean;
  notes?: string;
};

export const rateCardCategories = [
  "All Items",
  "Visiting Cards",
  "Letterheads & Envelopes",
  "13 x 19 Digital Prints",
  "Stickers & Labels",
  "Offset Multicolor Printing",
  "Bill Books & Receipts",
  "Seals & Stamps",
  "ID Cards & Lanyards",
  "Mugs & Drinkware",
  "Button Badges",
  "Photo Frames",
  "Lamination",
  "Banners & Vinyl",
  "Display & Signage Quotes",
] as const;

export const rateCardData: RateItem[] = [
  // --- VISITING CARD ---
  { id: "vc-100", category: "Visiting Cards", particulars: "VISITING CARD", qualityOrPaper: "300GSM BOARD", quantity: "100 Units", quantityNumber: 100, rateSS: 2, rateDS: 3, gstRate: "18%", unitLabel: "per unit" },
  { id: "vc-200", category: "Visiting Cards", particulars: "VISITING CARD", qualityOrPaper: "300GSM BOARD", quantity: "200 Units", quantityNumber: 200, rateSS: 1.5, rateDS: 2, gstRate: "18%", unitLabel: "per unit" },
  { id: "vc-300", category: "Visiting Cards", particulars: "VISITING CARD", qualityOrPaper: "300GSM BOARD", quantity: "300 Units", quantityNumber: 300, rateSS: 1.5, rateDS: 2, gstRate: "18%", unitLabel: "per unit" },
  { id: "vc-400", category: "Visiting Cards", particulars: "VISITING CARD", qualityOrPaper: "300GSM BOARD", quantity: "400 Units", quantityNumber: 400, rateSS: 1.5, rateDS: 2, gstRate: "18%", unitLabel: "per unit" },
  { id: "vc-500", category: "Visiting Cards", particulars: "VISITING CARD", qualityOrPaper: "300GSM BOARD", quantity: "500 Units", quantityNumber: 500, rateSS: 1.5, rateDS: 2, gstRate: "18%", unitLabel: "per unit" },
  { id: "vc-600", category: "Visiting Cards", particulars: "VISITING CARD", qualityOrPaper: "300GSM BOARD", quantity: "600 Units", quantityNumber: 600, rateSS: 1.4, rateDS: 1.9, gstRate: "18%", unitLabel: "per unit" },
  { id: "vc-700", category: "Visiting Cards", particulars: "VISITING CARD", qualityOrPaper: "300GSM BOARD", quantity: "700 Units", quantityNumber: 700, rateSS: 1.4, rateDS: 1.9, gstRate: "18%", unitLabel: "per unit" },
  { id: "vc-800", category: "Visiting Cards", particulars: "VISITING CARD", qualityOrPaper: "300GSM BOARD", quantity: "800 Units", quantityNumber: 800, rateSS: 1.4, rateDS: 1.9, gstRate: "18%", unitLabel: "per unit" },
  { id: "vc-900", category: "Visiting Cards", particulars: "VISITING CARD", qualityOrPaper: "300GSM BOARD", quantity: "900 Units", quantityNumber: 900, rateSS: 1.4, rateDS: 1.9, gstRate: "18%", unitLabel: "per unit" },
  { id: "vc-1000", category: "Visiting Cards", particulars: "VISITING CARD", qualityOrPaper: "300GSM BOARD", quantity: "1000 Units", quantityNumber: 1000, rateSS: 1, rateDS: 1.25, gstRate: "18%", unitLabel: "per unit" },
  { id: "vc-1000-lam", category: "Visiting Cards", particulars: "VISITING CARD", qualityOrPaper: "300GSM BOARD- WITH LAMINATION GLOSSY / MATT", quantity: "1000 Units", quantityNumber: 1000, rateSS: 1.5, rateDS: 2, gstRate: "18%", unitLabel: "per unit" },

  // --- LETTER HEAD & ENVELOPE (Digital) ---
  { id: "lh-100", category: "Letterheads & Envelopes", particulars: "LETTER HEAD-", qualityOrPaper: "A4 SIZE - 100GSM BOND - DIGITAL PRINT", quantity: "100 Units", quantityNumber: 100, rateSS: 8.5, rateDS: null, gstRate: "18%", unitLabel: "per unit" },
  { id: "lh-500", category: "Letterheads & Envelopes", particulars: "LETTER HEAD-", qualityOrPaper: "A4 SIZE - 100GSM BOND - DIGITAL PRINT", quantity: "500 Units", quantityNumber: 500, rateSS: 8, rateDS: null, gstRate: "18%", unitLabel: "per unit" },
  { id: "env-100", category: "Letterheads & Envelopes", particulars: "ENVELOPE", qualityOrPaper: "9.5 X 4.5 - 100GSM - DIGITAL PRINT", quantity: "100 Units", quantityNumber: 100, rateSS: 12, rateDS: null, gstRate: "18%", unitLabel: "per unit" },
  { id: "env-500", category: "Letterheads & Envelopes", particulars: "ENVELOPE", qualityOrPaper: "9.5 X 4.5 - 100GSM - DIGITAL PRINT", quantity: "500 Units", quantityNumber: 500, rateSS: 9, rateDS: null, gstRate: "18%", unitLabel: "per unit" },
  { id: "env-1000", category: "Letterheads & Envelopes", particulars: "ENVELOPE", qualityOrPaper: "9.5 X 4.5 - 100GSM - DIGITAL PRINT", quantity: "1000 Units", quantityNumber: 1000, rateSS: 7.5, rateDS: null, gstRate: "18%", unitLabel: "per unit" },

  // --- 13 X 19 SIZE - DIGITAL PRINT ---
  { id: "dp1319-350-1", category: "13 x 19 Digital Prints", particulars: "13 X 19 SIZE - DIGITAL PRINT", qualityOrPaper: "350- S/S- DIGITAL PRINT", quantity: "1 SHEET", quantityNumber: 1, rateSS: 60, rateDS: 70, gstRate: "18%", unitLabel: "per sheet" },
  { id: "dp1319-350-2-20", category: "13 x 19 Digital Prints", particulars: "13 X 19 SIZE - DIGITAL PRINT", qualityOrPaper: "350- S/S- DIGITAL PRINT", quantity: "2-20 SHEET ABOVE", quantityNumber: 2, rateSS: 40, rateDS: 50, gstRate: "18%", unitLabel: "per sheet" },
  { id: "dp1319-350-21", category: "13 x 19 Digital Prints", particulars: "13 X 19 SIZE - DIGITAL PRINT", qualityOrPaper: "350- S/S- DIGITAL PRINT", quantity: "21 SHEETS ABOVE", quantityNumber: 21, rateSS: 25, rateDS: 35, gstRate: "18%", unitLabel: "per sheet" },

  { id: "dp1319-300-1", category: "13 x 19 Digital Prints", particulars: "13 X 19 SIZE - DIGITAL PRINT", qualityOrPaper: "300- S/S- DIGITAL PRINT", quantity: "1 SHEET", quantityNumber: 1, rateSS: 50, rateDS: 60, gstRate: "18%", unitLabel: "per sheet" },
  { id: "dp1319-300-2-20", category: "13 x 19 Digital Prints", particulars: "13 X 19 SIZE - DIGITAL PRINT", qualityOrPaper: "300- S/S- DIGITAL PRINT", quantity: "2-20 SHEET ABOVE", quantityNumber: 2, rateSS: 30, rateDS: 40, gstRate: "18%", unitLabel: "per sheet" },
  { id: "dp1319-300-21", category: "13 x 19 Digital Prints", particulars: "13 X 19 SIZE - DIGITAL PRINT", qualityOrPaper: "300- S/S- DIGITAL PRINT", quantity: "21 SHEETS ABOVE", quantityNumber: 21, rateSS: 20, rateDS: 30, gstRate: "18%", unitLabel: "per sheet" },

  { id: "dp1319-txt-1", category: "13 x 19 Digital Prints", particulars: "13 X 19 SIZE - DIGITAL PRINT", qualityOrPaper: "TEXTURE BOARD - DIGITAL PRINT", quantity: "1 SHEET", quantityNumber: 1, rateSS: 60, rateDS: 70, gstRate: "18%", unitLabel: "per sheet" },
  { id: "dp1319-txt-2-20", category: "13 x 19 Digital Prints", particulars: "13 X 19 SIZE - DIGITAL PRINT", qualityOrPaper: "TEXTURE BOARD - DIGITAL PRINT", quantity: "2-20 SHEET ABOVE", quantityNumber: 2, rateSS: 40, rateDS: 50, gstRate: "18%", unitLabel: "per sheet" },
  { id: "dp1319-txt-21", category: "13 x 19 Digital Prints", particulars: "13 X 19 SIZE - DIGITAL PRINT", qualityOrPaper: "TEXTURE BOARD - DIGITAL PRINT", quantity: "21 SHEETS ABOVE", quantityNumber: 21, rateSS: 30, rateDS: 40, gstRate: "18%", unitLabel: "per sheet" },

  { id: "dp1319-nt-1", category: "13 x 19 Digital Prints", particulars: "13 X 19 SIZE - DIGITAL PRINT", qualityOrPaper: "N.TERABLE SHEET - DIGITAL PRINT", quantity: "1 SHEET", quantityNumber: 1, rateSS: 60, rateDS: 70, gstRate: "18%", unitLabel: "per sheet" },
  { id: "dp1319-nt-2-20", category: "13 x 19 Digital Prints", particulars: "13 X 19 SIZE - DIGITAL PRINT", qualityOrPaper: "N.TERABLE SHEET - DIGITAL PRINT", quantity: "2-20 SHEET ABOVE", quantityNumber: 2, rateSS: 40, rateDS: 50, gstRate: "18%", unitLabel: "per sheet" },
  { id: "dp1319-nt-21", category: "13 x 19 Digital Prints", particulars: "13 X 19 SIZE - DIGITAL PRINT", qualityOrPaper: "N.TERABLE SHEET - DIGITAL PRINT", quantity: "21 SHEETS ABOVE", quantityNumber: 21, rateSS: 30, rateDS: 40, gstRate: "18%", unitLabel: "per sheet" },

  // --- STICKERS ---
  { id: "dp1319-stk-1", category: "Stickers & Labels", particulars: "13 X 19 SIZE - N.STICKER - DIGITAL PRINT", qualityOrPaper: "DIGITAL PRINT", quantity: "1 SHEET", quantityNumber: 1, rateSS: 50, rateDS: null, gstRate: "18%", unitLabel: "per sheet" },
  { id: "dp1319-stk-2-20", category: "Stickers & Labels", particulars: "13 X 19 SIZE - N.STICKER - DIGITAL PRINT", qualityOrPaper: "DIGITAL PRINT", quantity: "2-20 SHEET ABOVE", quantityNumber: 2, rateSS: 30, rateDS: null, gstRate: "18%", unitLabel: "per sheet" },
  { id: "dp1319-stk-21", category: "Stickers & Labels", particulars: "13 X 19 SIZE - N.STICKER - DIGITAL PRINT", qualityOrPaper: "DIGITAL PRINT", quantity: "21 SHEETS ABOVE", quantityNumber: 21, rateSS: 20, rateDS: null, gstRate: "18%", unitLabel: "per sheet" },

  { id: "stk-round-10", category: "Stickers & Labels", particulars: "STICKER", qualityOrPaper: "ROUND STICKER CUTTING", quantity: "10 SHEET", quantityNumber: 10, rateSS: 50, rateDS: null, gstRate: "18%", unitLabel: "per sheet" },
  { id: "stk-halfcut-10", category: "Stickers & Labels", particulars: "STICKER", qualityOrPaper: "HALF CUT STICKER (RECTANGLE / SQUARE)", quantity: "10 SHEETS", quantityNumber: 10, rateSS: 20, rateDS: null, gstRate: "18%", unitLabel: "per sheet" },

  { id: "dp1319-ntstk-1", category: "Stickers & Labels", particulars: "13 X 19 SIZE - N.TERABLE STICKER - DIGITAL PRINT", qualityOrPaper: "DIGITAL PRINT", quantity: "1 SHEET", quantityNumber: 1, rateSS: 50, rateDS: null, gstRate: "18%", unitLabel: "per sheet" },
  { id: "dp1319-ntstk-2-20", category: "Stickers & Labels", particulars: "13 X 19 SIZE - N.TERABLE STICKER - DIGITAL PRINT", qualityOrPaper: "DIGITAL PRINT", quantity: "2-20 SHEET ABOVE", quantityNumber: 2, rateSS: 40, rateDS: null, gstRate: "18%", unitLabel: "per sheet" },
  { id: "dp1319-ntstk-21", category: "Stickers & Labels", particulars: "13 X 19 SIZE - N.TERABLE STICKER - DIGITAL PRINT", qualityOrPaper: "DIGITAL PRINT", quantity: "21 SHEETS ABOVE", quantityNumber: 21, rateSS: 30, rateDS: null, gstRate: "18%", unitLabel: "per sheet" },

  // --- OFFSET MULTICOLOR PRINT (3 WORKING DAYS TIME) ---
  { id: "off-lh-1000", category: "Offset Multicolor Printing", particulars: "LETTER HEAD-", qualityOrPaper: "A4 SIZE - 100GSM BOND - MULTICOLOR OFFSET PRINT", quantity: "1000 Units", quantityNumber: 1000, rateSS: 3.5, rateDS: null, gstRate: "18%", unitLabel: "per unit", notes: "3 Working Days Time" },
  { id: "off-env-1000", category: "Offset Multicolor Printing", particulars: "ENVELOPE", qualityOrPaper: "9.5 X 4.5 - 100GSM - MUTLICOLOR OFFSET PRINT", quantity: "1000 Units", quantityNumber: 1000, rateSS: 5.5, rateDS: null, gstRate: "18%", unitLabel: "per unit", notes: "3 Working Days Time" },
  { id: "off-pamp-a5-2000", category: "Offset Multicolor Printing", particulars: "PAMPHLET - A5 SIZE", qualityOrPaper: "90GSM - A5 SIZE - ART PAPER (D/S ) PRINT", quantity: "2000 Copies", quantityNumber: 2000, fixedPrice: 3500, rateSS: 1.75, rateDS: 1.75, gstRate: "18%", unitLabel: "₹3,500 Lot Price", notes: "3 Working Days Time" },
  { id: "off-pamp-a4-1000", category: "Offset Multicolor Printing", particulars: "PAMPHLET - A4 SIZE", qualityOrPaper: "90GSM - A4 SIZE - ART PAPER (D/S ) PRINT", quantity: "1000 Copies", quantityNumber: 1000, fixedPrice: 3500, rateSS: 3.5, rateDS: 3.5, gstRate: "18%", unitLabel: "₹3,500 Lot Price", notes: "3 Working Days Time" },

  // --- BILL BOOK (OFFSET PRINTING) SINGLE COLOR ---
  { id: "bb-a5-10", category: "Bill Books & Receipts", particulars: "BILL BOOK (OFFSET PRINTING) SINGLE COLOR", qualityOrPaper: "A5 SIZE - 1+1 (WHITE + PINK PAPER)", quantity: "10 BOOKS", quantityNumber: 10, rateSS: 200, rateDS: null, gstRate: "18%", unitLabel: "per book" },
  { id: "bb-a4-10", category: "Bill Books & Receipts", particulars: "BILL BOOK (OFFSET PRINTING) SINGLE COLOR", qualityOrPaper: "A4 SIZE - 1+1 (WHITE + PINK PAPER)", quantity: "10 BOOKS", quantityNumber: 10, rateSS: 350, rateDS: null, gstRate: "18%", unitLabel: "per book" },
  { id: "bb-15th-10", category: "Bill Books & Receipts", particulars: "BILL BOOK (OFFSET PRINTING) SINGLE COLOR", qualityOrPaper: "1/5TH SIZE - 1+1 (WHITE + PINK PAPER)", quantity: "10 BOOKS", quantityNumber: 10, rateSS: 300, rateDS: null, gstRate: "18%", unitLabel: "per book" },
  { id: "bb-16th-10", category: "Bill Books & Receipts", particulars: "BILL BOOK (OFFSET PRINTING) SINGLE COLOR", qualityOrPaper: "1/6TH SIZE - 1+1 (WHITE + PINK PAPER)", quantity: "10 BOOKS", quantityNumber: 10, rateSS: 280, rateDS: null, gstRate: "18%", unitLabel: "per book" },
  { id: "bb-116th-12", category: "Bill Books & Receipts", particulars: "BILL BOOK (OFFSET PRINTING) SINGLE COLOR", qualityOrPaper: "1/16TH SIZE - 1+1 (WHITE + PINK PAPER)", quantity: "12 BOOKS", quantityNumber: 12, rateSS: 120, rateDS: null, gstRate: "18%", unitLabel: "per book" },

  // --- SEAL & STAMPS ---
  { id: "seal-round", category: "Seals & Stamps", particulars: "SEAL", qualityOrPaper: "RUBBER STAMP - ROUND SEAL", quantity: "1 PC", quantityNumber: 1, rateSS: 200, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "seal-address", category: "Seals & Stamps", particulars: "SEAL", qualityOrPaper: "FOR SEAL, ADDRESS SEAL", quantity: "1 PC", quantityNumber: 1, rateSS: 250, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "seal-selfink-sm", category: "Seals & Stamps", particulars: "SEAL", qualityOrPaper: "SELF INK - SEAL (SMALL)", quantity: "1 PC", quantityNumber: 1, rateSS: 450, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "seal-selfink-md", category: "Seals & Stamps", particulars: "SEAL", qualityOrPaper: "SELF INK - SEAL (MEDIUM)", quantity: "1 PC", quantityNumber: 1, rateSS: 650, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "seal-selfink-lg", category: "Seals & Stamps", particulars: "SEAL", qualityOrPaper: "SELF INK - SEAL (LARGE)", quantity: "1 PC", quantityNumber: 1, rateSS: 750, rateDS: null, gstRate: "18%", unitLabel: "per pc" },

  // --- ID CARDS & LANYARDS ---
  { id: "id-pvc", category: "ID Cards & Lanyards", particulars: "ID CARDS", qualityOrPaper: "(PVC) -D/S - MULTICOLOR PRINT", quantity: "1 PC", quantityNumber: 1, rateSS: 100, rateDS: 100, gstRate: "18%", unitLabel: "per pc" },
  { id: "id-holder", category: "ID Cards & Lanyards", particulars: "HOLDER", qualityOrPaper: "WHITE", quantity: "1 PC", quantityNumber: 1, rateSS: 10, rateDS: null, gstRate: "18%", unitLabel: "per pc" },

  { id: "lan-20mm-50", category: "ID Cards & Lanyards", particulars: "LANYARD (TAG)", qualityOrPaper: "20MM - MULTILCOLOR PRINT", quantity: "50 PCS", quantityNumber: 50, rateSS: 60, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lan-20mm-100", category: "ID Cards & Lanyards", particulars: "LANYARD (TAG)", qualityOrPaper: "20MM - MULTILCOLOR PRINT", quantity: "100 PCS", quantityNumber: 100, rateSS: 45, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lan-20mm-500", category: "ID Cards & Lanyards", particulars: "LANYARD (TAG)", qualityOrPaper: "20MM - MULTILCOLOR PRINT", quantity: "500 PCS", quantityNumber: 500, rateSS: 30, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lan-20mm-1000", category: "ID Cards & Lanyards", particulars: "LANYARD (TAG)", qualityOrPaper: "20MM - MULTILCOLOR PRINT", quantity: "1000 PCS", quantityNumber: 1000, rateSS: 26, rateDS: null, gstRate: "18%", unitLabel: "per pc" },

  { id: "lan-16mm-50", category: "ID Cards & Lanyards", particulars: "LANYARD (TAG)", qualityOrPaper: "16MM - MULTILCOLOR PRINT", quantity: "50 PCS", quantityNumber: 50, rateSS: 50, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lan-16mm-100", category: "ID Cards & Lanyards", particulars: "LANYARD (TAG)", qualityOrPaper: "16MM - MULTILCOLOR PRINT", quantity: "100 PCS", quantityNumber: 100, rateSS: 35, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lan-16mm-500", category: "ID Cards & Lanyards", particulars: "LANYARD (TAG)", qualityOrPaper: "16MM - MULTILCOLOR PRINT", quantity: "500 PCS", quantityNumber: 500, rateSS: 24, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lan-16mm-1000", category: "ID Cards & Lanyards", particulars: "LANYARD (TAG)", qualityOrPaper: "16MM - MULTILCOLOR PRINT", quantity: "1000 PCS", quantityNumber: 1000, rateSS: 21, rateDS: null, gstRate: "18%", unitLabel: "per pc" },

  { id: "lan-10mm-50", category: "ID Cards & Lanyards", particulars: "LANYARD (TAG)", qualityOrPaper: "10MM - MULTILCOLOR PRINT", quantity: "50 PCS", quantityNumber: 50, rateSS: 40, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lan-10mm-100", category: "ID Cards & Lanyards", particulars: "LANYARD (TAG)", qualityOrPaper: "10MM - MULTILCOLOR PRINT", quantity: "100 PCS", quantityNumber: 100, rateSS: 30, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lan-10mm-500", category: "ID Cards & Lanyards", particulars: "LANYARD (TAG)", qualityOrPaper: "10MM - MULTILCOLOR PRINT", quantity: "500 PCS", quantityNumber: 500, rateSS: 20, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lan-10mm-1000", category: "ID Cards & Lanyards", particulars: "LANYARD (TAG)", qualityOrPaper: "10MM - MULTILCOLOR PRINT", quantity: "1000 PCS", quantityNumber: 1000, rateSS: 18, rateDS: null, gstRate: "18%", unitLabel: "per pc" },

  // --- MUGS & MAGIC MUGS ---
  { id: "mug-1", category: "Mugs & Drinkware", particulars: "MUG", qualityOrPaper: "11HZ - CERAMIC MUG - MULTICOLOR", quantity: "1 PC", quantityNumber: 1, rateSS: 300, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "mug-50", category: "Mugs & Drinkware", particulars: "MUG", qualityOrPaper: "11HZ - CERAMIC MUG - MULTICOLOR", quantity: "50 ABOVE", quantityNumber: 50, rateSS: 200, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "mug-magic-1", category: "Mugs & Drinkware", particulars: "MUG MAGIC", qualityOrPaper: "11HZ - CERAMIC MUG - MULTICOLOR", quantity: "1 PC", quantityNumber: 1, rateSS: 550, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "mug-magic-10", category: "Mugs & Drinkware", particulars: "MUG MAGIC", qualityOrPaper: "11HZ - CERAMIC MUG - MULTICOLOR", quantity: "10 PCS ABOVE", quantityNumber: 10, rateSS: 350, rateDS: null, gstRate: "18%", unitLabel: "per pc" },

  // --- BUTTON BADGES ---
  { id: "badge-55mm-24", category: "Button Badges", particulars: "BUTTON BADGE", qualityOrPaper: "55MM PIN BADGE", quantity: "24 PCS", quantityNumber: 24, rateSS: 15, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "badge-55mm-100", category: "Button Badges", particulars: "BUTTON BADGE", qualityOrPaper: "55MM PIN BADGE", quantity: "100 PCS", quantityNumber: 100, rateSS: 12, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "badge-55mm-500", category: "Button Badges", particulars: "BUTTON BADGE", qualityOrPaper: "55MM PIN BADGE", quantity: "500 PCS", quantityNumber: 500, rateSS: 10, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "badge-55mm-1000", category: "Button Badges", particulars: "BUTTON BADGE", qualityOrPaper: "55MM PIN BADGE", quantity: "1000 PCS", quantityNumber: 1000, rateSS: 9, rateDS: null, gstRate: "18%", unitLabel: "per pc" },

  { id: "badge-44mm-30", category: "Button Badges", particulars: "BUTTON BADGE", qualityOrPaper: "44 MM PIN BADGE", quantity: "30 PCS", quantityNumber: 30, rateSS: 14, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "badge-44mm-100", category: "Button Badges", particulars: "BUTTON BADGE", qualityOrPaper: "55MM PIN BADGE", quantity: "100 PCS", quantityNumber: 100, rateSS: 11, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "badge-44mm-500", category: "Button Badges", particulars: "BUTTON BADGE", qualityOrPaper: "55MM PIN BADGE", quantity: "500 PCS", quantityNumber: 500, rateSS: 9, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "badge-44mm-1000", category: "Button Badges", particulars: "BUTTON BADGE", qualityOrPaper: "55MM PIN BADGE", quantity: "1000 PCS", quantityNumber: 1000, rateSS: 8, rateDS: null, gstRate: "18%", unitLabel: "per pc" },

  { id: "badge-70mm-15", category: "Button Badges", particulars: "BUTTON BADGE", qualityOrPaper: "70 MM PIN BADGE", quantity: "15 PCS", quantityNumber: 15, rateSS: 20, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "badge-70mm-100", category: "Button Badges", particulars: "BUTTON BADGE", qualityOrPaper: "70 MM PIN BADGE", quantity: "100 PCS", quantityNumber: 100, rateSS: 18, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "badge-70mm-500", category: "Button Badges", particulars: "BUTTON BADGE", qualityOrPaper: "70 MM PIN BADGE", quantity: "500 PCS", quantityNumber: 500, rateSS: 15, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "badge-70mm-1000", category: "Button Badges", particulars: "BUTTON BADGE", qualityOrPaper: "70 MM PIN BADGE", quantity: "1000 PCS", quantityNumber: 1000, rateSS: 14, rateDS: null, gstRate: "18%", unitLabel: "per pc" },

  // --- PHOTO PRINT WITH FRAME ---
  { id: "frame-4x6", category: "Photo Frames", particulars: "PHOTO PRINT WITH FRAME", qualityOrPaper: "4 X 6INCH - 1INCH BEEDING", quantity: "1 FRAME", quantityNumber: 1, rateSS: 250, rateDS: null, gstRate: "18%", unitLabel: "per frame" },
  { id: "frame-6x8", category: "Photo Frames", particulars: "PHOTO PRINT WITH FRAME", qualityOrPaper: "6 X 8INCH - 1INCH BEEDING", quantity: "1 FRAME", quantityNumber: 1, rateSS: 350, rateDS: null, gstRate: "18%", unitLabel: "per frame" },
  { id: "frame-5x7", category: "Photo Frames", particulars: "PHOTO PRINT WITH FRAME", qualityOrPaper: "5 X 7 INCH - 1INCH BEEDING", quantity: "1 FRAME", quantityNumber: 1, rateSS: 300, rateDS: null, gstRate: "18%", unitLabel: "per frame" },
  { id: "frame-10x8", category: "Photo Frames", particulars: "PHOTO PRINT WITH FRAME", qualityOrPaper: "10 X 8INCH - 1INCH BEEDING", quantity: "1 FRAME", quantityNumber: 1, rateSS: 650, rateDS: null, gstRate: "18%", unitLabel: "per frame" },
  { id: "frame-12x18", category: "Photo Frames", particulars: "PHOTO PRINT WITH FRAME", qualityOrPaper: "12 X 18 INCH - 1INCH BEEDING", quantity: "1 FRAME", quantityNumber: 1, rateSS: 1200, rateDS: null, gstRate: "18%", unitLabel: "per frame" },
  { id: "frame-20x30", category: "Photo Frames", particulars: "PHOTO PRINT WITH FRAME", qualityOrPaper: "20 X 30 INCH - 1INCH BEEDING", quantity: "1 FRAME", quantityNumber: 1, rateSS: 2000, rateDS: null, gstRate: "18%", unitLabel: "per frame" },

  // --- LAMINATION ---
  { id: "lam-a4-1", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A4 SIZE", quantity: "1 PC", quantityNumber: 1, rateSS: 50, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lam-a4-10", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A4 SIZE", quantity: "10 PCS", quantityNumber: 10, rateSS: 40, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lam-a4-100", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A4 SIZE", quantity: "100 PCS", quantityNumber: 100, rateSS: 30, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lam-a4-500", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A4 SIZE", quantity: "500 PCS", quantityNumber: 500, rateSS: 20, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lam-a4-1000", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A4 SIZE", quantity: "1000 PCS", quantityNumber: 1000, rateSS: 14, rateDS: null, gstRate: "18%", unitLabel: "per pc" },

  { id: "lam-a3-1", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A3 SIZE", quantity: "1 PC", quantityNumber: 1, rateSS: 100, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lam-a3-10", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A3 SIZE", quantity: "10 PCS", quantityNumber: 10, rateSS: 75, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lam-a3-100", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A3 SIZE", quantity: "100 PCS", quantityNumber: 100, rateSS: 60, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lam-a3-500", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A3 SIZE", quantity: "500 PCS", quantityNumber: 500, rateSS: 40, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lam-a3-1000", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A3 SIZE", quantity: "1000 PCS", quantityNumber: 1000, rateSS: 35, rateDS: null, gstRate: "18%", unitLabel: "per pc" },

  { id: "lam-a5-1", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A5 SIZE", quantity: "1 PC", quantityNumber: 1, rateSS: 40, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lam-a5-10", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A5 SIZE", quantity: "10 PCS", quantityNumber: 10, rateSS: 35, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lam-a5-100", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A5 SIZE", quantity: "100 PCS", quantityNumber: 100, rateSS: 20, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lam-a5-500", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A5 SIZE", quantity: "500 PCS", quantityNumber: 500, rateSS: 16, rateDS: null, gstRate: "18%", unitLabel: "per pc" },
  { id: "lam-a5-1000", category: "Lamination", particulars: "LAMINATION", qualityOrPaper: "A5 SIZE", quantity: "1000 PCS", quantityNumber: 1000, rateSS: 12, rateDS: null, gstRate: "18%", unitLabel: "per pc" },

  // --- BANNERS & VINYL STICKERS ---
  { id: "bnr-norm-10", category: "Banners & Vinyl", particulars: "BANNER", qualityOrPaper: "NORMAL FLEX BANNER", quantity: "10 SQFT", quantityNumber: 10, rateSS: 50, rateDS: null, gstRate: "18%", unitLabel: "per sqft" },
  { id: "bnr-norm-50", category: "Banners & Vinyl", particulars: "BANNER", qualityOrPaper: "NORMAL FLEX BANNER", quantity: "50 SQFT", quantityNumber: 50, rateSS: 30, rateDS: null, gstRate: "18%", unitLabel: "per sqft" },
  { id: "bnr-norm-100", category: "Banners & Vinyl", particulars: "BANNER", qualityOrPaper: "NORMAL FLEX BANNER", quantity: "100 SQFT", quantityNumber: 100, rateSS: 20, rateDS: null, gstRate: "18%", unitLabel: "per sqft" },

  { id: "bnr-star-10", category: "Banners & Vinyl", particulars: "BANNER", qualityOrPaper: "STAR FLEX BANNER", quantity: "10 SQFT", quantityNumber: 10, rateSS: 60, rateDS: null, gstRate: "18%", unitLabel: "per sqft" },
  { id: "bnr-star-50", category: "Banners & Vinyl", particulars: "BANNER", qualityOrPaper: "STAR FLEX BANNER", quantity: "50 SQFT", quantityNumber: 50, rateSS: 50, rateDS: null, gstRate: "18%", unitLabel: "per sqft" },
  { id: "bnr-star-100", category: "Banners & Vinyl", particulars: "BANNER", qualityOrPaper: "STAR FLEX BANNER", quantity: "100 SQFT", quantityNumber: 100, rateSS: 40, rateDS: null, gstRate: "18%", unitLabel: "per sqft" },

  { id: "vnl-lam-10", category: "Banners & Vinyl", particulars: "VINYLSTICKER", qualityOrPaper: "VINYLSTICKER WITH LAMINATION", quantity: "10 SQFT", quantityNumber: 10, rateSS: 130, rateDS: null, gstRate: "18%", unitLabel: "per sqft" },
  { id: "vnl-lam-50", category: "Banners & Vinyl", particulars: "VINYLSTICKER", qualityOrPaper: "VINYLSTICKER WITH LAMINATION", quantity: "50 SQFT", quantityNumber: 50, rateSS: 120, rateDS: null, gstRate: "18%", unitLabel: "per sqft" },
  { id: "vnl-lam-100", category: "Banners & Vinyl", particulars: "VINYLSTICKER", qualityOrPaper: "VINYLSTICKER WITH LAMINATION", quantity: "100 SQFT", quantityNumber: 100, rateSS: 110, rateDS: null, gstRate: "18%", unitLabel: "per sqft" },

  // --- QUOTATION & SIGNAGE ITEMS ---
  { id: "q-bnr-frame", category: "Display & Signage Quotes", particulars: "BANNER WITH FRAME", qualityOrPaper: "Custom Metal/Wood Frame Banner", quantity: "QUOTE", isQuoteOnly: true, gstRate: "18%" },
  { id: "q-backlight", category: "Display & Signage Quotes", particulars: "BACKLIGHT (LIGHTING BOARD)", qualityOrPaper: "Illuminated Backlit Signboard", quantity: "QUOTE", isQuoteOnly: true, gstRate: "18%" },
  { id: "q-3d-led", category: "Display & Signage Quotes", particulars: "3D LED BOARD", qualityOrPaper: "3D Acrylic / Channel Letter LED", quantity: "QUOTE", isQuoteOnly: true, gstRate: "18%" },
  { id: "q-2d-led", category: "Display & Signage Quotes", particulars: "2D LED BOARD", qualityOrPaper: "2D Flat Glow LED Board", quantity: "QUOTE", isQuoteOnly: true, gstRate: "18%" },
  { id: "q-rollup", category: "Display & Signage Quotes", particulars: "ROLLUP STANDEE WITH STAR FLEX BANNER", qualityOrPaper: "Aluminum Rollup Base + Star Flex", quantity: "QUOTE", isQuoteOnly: true, gstRate: "18%" },
  { id: "q-acrylic", category: "Display & Signage Quotes", particulars: "ACRYLIC OFFICE NAME BOARD", qualityOrPaper: "Stud-mounted Premium Acrylic Board", quantity: "QUOTE", isQuoteOnly: true, gstRate: "18%" },
  { id: "q-canopy", category: "Display & Signage Quotes", particulars: "CANOPY", qualityOrPaper: "Event & Promotional Tent Canopy", quantity: "QUOTE", isQuoteOnly: true, gstRate: "18%" },
  { id: "q-promo-table", category: "Display & Signage Quotes", particulars: "PROMO TABLE", qualityOrPaper: "Portable Counter / Promo Table", quantity: "QUOTE", isQuoteOnly: true, gstRate: "18%" },
  { id: "q-umbrella", category: "Display & Signage Quotes", particulars: "UMBRELLA", qualityOrPaper: "Branded Promotional Outdoor Umbrella", quantity: "QUOTE", isQuoteOnly: true, gstRate: "18%" },

  // --- GENERAL TERMS ---
  { id: "info-courier", category: "General Terms", particulars: "COURIER CHARGES EXTRA", qualityOrPaper: "Local Express Courier / Speed Post extra at actuals", quantity: "As per order", isQuoteOnly: true, gstRate: "18%" }
];
