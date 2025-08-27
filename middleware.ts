import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuthJwt } from "./src/lib/auth";

const ADMIN_ONLY_PREFIX = "/admin";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith(ADMIN_ONLY_PREFIX)) {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      const url = new URL("/login", req.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    const payload = await verifyAuthJwt(token);
    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// Apply to all /admin/* routes
export const config = {
  matcher: ["/admin/:path*"],
};
