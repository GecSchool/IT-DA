"use client";

import { X } from "lucide-react";

import { useDogImageUploadModal } from "@/features/dogs/hooks/use-dog-image-upload-modal";
import { ImageCropStep } from "@/shared/components/image-uploader/image-crop-step";
import { ImageUploadDropzone } from "@/shared/components/image-uploader/image-upload-dropzone";
import { IconButton, Text } from "@/shared/ui";

type DogImageUploadModalProps = {
  open: boolean;
  maxCount: number;
  currentCount: number;
  onClose: () => void;
  onUpload: (file: File) => Promise<string>;
  onComplete: (imageUrls: string[]) => void;
};

export function DogImageUploadModal({
  open,
  maxCount,
  currentCount,
  onClose,
  onUpload,
  onComplete,
}: DogImageUploadModalProps) {
  const {
    activeDraft,
    remainingCount,
    isUploading,
    errorMessage,
    handleClose,
    handleFilesSelect,
    handleCancelCrop,
    handleApplyCrop,
  } = useDogImageUploadModal({
    maxCount,
    currentCount,
    onClose,
    onUpload,
    onComplete,
  });

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-overlay px-md pt-[160px]">
      <IconButton
        aria-label="사진 업로드 닫기"
        variant="ghost"
        className="fixed right-5 top-6 bg-white/20 text-white hover:bg-white/30"
        disabled={isUploading}
        onClick={handleClose}
      >
        <X className="size-[18px]" aria-hidden />
      </IconButton>

      <div className="flex h-fit w-full max-w-[580px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg">
        <header className="flex h-[69px] items-center justify-center border-b border-border px-lg">
          <Text weight="bold">강아지 사진 추가</Text>
        </header>

        {activeDraft ? (
          <ImageCropStep
            draft={activeDraft}
            aspect="square"
            currentIndex={currentCount}
            totalCount={maxCount}
            isProcessing={isUploading}
            onCancel={handleCancelCrop}
            onApply={handleApplyCrop}
          />
        ) : (
          <div className="p-md">
            <ImageUploadDropzone
              title="강아지 사진을 드래그하거나 클릭해서 업로드하세요"
              description={`최대 ${remainingCount}장 추가 가능 · JPG, PNG, WEBP`}
              buttonLabel="파일 선택"
              disabled={remainingCount <= 0 || isUploading}
              onFilesSelect={handleFilesSelect}
            />
          </div>
        )}

        {errorMessage ? (
          <Text size="sm" color="danger" className="px-md pb-md">
            {errorMessage}
          </Text>
        ) : null}
      </div>
    </div>
  );
}
