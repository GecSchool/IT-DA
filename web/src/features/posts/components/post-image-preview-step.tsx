"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useRef } from "react";

import type { UploadImageItem } from "@/shared/components/image-uploader";
import { ImageUploadDropzone } from "@/shared/components/image-uploader";
import { cn } from "@/shared/lib/cn";
import { IconButton } from "@/shared/ui";

type PostImagePreviewStepProps = {
  images: UploadImageItem[];
  currentImage?: UploadImageItem;
  currentImageIndex: number;
  maxImageCount: number;
  onFilesSelect: (files: File[]) => void;
  onPrevious: () => void;
  onNext: () => void;
  onRemove: () => void;
};

export function PostImagePreviewStep({
  images,
  currentImage,
  currentImageIndex,
  maxImageCount,
  onFilesSelect,
  onPrevious,
  onNext,
  onRemove,
}: PostImagePreviewStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasMultipleImages = images.length > 1;
  const canAddImage = images.length < maxImageCount;

  if (!currentImage) {
    return (
      <ImageUploadDropzone
        title="사진을 추가해주세요"
        description="게시물에 사용할 사진을 선택하세요."
        onFilesSelect={onFilesSelect}
      />
    );
  }

  return (
    <div className="flex flex-col gap-sm p-md">
      <div className="group relative h-[400px] overflow-hidden rounded-lg bg-muted">
        <Image
          src={currentImage.croppedPreviewUrl}
          alt="게시물 사진 미리보기"
          fill
          className="object-cover"
          unoptimized
        />
        <IconButton
          aria-label="현재 사진 삭제"
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 size-7 bg-black/40 text-white hover:bg-black/55"
          onClick={onRemove}
        >
          <X className="size-4" aria-hidden />
        </IconButton>

        {hasMultipleImages ? (
          <>
            <IconButton
              aria-label="이전 사진"
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 bg-card/80 opacity-0 transition-opacity -translate-y-1/2 group-hover:opacity-100 group-focus-within:opacity-100"
              onClick={onPrevious}
            >
              <ChevronLeft className="size-5" aria-hidden />
            </IconButton>
            <IconButton
              aria-label="다음 사진"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 bg-card/80 opacity-0 transition-opacity -translate-y-1/2 group-hover:opacity-100 group-focus-within:opacity-100"
              onClick={onNext}
            >
              <ChevronRight className="size-5" aria-hidden />
            </IconButton>
          </>
        ) : null}

        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {images.map((image, index) => (
            <span
              key={image.id}
              className={cn(
                "rounded-pill",
                index === currentImageIndex ? "size-2 bg-primary" : "size-1.5 bg-muted"
              )}
            />
          ))}
          {canAddImage ? (
            <button
              type="button"
              aria-label="사진 추가"
              className="flex size-5 items-center justify-center rounded-pill bg-muted text-muted-foreground"
              onClick={() => fileInputRef.current?.click()}
            >
              <Plus className="size-3" aria-hidden />
            </button>
          ) : null}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={!canAddImage}
          onChange={(event) => {
            onFilesSelect(Array.from(event.target.files ?? []));
            event.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
