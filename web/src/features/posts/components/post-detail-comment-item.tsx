"use client";

import { CornerDownRight, MoreHorizontal, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useRef, useState } from "react";

import type { Comment, CommentReply, PostCommentReplyTarget } from "@/features/posts/types/post";
import { BottomSheet, BottomSheetItem, DropdownMenu, IconButton, Text } from "@/shared/ui";

type PostDetailCommentItemProps = {
  comment: Comment;
  currentUserId: number | null;
  isDeletingComment: boolean;
  onReply: (target: PostCommentReplyTarget) => void;
  onDeleteComment: (commentId: number) => void;
};

export function PostDetailCommentItem({
  comment,
  currentUserId,
  isDeletingComment,
  onReply,
  onDeleteComment,
}: PostDetailCommentItemProps) {
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const hasReplies = comment.replies.length > 0;
  const canManageComment = currentUserId === comment.author.userId;

  return (
    <article className="flex flex-col gap-xs">
      <CommentContent
        commentId={comment.commentId}
        canManage={canManageComment}
        isDeleting={isDeletingComment}
        onDelete={onDeleteComment}
      >
        <div className="min-w-0 pl-10">
          <Text size="sm" weight="semibold" className="truncate">
            {comment.author.nickname}
          </Text>
          <Text size="sm" color="muted" className="break-words leading-relaxed">
            {comment.content}
          </Text>
          <button
            type="button"
            className="mt-xs text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            onClick={() =>
              onReply({
                commentId: comment.commentId,
                authorNickname: comment.author.nickname,
              })
            }
          >
            답글
          </button>
        </div>
      </CommentContent>

      {hasReplies ? (
        <button
          type="button"
          className="ml-10 inline-flex w-fit items-center gap-xs text-xs font-medium text-muted-foreground"
          onClick={() => setIsRepliesOpen((current) => !current)}
        >
          <CornerDownRight className="size-3.5" aria-hidden />
          {isRepliesOpen ? "답글 숨기기" : `답글 보기 (${comment.replies.length}개)`}
        </button>
      ) : null}

      {isRepliesOpen ? (
        <div className="ml-10 flex flex-col gap-sm">
          {comment.replies.map((reply) => (
            <ReplyItem
              key={reply.commentId}
              reply={reply}
              currentUserId={currentUserId}
              isDeletingComment={isDeletingComment}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </div>
      ) : null}
    </article>
  );
}

type CommentContentProps = {
  commentId: number;
  canManage: boolean;
  isDeleting: boolean;
  children: ReactNode;
  onDelete: (commentId: number) => void;
};

function CommentContent({
  commentId,
  canManage,
  isDeleting,
  children,
  onDelete,
}: CommentContentProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLongPressTimer = () => {
    if (!longPressTimerRef.current) {
      return;
    }

    clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = null;
  };

  const handlePointerDown = () => {
    if (!canManage) {
      return;
    }

    clearLongPressTimer();
    longPressTimerRef.current = setTimeout(() => {
      setIsMobileMenuOpen(true);
    }, 550);
  };

  const handleMobileDelete = () => {
    setIsMobileMenuOpen(false);
    onDelete(commentId);
  };

  return (
    <div
      className="group relative min-w-0 pr-8"
      onPointerDown={handlePointerDown}
      onPointerLeave={clearLongPressTimer}
      onPointerUp={clearLongPressTimer}
      onPointerCancel={clearLongPressTimer}
      onContextMenu={(event) => {
        if (canManage) {
          event.preventDefault();
        }
      }}
    >
      {children}

      {canManage ? (
        <>
          <div className="absolute right-0 top-0 hidden opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 sm:block">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <IconButton aria-label="댓글 옵션" variant="ghost" size="sm">
                  <MoreHorizontal className="size-4" aria-hidden />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end">
                <DropdownMenu.Item
                  variant="danger"
                  disabled={isDeleting}
                  onSelect={() => onDelete(commentId)}
                >
                  삭제하기
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
          <BottomSheet
            open={isMobileMenuOpen}
            title="댓글 관리"
            onOpenChange={setIsMobileMenuOpen}
          >
            <BottomSheetItem variant="danger" disabled={isDeleting} onClick={handleMobileDelete}>
              삭제하기
              <Trash2 className="size-5" aria-hidden />
            </BottomSheetItem>
          </BottomSheet>
        </>
      ) : null}
    </div>
  );
}

type ReplyItemProps = {
  reply: CommentReply;
  currentUserId: number | null;
  isDeletingComment: boolean;
  onDeleteComment: (commentId: number) => void;
};

function ReplyItem({
  reply,
  currentUserId,
  isDeletingComment,
  onDeleteComment,
}: ReplyItemProps) {
  const canManageReply = currentUserId === reply.author.userId;

  return (
    <CommentContent
      commentId={reply.commentId}
      canManage={canManageReply}
      isDeleting={isDeletingComment}
      onDelete={onDeleteComment}
    >
      <div className="min-w-0 pl-9">
        <Text size="sm" weight="semibold" className="truncate">
          {reply.author.nickname}
        </Text>
        <Text size="sm" color="muted" className="break-words leading-relaxed">
          {reply.content}
        </Text>
      </div>
    </CommentContent>
  );
}
