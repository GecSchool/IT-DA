"use client";

import { useEffect, useRef, useState } from "react";

import type { ImageCropDraft } from "@/shared/components/image-uploader/types";

type UseDogImageUploadModalParams = {
  maxCount: number;
  currentCount: number;
  onClose: () => void;
  onUpload: (file: File) => Promise<string>;
  onComplete: (imageUrls: string[]) => void;
};

const createImageDrafts = (files: File[]): ImageCropDraft[] =>
  files.map((file) => ({
    id: crypto.randomUUID(),
    file,
    previewUrl: URL.createObjectURL(file),
  }));

export function useDogImageUploadModal({
  maxCount,
  currentCount,
  onClose,
  onUpload,
  onComplete,
}: UseDogImageUploadModalParams) {
  const [cropQueue, setCropQueue] = useState<ImageCropDraft[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const cropQueueRef = useRef<ImageCropDraft[]>([]);
  const activeDraft = cropQueue[0];
  const remainingCount = Math.max(0, maxCount - currentCount);

  useEffect(() => {
    cropQueueRef.current = cropQueue;
  }, [cropQueue]);

  useEffect(
    () => () => {
      cropQueueRef.current.forEach((draft) => URL.revokeObjectURL(draft.previewUrl));
    },
    []
  );

  const resetModal = () => {
    cropQueue.forEach((draft) => URL.revokeObjectURL(draft.previewUrl));
    setCropQueue([]);
    setErrorMessage(null);
    setIsUploading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleFilesSelect = (files: File[]) => {
    const nextFiles = files.slice(0, remainingCount);

    if (nextFiles.length === 0) {
      return;
    }

    setErrorMessage(null);
    setCropQueue(createImageDrafts(nextFiles));
  };

  const handleCancelCrop = () => {
    cropQueue.forEach((draft) => URL.revokeObjectURL(draft.previewUrl));
    setCropQueue([]);
  };

  const handleApplyCrop = async (croppedFile: File, croppedPreviewUrl: string) => {
    if (!activeDraft) {
      return;
    }

    try {
      setIsUploading(true);
      setErrorMessage(null);
      const imageUrl = await onUpload(croppedFile);
      URL.revokeObjectURL(activeDraft.previewUrl);
      URL.revokeObjectURL(croppedPreviewUrl);

      const [, ...rest] = cropQueue;
      setCropQueue(rest);
      onComplete([imageUrl]);

      if (rest.length === 0) {
        resetModal();
        onClose();
      }
    } catch {
      URL.revokeObjectURL(croppedPreviewUrl);
      setErrorMessage("사진을 업로드하지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    activeDraft,
    remainingCount,
    isUploading,
    errorMessage,
    handleClose,
    handleFilesSelect,
    handleCancelCrop,
    handleApplyCrop,
  };
}
