import { jwtVerify, SignJWT } from "jose";
import type { Role } from "@prisma/client";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export type JWTPayload = {
  sub: string;           // user id
  email: string;
  role: Role;
};

export async function signAuthJwt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAuthJwt(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}
