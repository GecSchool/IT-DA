"use client";

import { useRouter } from "next/navigation";

import { PostDetailModal } from "@/features/posts/components/post-detail-modal";

type PostDetailModalRouteProps = {
  postId: number;
  shouldFocusCommentInput?: boolean;
  closeMode?: "back" | "home";
};

export function PostDetailModalRoute({
  postId,
  shouldFocusCommentInput = false,
  closeMode = "home",
}: PostDetailModalRouteProps) {
  const router = useRouter();

  const handleClose = () => {
    if (closeMode === "back") {
      router.back();
      return;
    }

    router.push("/", { scroll: false });
  };

  return (
    <PostDetailModal
      postId={postId}
      open
      shouldFocusCommentInput={shouldFocusCommentInput}
      onClose={handleClose}
    />
  );
}
