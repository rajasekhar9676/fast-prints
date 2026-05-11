import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Fast Prints Bengaluru | Printing, Signage & Merchandise",
    template: "%s · Fast Prints Bengaluru",
  },
  description:
    "FAST PRINTS Bengaluru — business cards, brochures, banners, apparel, packaging & more. Visit BTM 2nd Stage or order online with fast turnaround.",
  keywords: [
    "printing Bengaluru",
    "BTM Layout printing",
    "business cards Bangalore",
    "banners vinyl",
    "digital printing",
    "Fast Prints",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink-900">
        <CartProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6 md:py-12">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
