"use client";

import { ExternalLink } from "lucide-react";

import type { MyAdoption } from "@/features/adoptions/types/adoption";
import { Badge, Dialog, PhotoTile, Text } from "@/shared/ui";

const adoptionStatusLabels: Record<MyAdoption["status"], string> = {
  PENDING: "검토 중",
  ACCEPTED: "수락됨",
  REJECTED: "거절됨",
  COMPLETE: "입양 완료",
};

const adoptionStatusVariants: Record<
  MyAdoption["status"],
  "pending" | "matching" | "danger" | "adopted"
> = {
  PENDING: "pending",
  ACCEPTED: "matching",
  REJECTED: "danger",
  COMPLETE: "adopted",
};

type AdoptionHistoryDetailModalProps = {
  open: boolean;
  adoption: MyAdoption | null;
  isDeleting?: boolean;
  deleteErrorMessage?: string | null;
  onClose: () => void;
  onViewProfile: (dogId: number) => void;
  onEdit: () => void;
  onDelete: (adoptionId: number) => void;
};

export function AdoptionHistoryDetailModal({
  open,
  adoption,
  isDeleting = false,
  deleteErrorMessage,
  onClose,
  onViewProfile,
  onEdit,
  onDelete,
}: AdoptionHistoryDetailModalProps) {
  if (!adoption) {
    return null;
  }

  return (
    <Dialog open={open} title="신청 상세 내역" onClose={onClose} className="max-w-[520px] p-md">
      <div className="flex flex-col gap-md">
        <div className="flex items-start gap-md">
          <div className="w-[72px] shrink-0">
            <PhotoTile
              src={adoption.dog.thumbnailUrl}
              alt={`${adoption.dog.name} 사진`}
              aspect="square"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            <div className="flex flex-wrap items-center gap-sm">
              <Text size="base" weight="bold" className="truncate">
                {adoption.dog.name}
              </Text>
              <Badge variant={adoptionStatusVariants[adoption.status]}>
                {adoptionStatusLabels[adoption.status]}
              </Badge>
            </div>
            <Text size="sm" color="muted">
              신청일 {formatDate(adoption.appliedAt)}
            </Text>
            {adoption.status === "ACCEPTED" && adoption.contactInfo ? (
              <Text size="sm" color="primary" weight="semibold">
                연락처 {adoption.contactInfo.email}
              </Text>
            ) : null}
            <button
              type="button"
              className="mt-1 inline-flex w-fit items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => onViewProfile(adoption.dog.dogId)}
            >
              프로필 상세보기
              <ExternalLink className="size-3.5" aria-hidden />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-sm">
          <Text size="sm" color="muted" weight="medium">
            신청 내용
          </Text>
          <div className="rounded-m px-md bg-muted py-sm">
            <Text className="whitespace-pre-wrap leading-relaxed">{adoption.introduction}</Text>
          </div>
        </div>

        <div className="flex items-center justify-between pt-xs">
          <button
            type="button"
            className="text-sm font-medium text-destructive transition-opacity disabled:opacity-40"
            onClick={() => onDelete(adoption.adoptionId)}
            disabled={isDeleting}
          >
            삭제하기
          </button>
          <button
            type="button"
            className="rounded-pill bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            onClick={onEdit}
          >
            수정하기
          </button>
        </div>
        {deleteErrorMessage ? (
          <Text size="sm" color="danger" className="text-right">
            {deleteErrorMessage}
          </Text>
        ) : null}
      </div>
    </Dialog>
  );
}

function formatDate(dateTime: string) {
  const date = new Date(dateTime);

  if (Number.isNaN(date.getTime())) {
    return dateTime;
  }

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
