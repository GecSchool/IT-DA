export const authQueryKeys = {
  all: ["auth"] as const,
  session: () => [...authQueryKeys.all, "session"] as const,
  profile: () => [...authQueryKeys.all, "profile"] as const,
  nickname: (nickname: string) => [...authQueryKeys.all, "nickname", nickname] as const,
};
