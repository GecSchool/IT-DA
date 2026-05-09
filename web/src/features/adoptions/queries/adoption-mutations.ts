import { useMutation, useQueryClient } from "@tanstack/react-query";

import { adoptionRepository } from "../services";
import type { AdoptionApplicant, AdoptionStatusUpdate } from "../types/adoption";
import { adoptionQueryKeys } from "./adoption-query-keys";

type UpdateAdoptionStatusVariables = {
  adoptionId: number;
  status: AdoptionStatusUpdate;
};

export function useCreateAdoptionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adoptionRepository.createAdoption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adoptionQueryKeys.mine() });
    },
  });
}

export function useUpdateAdoptionStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adoptionId, status }: UpdateAdoptionStatusVariables) =>
      adoptionRepository.updateAdoptionStatus(adoptionId, status),
    onMutate: async ({ adoptionId, status }) => {
      await queryClient.cancelQueries({ queryKey: adoptionQueryKeys.applicants() });

      const previousApplicants = queryClient.getQueryData<AdoptionApplicant[]>(
        adoptionQueryKeys.applicants()
      );

      queryClient.setQueryData<AdoptionApplicant[]>(adoptionQueryKeys.applicants(), (current) =>
        current?.map((applicant) =>
          applicant.adoptionId === adoptionId
            ? {
                ...applicant,
                status,
                contactInfo:
                  status === "ACCEPTED" ? { email: "adopter@example.com" } : applicant.contactInfo,
              }
            : applicant
        )
      );

      return { previousApplicants };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousApplicants) {
        queryClient.setQueryData(adoptionQueryKeys.applicants(), context.previousApplicants);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: adoptionQueryKeys.applicants() });
      queryClient.invalidateQueries({ queryKey: adoptionQueryKeys.mine() });
    },
  });
}
