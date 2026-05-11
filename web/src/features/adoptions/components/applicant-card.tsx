"use client";

import type { AdoptionApplicant, AdoptionStatusUpdate } from "@/features/adoptions/types/adoption";
import { familyTypeLabels, housingTypeLabels } from "@/features/auth/constants/lifestyle-options";
import { Badge, Button, Text } from "@/shared/ui";

const adoptionStatusLabels: Record<AdoptionApplicant["status"], string> = {
  PENDING: "검토중",
  ACCEPTED: "승인",
  REJECTED: "거절",
  COMPLETE: "완료",
};

const adoptionStatusVariants: Record<
  AdoptionApplicant["status"],
  "pending" | "matching" | "danger" | "adopted"
> = {
  PENDING: "pending",
  ACCEPTED: "matching",
  REJECTED: "danger",
  COMPLETE: "adopted",
};

type ApplicantCardProps = {
  applicant: AdoptionApplicant;
  disabled?: boolean;
  onUpdateStatus: (adoptionId: number, status: AdoptionStatusUpdate) => void;
};

export function ApplicantCard({ applicant, disabled, onUpdateStatus }: ApplicantCardProps) {
  const isPending = applicant.status === "PENDING";

  return (
    <article className="flex w-full flex-col gap-[10px] px-md py-3">
      <div className="flex items-center justify-between gap-md">
        <Text size="sm" color="muted" weight="semibold" className="min-w-0 truncate">
          {applicant.dogName}
        </Text>
        <Badge variant={adoptionStatusVariants[applicant.status]}>
          {adoptionStatusLabels[applicant.status]}
        </Badge>
      </div>

      <div className="flex items-start justify-between gap-md">
        <div className="flex min-w-0 flex-col gap-[3px]">
          <Text size="md" weight="semibold" className="truncate">
            {applicant.applicant.nickname}
          </Text>
          <Text size="sm" color="muted" className="break-keep">
            {housingTypeLabels[applicant.applicant.housingType]} ·{" "}
            {familyTypeLabels[applicant.applicant.familyType]}
          </Text>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-0.5">
          <Text size="lg" weight="bold" color={applicant.matchScore >= 80 ? "success" : "warning"}>
            {applicant.matchScore}%
          </Text>
          <Text size="xs" color="muted">
            매칭
          </Text>
        </div>
      </div>

      <Text size="sm" color="muted" className="break-keep leading-relaxed">
        {applicant.introduction}
      </Text>

      {applicant.contactInfo ? (
        <Text size="sm" weight="medium">
          연락처: {applicant.contactInfo.email}
        </Text>
      ) : null}

      {isPending ? (
        <div className="flex items-center gap-sm">
          <Button
            variant="outline"
            disabled={disabled}
            onClick={() => onUpdateStatus(applicant.adoptionId, "REJECTED")}
          >
            거절
          </Button>
          <Button
            disabled={disabled}
            onClick={() => onUpdateStatus(applicant.adoptionId, "ACCEPTED")}
          >
            수락
          </Button>
        </div>
      ) : null}
    </article>
  );
}
