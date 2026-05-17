"use client";

import { FeedPostList } from "@/features/posts/components/feed-post-list";
import { useFeedSection } from "@/features/posts/hooks/use-feed-section";
import { cn } from "@/shared/lib/cn";

type FeedSectionProps = {
  className?: string;
};

export function FeedSection({ className }: FeedSectionProps) {
  const {
    posts,
    isLoading,
    isError,
    currentUserId,
    isDeletingPost,
    hasNextPage,
    isFetchingNextPage,
    loadMoreRef,
    handleViewDog,
    handleViewPost,
    handleDeletePost,
  } = useFeedSection();

  return (
    <section className={cn("flex w-full max-w-[696px] flex-col items-center gap-lg", className)}>
      <FeedPostList
        posts={posts}
        isLoading={isLoading}
        isError={isError}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        loadMoreRef={loadMoreRef}
        currentUserId={currentUserId}
        isDeletingPost={isDeletingPost}
        onViewPost={handleViewPost}
        onViewDog={handleViewDog}
        onDeletePost={handleDeletePost}
      />
    </section>
  );
}
