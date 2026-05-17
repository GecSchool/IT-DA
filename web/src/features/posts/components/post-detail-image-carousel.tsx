"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { usePostImageCarousel } from "@/features/posts/hooks/use-post-image-carousel";
import { IconButton, PhotoTile, Text } from "@/shared/ui";

type PostDetailImageCarouselProps = {
  imageUrls: string[];
  alt: string;
};

export function PostDetailImageCarousel({ imageUrls, alt }: PostDetailImageCarouselProps) {
  const carousel = usePostImageCarousel({ imageUrls });

  return (
    <div className="group relative h-full w-full">
      <PhotoTile
        src={carousel.currentImageUrl}
        alt={alt}
        aspect="portrait"
        className="h-full rounded-none"
      />

      {carousel.hasMultipleImages ? (
        <>
          <IconButton
            aria-label="이전 사진"
            size="sm"
            variant="ghost"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/25 text-white opacity-90 hover:bg-black/35 md:opacity-0 md:group-hover:opacity-100"
            onClick={carousel.handlePreviousImage}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </IconButton>
          <IconButton
            aria-label="다음 사진"
            size="sm"
            variant="ghost"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/25 text-white opacity-90 hover:bg-black/35 md:opacity-0 md:group-hover:opacity-100"
            onClick={carousel.handleNextImage}
          >
            <ChevronRight className="size-5" aria-hidden />
          </IconButton>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center rounded-pill bg-black/35 px-sm py-xs">
            <Text size="xs" weight="semibold" className="text-white">
              {carousel.currentImageIndex + 1} / {carousel.totalImageCount}
            </Text>
          </div>
        </>
      ) : null}
    </div>
  );
}
