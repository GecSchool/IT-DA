"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCreateAdoptionMutation } from "@/features/adoptions/queries";
import type { AdoptionApplicationFormValues } from "@/features/adoptions/types/adoption-application-form";
import { useDeleteDogMutation, useDogDetailQuery } from "@/features/dogs/queries";
import type { DogDetail } from "@/features/dogs/types/dog";

export type DogDetailViewerMode = "owner" | "adopter";

export function useDogDetailSection(dogId: number) {
  const router = useRouter();
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const dogDetailQuery = useDogDetailQuery(dogId);
  const createAdoptionMutation = useCreateAdoptionMutation();
  const deleteDogMutation = useDeleteDogMutation();
  const dog = dogDetailQuery.data;
  const viewerMode: DogDetailViewerMode = dog?.isMine ? "owner" : "adopter";

  const handleViewApplicants = () => {
    router.push(`/adoptions?dogId=${dogId}`);
  };

  const handleViewAdoption = () => {
    router.push("/adoptions");
  };

  const handleOpenApplicationModal = () => {
    setIsApplicationModalOpen(true);
  };

  const handleCloseApplicationModal = () => {
    if (createAdoptionMutation.isPending) {
      return;
    }

    setIsApplicationModalOpen(false);
  };

  const handleSubmitApplication = async (values: AdoptionApplicationFormValues) => {
    await createAdoptionMutation.mutateAsync({
      dogId,
      introduction: values.introduction,
    });
    setIsApplicationModalOpen(false);
  };

  const handleEditDog = () => {
    router.push(`/dogs/${dogId}/edit`);
  };

  const handleDeleteDog = () => {
    if (!window.confirm("강아지 공고를 삭제할까요?")) {
      return;
    }

    deleteDogMutation.mutate(dogId, {
      onSuccess: () => {
        router.push("/dogs");
      },
    });
  };

  return {
    dog,
    viewerMode,
    isLoading: dogDetailQuery.isLoading,
    isError: dogDetailQuery.isError,
    isApplicationModalOpen,
    isApplying: createAdoptionMutation.isPending,
    isDeleting: deleteDogMutation.isPending,
    handleViewApplicants,
    handleViewAdoption,
    handleOpenApplicationModal,
    handleCloseApplicationModal,
    handleSubmitApplication,
    handleEditDog,
    handleDeleteDog,
  };
}

export function getDogDetailViewerMode(dog: DogDetail): DogDetailViewerMode {
  return dog.isMine ? "owner" : "adopter";
}
