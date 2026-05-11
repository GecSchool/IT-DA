"use client";

import { useRouter } from "next/navigation";

import { useUpdateAdoptionStatusMutation } from "@/features/adoptions/queries/adoption-mutations";
import { useApplicantsQuery } from "@/features/adoptions/queries/adoption-queries";
import type { AdoptionStatusUpdate } from "@/features/adoptions/types/adoption";

export function useApplicantListSection() {
  const router = useRouter();
  const applicantsQuery = useApplicantsQuery();
  const updateStatusMutation = useUpdateAdoptionStatusMutation();

  const handleUpdateStatus = (adoptionId: number, status: AdoptionStatusUpdate) => {
    updateStatusMutation.mutate({ adoptionId, status });
  };

  const handleViewAll = () => {
    router.push("/dogs/applicants");
  };

  return {
    applicants: applicantsQuery.data ?? [],
    applicantCount: applicantsQuery.data?.length ?? 0,
    isLoading: applicantsQuery.isLoading,
    isError: applicantsQuery.isError,
    isUpdating: updateStatusMutation.isPending,
    handleViewAll,
    handleUpdateStatus,
  };
}
