"use client";

import { ClipboardList } from "lucide-react";
import { useState } from "react";

import { AdoptionApplicationFormModal } from "@/features/adoptions/components/adoption-application-form-modal";
import { AdoptionHistoryCard } from "@/features/adoptions/components/adoption-history-card";
import { AdoptionHistoryDetailModal } from "@/features/adoptions/components/adoption-history-detail-modal";
import { ApplicantFilterRow } from "@/features/adoptions/components/applicant-filter-row";
import { useAdoptionHistoryFilter } from "@/features/adoptions/hooks/use-adoption-history-filter";
import { useAdoptionHistoryModal } from "@/features/adoptions/hooks/use-adoption-history-modal";
import { useAdoptionHistoryPage } from "@/features/adoptions/hooks/use-adoption-history-page";
import { Divider, EmptyState, Heading, Spinner, Text } from "@/shared/ui";

export function AdoptionHistoryPage() {
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string | null>(null);
  const filter = useAdoptionHistoryFilter();
  const {
    adoptions,
    filterOptions,
    isLoading,
    isError,
    isUpdating,
    isDeleting,
    handleViewDogProfile,
    handleUpdateAdoption,
    handleDeleteAdoption,
  } = useAdoptionHistoryPage({
    selectedStatus: filter.selectedStatus,
  });
  const modal = useAdoptionHistoryModal(adoptions);

  const handleOpenDetail = (adoption: (typeof adoptions)[number]) => {
    setDeleteErrorMessage(null);
    modal.openDetail(adoption);
  };

  const handleCloseDetail = () => {
    setDeleteErrorMessage(null);
    modal.closeDetail();
  };

  const handleSubmitEdit = async (values: { introduction: string }) => {
    if (!modal.selectedAdoption) {
      return;
    }

    await handleUpdateAdoption(modal.selectedAdoption.adoptionId, values);
    modal.closeForm();
  };

  const handleDelete = async (adoptionId: number) => {
    try {
      setDeleteErrorMessage(null);
      await handleDeleteAdoption(adoptionId);
      modal.closeDetail();
    } catch {
      setDeleteErrorMessage("신청 내역을 삭제하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <section className="flex w-full max-w-[900px] flex-col gap-lg">
      <Heading as="h1" size="lg">
        신청 내역
      </Heading>

      <ApplicantFilterRow
        selectedValue={filter.selectedStatus}
        options={filterOptions}
        onSelect={(value) => filter.selectStatus(value as typeof filter.selectedStatus)}
      />

      {isLoading ? (
        <div className="flex min-h-80 w-full flex-col items-center justify-center gap-md">
          <Spinner size="lg" />
          <Text weight="medium">신청 내역을 불러오고 있어요</Text>
        </div>
      ) : null}

      {isError ? (
        <EmptyState title="신청 내역을 불러오지 못했어요" description="잠시 후 다시 시도해주세요." />
      ) : null}

      {!isLoading && !isError && adoptions.length === 0 ? (
        <EmptyState
          title="해당 상태의 신청 내역이 없어요"
          description="다른 상태를 선택해 신청 내역을 확인해보세요."
          icon={<ClipboardList className="size-8" aria-hidden />}
        />
      ) : null}

      {!isLoading && !isError && adoptions.length > 0 ? (
        <div className="flex w-full flex-col">
          {adoptions.map((adoption, index) => (
            <div key={adoption.adoptionId} className="flex w-full flex-col">
              {index > 0 ? <Divider /> : null}
              <AdoptionHistoryCard adoption={adoption} onPreview={handleOpenDetail} />
            </div>
          ))}
        </div>
      ) : null}

      <AdoptionHistoryDetailModal
        open={modal.isDetailOpen}
        adoption={modal.selectedAdoption}
        isDeleting={isDeleting}
        deleteErrorMessage={deleteErrorMessage}
        onClose={handleCloseDetail}
        onViewProfile={handleViewDogProfile}
        onEdit={modal.openEditForm}
        onDelete={handleDelete}
      />

      <AdoptionApplicationFormModal
        open={modal.isFormOpen}
        mode={modal.formMode}
        dogName={modal.selectedAdoption?.dog.name ?? ""}
        defaultIntroduction={modal.selectedAdoption?.introduction ?? ""}
        isSubmitting={isUpdating}
        onClose={modal.closeForm}
        onSubmit={handleSubmitEdit}
      />
    </section>
  );
}
