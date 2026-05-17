"use client";

import { useState } from "react";

type UsePostImageCarouselParams = {
  imageUrls: string[];
};

export function usePostImageCarousel({ imageUrls }: UsePostImageCarouselParams) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImageCount = imageUrls.length;
  const hasMultipleImages = totalImageCount > 1;
  const currentImageUrl = imageUrls[currentImageIndex] ?? imageUrls[0] ?? "";

  const handlePreviousImage = () => {
    if (!hasMultipleImages) {
      return;
    }

    setCurrentImageIndex((current) => (current === 0 ? totalImageCount - 1 : current - 1));
  };

  const handleNextImage = () => {
    if (!hasMultipleImages) {
      return;
    }

    setCurrentImageIndex((current) => (current + 1) % totalImageCount);
  };

  return {
    currentImageIndex,
    currentImageUrl,
    totalImageCount,
    hasMultipleImages,
    handlePreviousImage,
    handleNextImage,
  };
}
