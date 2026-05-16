"use client";

import { AdoptionApplicationFormModal } from "@/features/adoptions/components/adoption-application-form-modal";
import { DogDetailHeader } from "@/features/dogs/components/dog-detail-header";
import { DogFosterNote } from "@/features/dogs/components/dog-foster-note";
import { DogInfoSection } from "@/features/dogs/components/dog-info-section";
import { useDogDetailSection } from "@/features/dogs/hooks/use-dog-detail-section";
import { EmptyState, Spinner, Text } from "@/shared/ui";

type DogDetailSectionProps = {
  dogId: number;
};

export function DogDetailSection({ dogId }: DogDetailSectionProps) {
  const {
    dog,
    viewerMode,
    isLoading,
    isError,
    isApplicationModalOpen,
    isApplying,
    isDeleting,
    handleViewApplicants,
    handleViewAdoption,
    handleOpenApplicationModal,
    handleCloseApplicationModal,
    handleSubmitApplication,
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
        onApply={handleOpenApplicationModal}
        onViewAdoption={handleViewAdoption}
        onEdit={handleEditDog}
        onDelete={handleDeleteDog}
      />
      <DogFosterNote fosterNote={dog.fosterNote} />
      <DogInfoSection dog={dog} />
      <AdoptionApplicationFormModal
        open={isApplicationModalOpen}
        mode="create"
        dogName={dog.name}
        isSubmitting={isApplying}
        onClose={handleCloseApplicationModal}
        onSubmit={handleSubmitApplication}
      />
    </>
  );
}
