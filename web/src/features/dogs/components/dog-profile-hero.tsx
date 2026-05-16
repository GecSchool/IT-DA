"use client";

import { MapPin } from "lucide-react";
import type { ReactNode } from "react";

import { DogDetailPhotoCarousel } from "@/features/dogs/components/dog-detail-photo-carousel";
import type { DogSize, Gender } from "@/features/dogs/types/dog";
import { Heading, Text } from "@/shared/ui";

const genderLabels: Record<Gender, string> = {
  MALE: "수컷",
  FEMALE: "암컷",
};

const dogSizeLabels: Record<DogSize, string> = {
  SMALL: "소형",
  MEDIUM: "중형",
  LARGE: "대형",
};

type DogProfileHeroProps = {
  imageUrls: string[];
  name: string;
  breed: string;
  gender: Gender;
  size: DogSize;
  weight: number;
  regionSido: string;
  regionSigungu?: string;
  badge?: ReactNode;
  menu?: ReactNode;
  actions?: ReactNode;
};

export function DogProfileHero({
  imageUrls,
  name,
  breed,
  gender,
  size,
  weight,
  regionSido,
  regionSigungu,
  badge,
  menu,
  actions,
}: DogProfileHeroProps) {
  const regionLabel = [regionSido, regionSigungu].filter(Boolean).join(" ");

  return (
    <header className="flex w-full flex-col items-center gap-lg rounded-lg bg-card p-sm sm:flex-row sm:items-start sm:p-md">
      <DogDetailPhotoCarousel imageUrls={imageUrls} dogName={name} />

      <div className="flex min-w-0 flex-1 flex-col gap-md self-stretch">
        <div className="flex flex-col gap-sm">
          <div className="flex items-start justify-between gap-md">
            <div className="flex min-w-0 flex-wrap items-center gap-sm pr-sm">
              <Heading as="h1" size="md" className="min-w-0 truncate">
                {name}
              </Heading>
              {badge}
            </div>
            {menu}
          </div>
          <Text color="muted" className="break-keep">
            {breed} · {genderLabels[gender]} · {dogSizeLabels[size]} · {weight}kg
          </Text>
          <div className="flex items-center gap-xs text-muted-foreground">
            <MapPin className="size-4" aria-hidden />
            <Text size="sm" color="muted">
              {regionLabel}
            </Text>
          </div>
        </div>

        {actions}
      </div>
    </header>
  );
}
