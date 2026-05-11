"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { cn } from "@/shared/lib/cn";
import { IconButton, PhotoTile } from "@/shared/ui";

type DogDetailPhotoCarouselProps = {
  imageUrls: string[];
  dogName: string;
};

export function DogDetailPhotoCarousel({ imageUrls, dogName }: DogDetailPhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = imageUrls.slice(0, 3);
  const currentImageUrl = images[currentIndex];
  const hasMultipleImages = images.length > 1;

  const goPrevious = () => {
    setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const goNext = () => {
    setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  return (
    <div className="group relative w-full max-w-full shrink-0 overflow-hidden rounded-lg sm:max-w-[330px]">
      <PhotoTile src={currentImageUrl} alt={`${dogName} 사진`} aspect="square" />

      {hasMultipleImages ? (
        <>
          <IconButton
            aria-label="이전 사진"
            size="sm"
            variant="outline"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/90 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
            onClick={goPrevious}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </IconButton>
          <IconButton
            aria-label="다음 사진"
            size="sm"
            variant="outline"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/90 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
            onClick={goNext}
          >
            <ChevronRight className="size-4" aria-hidden />
          </IconButton>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-xs">
            {images.map((imageUrl, index) => (
              <button
                key={`${imageUrl}-${index}`}
                type="button"
                aria-label={`${index + 1}번째 사진 보기`}
                className={cn(
                  "size-1.5 rounded-pill bg-card/80 transition-colors",
                  currentIndex === index && "w-4 bg-primary"
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
