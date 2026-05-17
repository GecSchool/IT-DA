"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { useMyDogsQuery } from "@/features/dogs/queries";
import { usePostImageUpload } from "@/features/posts/hooks/use-post-image-upload";
import { useCreatePostMutation } from "@/features/posts/queries";
import {
  postCreateFormSchema,
  type PostCreateFormValues,
} from "@/features/posts/types/post-create-form";

type PostCreateStep = "upload" | "crop" | "preview" | "form";
const MAX_POST_IMAGE_COUNT = 5;

export function usePostCreateModal() {
  const router = useRouter();
  const myDogsQuery = useMyDogsQuery();
  const createPostMutation = useCreatePostMutation();
  const imageUpload = usePostImageUpload(MAX_POST_IMAGE_COUNT);
  const [step, setStep] = useState<PostCreateStep>("upload");
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  const form = useForm<PostCreateFormValues, unknown, PostCreateFormValues>({
    resolver: zodResolver(postCreateFormSchema),
    defaultValues: {
      dogId: 0,
      caption: "",
    },
    mode: "onChange",
  });
  const values = useWatch({ control: form.control });

  const dogOptions = useMemo(
    () =>
      (myDogsQuery.data ?? []).map((dog) => ({
        value: String(dog.dogId),
        label: dog.name,
        disabled: dog.status === "ADOPTED",
      })),
    [myDogsQuery.data]
  );

  const hasImages = imageUpload.images.length > 0;
  const isSubmitting = createPostMutation.isPending;
  const canSubmit = form.formState.isValid && hasImages && !isSubmitting;
  const fieldErrors = {
    dogId: form.formState.errors.dogId?.message,
    caption: form.formState.errors.caption?.message,
  };

  const handleClose = async () => {
    await imageUpload.cleanupUploadedImages();
    router.back();
  };

  const handleFilesSelect = (files: File[]) => {
    if (files.length === 0) {
      return;
    }

    setSubmitErrorMessage(null);
    imageUpload.handleFilesSelect(files);
    setStep("crop");
  };

  const handleCancelCrop = () => {
    imageUpload.handleCancelCrop();
    setStep(imageUpload.images.length > 0 ? "preview" : "upload");
  };

  const handleApplyCrop = async (croppedFile: File, croppedPreviewUrl: string) => {
    try {
      setSubmitErrorMessage(null);
      await imageUpload.handleApplyCrop(croppedFile, croppedPreviewUrl);

      if (imageUpload.cropQueueLength <= 1) {
        setStep("preview");
      }
    } catch {
      setSubmitErrorMessage("사진을 업로드하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleRemoveCurrentImage = () => {
    const nextImageCount = imageUpload.images.length - 1;
    imageUpload.handleRemoveCurrentImage();

    if (nextImageCount <= 0) {
      setStep("upload");
    }
  };

  const handleGoBack = () => {
    if (step === "form") {
      setStep("preview");
      return;
    }

    if (step === "crop") {
      handleCancelCrop();
      return;
    }

    void handleClose();
  };

  const handleGoNextForm = () => {
    if (imageUpload.images.length > 0) {
      setStep("form");
    }
  };

  const handleDogChange = (value: string) => {
    form.setValue("dogId", Number(value), { shouldDirty: true, shouldValidate: true });
  };

  const handleSubmitPost = form.handleSubmit(async (formValues) => {
    try {
      setSubmitErrorMessage(null);
      const imageUrls = imageUpload.uploadedImageUrls;

      await createPostMutation.mutateAsync({
        dogId: formValues.dogId,
        caption: formValues.caption,
        imageUrls,
      });

      router.push(`/dogs/${formValues.dogId}`);
    } catch {
      await imageUpload.cleanupUploadedImages();
      setSubmitErrorMessage("게시물을 작성하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  });

  return {
    step,
    form,
    values,
    fieldErrors,
    dogOptions,
    isDogsLoading: myDogsQuery.isLoading,
    isDogsError: myDogsQuery.isError,
    activeDraft: imageUpload.activeDraft,
    cropQueueLength: imageUpload.cropQueueLength,
    maxImageCount: MAX_POST_IMAGE_COUNT,
    images: imageUpload.images,
    currentImage: imageUpload.currentImage,
    currentImageIndex: imageUpload.currentImageIndex,
    submitErrorMessage,
    canSubmit,
    isSubmitting,
    handleClose,
    handleGoBack,
    handleFilesSelect,
    handleCancelCrop,
    handleApplyCrop,
    handlePreviousImage: imageUpload.handlePreviousImage,
    handleNextImage: imageUpload.handleNextImage,
    handleRemoveCurrentImage,
    handleGoNextForm,
    handleDogChange,
    handleSubmitPost,
  };
}
