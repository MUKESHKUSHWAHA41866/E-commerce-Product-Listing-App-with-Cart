import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, "", { path: "/", httpOnly: true, maxAge: 0 });
  return res;
}
