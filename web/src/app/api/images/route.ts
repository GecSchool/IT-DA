import { NextResponse } from "next/server";

import { verifyAccessToken } from "@/shared/lib/auth";
import { createS3ImageStorageFromEnv, type ImageDomain } from "@/shared/lib/image-storage";

export const runtime = "nodejs";

const imageDomains = ["dog", "post"] satisfies ImageDomain[];

const isImageDomain = (value: FormDataEntryValue | null): value is ImageDomain =>
  typeof value === "string" && imageDomains.includes(value as ImageDomain);

const isStringArray = (value: unknown[]): value is string[] =>
  value.every((item) => typeof item === "string");

const getAuthorizationHeader = (request: Request) => request.headers.get("authorization");

const createUnauthorizedResponse = () =>
  NextResponse.json({ message: "authorization is required" }, { status: 401 });

export async function POST(request: Request) {
  const authorization = getAuthorizationHeader(request);

  if (!authorization) {
    return createUnauthorizedResponse();
  }

  if (!verifyAccessToken(authorization).ok) {
    return createUnauthorizedResponse();
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const domain = formData.get("domain");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "file is required" }, { status: 400 });
  }

  if (!isImageDomain(domain)) {
    return NextResponse.json({ message: "domain must be dog or post" }, { status: 400 });
  }

  const imageStorage = createS3ImageStorageFromEnv();
  const uploadedImage = await imageStorage.upload(file, { domain });

  return NextResponse.json(uploadedImage);
}

export async function DELETE(request: Request) {
  const authorization = getAuthorizationHeader(request);

  if (!authorization) {
    return createUnauthorizedResponse();
  }

  if (!verifyAccessToken(authorization).ok) {
    return createUnauthorizedResponse();
  }

  const body = await request.json().catch(() => null);
  const imageUrls: unknown[] = Array.isArray(body?.imageUrls) ? body.imageUrls : [];

  if (!isStringArray(imageUrls)) {
    return NextResponse.json({ message: "imageUrls must be string[]" }, { status: 400 });
  }

  const imageStorage = createS3ImageStorageFromEnv();
  await imageStorage.deleteMany(imageUrls);

  return NextResponse.json({ ok: true });
}
