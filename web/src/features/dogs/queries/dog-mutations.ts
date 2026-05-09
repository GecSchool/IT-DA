import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { DogDetail, MyDogSummary } from "../types/dog";
import type { DogFormPayload } from "../types/dog-payload";
import { dogRepository } from "../services";
import { dogQueryKeys } from "./dog-query-keys";

type UpdateDogVariables = {
  dogId: number;
  payload: DogFormPayload;
};

export function useCreateDogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dogRepository.createDog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dogQueryKeys.all });
    },
  });
}

export function useUpdateDogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dogId, payload }: UpdateDogVariables) => dogRepository.updateDog(dogId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: dogQueryKeys.detail(variables.dogId) });
      queryClient.invalidateQueries({ queryKey: dogQueryKeys.all });
    },
  });
}

export function useCompleteDogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dogRepository.completeDog,
    onMutate: async (dogId: number) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: dogQueryKeys.detail(dogId) }),
        queryClient.cancelQueries({ queryKey: dogQueryKeys.mine() }),
      ]);

      const previousDetail = queryClient.getQueryData<DogDetail>(dogQueryKeys.detail(dogId));
      const previousMine = queryClient.getQueryData<MyDogSummary[]>(dogQueryKeys.mine());

      queryClient.setQueryData<DogDetail>(dogQueryKeys.detail(dogId), (current) =>
        current ? { ...current, status: "ADOPTED" } : current
      );
      queryClient.setQueryData<MyDogSummary[]>(dogQueryKeys.mine(), (current) =>
        current?.map((dog) => (dog.dogId === dogId ? { ...dog, status: "ADOPTED" } : dog))
      );

      return { previousDetail, previousMine };
    },
    onError: (_error, dogId, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(dogQueryKeys.detail(dogId), context.previousDetail);
      }

      if (context?.previousMine) {
        queryClient.setQueryData(dogQueryKeys.mine(), context.previousMine);
      }
    },
    onSettled: (_data, _error, dogId) => {
      queryClient.invalidateQueries({ queryKey: dogQueryKeys.detail(dogId) });
      queryClient.invalidateQueries({ queryKey: dogQueryKeys.all });
    },
  });
}

export function useDeleteDogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dogRepository.deleteDog,
    onSuccess: (_data, dogId) => {
      queryClient.removeQueries({ queryKey: dogQueryKeys.detail(dogId) });
      queryClient.invalidateQueries({ queryKey: dogQueryKeys.all });
    },
  });
}
