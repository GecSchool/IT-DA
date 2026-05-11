"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import {
  useDeleteAdoptionMutation,
  useMyAdoptionsQuery,
  useUpdateAdoptionMutation,
} from "@/features/adoptions/queries";
import type { AdoptionHistoryFilter } from "@/features/adoptions/hooks/use-adoption-history-filter";
import type { AdoptionStatus } from "@/features/adoptions/types/adoption";
import type { AdoptionApplicationFormValues } from "@/features/adoptions/types/adoption-application-form";

const filterLabels: Record<AdoptionHistoryFilter, string> = {
  ALL: "전체",
  PENDING: "검토 중",
  ACCEPTED: "수락",
  REJECTED: "거절",
};

type UseAdoptionHistoryPageParams = {
  selectedStatus: AdoptionHistoryFilter;
};

export function useAdoptionHistoryPage({ selectedStatus }: UseAdoptionHistoryPageParams) {
  const router = useRouter();
  const myAdoptionsQuery = useMyAdoptionsQuery();
  const updateAdoptionMutation = useUpdateAdoptionMutation();
  const deleteAdoptionMutation = useDeleteAdoptionMutation();
  const adoptions = useMemo(() => myAdoptionsQuery.data ?? [], [myAdoptionsQuery.data]);
  const countsByStatus = useMemo(
    () =>
      adoptions.reduce(
        (counts, adoption) => ({
          ...counts,
          [adoption.status]: (counts[adoption.status] ?? 0) + 1,
        }),
        {} as Partial<Record<AdoptionStatus, number>>
      ),
    [adoptions]
  );
  const filterOptions = useMemo(
    () =>
      (["ALL", "PENDING", "ACCEPTED", "REJECTED"] as AdoptionHistoryFilter[]).map((status) => ({
        value: status,
        label: `${filterLabels[status]} ${
          status === "ALL" ? adoptions.length : (countsByStatus[status] ?? 0)
        }`,
      })),
    [adoptions.length, countsByStatus]
  );
  const filteredAdoptions = useMemo(
    () =>
      selectedStatus === "ALL"
        ? adoptions
        : adoptions.filter((adoption) => adoption.status === selectedStatus),
    [adoptions, selectedStatus]
  );

  const handleViewDogProfile = (dogId: number) => {
    router.push(`/dogs/${dogId}`);
  };

  const handleUpdateAdoption = (adoptionId: number, values: AdoptionApplicationFormValues) => {
    return updateAdoptionMutation.mutateAsync({
      adoptionId,
      payload: {
        introduction: values.introduction,
      },
    });
  };

  const handleDeleteAdoption = (adoptionId: number) => {
    return deleteAdoptionMutation.mutateAsync(adoptionId);
  };

  return {
    adoptions: filteredAdoptions,
    filterOptions,
    isLoading: myAdoptionsQuery.isLoading,
    isError: myAdoptionsQuery.isError,
    isUpdating: updateAdoptionMutation.isPending,
    isDeleting: deleteAdoptionMutation.isPending,
    handleViewDogProfile,
    handleUpdateAdoption,
    handleDeleteAdoption,
  };
}
