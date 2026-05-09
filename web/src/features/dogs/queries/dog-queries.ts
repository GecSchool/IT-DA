import { useQuery } from "@tanstack/react-query";

import { dogRepository } from "../services";
import { dogQueryKeys } from "./dog-query-keys";

export function useMyDogsQuery() {
  return useQuery({
    queryKey: dogQueryKeys.mine(),
    queryFn: () => dogRepository.getMyDogs(),
  });
}

export function useRecentDogsQuery(limit?: number) {
  return useQuery({
    queryKey: dogQueryKeys.recent(limit),
    queryFn: () => dogRepository.getRecentDogs(limit),
  });
}

export function useDogDetailQuery(dogId: number) {
  return useQuery({
    queryKey: dogQueryKeys.detail(dogId),
    queryFn: () => dogRepository.getDogDetail(dogId),
  });
}
