"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useCreateAdoptionMutation } from "@/features/adoptions/queries";
import type { AdoptionApplicationFormValues } from "@/features/adoptions/types/adoption-application-form";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  useCommentsQuery,
  useDeleteCommentMutation,
  usePostDetailQuery,
  useTogglePostLikeMutation,
} from "@/features/posts/queries";
import type { PostCommentReplyTarget } from "@/features/posts/types/post";

type UsePostDetailModalParams = {
  postId: number;
  onClose: () => void;
};

export function usePostDetailModal({ postId, onClose }: UsePostDetailModalParams) {
  const router = useRouter();
  const { user } = useSession();
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [replyTarget, setReplyTarget] = useState<PostCommentReplyTarget | null>(null);
  const postDetailQuery = usePostDetailQuery(postId);
  const commentsQuery = useCommentsQuery(postId, 10);
  const togglePostLikeMutation = useTogglePostLikeMutation();
  const deleteCommentMutation = useDeleteCommentMutation();
  const createAdoptionMutation = useCreateAdoptionMutation();
  const post = postDetailQuery.data;
  const comments = useMemo(
    () => commentsQuery.data?.pages.flatMap((page) => page.comments) ?? [],
    [commentsQuery.data]
  );

  const handleViewDog = () => {
    if (!post) {
      return;
    }

    router.push(`/dogs/${post.dog.dogId}`);
  };

  const handleToggleLike = () => {
    if (togglePostLikeMutation.isPending) {
      return;
    }

    togglePostLikeMutation.mutate(postId);
  };

  const handleOpenApplicationModal = () => {
    setIsApplicationModalOpen(true);
  };

  const handleSelectReplyTarget = (target: PostCommentReplyTarget) => {
    setReplyTarget(target);
  };

  const handleClearReplyTarget = () => {
    setReplyTarget(null);
  };

  const handleDeleteComment = (commentId: number) => {
    if (!window.confirm("댓글을 삭제할까요?")) {
      return;
    }

    deleteCommentMutation.mutate({ postId, commentId });
  };

  const handleCloseApplicationModal = () => {
    if (createAdoptionMutation.isPending) {
      return;
    }

    setIsApplicationModalOpen(false);
  };

  const handleSubmitApplication = async (values: AdoptionApplicationFormValues) => {
    if (!post) {
      return;
    }

    await createAdoptionMutation.mutateAsync({
      dogId: post.dog.dogId,
      introduction: values.introduction,
    });
    setIsApplicationModalOpen(false);
  };

  return {
    post,
    comments,
    isLoading: postDetailQuery.isLoading,
    isError: postDetailQuery.isError,
    isCommentsLoading: commentsQuery.isLoading,
    isCommentsError: commentsQuery.isError,
    currentUserId: user?.userId ?? null,
    isLiked: post?.isLiked ?? false,
    isLikePending: togglePostLikeMutation.isPending,
    isDeletingComment: deleteCommentMutation.isPending,
    isApplicationModalOpen,
    isApplying: createAdoptionMutation.isPending,
    replyTarget,
    handleClose: onClose,
    handleViewDog,
    handleToggleLike,
    handleDeleteComment,
    handleOpenApplicationModal,
    handleCloseApplicationModal,
    handleSubmitApplication,
    handleSelectReplyTarget,
    handleClearReplyTarget,
  };
}
