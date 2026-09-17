import { ProductConfigurator } from "@/components/product-configurator";
import { categoryLabelFromList, getCategories, getProductBySlug } from "@/lib/cms/queries";
import { formatINR } from "@/lib/currency";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronRight } from "lucide-react";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const [product, categories] = await Promise.all([getProductBySlug(slug), getCategories()]);

  if (!product) {
    notFound();
  }

  const categoryTitle = categoryLabelFromList(categories, product.category);

  return (
    <div className="space-y-6 pb-8">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-600">
        <Link href="/" className="hover:text-ink-950">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 text-ink-400" aria-hidden />
        <Link href="/products" className="hover:text-ink-950">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4 text-ink-400" aria-hidden />
        <Link href={`/products?category=${product.category}`} className="hover:text-ink-950">
          {categoryTitle}
        </Link>
        <ChevronRight className="h-4 w-4 text-ink-400" aria-hidden />
        <span className="font-medium text-ink-950">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="overflow-hidden rounded-2xl border border-ink-100 bg-ink-50 p-4 md:p-6">
          <Image
            src={product.image}
            alt={product.name}
            width={1200}
            height={900}
            className="aspect-square w-full object-contain"
            priority
          />
        </section>

        <section className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-400">{categoryTitle}</p>
          <h1 className="text-2xl font-extrabold leading-tight text-ink-950 md:text-3xl">{product.name}</h1>
          <div className="flex items-end justify-between gap-4">
            <p className="text-2xl font-extrabold text-ink-950">{formatINR(product.basePrice)}</p>
            <p className="text-sm font-semibold text-ink-500">{product.turnaround}</p>
          </div>
          <p className="text-sm leading-relaxed text-ink-600">{product.shortDescription}</p>
          <ProductConfigurator product={product} />
        </section>
      </div>

      <section className="grid gap-6 border-t border-ink-100 pt-6 md:grid-cols-2">
        <div>
          <h2 className="text-sm font-extrabold text-ink-950">Details</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{product.description}</p>
        </div>
        {product.highlights?.length ? (
          <ul className="grid gap-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-ink-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </div>
  );
}
