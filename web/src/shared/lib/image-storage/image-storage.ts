export type ImageDomain = "dog" | "post";

export type ImageUploadOptions = {
  domain: ImageDomain;
};

export type ImageUploadResult = {
  imageUrl: string;
};

export interface ImageStorage {
  upload(file: File, options: ImageUploadOptions): Promise<ImageUploadResult>;
  deleteMany(imageUrls: string[]): Promise<void>;
}
