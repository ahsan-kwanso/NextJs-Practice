"use server";

// imports
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
// helpers
import { createAPIError } from "../helpers";
// types, constants, config
import { CONFIG } from "../config";
import { SessionPayload } from "../types/auth";
import {
  SESSION_EXPIRATION_TIME,
  COOKIE_NAME_KEY,
  FORBIDDEN_MESSAGE,
  JWT_ALGORITHM,
} from "@/constants";

const encodedKey = new TextEncoder().encode(CONFIG.SECRET_KEY);

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME_KEY, session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return session;
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(SESSION_EXPIRATION_TIME)
    .sign(encodedKey);
}

export async function decrypt(session: string = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: [JWT_ALGORITHM],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session", error);
    throw createAPIError({
      statusCode: HttpStatusCode.Unauthorized, // 401
      message: FORBIDDEN_MESSAGE,
    });
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME_KEY);
}
