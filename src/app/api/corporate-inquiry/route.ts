import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

type CorporateInquiryPayload = {
  name: string;
  phone: string;
  email: string;
  company?: string;
  product: string;
  quantity: string;
  notes?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as CorporateInquiryPayload;

  if (!body.name || !body.phone || !body.email || !body.product || !body.quantity) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  await prisma.corporateInquiry.create({
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email,
      company: body.company,
      product: body.product,
      quantity: body.quantity,
      notes: body.notes,
    },
  });

  return NextResponse.json({ ok: true });
}
