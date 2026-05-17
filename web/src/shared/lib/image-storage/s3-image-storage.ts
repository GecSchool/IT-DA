import {
  DeleteObjectsCommand,
  type ObjectIdentifier,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import type { ImageDomain, ImageStorage, ImageUploadOptions } from "./image-storage";

type S3ImageStorageConfig = {
  region: string;
  bucketName: string;
  cloudfrontUrl: string;
  accessKeyId: string;
  secretAccessKey: string;
};

const imageDomainPrefix: Record<ImageDomain, string> = {
  dog: "dog",
  post: "post",
};

const getRequiredEnv = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is required`);
  }

  return value;
};

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const getFileExtension = (file: File) => {
  const extensionFromName = file.name.split(".").pop()?.toLowerCase();

  if (extensionFromName) {
    return extensionFromName;
  }

  return file.type.split("/").pop() || "jpg";
};

const createS3Key = (file: File, options: ImageUploadOptions) => {
  const now = new Date();
  const year = String(now.getUTCFullYear());
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const id = crypto.randomUUID();
  const extension = getFileExtension(file);

  return `${imageDomainPrefix[options.domain]}/${year}/${month}/${id}.${extension}`;
};

const createCloudfrontUrl = (cloudfrontUrl: string, key: string) =>
  `${trimTrailingSlash(cloudfrontUrl)}/${key}`;

const parseS3KeyFromImageUrl = (imageUrl: string, cloudfrontUrl: string) => {
  const normalizedCloudfrontUrl = trimTrailingSlash(cloudfrontUrl);

  if (!imageUrl.startsWith(`${normalizedCloudfrontUrl}/`)) {
    return null;
  }

  return decodeURIComponent(imageUrl.slice(normalizedCloudfrontUrl.length + 1));
};

export function createS3ImageStorage(config: S3ImageStorageConfig): ImageStorage {
  const client = new S3Client({
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  return {
    async upload(file, options) {
      const key = createS3Key(file, options);
      const body = Buffer.from(await file.arrayBuffer());

      await client.send(
        new PutObjectCommand({
          Bucket: config.bucketName,
          Key: key,
          Body: body,
          ContentType: file.type || "application/octet-stream",
        })
      );

      return {
        imageUrl: createCloudfrontUrl(config.cloudfrontUrl, key),
      };
    },

    async deleteMany(imageUrls) {
      const objects = imageUrls
        .map((imageUrl): ObjectIdentifier | null => {
          const key = parseS3KeyFromImageUrl(imageUrl, config.cloudfrontUrl);

          return key ? { Key: key } : null;
        })
        .filter((object): object is ObjectIdentifier => Boolean(object));

      if (objects.length === 0) {
        return;
      }

      await client.send(
        new DeleteObjectsCommand({
          Bucket: config.bucketName,
          Delete: {
            Objects: objects,
            Quiet: true,
          },
        })
      );
    },
  };
}

export function createS3ImageStorageFromEnv() {
  return createS3ImageStorage({
    region: getRequiredEnv("AWS_REGION"),
    accessKeyId: getRequiredEnv("AWS_ACCESS_KEY_ID"),
    secretAccessKey: getRequiredEnv("AWS_SECRET_ACCESS_KEY"),
    bucketName: getRequiredEnv("AWS_S3_BUCKET_NAME"),
    cloudfrontUrl: getRequiredEnv("AWS_CLOUDFRONT_URL"),
  });
}
