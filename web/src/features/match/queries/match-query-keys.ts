export const matchQueryKeys = {
  all: ["match"] as const,
  recommendation: (lastDogId?: number) => [...matchQueryKeys.all, "recommendation", lastDogId] as const,
  recentLogs: (limit?: number) => [...matchQueryKeys.all, "recent-logs", limit] as const,
};
