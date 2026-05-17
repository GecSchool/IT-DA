export type ImageUploadAspect = "square" | "portrait";

export type UploadImageStatus = "cropping" | "ready" | "uploading" | "uploaded" | "failed";

export type UploadImageItem = {
  id: string;
  sourceFile: File;
  sourcePreviewUrl: string;
  croppedFile: File;
  croppedPreviewUrl: string;
  uploadedUrl?: string;
  status: UploadImageStatus;
};

export type ImageCropDraft = {
  id: string;
  file: File;
  previewUrl: string;
};

export const imageUploadAspectRatios: Record<ImageUploadAspect, number> = {
  square: 1,
  portrait: 3 / 4,
};
