
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signAuthJwt } from "@/lib/auth";
import { authCookieOptions, AUTH_COOKIE } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email & password required" }, { status: 400 });
    }
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name: name ?? null, passwordHash, role: role === "ADMIN" ? "ADMIN" : "USER" },
    });

    const token = await signAuthJwt({ sub: user.id, email: user.email, role: user.role });
    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, role: user.role } });
    res.cookies.set(AUTH_COOKIE, token, authCookieOptions());
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed to signup" }, { status: 400 });
  }
}
