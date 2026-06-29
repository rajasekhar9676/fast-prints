/** Local Fast Prints product & marketing images (public/images/) */
export const storeImages = {
  servicesOverview: "/images/services-overview.png",
  visitingCards: "/images/visiting-cards.png",
  letterheadsAgrya: "/images/letterheads-agrya.png",
  letterheadsCorporate: "/images/letterheads-corporate.png",
  pamphletMulticolor: "/images/pamphlet-multicolor.png",
  pamphletGrocery: "/images/pamphlet-grocery.png",
  pamphletInvitation: "/images/pamphlet-invitation.png",
  photoPrint: "/images/photo-print.png",
  passportPhotos: "/images/passport-photos.png",
  smartKeychains: "/images/smart-keychains.png",
  envelopes: "/images/envelopes.png",
  presentationEnvelopes: "/images/presentation-envelopes.png",
  presentationEnvelopesGift: "/images/presentation-envelopes-gift.png",
  idCards: "/images/id-cards.png",
  idCardLanyardSet: "/images/id-card-lanyard-set.png",
  lanyards: "/images/lanyards.png",
  calendarWall: "/images/calendar-wall.png",
  calendarTabletop: "/images/calendar-tabletop.png",
  receiptBooks: "/images/receipt-books.png",
  invoiceBooks: "/images/invoice-books.png",
  bulkMulticolor: "/images/bulk-multicolor-print.png",
  signageWallMural: "/images/signage-wall-mural.png",
} as const;

export const categoryImages = {
  "business-essentials": storeImages.visitingCards,
  "marketing-materials": storeImages.pamphletMulticolor,
  "large-format": storeImages.signageWallMural,
  packaging: storeImages.presentationEnvelopes,
  apparel: storeImages.servicesOverview,
  "photo-gifts": storeImages.photoPrint,
  stationery: storeImages.receiptBooks,
  events: storeImages.pamphletInvitation,
} as const;

export const heroBanners = [
  {
    href: "/products/visiting-cards",
    label: "Visiting Cards",
    sub: "300gsm texture boards · From ₹499",
    cta: "Design & order",
    image: storeImages.visitingCards,
  },
  {
    href: "/products/photo-print",
    label: "Photo Prints",
    sub: '6"×4" to 12"×18" · Same-day pickup',
    cta: "Print photos",
    image: storeImages.photoPrint,
  },
  {
    href: "/products/wall-signage-printing",
    label: "Signages & Wall Graphics",
    sub: "Indoor & outdoor branding",
    cta: "Get a quote",
    image: storeImages.signageWallMural,
  },
] as const;

export const shopNeedImages = {
  education: storeImages.receiptBooks,
  startup: storeImages.visitingCards,
  events: storeImages.signageWallMural,
  retail: storeImages.pamphletGrocery,
  cafe: storeImages.pamphletGrocery,
  boutique: storeImages.presentationEnvelopesGift,
  wedding: storeImages.pamphletInvitation,
  corporate: storeImages.idCardLanyardSet,
} as const;
