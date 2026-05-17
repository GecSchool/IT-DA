"use client";

import { Image as ImageIcon } from "lucide-react";

import { AdoptionApplicationFormModal } from "@/features/adoptions/components/adoption-application-form-modal";
import { DogFosterNote } from "@/features/dogs/components/dog-foster-note";
import { DogInfoSection } from "@/features/dogs/components/dog-info-section";
import { DogProfileHero } from "@/features/dogs/components/dog-profile-hero";
import { MatchReasonSection } from "@/features/match/components/match-reason-section";
import { useMatchDetailPage } from "@/features/match/hooks/use-match-detail-page";
import { DogPostGrid } from "@/features/posts/components/dog-post-grid";
import { Badge, Button, EmptyState, Spinner, Text } from "@/shared/ui";

export default function MatchPage() {
  const {
    recommendation,
    isLoading,
    isFetching,
    isError,
    isApplicationModalOpen,
    isApplying,
    isCurrentDogApplied,
    handleNextRecommendation,
    handleViewPost,
    handleOpenApplicationModal,
    handleCloseApplicationModal,
    handleSubmitApplication,
  } = useMatchDetailPage();

  if (isLoading) {
    return (
      <section className="flex min-h-80 w-full max-w-[900px] flex-col items-center justify-center gap-md">
        <Spinner size="lg" />
        <Text weight="medium">잘 맞는 강아지를 찾고 있어요</Text>
      </section>
    );
  }

  if (isError || !recommendation) {
    return (
      <section className="w-full max-w-[900px]">
        <EmptyState
          title="추천 강아지를 불러오지 못했어요"
          description="라이프스타일 정보를 확인한 뒤 다시 시도해주세요."
        />
      </section>
    );
  }

  return (
    <section className="flex w-full max-w-[900px] flex-col gap-lg">
      <DogProfileHero
        imageUrls={recommendation.imageUrls}
        name={recommendation.name}
        breed={recommendation.breed}
        gender={recommendation.gender}
        size={recommendation.size}
        weight={recommendation.weight}
        regionSido={recommendation.regionSido}
        badge={
          <Badge variant="high" showDot={false}>
            나와 {recommendation.matchScore}% 맞아요
          </Badge>
        }
      />
      <DogInfoSection dog={recommendation} />
      <DogFosterNote fosterNote={recommendation.fosterNote} />
      <MatchReasonSection
        matchReasons={recommendation.matchReasons}
        cautionReasons={recommendation.cautionReasons}
      />
      <div className="flex w-full justify-end gap-sm">
        <Button variant="outline" onClick={handleNextRecommendation} disabled={isFetching}>
          {isFetching ? "불러오는 중" : "다른 강아지"}
        </Button>
        <Button onClick={handleOpenApplicationModal} disabled={isApplying || isCurrentDogApplied}>
          {isApplying ? "신청 중" : isCurrentDogApplied ? "신청 완료" : "신청하기"}
        </Button>
      </div>
      {recommendation.posts.length > 0 ? (
        <DogPostGrid posts={recommendation.posts} onViewPost={handleViewPost} />
      ) : (
        <EmptyState
          title="아직 게시물이 없어요"
          description={`${recommendation.name}의 일상 사진이 올라오면 이곳에서 볼 수 있어요.`}
          icon={<ImageIcon className="size-8" aria-hidden />}
        />
      )}
      <AdoptionApplicationFormModal
        open={isApplicationModalOpen}
        mode="create"
        dogName={recommendation.name}
        isSubmitting={isApplying}
        onClose={handleCloseApplicationModal}
        onSubmit={handleSubmitApplication}
      />
    </section>
  );
}
