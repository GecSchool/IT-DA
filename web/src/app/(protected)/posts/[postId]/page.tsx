import { notFound } from "next/navigation";

import { PostDetailModalRoute } from "@/features/posts/components/post-detail-modal-route";

type PostDetailPageProps = {
  params: Promise<{
    postId: string;
  }>;
  searchParams: Promise<{
    focusComment?: string;
  }>;
};

export default async function PostDetailPage({ params, searchParams }: PostDetailPageProps) {
  const [{ postId }, { focusComment }] = await Promise.all([params, searchParams]);
  const numericPostId = Number(postId);

  if (!Number.isInteger(numericPostId) || numericPostId <= 0) {
    notFound();
  }

  return (
    <PostDetailModalRoute
      postId={numericPostId}
      shouldFocusCommentInput={focusComment === "true"}
    />
  );
}
