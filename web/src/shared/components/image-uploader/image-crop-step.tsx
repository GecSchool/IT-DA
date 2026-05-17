"use client";

import Cropper, { type Area, type Point } from "react-easy-crop";
import { useCallback, useState } from "react";

import { getCroppedImageFile } from "@/shared/components/image-uploader/crop-image";
import {
  imageUploadAspectRatios,
  type ImageCropDraft,
  type ImageUploadAspect,
} from "@/shared/components/image-uploader/types";
import { Button, Text } from "@/shared/ui";

type ImageCropStepProps = {
  draft: ImageCropDraft;
  aspect: ImageUploadAspect;
  currentIndex: number;
  totalCount: number;
  isProcessing?: boolean;
  onCancel: () => void;
  onApply: (file: File, previewUrl: string) => void;
};

export function ImageCropStep({
  draft,
  aspect,
  currentIndex,
  totalCount,
  isProcessing = false,
  onCancel,
  onApply,
}: ImageCropStepProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleApply = async () => {
    if (!croppedAreaPixels) {
      return;
    }

    const croppedFile = await getCroppedImageFile(
      draft.previewUrl,
      croppedAreaPixels,
      draft.file.name,
      draft.file.type
    );
    const croppedPreviewUrl = URL.createObjectURL(croppedFile);
    onApply(croppedFile, croppedPreviewUrl);
  };

  return (
    <div className="flex flex-col gap-md p-md">
      <div className="flex items-center justify-between gap-md">
        <div>
          <Text weight="semibold">사진 자르기</Text>
          <Text size="sm" color="muted">
            {currentIndex + 1} / {totalCount} · 세로형 3:4 비율
          </Text>
        </div>
        <Text size="sm" color="muted">
          확대 후 위치를 조정하세요
        </Text>
      </div>

      <div className="relative h-[400px] overflow-hidden rounded-lg bg-black">
        <Cropper
          image={draft.previewUrl}
          crop={crop}
          zoom={zoom}
          aspect={imageUploadAspectRatios[aspect]}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>

      <label className="flex items-center gap-md">
        <Text as="span" size="sm" color="muted" className="w-12">
          확대
        </Text>
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          className="w-full accent-primary"
          onChange={(event) => setZoom(Number(event.target.value))}
        />
      </label>

      <div className="flex justify-end gap-sm">
        <Button variant="outline" onClick={onCancel} disabled={isProcessing}>
          다시 선택
        </Button>
        <Button onClick={handleApply} disabled={isProcessing || !croppedAreaPixels}>
          적용
        </Button>
      </div>
    </div>
  );
}
