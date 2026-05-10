"use client";

import { ArrowRight, Plus, X } from "lucide-react";
import type { Path, PathValue } from "react-hook-form";

import { genderOptions } from "@/features/dogs/constants/dog-register-options";
import type { DogRegisterFormValues } from "@/features/dogs/types/dog-register-form";
import { sidoOptions } from "@/shared/constants/region-options";
import {
  Button,
  Heading,
  IconButton,
  Input,
  PhotoTile,
  RadioGroup,
  Select,
  Text,
} from "@/shared/ui";

type DogRegisterBasicStepProps = {
  values: Partial<DogRegisterFormValues>;
  imageError?: string;
  nameError?: string;
  breedError?: string;
  regionSidoError?: string;
  regionSigunguError?: string;
  weightError?: string;
  sigunguOptions: { value: string; label: string }[];
  onFieldChange: <TKey extends Path<DogRegisterFormValues>>(
    field: TKey,
    value: PathValue<DogRegisterFormValues, TKey>
  ) => void;
  onRegionSidoChange: (value: string) => void;
  onAddImage: () => void;
  onRemoveImage: (imageUrl: string) => void;
  canGoNext: boolean;
  onNext: () => void;
};

export function DogRegisterBasicStep({
  values,
  imageError,
  nameError,
  breedError,
  regionSidoError,
  regionSigunguError,
  weightError,
  sigunguOptions,
  onFieldChange,
  onRegionSidoChange,
  onAddImage,
  onRemoveImage,
  canGoNext,
  onNext,
}: DogRegisterBasicStepProps) {
  const imageUrls = values.imageUrls ?? [];

  return (
    <>
      <Heading as="h1" size="lg">
        강아지 기본 정보를 입력해주세요
      </Heading>

      <section className="flex w-full flex-col gap-[10px]">
        <div className="flex items-center justify-between">
          <Text size="md" weight="semibold">
            사진 업로드
          </Text>
          {imageError ? (
            <Text size="sm" color="danger">
              {imageError}
            </Text>
          ) : null}
        </div>
        <div className="grid grid-cols-3 gap-sm sm:flex sm:flex-wrap">
          {imageUrls.map((imageUrl) => (
            <div key={imageUrl} className="relative size-[120px]">
              <PhotoTile src={imageUrl} alt="강아지 사진" aspect="square" />
              <IconButton
                aria-label="사진 삭제"
                size="sm"
                variant="outline"
                className="absolute right-1 top-1 bg-card"
                onClick={() => onRemoveImage(imageUrl)}
              >
                <X className="size-4" aria-hidden />
              </IconButton>
            </div>
          ))}
          {imageUrls.length < 3 ? (
            <button
              type="button"
              className="flex size-[120px] items-center justify-center rounded-m border border-border bg-muted text-muted-foreground"
              onClick={onAddImage}
            >
              <Plus className="size-5" aria-hidden />
            </button>
          ) : null}
        </div>
      </section>

      <Input
        label="이름"
        placeholder="예: 콩이"
        value={values.name ?? ""}
        error={nameError}
        onChange={(event) => onFieldChange("name", event.target.value)}
      />
      <Input
        label="몸무게(kg)"
        type="number"
        inputMode="decimal"
        placeholder="예: 5.2"
        value={values.weight ? String(values.weight) : ""}
        error={weightError}
        onChange={(event) => onFieldChange("weight", Number(event.target.value))}
      />
      <RadioGroup
        label="성별"
        options={genderOptions}
        value={values.gender}
        onValueChange={(value) => onFieldChange("gender", value as DogRegisterFormValues["gender"])}
      />
      <Input
        label="품종"
        placeholder="예: 믹스"
        value={values.breed ?? ""}
        error={breedError}
        onChange={(event) => onFieldChange("breed", event.target.value)}
      />

      <section className="flex w-full flex-col gap-[10px]">
        <Text size="md" weight="semibold">
          지역
        </Text>
        <div className="grid w-full grid-cols-1 gap-sm sm:grid-cols-2">
          <Select
            placeholder="시/도 선택"
            options={sidoOptions}
            value={values.regionSido}
            error={regionSidoError}
            onValueChange={onRegionSidoChange}
          />
          <Select
            placeholder="구/군 선택"
            options={sigunguOptions}
            value={values.regionSigungu}
            error={regionSigunguError}
            disabled={!values.regionSido}
            onValueChange={(value) => onFieldChange("regionSigungu", value)}
          />
        </div>
      </section>

      <div className="flex w-full justify-end">
        <Button
          disabled={!canGoNext}
          rightIcon={<ArrowRight className="size-4" aria-hidden />}
          onClick={onNext}
        >
          다음
        </Button>
      </div>
    </>
  );
}
