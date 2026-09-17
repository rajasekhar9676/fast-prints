import { BarChart3, Building2, Gift, Users } from "lucide-react";

export const corporateFeatures = [
  {
    title: "Bulk quote & MOQ",
    body: "Share quantity and specs — we respond with volume pricing, proofs, and a clear timeline. No checkout pressure.",
  },
  {
    title: "Brand consistency",
    body: "Matched colours across visiting cards, letterheads, envelopes, and campaign print for one brand look.",
  },
  {
    title: "Artwork support",
    body: "Upload print-ready files or brief our desk. We review bleed, resolution, and colour before production.",
  },
  {
    title: "ID & onboarding kits",
    body: "Employee ID cards, lanyards, and welcome packs — ideal for HR teams and new joiner batches.",
  },
  {
    title: "Campaign print",
    body: "Pamphlets, standees, and event collateral with flexible quantities for marketing and field teams.",
  },
  {
    title: "Dedicated follow-up",
    body: "A named contact from our BTM team — phone, WhatsApp, and email until delivery is confirmed.",
  },
] as const;

export const corporateSolutions = [
  {
    icon: Users,
    title: "HR & admin",
    body: "ID kits, letterheads, and onboarding stationery for growing teams.",
  },
  {
    icon: BarChart3,
    title: "Marketing",
    body: "Pamphlets, signage, and launch print with volume-friendly pricing.",
  },
  {
    icon: Building2,
    title: "Offices & retail",
    body: "Consistent brand touchpoints across branches and store fronts.",
  },
  {
    icon: Gift,
    title: "Events & gifting",
    body: "Custom envelopes, calendars, and branded collateral for milestones.",
  },
] as const;
