export const adoptionQueryKeys = {
  all: ["adoptions"] as const,
  applicants: () => [...adoptionQueryKeys.all, "applicants"] as const,
  mine: () => [...adoptionQueryKeys.all, "mine"] as const,
};
