"use client";

import { ChevronLeft, ChevronRight, Heart, MessageCircle, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

import { useFeedPostLike } from "@/features/posts/hooks/use-feed-post-like";
import { usePostImageCarousel } from "@/features/posts/hooks/use-post-image-carousel";
import type { PostFeedItem } from "@/features/posts/types/post";
import { cn } from "@/shared/lib/cn";
import { BottomSheet, BottomSheetItem, DropdownMenu, IconButton, PhotoTile, Text } from "@/shared/ui";

type FeedPostCardProps = {
  post: PostFeedItem;
  currentUserId: number | null;
  isDeleting: boolean;
  onViewPost: (postId: number, options?: { focusComment?: boolean }) => void;
  onViewDog: (dogId: number) => void;
  onDeletePost: (postId: number) => void;
};

export function FeedPostCard({
  post,
  currentUserId,
  isDeleting,
  onViewPost,
  onViewDog,
  onDeletePost,
}: FeedPostCardProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLiked, isToggling, handleToggleLike } = useFeedPostLike(post);
  const imageCarousel = usePostImageCarousel({
    imageUrls: post.imageUrls.length > 0 ? post.imageUrls : [post.thumbnailUrl],
  });
  const canManagePost = currentUserId === post.author.userId;

  const handleMobileDelete = () => {
    setIsMobileMenuOpen(false);
    onDeletePost(post.postId);
  };

  return (
    <article className="flex w-full max-w-[400px] flex-col">
      <header className="flex h-11 items-center gap-sm">
        <button
          type="button"
          aria-label={`${post.dog.name} 프로필 보기`}
          className="size-9 shrink-0 overflow-hidden rounded-pill bg-muted"
          onClick={() => onViewDog(post.dog.dogId)}
        >
          <PhotoTile aspect="square" className="rounded-pill" />
        </button>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            className="block max-w-full truncate text-left text-sm font-semibold text-foreground"
            onClick={() => onViewDog(post.dog.dogId)}
          >
            {post.dog.name}
          </button>
          <Text size="xs" color="muted" className="truncate">
            {post.author.nickname}
          </Text>
        </div>
        {canManagePost ? (
          <>
            <div className="sm:hidden">
              <IconButton
                aria-label="게시물 옵션"
                size="sm"
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <MoreHorizontal className="size-5" aria-hidden />
              </IconButton>
            </div>
            <div className="hidden sm:block">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <IconButton aria-label="게시물 옵션" size="sm" variant="ghost">
                    <MoreHorizontal className="size-5" aria-hidden />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                  <DropdownMenu.Item
                    variant="danger"
                    disabled={isDeleting}
                    onSelect={() => onDeletePost(post.postId)}
                  >
                    삭제하기
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
            <BottomSheet
              open={isMobileMenuOpen}
              title="게시물 관리"
              onOpenChange={setIsMobileMenuOpen}
            >
              <BottomSheetItem variant="danger" disabled={isDeleting} onClick={handleMobileDelete}>
                삭제하기
                <Trash2 className="size-5" aria-hidden />
              </BottomSheetItem>
            </BottomSheet>
          </>
        ) : null}
      </header>

      <div className="group relative w-full">
        <PhotoTile
          src={imageCarousel.currentImageUrl}
          alt={`${post.dog.name} 게시물 사진`}
          aspect="portrait"
          className="rounded-none md:rounded-m"
        />
        <button
          type="button"
          aria-label="게시물 상세 보기"
          className="absolute inset-0"
          onClick={() => onViewPost(post.postId)}
        />
        {imageCarousel.hasMultipleImages ? (
          <>
            <IconButton
              aria-label="이전 사진"
              size="sm"
              variant="ghost"
              className="absolute left-2 top-1/2 z-10 size-7 -translate-y-1/2 bg-black/25 text-white opacity-90 hover:bg-black/35 md:opacity-0 md:group-hover:opacity-100"
              onClick={imageCarousel.handlePreviousImage}
            >
              <ChevronLeft className="size-4" aria-hidden />
            </IconButton>
            <IconButton
              aria-label="다음 사진"
              size="sm"
              variant="ghost"
              className="absolute right-2 top-1/2 z-10 size-7 -translate-y-1/2 bg-black/25 text-white opacity-90 hover:bg-black/35 md:opacity-0 md:group-hover:opacity-100"
              onClick={imageCarousel.handleNextImage}
            >
              <ChevronRight className="size-4" aria-hidden />
            </IconButton>
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center rounded-pill bg-black/35 px-xs py-[2px]">
              <Text size="xs" weight="semibold" className="text-white">
                {imageCarousel.currentImageIndex + 1} / {imageCarousel.totalImageCount}
              </Text>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-col gap-xs px-md py-sm md:px-0">
        <Text size="sm" className="leading-relaxed">
          {post.caption}
        </Text>
        <div className="flex items-center gap-md text-muted-foreground">
          <button
            type="button"
            aria-pressed={isLiked}
            disabled={isToggling}
            className={cn(
              "inline-flex items-center gap-1 text-xs font-medium transition-colors disabled:opacity-60",
              isLiked ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
            onClick={handleToggleLike}
          >
            <Heart className={cn("size-4", isLiked && "fill-current")} aria-hidden />
            {post.likeCount}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-medium transition-colors hover:text-foreground"
            onClick={() => onViewPost(post.postId, { focusComment: true })}
          >
            <MessageCircle className="size-4" aria-hidden />
            {post.commentCount}
          </button>
        </div>
      </div>
    </article>
  );
}
