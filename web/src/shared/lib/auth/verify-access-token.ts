import { createHmac, timingSafeEqual } from "crypto";

type AccessTokenPayload = {
  sub?: string;
  userId?: number;
  exp?: number;
  nbf?: number;
  iss?: string;
  aud?: string | string[];
};

type VerifyAccessTokenResult =
  | {
      ok: true;
      payload: AccessTokenPayload;
    }
  | {
      ok: false;
    };

const getRequiredEnv = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is required`);
  }

  return value;
};

const decodeBase64Url = (value: string) =>
  Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");

const encodeBase64Url = (value: Buffer) =>
  value.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");

const parseJsonPart = (value: string): Record<string, unknown> | null => {
  try {
    const parsedValue: unknown = JSON.parse(decodeBase64Url(value));

    if (!parsedValue || typeof parsedValue !== "object" || Array.isArray(parsedValue)) {
      return null;
    }

    return parsedValue as Record<string, unknown>;
  } catch {
    return null;
  }
};

const parseBearerToken = (authorization: string) => {
  const [type, token] = authorization.split(" ");

  if (type !== "Bearer" || !token) {
    return null;
  }

  return token;
};

const isValidSignature = (signedValue: string, signature: string, secret: string) => {
  const expectedSignature = encodeBase64Url(createHmac("sha256", secret).update(signedValue).digest());
  const expectedBuffer = Buffer.from(expectedSignature);
  const signatureBuffer = Buffer.from(signature);

  return (
    expectedBuffer.length === signatureBuffer.length &&
    timingSafeEqual(expectedBuffer, signatureBuffer)
  );
};

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const toAccessTokenPayload = (payload: Record<string, unknown>): AccessTokenPayload | null => {
  const accessTokenPayload: AccessTokenPayload = {};

  if (typeof payload.sub === "string") {
    accessTokenPayload.sub = payload.sub;
  }

  if (typeof payload.userId === "number") {
    accessTokenPayload.userId = payload.userId;
  }

  if (typeof payload.exp === "number") {
    accessTokenPayload.exp = payload.exp;
  }

  if (typeof payload.nbf === "number") {
    accessTokenPayload.nbf = payload.nbf;
  }

  if (typeof payload.iss === "string") {
    accessTokenPayload.iss = payload.iss;
  }

  if (typeof payload.aud === "string" || isStringArray(payload.aud)) {
    accessTokenPayload.aud = payload.aud;
  }

  return accessTokenPayload.sub || accessTokenPayload.userId ? accessTokenPayload : null;
};

const isValidTimeClaims = (payload: AccessTokenPayload) => {
  const now = Math.floor(Date.now() / 1000);

  if (typeof payload.exp === "number" && payload.exp <= now) {
    return false;
  }

  if (typeof payload.nbf === "number" && payload.nbf > now) {
    return false;
  }

  return true;
};

export function verifyAccessToken(authorization: string): VerifyAccessTokenResult {
  const token = parseBearerToken(authorization);

  if (!token) {
    return { ok: false };
  }

  const [encodedHeader, encodedPayload, signature] = token.split(".");

  if (!encodedHeader || !encodedPayload || !signature) {
    return { ok: false };
  }

  const header = parseJsonPart(encodedHeader);
  const payload = parseJsonPart(encodedPayload);

  if (!header || !payload || header.alg !== "HS256") {
    return { ok: false };
  }

  const secret = getRequiredEnv("JWT_SECRET");
  const signedValue = `${encodedHeader}.${encodedPayload}`;

  if (!isValidSignature(signedValue, signature, secret)) {
    return { ok: false };
  }

  const accessTokenPayload = toAccessTokenPayload(payload);

  if (!accessTokenPayload || !isValidTimeClaims(accessTokenPayload)) {
    return { ok: false };
  }

  return {
    ok: true,
    payload: accessTokenPayload,
  };
}
