import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productUpdateSchema } from "@/lib/validations";
import { Prisma } from "@prisma/client";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: true },
  });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const data = productUpdateSchema.parse(body);
    if (data.price !== undefined) (data as any).price = new Prisma.Decimal(data.price);
    const updated = await prisma.product.update({ where: { id: params.id }, data: data as any });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
