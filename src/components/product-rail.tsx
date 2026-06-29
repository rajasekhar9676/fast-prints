import type { Product } from "@/types/product";
import { SectionHeader } from "@/components/section-header";
import { CompactProductCard } from "@/components/compact-product-card";

type ProductRailProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  products: Product[];
  seeAllHref?: string;
  accent?: "default" | "express" | "dark";
};

export function ProductRail({
  title,
  subtitle,
  eyebrow,
  products,
  seeAllHref = "/products",
  accent = "default",
}: ProductRailProps) {
  if (products.length === 0) return null;

  const panelClass =
    accent === "express" ? "panel-express" : accent === "dark" ? "panel-dark" : "panel-light";

  return (
    <section className={`${panelClass} px-5 py-7 md:px-8 md:py-9`}>
      <SectionHeader
        eyebrow={eyebrow ?? (accent === "express" ? "⚡ Express" : undefined)}
        title={title}
        subtitle={subtitle}
        seeAllHref={seeAllHref}
        dark={accent === "dark"}
      />
      <div className="scrollbar-thin -mx-1 flex gap-4 overflow-x-auto px-1 pb-2">
        {products.map((product) => (
          <CompactProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
