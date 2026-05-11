"use client";

import { useRouter } from "next/navigation";

import { useDeleteDogMutation, useDogDetailQuery } from "@/features/dogs/queries";
import type { DogDetail } from "@/features/dogs/types/dog";

export type DogDetailViewerMode = "owner" | "adopter";

export function useDogDetailSection(dogId: number) {
  const router = useRouter();
  const dogDetailQuery = useDogDetailQuery(dogId);
  const deleteDogMutation = useDeleteDogMutation();
  const dog = dogDetailQuery.data;
  const viewerMode: DogDetailViewerMode = dog?.isMine ? "owner" : "adopter";

  const handleViewApplicants = () => {
    router.push(`/adoptions?dogId=${dogId}`);
  };

  const handleViewAdoption = () => {
    router.push("/adoptions");
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
    isDeleting: deleteDogMutation.isPending,
    handleViewApplicants,
    handleViewAdoption,
    handleEditDog,
    handleDeleteDog,
  };
}

export function getDogDetailViewerMode(dog: DogDetail): DogDetailViewerMode {
  return dog.isMine ? "owner" : "adopter";
}
