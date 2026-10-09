import { rateCardData, RateItem } from "@/data/rate-card";

export type ConfiguratorInput = {
  productSlug: string;
  selectedSize: string;
  selectedFinish: string;
  selectedUnits: number;
  quantity: number; // repeat sets
  printSide?: "Single-Sided (S/S)" | "Double-Sided (D/S)";
};

export function calculateConfiguratorPrice(input: ConfiguratorInput): {
  unitPrice: number;
  subtotal: number;
  gstAmount: number;
  totalWithGst: number;
  matchedRate?: RateItem;
} {
  const { productSlug, selectedSize, selectedFinish, selectedUnits, quantity } = input;
  const totalQty = selectedUnits * Math.max(1, quantity);
  const isDoubleSided =
    input.printSide === "Double-Sided (D/S)" ||
    selectedFinish.includes("D/S") ||
    selectedFinish.includes("Double") ||
    selectedSize.includes("Duplex");

  // Visiting Cards specific logic
  if (productSlug === "visiting-cards") {
    const isLaminated = selectedFinish.toLowerCase().includes("lamination");
    let rate = 1.5;
    if (isLaminated && selectedUnits >= 1000) {
      rate = isDoubleSided ? 2.0 : 1.5;
    } else if (selectedUnits >= 1000) {
      rate = isDoubleSided ? 1.25 : 1.0;
    } else if (selectedUnits >= 600) {
      rate = isDoubleSided ? 1.9 : 1.4;
    } else if (selectedUnits >= 200) {
      rate = isDoubleSided ? 2.0 : 1.5;
    } else {
      rate = isDoubleSided ? 3.0 : 2.0;
    }
    const subtotal = rate * selectedUnits * quantity;
    const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
    return {
      unitPrice: rate,
      subtotal,
      gstAmount,
      totalWithGst: subtotal + gstAmount,
    };
  }

  // 13x19 Digital Prints
  if (productSlug === "13x19-digital-print") {
    let rate = 50;
    const is350 = selectedFinish.includes("350GSM");
    const is300 = selectedFinish.includes("300GSM");
    const isTexture = selectedFinish.toLowerCase().includes("texture");
    const isNonTearable = selectedFinish.toLowerCase().includes("non-tearable") || selectedFinish.toLowerCase().includes("n.terable");

    if (is350 || isTexture || isNonTearable) {
      if (selectedUnits >= 21) rate = isDoubleSided ? 35 : 25;
      else if (selectedUnits >= 2) rate = isDoubleSided ? 50 : 40;
      else rate = isDoubleSided ? 70 : 60;
    } else if (is300) {
      if (selectedUnits >= 21) rate = isDoubleSided ? 30 : 20;
      else if (selectedUnits >= 2) rate = isDoubleSided ? 40 : 30;
      else rate = isDoubleSided ? 60 : 50;
    }
    const subtotal = rate * selectedUnits * quantity;
    const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
    return { unitPrice: rate, subtotal, gstAmount, totalWithGst: subtotal + gstAmount };
  }

  // 13x19 Sticker Sheets
  if (productSlug === "13x19-sticker-sheets") {
    let rate = 30;
    const isNonTearableSticker = selectedFinish.toLowerCase().includes("non-tearable");
    const isRoundCut = selectedFinish.toLowerCase().includes("round");
    const isHalfCut = selectedFinish.toLowerCase().includes("half cut");

    if (isRoundCut) {
      rate = 50;
    } else if (isHalfCut) {
      rate = 20;
    } else if (isNonTearableSticker) {
      if (selectedUnits >= 21) rate = 30;
      else if (selectedUnits >= 2) rate = 40;
      else rate = 50;
    } else {
      // Normal sticker
      if (selectedUnits >= 21) rate = 20;
      else if (selectedUnits >= 2) rate = 30;
      else rate = 50;
    }
    const subtotal = rate * selectedUnits * quantity;
    const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
    return { unitPrice: rate, subtotal, gstAmount, totalWithGst: subtotal + gstAmount };
  }

  // Lanyard Tags
  if (productSlug === "lanyards" || productSlug === "id-cards-lanyards") {
    let rate = 30;
    const width = selectedSize || selectedFinish;
    if (width.includes("20mm")) {
      if (selectedUnits >= 1000) rate = 26;
      else if (selectedUnits >= 500) rate = 30;
      else if (selectedUnits >= 100) rate = 45;
      else rate = 60;
    } else if (width.includes("16mm")) {
      if (selectedUnits >= 1000) rate = 21;
      else if (selectedUnits >= 500) rate = 24;
      else if (selectedUnits >= 100) rate = 35;
      else rate = 50;
    } else if (width.includes("10mm")) {
      if (selectedUnits >= 1000) rate = 18;
      else if (selectedUnits >= 500) rate = 20;
      else if (selectedUnits >= 100) rate = 30;
      else rate = 40;
    } else if (selectedFinish.includes("PVC ID")) {
      rate = 100;
    } else if (selectedFinish.includes("Holder")) {
      rate = 10;
    }
    const subtotal = rate * selectedUnits * quantity;
    const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
    return { unitPrice: rate, subtotal, gstAmount, totalWithGst: subtotal + gstAmount };
  }

  // Button Badges
  if (productSlug === "button-badges") {
    let rate = 12;
    const size = selectedSize || selectedFinish;
    if (size.includes("55mm")) {
      if (selectedUnits >= 1000) rate = 9;
      else if (selectedUnits >= 500) rate = 10;
      else if (selectedUnits >= 100) rate = 12;
      else rate = 15;
    } else if (size.includes("44mm")) {
      if (selectedUnits >= 1000) rate = 8;
      else if (selectedUnits >= 500) rate = 9;
      else if (selectedUnits >= 100) rate = 11;
      else rate = 14;
    } else if (size.includes("70mm")) {
      if (selectedUnits >= 1000) rate = 14;
      else if (selectedUnits >= 500) rate = 15;
      else if (selectedUnits >= 100) rate = 18;
      else rate = 20;
    }
    const subtotal = rate * selectedUnits * quantity;
    const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
    return { unitPrice: rate, subtotal, gstAmount, totalWithGst: subtotal + gstAmount };
  }

  // Lamination
  if (productSlug === "document-lamination") {
    let rate = 30;
    if (selectedSize.includes("A4")) {
      if (selectedUnits >= 1000) rate = 14;
      else if (selectedUnits >= 500) rate = 20;
      else if (selectedUnits >= 100) rate = 30;
      else if (selectedUnits >= 10) rate = 40;
      else rate = 50;
    } else if (selectedSize.includes("A3")) {
      if (selectedUnits >= 1000) rate = 35;
      else if (selectedUnits >= 500) rate = 40;
      else if (selectedUnits >= 100) rate = 60;
      else if (selectedUnits >= 10) rate = 75;
      else rate = 100;
    } else if (selectedSize.includes("A5")) {
      if (selectedUnits >= 1000) rate = 12;
      else if (selectedUnits >= 500) rate = 16;
      else if (selectedUnits >= 100) rate = 20;
      else if (selectedUnits >= 10) rate = 35;
      else rate = 40;
    }
    const subtotal = rate * selectedUnits * quantity;
    const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
    return { unitPrice: rate, subtotal, gstAmount, totalWithGst: subtotal + gstAmount };
  }

  // Banners & Vinyl Stickers
  if (productSlug === "banners-vinyl-stickers") {
    let rate = 30;
    if (selectedFinish.includes("Normal Flex")) {
      if (selectedUnits >= 100) rate = 20;
      else if (selectedUnits >= 50) rate = 30;
      else rate = 50;
    } else if (selectedFinish.includes("Star Flex")) {
      if (selectedUnits >= 100) rate = 40;
      else if (selectedUnits >= 50) rate = 50;
      else rate = 60;
    } else if (selectedFinish.includes("Vinyl")) {
      if (selectedUnits >= 100) rate = 110;
      else if (selectedUnits >= 50) rate = 120;
      else rate = 130;
    }
    const subtotal = rate * selectedUnits * quantity;
    const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
    return { unitPrice: rate, subtotal, gstAmount, totalWithGst: subtotal + gstAmount };
  }

  // Single Color Bill Books
  if (productSlug === "single-color-bill-books") {
    let rate = 200;
    if (selectedSize.includes("A4")) rate = 350;
    else if (selectedSize.includes("A5")) rate = 200;
    else if (selectedSize.includes("1/5th")) rate = 300;
    else if (selectedSize.includes("1/6th")) rate = 280;
    else if (selectedSize.includes("1/16th")) rate = 120;
    const subtotal = rate * selectedUnits * quantity;
    const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
    return { unitPrice: rate, subtotal, gstAmount, totalWithGst: subtotal + gstAmount };
  }

  // Photo Frames
  if (productSlug === "photo-print-with-frame") {
    let rate = 250;
    if (selectedSize.includes("4 X 6")) rate = 250;
    else if (selectedSize.includes("5 X 7")) rate = 300;
    else if (selectedSize.includes("6 X 8")) rate = 350;
    else if (selectedSize.includes("10 X 8")) rate = 650;
    else if (selectedSize.includes("12 X 18")) rate = 1200;
    else if (selectedSize.includes("20 X 30")) rate = 2000;
    const subtotal = rate * selectedUnits * quantity;
    const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
    return { unitPrice: rate, subtotal, gstAmount, totalWithGst: subtotal + gstAmount };
  }

  // Mugs & Magic Mugs
  if (productSlug === "ceramic-magic-mugs") {
    let rate = 300;
    const isMagic = selectedFinish.toLowerCase().includes("magic");
    if (isMagic) {
      rate = selectedUnits >= 10 ? 350 : 550;
    } else {
      rate = selectedUnits >= 50 ? 200 : 300;
    }
    const subtotal = rate * selectedUnits * quantity;
    const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
    return { unitPrice: rate, subtotal, gstAmount, totalWithGst: subtotal + gstAmount };
  }

  // Seals & Stamps
  if (productSlug === "seals-stamps") {
    let rate = 200;
    if (selectedFinish.includes("Round")) rate = 200;
    else if (selectedFinish.includes("Address")) rate = 250;
    else if (selectedFinish.includes("Small")) rate = 450;
    else if (selectedFinish.includes("Medium")) rate = 650;
    else if (selectedFinish.includes("Large")) rate = 750;
    const subtotal = rate * selectedUnits * quantity;
    const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
    return { unitPrice: rate, subtotal, gstAmount, totalWithGst: subtotal + gstAmount };
  }

  // Fallback to simple multiplier for default products
  const estimatedUnitPrice = selectedUnits > 0 ? selectedUnits : 1;
  const subtotal = estimatedUnitPrice * quantity;
  const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
  return {
    unitPrice: estimatedUnitPrice,
    subtotal,
    gstAmount,
    totalWithGst: subtotal + gstAmount,
  };
}
