"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "@/features/auth/hooks/use-session";
import { useFeedInfiniteScroll } from "@/features/posts/hooks/use-feed-infinite-scroll";
import { useDeletePostMutation, useFeedPostsQuery } from "@/features/posts/queries";

export function useFeedSection() {
  const router = useRouter();
  const { user } = useSession();
  const feedPostsQuery = useFeedPostsQuery(5);
  const deletePostMutation = useDeletePostMutation();
  const posts = useMemo(
    () => feedPostsQuery.data?.pages.flatMap((page) => page.posts) ?? [],
    [feedPostsQuery.data]
  );

  const handleViewDog = (dogId: number) => {
    router.push(`/dogs/${dogId}`);
  };

  const handleViewPost = (postId: number, options?: { focusComment?: boolean }) => {
    const focusCommentParam = options?.focusComment ? "?focusComment=true" : "";

    router.push(`/posts/${postId}${focusCommentParam}`, { scroll: false });
  };

  const handleDeletePost = (postId: number) => {
    if (!window.confirm("게시물을 삭제할까요?")) {
      return;
    }

    deletePostMutation.mutate(postId);
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
    currentUserId: user?.userId ?? null,
    isDeletingPost: deletePostMutation.isPending,
    hasNextPage: feedPostsQuery.hasNextPage,
    isFetchingNextPage: feedPostsQuery.isFetchingNextPage,
    loadMoreRef,
    handleViewDog,
    handleViewPost,
    handleDeletePost,
  };
}
