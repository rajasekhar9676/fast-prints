export type HeroBanner = {
  id: string;
  href: string;
  label: string;
  sub: string;
  cta: string;
  image: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type PerkItem = {
  id: string;
  label: string;
  sub: string;
  /** Tailwind gradient classes e.g. from-amber-400 to-brand-500 */
  gradient: string;
};

export type HowItWorksStep = {
  id: string;
  step: string;
  title: string;
  body: string;
  icon: string;
};

export type PromiseItem = {
  id: string;
  title: string;
  body: string;
  icon: string;
};

export type ShopNeedItem = {
  id: string;
  title: string;
  href: string;
  image: string;
};

export type BudgetRangeItem = {
  id: string;
  label: string;
  range: string;
  sub: string;
  tone: string;
};

export type PrintMachine = {
  id: string;
  name: string;
  tag: string;
  description: string;
  specs: string[];
  image: string;
};

export type FacilityStat = {
  id: string;
  value: string;
  label: string;
};

export type BrandShowcaseContent = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  services: string[];
};

export type PrintFacilityContent = {
  eyebrow: string;
  title: string;
  body: string;
  overviewImage: string;
  stats: FacilityStat[];
  machines: PrintMachine[];
};

export type HomepageContent = {
  heroBanners: HeroBanner[];
  perks: PerkItem[];
  howItWorks: HowItWorksStep[];
  promises: PromiseItem[];
  faqs: FaqItem[];
  shopNeeds: ShopNeedItem[];
  budgetRanges: BudgetRangeItem[];
  facility: PrintFacilityContent;
  brandShowcase: BrandShowcaseContent;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company?: string;
  location: string;
  rating: number;
  text: string;
  product?: string;
  featured?: boolean;
};

export type TestimonialsContent = {
  stats: {
    averageRating: number;
    totalReviews: string;
    repeatCustomers: string;
    yearsServing: string;
  };
  items: Testimonial[];
};

export type CorporateFeature = {
  id: string;
  title: string;
  body: string;
};

export type CorporateSolution = {
  id: string;
  title: string;
  body: string;
  icon: string;
};

export type CorporateContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroBody: string;
  heroImage: string;
  features: CorporateFeature[];
  solutions: CorporateSolution[];
};
