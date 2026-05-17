"use client";

import { useEffect, useRef } from "react";

import { usePostCommentForm } from "@/features/posts/hooks/use-post-comment-form";
import type { PostCommentReplyTarget } from "@/features/posts/types/post";
import { Input, Text } from "@/shared/ui";

type PostDetailCommentFormProps = {
  postId: number;
  shouldFocusCommentInput?: boolean;
  replyTarget: PostCommentReplyTarget | null;
  onClearReplyTarget: () => void;
};

export function PostDetailCommentForm({
  postId,
  shouldFocusCommentInput = false,
  replyTarget,
  onClearReplyTarget,
}: PostDetailCommentFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const form = usePostCommentForm({ postId, replyTarget, onClearReplyTarget });

  useEffect(() => {
    if (replyTarget || shouldFocusCommentInput) {
      inputRef.current?.focus();
    }
  }, [replyTarget, shouldFocusCommentInput]);

  return (
    <div className="flex min-h-[58px] shrink-0 flex-col justify-center gap-xs">
      {form.replyTarget ? (
        <div className="flex items-center justify-between px-md pt-sm">
          <Text size="xs" color="muted">
            {form.replyTarget.authorNickname}에게 답글 남기는 중
          </Text>
          <button
            type="button"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            onClick={form.onClearReplyTarget}
          >
            취소
          </button>
        </div>
      ) : null}
      <div className="flex items-center gap-sm px-md py-sm">
        <Input
          ref={inputRef}
          placeholder={
            form.replyTarget ? `${form.replyTarget.authorNickname}에게 답글 달기...` : "댓글 입력..."
          }
          variant="ghost"
          className="text-sm"
          containerClassName="min-h-9 px-0 py-0"
          value={form.content}
          onChange={(event) => form.setContent(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.nativeEvent.isComposing) {
              event.preventDefault();
              void form.handleSubmitComment();
            }
          }}
        />
        <button
          type="button"
          className="shrink-0 text-sm font-semibold text-primary transition-opacity disabled:opacity-40"
          disabled={!form.canSubmit}
          onClick={form.handleSubmitComment}
        >
          {form.isSubmitting ? "게시 중" : "게시"}
        </button>
      </div>
      {form.submitErrorMessage ? (
        <Text size="sm" color="danger" className="px-sm">
          {form.submitErrorMessage}
        </Text>
      ) : null}
    </div>
  );
}
