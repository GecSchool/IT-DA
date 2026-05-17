"use client";

import { useTogglePostLikeMutation } from "@/features/posts/queries";
import type { PostFeedItem } from "@/features/posts/types/post";

type UseFeedPostLikeParams = Pick<PostFeedItem, "postId" | "isLiked">;

export function useFeedPostLike({ postId, isLiked }: UseFeedPostLikeParams) {
  const togglePostLikeMutation = useTogglePostLikeMutation();

  const handleToggleLike = () => {
    if (togglePostLikeMutation.isPending) {
      return;
    }

    togglePostLikeMutation.mutate(postId);
  };

  return {
    isLiked,
    isToggling: togglePostLikeMutation.isPending,
    handleToggleLike,
  };
}
