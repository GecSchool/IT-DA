"use client";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { DogProfileHero } from "@/features/dogs/components/dog-profile-hero";
import type { DogDetail } from "@/features/dogs/types/dog";
import type { DogDetailViewerMode } from "@/features/dogs/hooks/use-dog-detail-section";
import {
  Badge,
  BottomSheet,
  BottomSheetItem,
  Button,
  DropdownMenu,
  IconButton,
  Text,
} from "@/shared/ui";

const viewerAdoptionButtonLabels: Record<
  NonNullable<DogDetail["viewerAdoption"]>["status"],
  string
> = {
  PENDING: "신청 완료",
  ACCEPTED: "연락처 보기",
  REJECTED: "거절됨",
  COMPLETE: "입양 완료",
};

type HeaderBadgeState = {
  label: string;
  variant: "matching" | "adopted" | "pending" | "danger";
};

function getHeaderBadgeState(dog: DogDetail, viewerMode: DogDetailViewerMode): HeaderBadgeState {
  if (dog.status === "ADOPTED" || dog.viewerAdoption?.status === "COMPLETE") {
    return { label: "입양 완료", variant: "adopted" };
  }

  if (viewerMode === "owner" || !dog.viewerAdoption) {
    return { label: "매칭 중", variant: "matching" };
  }

  if (dog.viewerAdoption.status === "PENDING") {
    return { label: "신청 대기중", variant: "pending" };
  }

  if (dog.viewerAdoption.status === "ACCEPTED") {
    return { label: "신청 승인", variant: "matching" };
  }

  return { label: "신청 거절", variant: "danger" };
}

type DogDetailHeaderProps = {
  dog: DogDetail;
  viewerMode: DogDetailViewerMode;
  isApplying?: boolean;
  isDeleting?: boolean;
  onViewApplicants: () => void;
  onApply: () => void;
  onViewAdoption: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function DogDetailHeader({
  dog,
  viewerMode,
  isApplying,
  isDeleting,
  onViewApplicants,
  onApply,
  onViewAdoption,
  onEdit,
  onDelete,
}: DogDetailHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const viewerAdoption = dog.viewerAdoption;
  const headerBadge = getHeaderBadgeState(dog, viewerMode);
  const isAcceptedAdoption = viewerAdoption?.status === "ACCEPTED";

  const handleMobileEdit = () => {
    setIsMobileMenuOpen(false);
    onEdit();
  };

  const handleMobileDelete = () => {
    setIsMobileMenuOpen(false);
    onDelete();
  };

  const menu =
    viewerMode === "owner" ? (
      <>
        <div className="sm:hidden">
          <IconButton
            aria-label="강아지 관리 메뉴"
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MoreVertical className="size-5" aria-hidden />
          </IconButton>
        </div>
        <div className="hidden sm:block">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <IconButton aria-label="강아지 관리 메뉴" variant="ghost" size="sm">
                <MoreVertical className="size-5" aria-hidden />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Item onSelect={onEdit}>수정하기</DropdownMenu.Item>
              <DropdownMenu.Item variant="danger" disabled={isDeleting} onSelect={onDelete}>
                삭제하기
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
        <BottomSheet
          open={isMobileMenuOpen}
          title="강아지 관리"
          onOpenChange={setIsMobileMenuOpen}
        >
          <div className="flex flex-col gap-xs">
            <BottomSheetItem onClick={handleMobileEdit}>
              수정하기
              <Pencil className="size-5" aria-hidden />
            </BottomSheetItem>
            <BottomSheetItem variant="danger" disabled={isDeleting} onClick={handleMobileDelete}>
              삭제하기
              <Trash2 className="size-5" aria-hidden />
            </BottomSheetItem>
          </div>
        </BottomSheet>
      </>
    ) : null;

  const actions = (
    <div className="flex flex-col gap-sm sm:flex-row sm:items-center sm:justify-between">
      {viewerMode === "owner" ? (
        <div className="flex flex-wrap items-center gap-sm">
          <Text size="sm" color="muted">
            신청 {dog.applicationCount}건
          </Text>
          <Button variant="outline" size="sm" onClick={onViewApplicants}>
            신청 목록 보기
          </Button>
        </div>
      ) : (
        <span aria-hidden="true" />
      )}
      {viewerMode === "adopter" ? (
        <Button
          disabled={
            dog.status === "ADOPTED" ||
            (Boolean(viewerAdoption) && !isAcceptedAdoption) ||
            isApplying
          }
          onClick={isAcceptedAdoption ? onViewAdoption : onApply}
        >
          {isApplying
            ? "신청 중"
            : viewerAdoption
              ? viewerAdoptionButtonLabels[viewerAdoption.status]
              : "입양 신청하기"}
        </Button>
      ) : null}
    </div>
  );

  return (
    <DogProfileHero
      imageUrls={dog.imageUrls}
      name={dog.name}
      breed={dog.breed}
      gender={dog.gender}
      size={dog.size}
      weight={dog.weight}
      regionSido={dog.regionSido}
      regionSigungu={dog.regionSigungu}
      badge={<Badge variant={headerBadge.variant}>{headerBadge.label}</Badge>}
      menu={menu}
      actions={actions}
    />
  );
}
