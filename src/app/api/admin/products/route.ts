import { requireAdminApi } from "@/lib/cms/api-auth";
import { getProducts, saveProducts } from "@/lib/cms/queries";
import type { Product } from "@/types/product";
import { NextResponse } from "next/server";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const product = (await request.json()) as Product;
  const products = await getProducts();

  if (products.some((p) => p.slug === product.slug)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  products.push(product);
  await saveProducts(products);
  return NextResponse.json(product, { status: 201 });
}
