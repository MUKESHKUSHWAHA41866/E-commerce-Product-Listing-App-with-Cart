import { cookies } from "next/headers";
import { verifyAuthJwt, type JWTPayload } from "./auth";

export const AUTH_COOKIE = "auth_token";

export async function getCurrentUser(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return await verifyAuthJwt(token);
}

export function authCookieOptions() {
  return {
    name: AUTH_COOKIE,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}
