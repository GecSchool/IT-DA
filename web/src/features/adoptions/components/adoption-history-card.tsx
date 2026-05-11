"use client";

import type { MyAdoption } from "@/features/adoptions/types/adoption";
import { cn } from "@/shared/lib/cn";
import { Badge, PhotoTile, Text } from "@/shared/ui";

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
  REJECTED: "adopted",
  COMPLETE: "adopted",
};

type AdoptionHistoryCardProps = {
  adoption: MyAdoption;
  onPreview: (adoption: MyAdoption) => void;
};

export function AdoptionHistoryCard({ adoption, onPreview }: AdoptionHistoryCardProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex min-h-[68px] w-full items-center gap-md py-sm px-md text-left outline-none transition-colors",
        "hover:bg-muted/70 focus-visible:bg-muted/70"
      )}
      onClick={() => onPreview(adoption)}
    >
      <div className="w-14 shrink-0">
        <PhotoTile
          src={adoption.dog.thumbnailUrl}
          alt={`${adoption.dog.name} 사진`}
          aspect="square"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Text size="md" weight="semibold" className="truncate">
          {adoption.dog.name}
        </Text>
        {adoption.status === "ACCEPTED" ? (
          <Text size="sm" color="primary" weight="semibold" className="truncate">
            {adoption.contactInfo?.email ?? "연락처 확인 가능"}
          </Text>
        ) : (
          <Text size="sm" color="muted">
            신청일 {formatDate(adoption.appliedAt)}
          </Text>
        )}
      </div>
      <Badge variant={adoptionStatusVariants[adoption.status]}>
        {adoptionStatusLabels[adoption.status]}
      </Badge>
    </button>
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
