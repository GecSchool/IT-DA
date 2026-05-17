import { notFound } from "next/navigation";

import { PostDetailModalRoute } from "@/features/posts/components/post-detail-modal-route";

type InterceptedPostDetailPageProps = {
  params: Promise<{
    postId: string;
  }>;
  searchParams: Promise<{
    focusComment?: string;
  }>;
};

export default async function InterceptedPostDetailPage({
  params,
  searchParams,
}: InterceptedPostDetailPageProps) {
  const [{ postId }, { focusComment }] = await Promise.all([params, searchParams]);
  const numericPostId = Number(postId);

  if (!Number.isInteger(numericPostId) || numericPostId <= 0) {
    notFound();
  }

  return (
    <PostDetailModalRoute
      postId={numericPostId}
      closeMode="back"
      shouldFocusCommentInput={focusComment === "true"}
    />
  );
}
