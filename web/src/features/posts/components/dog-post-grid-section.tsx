"use client";

import { Image as ImageIcon } from "lucide-react";

import { DogPostGrid } from "@/features/posts/components/dog-post-grid";
import { useDogPostGridSection } from "@/features/posts/hooks/use-dog-post-grid-section";
import { Button, EmptyState, Spinner, Text } from "@/shared/ui";

type DogPostGridSectionProps = {
  dogId: number;
};

export function DogPostGridSection({ dogId }: DogPostGridSectionProps) {
  const {
    posts,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useDogPostGridSection(dogId);

  if (isLoading) {
    return (
      <section className="flex min-h-80 w-full flex-col items-center justify-center gap-md">
        <Spinner size="lg" />
        <Text weight="medium">게시물을 불러오고 있어요</Text>
      </section>
    );
  }

  if (isError) {
    return (
      <EmptyState title="게시물을 불러오지 못했어요" description="잠시 후 다시 시도해주세요." />
    );
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        title="아직 게시물이 없어요"
        description="임시보호 중인 강아지의 일상 사진이 올라오면 이곳에서 볼 수 있어요."
        icon={<ImageIcon className="size-8" aria-hidden />}
      />
    );
  }

  return (
    <section className="flex w-full flex-col gap-md">
      <DogPostGrid posts={posts} />
      {hasNextPage ? (
        <div className="flex justify-center">
          <Button
            variant="outline"
            disabled={isFetchingNextPage}
            onClick={() => void fetchNextPage()}
          >
            {isFetchingNextPage ? "불러오는 중" : "더 보기"}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
