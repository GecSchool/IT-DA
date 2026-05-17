"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { useDogPostsQuery } from "@/features/posts/queries";

export function useDogPostGridSection(dogId: number) {
  const router = useRouter();
  const dogPostsQuery = useDogPostsQuery(dogId, 12);
  const posts = useMemo(
    () => dogPostsQuery.data?.pages.flatMap((page) => page.posts) ?? [],
    [dogPostsQuery.data]
  );

  const handleViewPost = (postId: number) => {
    router.push(`/posts/${postId}`, { scroll: false });
  };

  return {
    posts,
    isLoading: dogPostsQuery.isLoading,
    isError: dogPostsQuery.isError,
    hasNextPage: dogPostsQuery.hasNextPage,
    isFetchingNextPage: dogPostsQuery.isFetchingNextPage,
    fetchNextPage: dogPostsQuery.fetchNextPage,
    handleViewPost,
  };
}
