"use client";

import { PostDetailCommentItem } from "@/features/posts/components/post-detail-comment-item";
import type { Comment, PostCommentReplyTarget } from "@/features/posts/types/post";
import { Spinner, Text } from "@/shared/ui";

type PostDetailCommentListProps = {
  comments: Comment[];
  isLoading: boolean;
  isError: boolean;
  currentUserId: number | null;
  isDeletingComment: boolean;
  onReply: (target: PostCommentReplyTarget) => void;
  onDeleteComment: (commentId: number) => void;
};

export function PostDetailCommentList({
  comments,
  isLoading,
  isError,
  currentUserId,
  isDeletingComment,
  onReply,
  onDeleteComment,
}: PostDetailCommentListProps) {
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="sm" />
      </div>
    );
  }

  if (isError) {
    return (
      <Text size="sm" color="muted" className="px-md py-sm">
        댓글을 불러오지 못했어요.
      </Text>
    );
  }

  if (comments.length === 0) {
    return (
      <Text size="sm" color="muted" className="px-sm py-sm">
        아직 댓글이 없어요.
      </Text>
    );
  }

  return (
    <div className="flex flex-col gap-md py-sm">
      {comments.map((comment) => (
        <PostDetailCommentItem
          key={comment.commentId}
          comment={comment}
          currentUserId={currentUserId}
          isDeletingComment={isDeletingComment}
          onReply={onReply}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </div>
  );
}
