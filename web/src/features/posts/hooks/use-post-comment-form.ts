"use client";

import { useState } from "react";

import { useCreateCommentMutation } from "@/features/posts/queries";
import type { PostCommentReplyTarget } from "@/features/posts/types/post";

type UsePostCommentFormParams = {
  postId: number;
  replyTarget: PostCommentReplyTarget | null;
  onClearReplyTarget: () => void;
};

export function usePostCommentForm({
  postId,
  replyTarget,
  onClearReplyTarget,
}: UsePostCommentFormParams) {
  const [content, setContent] = useState("");
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);
  const createCommentMutation = useCreateCommentMutation();
  const trimmedContent = content.trim();
  const canSubmit = trimmedContent.length > 0 && !createCommentMutation.isPending;

  const handleSubmitComment = async () => {
    if (!canSubmit) {
      return;
    }

    try {
      setSubmitErrorMessage(null);
      await createCommentMutation.mutateAsync({
        postId,
        payload: {
          content: trimmedContent,
          parentId: replyTarget?.commentId ?? null,
        },
      });
      setContent("");
      onClearReplyTarget();
    } catch {
      setSubmitErrorMessage("댓글을 게시하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return {
    content,
    submitErrorMessage,
    isSubmitting: createCommentMutation.isPending,
    canSubmit,
    replyTarget,
    setContent,
    handleSubmitComment,
    onClearReplyTarget,
  };
}
