export const dogQueryKeys = {
  all: ["dogs"] as const,
  mine: () => [...dogQueryKeys.all, "mine"] as const,
  recent: (limit?: number) => [...dogQueryKeys.all, "recent", limit] as const,
  detail: (dogId: number) => [...dogQueryKeys.all, "detail", dogId] as const,
};
