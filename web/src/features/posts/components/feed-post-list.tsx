"use client";

import { FileText } from "lucide-react";
import type { RefObject } from "react";

import { FeedPostCard } from "@/features/posts/components/feed-post-card";
import type { PostFeedItem } from "@/features/posts/types/post";
import { EmptyState, Spinner, Text } from "@/shared/ui";

type FeedPostListProps = {
  posts: PostFeedItem[];
  isLoading: boolean;
  isError: boolean;
  currentUserId: number | null;
  isDeletingPost: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  onViewPost: (postId: number, options?: { focusComment?: boolean }) => void;
  onViewDog: (dogId: number) => void;
  onDeletePost: (postId: number) => void;
};

export function FeedPostList({
  posts,
  isLoading,
  isError,
  currentUserId,
  isDeletingPost,
  hasNextPage,
  isFetchingNextPage,
  loadMoreRef,
  onViewPost,
  onViewDog,
  onDeletePost,
}: FeedPostListProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-80 w-full flex-col items-center justify-center gap-md">
        <Spinner size="lg" />
        <Text weight="medium">피드를 불러오고 있어요</Text>
      </div>
    );
  }

  if (isError) {
    return <EmptyState title="피드를 불러오지 못했어요" description="잠시 후 다시 시도해주세요." />;
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        title="아직 올라온 게시물이 없어요"
        description="임시보호 강아지의 일상을 기다려주세요."
        icon={<FileText className="size-8" aria-hidden />}
      />
    );
  }

  return (
    <section aria-label="게시물 목록" className="flex w-full flex-col items-center gap-2xl">
      {posts.map((post) => (
        <FeedPostCard
          key={post.postId}
          post={post}
          currentUserId={currentUserId}
          isDeleting={isDeletingPost}
          onViewPost={onViewPost}
          onViewDog={onViewDog}
          onDeletePost={onDeletePost}
        />
      ))}
      <div ref={loadMoreRef} className="h-1 w-full" aria-hidden />
      {isFetchingNextPage ? (
        <div className="flex items-center gap-sm text-muted-foreground">
          <Spinner size="sm" />
          <Text size="sm" color="muted">
            게시물을 더 불러오고 있어요
          </Text>
        </div>
      ) : null}
      {!hasNextPage ? (
        <Text size="sm" color="muted">
          모든 게시물을 확인했어요
        </Text>
      ) : null}
    </section>
  );
}
