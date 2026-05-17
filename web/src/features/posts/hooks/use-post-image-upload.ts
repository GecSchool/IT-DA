"use client";

import { useEffect, useRef, useState } from "react";

import type { ImageCropDraft, UploadImageItem } from "@/shared/components/image-uploader";
import { deleteImages, uploadImage } from "@/shared/lib/image-upload";
import { getUnusedUploadedImageUrls } from "@/shared/lib/image-list";

const createImageDrafts = (files: File[]): ImageCropDraft[] =>
  files.map((file) => ({
    id: crypto.randomUUID(),
    file,
    previewUrl: URL.createObjectURL(file),
  }));

export function usePostImageUpload(maxImageCount: number) {
  const [cropQueue, setCropQueue] = useState<ImageCropDraft[]>([]);
  const [images, setImages] = useState<UploadImageItem[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cropQueueRef = useRef<ImageCropDraft[]>([]);
  const imagesRef = useRef<UploadImageItem[]>([]);
  const activeDraft = cropQueue[0];
  const currentImage = images[currentImageIndex];
  const uploadedImageUrls = images.flatMap((image) => (image.uploadedUrl ? [image.uploadedUrl] : []));

  useEffect(() => {
    cropQueueRef.current = cropQueue;
  }, [cropQueue]);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(
    () => () => {
      cropQueueRef.current.forEach((draft) => URL.revokeObjectURL(draft.previewUrl));
      imagesRef.current.forEach((image) => {
        URL.revokeObjectURL(image.sourcePreviewUrl);
        URL.revokeObjectURL(image.croppedPreviewUrl);
      });
    },
    []
  );

  const handleFilesSelect = (files: File[]) => {
    if (files.length === 0) {
      return;
    }

    const remainingCount = maxImageCount - images.length - cropQueue.length;
    const nextFiles = files.slice(0, remainingCount);

    if (nextFiles.length === 0) {
      return;
    }

    setCropQueue(createImageDrafts(nextFiles));
  };

  const handleCancelCrop = () => {
    cropQueue.forEach((draft) => URL.revokeObjectURL(draft.previewUrl));
    setCropQueue([]);
  };

  const handleApplyCrop = async (croppedFile: File, croppedPreviewUrl: string) => {
    if (!activeDraft) {
      return null;
    }

    const { imageUrl } = await uploadImage(croppedFile, { domain: "post" });

    setImages((currentImages) => [
      ...currentImages,
      {
        id: activeDraft.id,
        sourceFile: activeDraft.file,
        sourcePreviewUrl: activeDraft.previewUrl,
        croppedFile,
        croppedPreviewUrl,
        uploadedUrl: imageUrl,
        status: "uploaded",
      },
    ]);

    const [, ...rest] = cropQueue;
    setCropQueue(rest);

    if (rest.length === 0) {
      setCurrentImageIndex(images.length);
    }

    return imageUrl;
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  const handleRemoveCurrentImage = () => {
    if (!currentImage) {
      return;
    }

    URL.revokeObjectURL(currentImage.sourcePreviewUrl);
    URL.revokeObjectURL(currentImage.croppedPreviewUrl);

    const nextImages = images.filter((image) => image.id !== currentImage.id);
    setImages(nextImages);
    setCurrentImageIndex(Math.max(0, Math.min(currentImageIndex, nextImages.length - 1)));
  };

  const cleanupUploadedImages = async (finalImageUrls: string[] = []) => {
    await deleteImages(getUnusedUploadedImageUrls(uploadedImageUrls, finalImageUrls)).catch(() => null);
  };

  return {
    cropQueue,
    activeDraft,
    cropQueueLength: cropQueue.length,
    images,
    currentImage,
    currentImageIndex,
    uploadedImageUrls,
    handleFilesSelect,
    handleCancelCrop,
    handleApplyCrop,
    handlePreviousImage,
    handleNextImage,
    handleRemoveCurrentImage,
    cleanupUploadedImages,
  };
}
