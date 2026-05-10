"use client";

import { useCurrentSessionQuery } from "@/features/auth/queries";

type SessionStatus = "loading" | "authenticated" | "unauthenticated";

export function useSession() {
  const sessionQuery = useCurrentSessionQuery();

  const status: SessionStatus = sessionQuery.isPending
    ? "loading"
    : sessionQuery.data
      ? "authenticated"
      : "unauthenticated";

  return {
    status,
    user: sessionQuery.data ?? null,
    isAuthenticated: status === "authenticated",
    refreshSession: sessionQuery.refetch,
  };
}
