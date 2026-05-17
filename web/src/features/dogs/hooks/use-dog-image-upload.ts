"use client";

import { useState } from "react";

import { deleteImages, uploadImage } from "@/shared/lib/image-upload";

export function useDogImageUpload() {
  const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const handleOpenImageUploadModal = () => {
    setIsImageUploadModalOpen(true);
  };

  const handleCloseImageUploadModal = () => {
    setIsImageUploadModalOpen(false);
  };

  const handleUploadImage = async (file: File) => {
    const { imageUrl } = await uploadImage(file, { domain: "dog" });
    setUploadedImageUrls((currentImageUrls) => [...currentImageUrls, imageUrl]);

    return imageUrl;
  };

  const cleanupUploadedImages = async (finalImageUrls: string[] = []) => {
    const cleanupImageUrls = uploadedImageUrls.filter(
      (imageUrl) => !finalImageUrls.includes(imageUrl)
    );

    await deleteImages(cleanupImageUrls).catch(() => null);
  };

  return {
    isImageUploadModalOpen,
    uploadedImageUrls,
    handleOpenImageUploadModal,
    handleCloseImageUploadModal,
    handleUploadImage,
    cleanupUploadedImages,
  };
}
