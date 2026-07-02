import { requireAdminApi } from "@/lib/cms/api-auth";
import { getProducts, saveProducts } from "@/lib/cms/queries";
import type { Product } from "@/types/product";
import { NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: RouteContext) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;
  const updated = (await request.json()) as Product;
  const products = await getProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  if (products.some((p) => p.slug === updated.slug && p.id !== id)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  products[index] = { ...updated, id };
  await saveProducts(products);
  return NextResponse.json(products[index]);
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;
  const products = await getProducts();
  const next = products.filter((p) => p.id !== id);

  if (next.length === products.length) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  await saveProducts(next);
  return NextResponse.json({ ok: true });
}
