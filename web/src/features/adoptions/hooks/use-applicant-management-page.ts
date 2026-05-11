"use client";

import { useMemo } from "react";

import { useUpdateAdoptionStatusMutation } from "@/features/adoptions/queries/adoption-mutations";
import { useApplicantsQuery } from "@/features/adoptions/queries/adoption-queries";
import type { AdoptionStatusUpdate } from "@/features/adoptions/types/adoption";

type UseApplicantManagementPageParams = {
  selectedDogName: string;
  allFilterValue: string;
};

export function useApplicantManagementPage({
  selectedDogName,
  allFilterValue,
}: UseApplicantManagementPageParams) {
  const applicantsQuery = useApplicantsQuery();
  const updateStatusMutation = useUpdateAdoptionStatusMutation();
  const applicants = useMemo(() => applicantsQuery.data ?? [], [applicantsQuery.data]);
  const dogNames = useMemo(
    () => Array.from(new Set(applicants.map((applicant) => applicant.dogName))),
    [applicants]
  );
  const filteredApplicants = useMemo(() => {
    if (selectedDogName === allFilterValue) {
      return applicants;
    }

    return applicants.filter((applicant) => applicant.dogName === selectedDogName);
  }, [allFilterValue, applicants, selectedDogName]);

  const handleUpdateStatus = (adoptionId: number, status: AdoptionStatusUpdate) => {
    updateStatusMutation.mutate({ adoptionId, status });
  };

  return {
    applicants: filteredApplicants,
    applicantCount: applicants.length,
    dogNames,
    isLoading: applicantsQuery.isLoading,
    isError: applicantsQuery.isError,
    isUpdating: updateStatusMutation.isPending,
    handleUpdateStatus,
  };
}
