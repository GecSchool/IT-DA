"use client";

import type { DogDetail } from "@/features/dogs/types/dog";
import { DogDetailHeader } from "@/features/dogs/components/dog-detail-header";
import { DogFosterNote } from "@/features/dogs/components/dog-foster-note";
import { DogInfoSection } from "@/features/dogs/components/dog-info-section";
import { useDogDetailSection } from "@/features/dogs/hooks/use-dog-detail-section";
import { EmptyState, Spinner, Text } from "@/shared/ui";

type DogDetailSectionProps = {
  dogId: number;
  isApplying?: boolean;
  onApply: (dog: DogDetail) => void;
};

export function DogDetailSection({ dogId, isApplying, onApply }: DogDetailSectionProps) {
  const {
    dog,
    viewerMode,
    isLoading,
    isError,
    isDeleting,
    handleViewApplicants,
    handleViewAdoption,
    handleEditDog,
    handleDeleteDog,
  } = useDogDetailSection(dogId);

  if (isLoading) {
    return (
      <section className="flex min-h-80 w-full flex-col items-center justify-center gap-md">
        <Spinner size="lg" />
        <Text weight="medium">강아지 정보를 불러오고 있어요</Text>
      </section>
    );
  }

  if (isError || !dog) {
    return (
      <EmptyState
        title="강아지 정보를 불러오지 못했어요"
        description="잠시 후 다시 시도해주세요."
      />
    );
  }

  return (
    <>
      <DogDetailHeader
        dog={dog}
        viewerMode={viewerMode}
        isApplying={isApplying}
        isDeleting={isDeleting}
        onViewApplicants={handleViewApplicants}
        onApply={() => onApply(dog)}
        onViewAdoption={handleViewAdoption}
        onEdit={handleEditDog}
        onDelete={handleDeleteDog}
      />
      <DogFosterNote dog={dog} />
      <DogInfoSection dog={dog} />
    </>
  );
}
