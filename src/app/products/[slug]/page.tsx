import { ProductConfigurator } from "@/components/product-configurator";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
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

function categoryTitle(id: string) {
  return categories.find((c) => c.id === id)?.name ?? id;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-10 pb-8">
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
          {categoryTitle(product.category)}
        </Link>
        <ChevronRight className="h-4 w-4 text-ink-400" aria-hidden />
        <span className="font-medium text-ink-950">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
        <section className="space-y-5">
          <div className="img-frame overflow-hidden p-4 md:p-6">
            <Image
              src={product.image}
              alt={product.name}
              width={1200}
              height={720}
              className="aspect-[4/3] w-full object-contain object-center"
              priority
            />
          </div>
          {product.gallery?.length ? (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {product.gallery.map((src, i) => (
                <div key={src + i} className="img-frame overflow-hidden p-2">
                  <Image src={src} alt="" width={240} height={180} className="aspect-[4/3] w-full object-contain object-center" />
                </div>
              ))}
            </div>
          ) : null}

          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">{categoryTitle(product.category)}</p>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight text-ink-950 md:text-4xl">
              {product.name}
            </h1>
            <p className="text-lg leading-relaxed text-ink-600">{product.description}</p>

            {product.highlights?.length ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-ink-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="flex flex-wrap gap-8 border-y border-ink-100 py-6 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Starting from</p>
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-ink-950">{formatINR(product.basePrice)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Turnaround</p>
                <p className="font-[family-name:var(--font-display)] text-xl font-bold text-ink-950">{product.turnaround}</p>
              </div>
            </div>
          </div>
        </section>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <ProductConfigurator product={product} />
        </aside>
      </div>
    </div>
  );
}
