"use client";

import { useRouter } from "next/navigation";

import { useRecentMatchLogsQuery } from "@/features/match/queries";

export function useRecentMatchPanel() {
  const router = useRouter();
  const recentMatchLogsQuery = useRecentMatchLogsQuery(3);

  const handleGoAdopt = () => {
    router.push("/match");
  };

  const handleViewDog = (dogId: number) => {
    router.push(`/dogs/${dogId}`);
  };

  return {
    recentMatchLogs: recentMatchLogsQuery.data ?? [],
    isLoading: recentMatchLogsQuery.isLoading,
    isError: recentMatchLogsQuery.isError,
    handleGoAdopt,
    handleViewDog,
  };
}
