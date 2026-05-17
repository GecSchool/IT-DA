"use client";

import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";

import { useFeedPostLike } from "@/features/posts/hooks/use-feed-post-like";
import type { PostFeedItem } from "@/features/posts/types/post";
import { cn } from "@/shared/lib/cn";
import { IconButton, PhotoTile, Text } from "@/shared/ui";

type FeedPostCardProps = {
  post: PostFeedItem;
  onViewPost: (postId: number) => void;
  onViewDog: (dogId: number) => void;
};

export function FeedPostCard({ post, onViewPost, onViewDog }: FeedPostCardProps) {
  const { isLiked, isToggling, handleToggleLike } = useFeedPostLike(post);

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
        <IconButton aria-label="게시물 옵션" size="sm" variant="ghost">
          <MoreHorizontal className="size-5" aria-hidden />
        </IconButton>
      </header>

      <button
        type="button"
        aria-label="게시물 상세 보기"
        className="w-full"
        onClick={() => onViewPost(post.postId)}
      >
        <PhotoTile
          src={post.thumbnailUrl}
          alt={`${post.dog.name} 게시물 사진`}
          aspect="portrait"
          className="rounded-none md:rounded-m"
        />
      </button>

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
          <button type="button" className="inline-flex items-center gap-1 text-xs font-medium">
            <MessageCircle className="size-4" aria-hidden />
            {post.commentCount}
          </button>
        </div>
      </div>
    </article>
  );
}
