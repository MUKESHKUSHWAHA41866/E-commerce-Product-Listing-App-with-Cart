export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MOCK_USER_ID = "user_123";

export async function GET() {
  const cart = await prisma.cart.findFirst({
    where: { userId: MOCK_USER_ID },
    include: { items: true },
  });
  return NextResponse.json(cart ?? { items: [] });
}
