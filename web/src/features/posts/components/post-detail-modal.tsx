"use client";

import { Heart, MessageCircle, X } from "lucide-react";
import type { MouseEvent } from "react";

import { AdoptionApplicationFormModal } from "@/features/adoptions/components/adoption-application-form-modal";
import { PostDetailCommentForm } from "@/features/posts/components/post-detail-comment-form";
import { PostDetailCommentList } from "@/features/posts/components/post-detail-comment-list";
import { PostDetailImageCarousel } from "@/features/posts/components/post-detail-image-carousel";
import { usePostDetailModal } from "@/features/posts/hooks/use-post-detail-modal";
import { usePostModalBehavior } from "@/features/posts/hooks/use-post-modal-behavior";
import { cn } from "@/shared/lib/cn";
import { Button, Divider, EmptyState, IconButton, Spinner, Text } from "@/shared/ui";

type PostDetailModalProps = {
  postId: number;
  open: boolean;
  shouldFocusCommentInput?: boolean;
  onClose: () => void;
};

export function PostDetailModal({
  postId,
  open,
  shouldFocusCommentInput = false,
  onClose,
}: PostDetailModalProps) {
  const detail = usePostDetailModal({ postId, onClose });
  usePostModalBehavior({
    open,
    onClose: detail.handleClose,
  });

  if (!open) {
    return null;
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      detail.handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay px-md py-xl"
      onClick={handleOverlayClick}
    >
      <IconButton
        aria-label="게시물 상세 닫기"
        variant="ghost"
        className="fixed right-5 top-6 bg-white/20 text-white hover:bg-white/30"
        onClick={detail.handleClose}
      >
        <X className="size-[18px]" aria-hidden />
      </IconButton>

      <div className="flex max-h-[calc(100vh-96px)] w-full max-w-[760px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg md:h-[70vh] md:max-h-[720px] md:w-fit md:max-w-[calc(100vw-96px)] md:flex-row">
        {detail.isLoading ? (
          <div className="flex min-h-[500px] w-full flex-col items-center justify-center gap-md md:min-h-[70vh]">
            <Spinner size="lg" />
            <Text weight="medium">게시물을 불러오고 있어요</Text>
          </div>
        ) : null}

        {detail.isError || (!detail.isLoading && !detail.post) ? (
          <EmptyState
            title="게시물을 불러오지 못했어요"
            description="잠시 후 다시 시도해주세요."
            className="min-h-[500px] w-full md:min-h-[70vh]"
          />
        ) : null}

        {detail.post ? (
          <>
            <div className="h-[min(500px,60vh)] w-full shrink-0 md:h-full md:aspect-[3/4] md:w-auto">
              <PostDetailImageCarousel
                imageUrls={detail.post.imageUrls}
                alt={`${detail.post.dog.name} 게시물 사진`}
              />
            </div>

            <section className="flex min-h-0 w-full flex-1 flex-col md:h-full md:w-[380px] md:flex-none">
              <header className="flex h-[68px] shrink-0 items-center justify-between gap-md px-md py-sm">
                <button
                  type="button"
                  className="flex min-w-0 items-center gap-sm text-left"
                  onClick={detail.handleViewDog}
                >
                  <div className="size-9 shrink-0 rounded-pill bg-muted" />
                  <div className="min-w-0">
                    <Text size="sm" weight="semibold" className="truncate">
                      {detail.post.dog.name}
                    </Text>
                    <Text size="xs" color="muted" className="truncate">
                      {detail.post.author.nickname}
                    </Text>
                  </div>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 px-2 text-primary hover:bg-transparent hover:text-primary-hover"
                  onClick={detail.handleOpenApplicationModal}
                >
                  입양신청
                </Button>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto px-sm pb-md">
                <PostDetailCommentList
                  comments={detail.comments}
                  isLoading={detail.isCommentsLoading}
                  isError={detail.isCommentsError}
                  currentUserId={detail.currentUserId}
                  isDeletingComment={detail.isDeletingComment}
                  onReply={detail.handleSelectReplyTarget}
                  onDeleteComment={detail.handleDeleteComment}
                />
              </div>

              <div className="h-[80px] shrink-0 overflow-y-auto px-md py-xs">
                <div className="flex items-center gap-md pb-xs text-muted-foreground">
                  <button
                    type="button"
                    aria-pressed={detail.isLiked}
                    disabled={detail.isLikePending}
                    className={cn(
                      "inline-flex items-center gap-1 text-xs font-medium transition-colors disabled:opacity-60",
                      detail.isLiked
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={detail.handleToggleLike}
                  >
                    <Heart className={cn("size-4", detail.isLiked && "fill-current")} aria-hidden />
                    {detail.post.likeCount}
                  </button>
                  <div className="inline-flex items-center gap-1 text-xs font-medium">
                    <MessageCircle className="size-4" aria-hidden />
                    {detail.post.commentCount}
                  </div>
                </div>
                <Text size="sm" className="leading-relaxed">
                  {detail.post.caption}
                </Text>
              </div>

              <Divider />
              <PostDetailCommentForm
                postId={postId}
                shouldFocusCommentInput={shouldFocusCommentInput}
                replyTarget={detail.replyTarget}
                onClearReplyTarget={detail.handleClearReplyTarget}
              />
            </section>

            <AdoptionApplicationFormModal
              open={detail.isApplicationModalOpen}
              mode="create"
              dogName={detail.post.dog.name}
              isSubmitting={detail.isApplying}
              onClose={detail.handleCloseApplicationModal}
              onSubmit={detail.handleSubmitApplication}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
