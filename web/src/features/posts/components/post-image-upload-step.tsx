"use client";

import { ImageUploadDropzone } from "@/shared/components/image-uploader";

type PostImageUploadStepProps = {
  onFilesSelect: (files: File[]) => void;
};

export function PostImageUploadStep({ onFilesSelect }: PostImageUploadStepProps) {
  return (
    <div className="p-md">
      <ImageUploadDropzone
        title="사진을 드래그하거나 클릭해서 업로드하세요"
        description="최대 5장 · JPG, PNG, WEBP"
        buttonLabel="파일 선택"
        onFilesSelect={onFilesSelect}
      />
    </div>
  );
}
