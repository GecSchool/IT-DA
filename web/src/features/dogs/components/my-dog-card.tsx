"use client";

import type { MyDogSummary } from "@/features/dogs/types/dog";
import { Badge, PhotoTile, Text } from "@/shared/ui";

const dogStatusLabels: Record<MyDogSummary["status"], string> = {
  AVAILABLE: "매칭 중",
  ADOPTED: "입양 완료",
};

const dogStatusVariants: Record<MyDogSummary["status"], "matching" | "adopted"> = {
  AVAILABLE: "matching",
  ADOPTED: "adopted",
};

type MyDogCardProps = {
  dog: MyDogSummary;
  onClick: (dogId: number) => void;
};

export function MyDogCard({ dog, onClick }: MyDogCardProps) {
  return (
    <button
      type="button"
      className="group flex w-full flex-col overflow-hidden rounded-lg border border-border bg-card text-left transition-colors hover:border-primary"
      onClick={() => onClick(dog.dogId)}
    >
      <PhotoTile
        src={dog.thumbnailUrl}
        alt={`${dog.name} 사진`}
        aspect="square"
        className="rounded-none"
      />
      <div className="flex w-full flex-col gap-sm p-md">
        <div className="flex items-start justify-between gap-sm">
          <Text size="base" weight="bold" className="min-w-0 truncate">
            {dog.name}
          </Text>
          <Badge variant={dogStatusVariants[dog.status]} size="sm">
            {dogStatusLabels[dog.status]}
          </Badge>
        </div>
        <Text size="sm" color="muted">
          신청 {dog.applicationCount}건
        </Text>
      </div>
    </button>
  );
}
