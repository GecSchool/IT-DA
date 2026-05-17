"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCreateAdoptionMutation } from "@/features/adoptions/queries";
import type { AdoptionApplicationFormValues } from "@/features/adoptions/types/adoption-application-form";
import { useMatchRecommendationQuery } from "@/features/match/queries";

export function useMatchDetailPage() {
  const router = useRouter();
  const [lastDogId, setLastDogId] = useState<number>();
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [appliedDogIds, setAppliedDogIds] = useState<Set<number>>(() => new Set());
  const recommendationQuery = useMatchRecommendationQuery(lastDogId);
  const createAdoptionMutation = useCreateAdoptionMutation();
  const recommendation = recommendationQuery.data;
  const isCurrentDogApplied = recommendation ? appliedDogIds.has(recommendation.dogId) : false;

  const handleOpenApplicationModal = () => {
    setIsApplicationModalOpen(true);
  };

  const handleCloseApplicationModal = () => {
    if (createAdoptionMutation.isPending) {
      return;
    }

    setIsApplicationModalOpen(false);
  };

  const handleNextRecommendation = () => {
    if (!recommendation || recommendationQuery.isFetching) {
      return;
    }

    setLastDogId(recommendation.dogId);
  };

  const handleViewPost = (postId: number) => {
    router.push(`/posts/${postId}`, { scroll: false });
  };

  const handleSubmitApplication = async (values: AdoptionApplicationFormValues) => {
    if (!recommendation) {
      return;
    }

    await createAdoptionMutation.mutateAsync({
      dogId: recommendation.dogId,
      introduction: values.introduction,
    });
    setAppliedDogIds((current) => new Set(current).add(recommendation.dogId));
    setIsApplicationModalOpen(false);
  };

  return {
    recommendation,
    isLoading: recommendationQuery.isLoading,
    isFetching: recommendationQuery.isFetching,
    isError: recommendationQuery.isError,
    isApplicationModalOpen,
    isApplying: createAdoptionMutation.isPending,
    isCurrentDogApplied,
    handleNextRecommendation,
    handleViewPost,
    handleOpenApplicationModal,
    handleCloseApplicationModal,
    handleSubmitApplication,
  };
}
