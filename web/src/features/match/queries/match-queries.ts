import { useQuery } from "@tanstack/react-query";

import { matchRepository } from "../services";
import { matchQueryKeys } from "./match-query-keys";

export function useMatchRecommendationQuery(lastDogId?: number) {
  return useQuery({
    queryKey: matchQueryKeys.recommendation(lastDogId),
    queryFn: () => matchRepository.getRecommendation(lastDogId),
  });
}

export function useRecentMatchLogsQuery(limit = 3) {
  return useQuery({
    queryKey: matchQueryKeys.recentLogs(limit),
    queryFn: () => matchRepository.getRecentMatchLogs(limit),
  });
}
