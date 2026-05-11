"use client";

import { ArrowRight, ClipboardList } from "lucide-react";

import { ApplicantCard } from "@/features/adoptions/components/applicant-card";
import { useApplicantListSection } from "@/features/adoptions/hooks/use-applicant-list-section";
import { Badge, Button, Divider, EmptyState, Heading, Spinner, Text } from "@/shared/ui";

export function ApplicantListSection() {
  const {
    applicants,
    applicantCount,
    isLoading,
    isError,
    isUpdating,
    handleViewAll,
    handleUpdateStatus,
  } = useApplicantListSection();

  return (
    <section className="flex w-full flex-col gap-lg">
      <header className="flex w-full items-center justify-between gap-md px-md">
        <div className="flex items-center gap-sm">
          <Heading as="h2" size="lg">
            신청자 목록
          </Heading>
          <Badge variant="matching" size="sm" showDot={false}>
            총 {applicantCount}건
          </Badge>
        </div>
        <Button
          variant="outline"
          rightIcon={<ArrowRight className="size-4" aria-hidden />}
          onClick={handleViewAll}
        >
          모두 보러 가기
        </Button>
      </header>

      {isLoading ? (
        <div className="flex min-h-48 w-full flex-col items-center justify-center gap-md">
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
          title="아직 신청자가 없어요"
          description="강아지 공고에 입양 신청이 들어오면 이곳에서 확인할 수 있어요."
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
