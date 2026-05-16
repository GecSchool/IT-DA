import { useMutation, useQueryClient } from "@tanstack/react-query";

import { adoptionRepository } from "../services";
import type { AdoptionApplicant, AdoptionStatusUpdate } from "../types/adoption";
import type { AdoptionUpdatePayload } from "../types/adoption-payload";
import type { DogDetail } from "@/features/dogs/types/dog";
import { dogQueryKeys } from "@/features/dogs/queries/dog-query-keys";
import { adoptionQueryKeys } from "./adoption-query-keys";

type UpdateAdoptionStatusVariables = {
  adoptionId: number;
  status: AdoptionStatusUpdate;
};

type UpdateAdoptionVariables = {
  adoptionId: number;
  payload: AdoptionUpdatePayload;
};

export function useCreateAdoptionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adoptionRepository.createAdoption,
    onSuccess: ({ adoptionId }, payload) => {
      queryClient.invalidateQueries({ queryKey: adoptionQueryKeys.mine() });
      queryClient.setQueryData<DogDetail>(dogQueryKeys.detail(payload.dogId), (current) =>
        current
          ? {
              ...current,
              viewerAdoption: {
                adoptionId,
                status: "PENDING",
              },
            }
          : current
      );
      queryClient.invalidateQueries({ queryKey: dogQueryKeys.detail(payload.dogId) });
    },
  });
}

export function useUpdateAdoptionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adoptionId, payload }: UpdateAdoptionVariables) =>
      adoptionRepository.updateAdoption(adoptionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adoptionQueryKeys.mine() });
    },
  });
}

export function useDeleteAdoptionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adoptionId: number) => adoptionRepository.deleteAdoption(adoptionId),
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
