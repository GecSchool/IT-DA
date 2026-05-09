export const matchQueryKeys = {
  all: ["match"] as const,
  recommendation: (lastDogId?: number) => [...matchQueryKeys.all, "recommendation", lastDogId] as const,
};
