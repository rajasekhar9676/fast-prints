import { NextResponse } from "next/server";
import { readCmsJson, writeCmsJson } from "@/lib/cms/store";

type CorporateInquiry = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  company?: string;
  product: string;
  quantity: string;
  notes?: string;
};

const FILE = "corporate-inquiries.json";

export async function POST(request: Request) {
  const body = (await request.json()) as Omit<CorporateInquiry, "id" | "createdAt">;

  if (!body.name || !body.phone || !body.email || !body.product || !body.quantity) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  const inquiry: CorporateInquiry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...body,
  };

  const existing = (await readCmsJson<CorporateInquiry[]>(FILE)) ?? [];
  existing.unshift(inquiry);
  await writeCmsJson(FILE, existing);

  return NextResponse.json({ ok: true });
}
