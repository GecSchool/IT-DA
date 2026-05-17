"use client";

import { ImageUp } from "lucide-react";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

import { cn } from "@/shared/lib/cn";
import { Button, Text } from "@/shared/ui";

type ImageUploadDropzoneProps = {
  title: string;
  description: string;
  buttonLabel?: string;
  multiple?: boolean;
  disabled?: boolean;
  onFilesSelect: (files: File[]) => void;
};

export function ImageUploadDropzone({
  title,
  description,
  buttonLabel = "사진 선택",
  multiple = true,
  disabled = false,
  onFilesSelect,
}: ImageUploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const openFilePicker = () => {
    if (disabled) {
      return;
    }

    inputRef.current?.click();
  };

  const handleFiles = (fileList: FileList | null) => {
    const files = Array.from(fileList ?? []).filter((file) => file.type.startsWith("image/"));

    if (files.length > 0) {
      onFilesSelect(files);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
    event.target.value = "";
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) {
      return;
    }

    handleFiles(event.dataTransfer.files);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        "flex h-80 w-full cursor-pointer flex-col items-center justify-center gap-md rounded-lg bg-card text-center outline-none transition-colors",
        isDragging && "bg-muted",
        disabled && "pointer-events-none opacity-60"
      )}
      onClick={openFilePicker}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openFilePicker();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        disabled={disabled}
        onChange={handleInputChange}
      />
      <ImageUp className="size-10 text-muted-foreground" aria-hidden />
      <div className="flex flex-col items-center gap-1">
        <Text weight="semibold">{title}</Text>
        <Text size="sm" color="muted">
          {description}
        </Text>
      </div>
      <Button variant="outline" disabled={disabled}>
        {buttonLabel}
      </Button>
    </div>
  );
}
