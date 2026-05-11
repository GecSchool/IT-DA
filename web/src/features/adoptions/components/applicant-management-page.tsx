"use client";

import { ClipboardList } from "lucide-react";

import { ApplicantCard } from "@/features/adoptions/components/applicant-card";
import { ApplicantFilterRow } from "@/features/adoptions/components/applicant-filter-row";
import { useApplicantFilter } from "@/features/adoptions/hooks/use-applicant-filter";
import { useApplicantManagementPage } from "@/features/adoptions/hooks/use-applicant-management-page";
import { Divider, EmptyState, Heading, Spinner, Text } from "@/shared/ui";

export function ApplicantManagementPage() {
  const filter = useApplicantFilter();
  const {
    applicants,
    applicantCount,
    dogNames,
    isLoading,
    isError,
    isUpdating,
    handleUpdateStatus,
  } = useApplicantManagementPage({
    selectedDogName: filter.selectedDogName,
    allFilterValue: filter.allFilterValue,
  });
  const isFiltered = filter.selectedDogName !== filter.allFilterValue;

  return (
    <section className="flex w-full max-w-[900px] flex-col gap-lg">
      <header className="flex w-full flex-col gap-xs">
        <Heading as="h1" size="lg">
          신청자 목록
        </Heading>
        <Text color="muted">총 {applicantCount}건</Text>
      </header>

      <ApplicantFilterRow
        selectedValue={filter.selectedDogName}
        options={[
          { value: filter.allFilterValue, label: "전체" },
          ...dogNames.map((dogName) => ({ value: dogName, label: dogName })),
        ]}
        onSelect={filter.selectDogName}
      />

      {isLoading ? (
        <div className="flex min-h-80 w-full flex-col items-center justify-center gap-md">
          <Spinner size="lg" />
          <Text weight="medium">신청자 목록을 불러오고 있어요</Text>
        </div>
      ) : null}

      {isError ? (
        <EmptyState
          title="신청자 목록을 불러오지 못했어요"
          description="잠시 후 다시 시도해주세요."
        />
      ) : null}

      {!isLoading && !isError && applicants.length === 0 ? (
        <EmptyState
          title={isFiltered ? "선택한 강아지의 신청자가 없어요" : "아직 신청자가 없어요"}
          description={
            isFiltered
              ? "다른 강아지 필터를 선택하거나 전체 목록을 확인해보세요."
              : "강아지 공고에 입양 신청이 들어오면 이곳에서 확인할 수 있어요."
          }
          icon={<ClipboardList className="size-8" aria-hidden />}
        />
      ) : null}

      {!isLoading && !isError && applicants.length > 0 ? (
        <div className="flex w-full flex-col gap-md">
          {applicants.map((applicant, index) => (
            <div key={applicant.adoptionId} className="flex w-full flex-col gap-md">
              {index > 0 ? <Divider /> : null}
              <ApplicantCard
                applicant={applicant}
                disabled={isUpdating}
                onUpdateStatus={handleUpdateStatus}
              />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
