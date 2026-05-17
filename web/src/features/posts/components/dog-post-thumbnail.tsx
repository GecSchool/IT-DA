"use client";

import { Heart, MessageCircle } from "lucide-react";

import type { DogPostSummary } from "@/features/posts/types/post";
import { PhotoTile, Text } from "@/shared/ui";

type DogPostThumbnailProps = {
  post: DogPostSummary;
  onViewPost: (postId: number) => void;
};

export function DogPostThumbnail({ post, onViewPost }: DogPostThumbnailProps) {
  return (
    <button
      type="button"
      className="group relative w-full overflow-hidden rounded-m bg-muted text-left"
      aria-label={post.caption}
      onClick={() => onViewPost(post.postId)}
    >
      <PhotoTile
        src={post.thumbnailUrl}
        alt={post.caption}
        aspect="portrait"
        className="rounded-none"
      />
      <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-sm bg-black/55 px-sm py-2 text-white transition-transform group-hover:translate-y-0 group-focus-visible:translate-y-0">
        <Text size="xs" className="min-w-0 truncate text-white">
          {post.caption}
        </Text>
        <div className="flex shrink-0 items-center gap-sm text-white">
          <span className="flex items-center gap-1 text-xs">
            <Heart className="size-3.5" aria-hidden />
            {post.likeCount}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <MessageCircle className="size-3.5" aria-hidden />
            {post.commentCount}
          </span>
        </div>
      </div>
    </button>
  );
}
