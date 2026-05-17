"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useFeedInfiniteScroll } from "@/features/posts/hooks/use-feed-infinite-scroll";
import { useFeedPostsQuery } from "@/features/posts/queries";

export function useFeedSection() {
  const router = useRouter();
  const feedPostsQuery = useFeedPostsQuery(5);
  const posts = useMemo(
    () => feedPostsQuery.data?.pages.flatMap((page) => page.posts) ?? [],
    [feedPostsQuery.data]
  );

  const handleViewDog = (dogId: number) => {
    router.push(`/dogs/${dogId}`);
  };

  const handleViewPost = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  const handleLoadMorePosts = useCallback(() => {
    if (feedPostsQuery.hasNextPage && !feedPostsQuery.isFetchingNextPage) {
      feedPostsQuery.fetchNextPage();
    }
  }, [feedPostsQuery]);
  const { loadMoreRef } = useFeedInfiniteScroll({
    enabled: Boolean(feedPostsQuery.hasNextPage),
    isFetching: feedPostsQuery.isFetchingNextPage,
    onLoadMore: handleLoadMorePosts,
  });

  return {
    posts,
    isLoading: feedPostsQuery.isLoading,
    isError: feedPostsQuery.isError,
    hasNextPage: feedPostsQuery.hasNextPage,
    isFetchingNextPage: feedPostsQuery.isFetchingNextPage,
    loadMoreRef,
    handleViewDog,
    handleViewPost,
  };
}
