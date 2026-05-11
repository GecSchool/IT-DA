"use client";

import { useMemo } from "react";

import { useDogPostsQuery } from "@/features/posts/queries";

export function useDogPostGridSection(dogId: number) {
  const dogPostsQuery = useDogPostsQuery(dogId, 12);
  const posts = useMemo(
    () => dogPostsQuery.data?.pages.flatMap((page) => page.posts) ?? [],
    [dogPostsQuery.data]
  );

  return {
    posts,
    isLoading: dogPostsQuery.isLoading,
    isError: dogPostsQuery.isError,
    hasNextPage: dogPostsQuery.hasNextPage,
    isFetchingNextPage: dogPostsQuery.isFetchingNextPage,
    fetchNextPage: dogPostsQuery.fetchNextPage,
  };
}
