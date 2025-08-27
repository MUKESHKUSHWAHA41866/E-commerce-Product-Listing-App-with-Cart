export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cartAddSchema } from "@/lib/validations";

const MOCK_USER_ID = "user_123";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, quantity } = cartAddSchema.parse(body);

    let cart = await prisma.cart.findFirst({ where: { userId: MOCK_USER_ID } });
    if (!cart) cart = await prisma.cart.create({ data: { userId: MOCK_USER_ID } });

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    const item = await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity, price: product.price },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
