export type ShopNeed = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
};

export const shopByNeeds: ShopNeed[] = [
  {
    id: "education",
    title: "Education & Campus",
    description: "Prospectuses, thesis binding, certificates & event posters.",
    href: "/products?category=stationery",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "startup",
    title: "Startup Branding",
    description: "Cards, flyers, roll-ups & merchandise for launch-ready teams.",
    href: "/products?category=business-essentials",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "events",
    title: "Events & Promotions",
    description: "Banners, standees & branded tees for activations.",
    href: "/products?category=large-format",
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "retail",
    title: "Retail & Packaging",
    description: "Boxes, labels & POS signage that sells on the shelf.",
    href: "/products?category=packaging",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=80",
  },
];
