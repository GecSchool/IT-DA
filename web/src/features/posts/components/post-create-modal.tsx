"use client";

import { ArrowRight, ChevronLeft, X } from "lucide-react";
import type { MouseEvent } from "react";

import { PostCreateFormStep } from "@/features/posts/components/post-create-form-step";
import { PostImagePreviewStep } from "@/features/posts/components/post-image-preview-step";
import { PostImageUploadStep } from "@/features/posts/components/post-image-upload-step";
import { usePostCreateModal } from "@/features/posts/hooks/use-post-create-modal";
import { usePostModalBehavior } from "@/features/posts/hooks/use-post-modal-behavior";
import { ImageCropStep } from "@/shared/components/image-uploader";
import { Button, Divider, IconButton, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

export function PostCreateModal() {
  const postCreate = usePostCreateModal();
  usePostModalBehavior({
    open: true,
    onClose: postCreate.handleClose,
  });

  const submitLabel = postCreate.step === "form" ? "게시" : "다음";
  const canClickPrimary =
    postCreate.step === "preview"
      ? postCreate.images.length > 0
      : postCreate.step === "form"
        ? postCreate.canSubmit
        : false;
  const modalOffsetClass = {
    upload: "pt-[184px]",
    crop: "pt-[120px]",
    preview: "pt-[160px]",
    form: "pt-[200px]",
  }[postCreate.step];

  const handlePrimaryClick = () => {
    if (postCreate.step === "preview") {
      postCreate.handleGoNextForm();
      return;
    }

    if (postCreate.step === "form") {
      void postCreate.handleSubmitPost();
    }
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      void postCreate.handleClose();
    }
  };

  return (
    <div
      className={cn("fixed inset-0 z-50 flex justify-center bg-overlay px-md", modalOffsetClass)}
      onClick={handleOverlayClick}
    >
      <IconButton
        aria-label="게시물 작성 닫기"
        variant="ghost"
        className="fixed right-5 top-6 bg-white/20 text-white hover:bg-white/30"
        onClick={postCreate.handleClose}
      >
        <X className="size-[18px]" aria-hidden />
      </IconButton>

      <div
        className="flex h-fit w-full max-w-[580px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex h-[69px] items-center justify-between gap-xs px-sm sm:gap-md sm:px-lg">
          <div className="flex w-[120px] items-center">
            <IconButton
              aria-label="이전 단계"
              variant="ghost"
              size="sm"
              onClick={postCreate.handleGoBack}
            >
              <ChevronLeft className="size-5" aria-hidden />
            </IconButton>
          </div>
          <Text weight="bold">게시물 작성</Text>
          <div className="flex w-[120px] items-center justify-end">
            <Button
              size="md"
              rightIcon={
                postCreate.step === "form" ? undefined : (
                  <ArrowRight className="size-4" aria-hidden />
                )
              }
              disabled={!canClickPrimary || postCreate.isSubmitting}
              onClick={handlePrimaryClick}
            >
              {postCreate.isSubmitting ? "작성 중" : submitLabel}
            </Button>
          </div>
        </header>
        <Divider />

        {postCreate.step === "upload" ? (
          <PostImageUploadStep onFilesSelect={postCreate.handleFilesSelect} />
        ) : null}

        {postCreate.step === "crop" && postCreate.activeDraft ? (
          <ImageCropStep
            draft={postCreate.activeDraft}
            aspect="portrait"
            currentIndex={postCreate.images.length}
            totalCount={postCreate.images.length + postCreate.cropQueueLength}
            onCancel={postCreate.handleCancelCrop}
            onApply={postCreate.handleApplyCrop}
          />
        ) : null}

        {postCreate.step === "preview" ? (
          <PostImagePreviewStep
            images={postCreate.images}
            currentImage={postCreate.currentImage}
            currentImageIndex={postCreate.currentImageIndex}
            onFilesSelect={postCreate.handleFilesSelect}
            onPrevious={postCreate.handlePreviousImage}
            onNext={postCreate.handleNextImage}
            onRemove={postCreate.handleRemoveCurrentImage}
            maxImageCount={postCreate.maxImageCount}
          />
        ) : null}

        {postCreate.step === "form" ? (
          <PostCreateFormStep
            form={postCreate.form}
            values={postCreate.values}
            fieldErrors={postCreate.fieldErrors}
            dogOptions={postCreate.dogOptions}
            isDogsLoading={postCreate.isDogsLoading}
            isDogsError={postCreate.isDogsError}
            submitErrorMessage={postCreate.submitErrorMessage}
            onDogChange={postCreate.handleDogChange}
            onSubmit={postCreate.handleSubmitPost}
          />
        ) : null}
      </div>
    </div>
  );
}
