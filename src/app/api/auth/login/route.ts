// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import { signAuthJwt } from "@/lib/auth";
// import { authCookieOptions, AUTH_COOKIE } from "@/lib/session";

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();
//     if (!email || !password) return NextResponse.json({ error: "Email & password required" }, { status: 400 });

//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

//     const ok = await bcrypt.compare(password, user.passwordHash);
//     if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

//     const token = await signAuthJwt({ sub: user.id, email: user.email, role: user.role });
//     const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, role: user.role } });
//     res.cookies.set(AUTH_COOKIE, token, authCookieOptions());
//     return res;
//   } catch (e: any) {
//     return NextResponse.json({ error: e?.message ?? "Failed to login" }, { status: 400 });
//   }
// }



// src/app/api/auth/login/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signAuthJwt } from "@/lib/auth";
import { AUTH_COOKIE, authCookieOptions } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email & password required" }, { status: 400 });
    }

    // prisma MUST be defined here; if not, the runtime or import is wrong
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = await signAuthJwt({ sub: user.id, email: user.email, role: user.role });

    const res = NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, role: user.role },
    });
    res.cookies.set(AUTH_COOKIE, token, authCookieOptions());
    return res;
  } catch (e: any) {
    console.error("LOGIN ERROR:", e);
    return NextResponse.json({ error: e?.message ?? "Failed to login" }, { status: 500 });
  }
}

