"use client";

import { ArrowRight } from "lucide-react";

import { LifestyleChoiceSection } from "@/features/auth/components/lifestyle-choice-section";
import {
  familyOptions,
  housingOptions,
  petOptions,
} from "@/features/auth/constants/lifestyle-options";
import type { FamilyType, HasPet, HousingType } from "@/features/auth/types/auth";
import { Button, Heading } from "@/shared/ui";

type LifestyleStepOneProps = {
  housingType: HousingType;
  familyType: FamilyType;
  hasPet: HasPet;
  onHousingTypeChange: (value: HousingType) => void;
  onFamilyTypeChange: (value: FamilyType) => void;
  onHasPetChange: (value: HasPet) => void;
  onNext: () => void;
};

export function LifestyleStepOne({
  housingType,
  familyType,
  hasPet,
  onHousingTypeChange,
  onFamilyTypeChange,
  onHasPetChange,
  onNext,
}: LifestyleStepOneProps) {
  return (
    <>
      <Heading as="h1" size="lg">
        나의 환경을 알려주세요
      </Heading>

      <LifestyleChoiceSection
        label="주거 형태"
        options={housingOptions}
        selectedValue={housingType}
        onSelect={onHousingTypeChange}
      />

      <LifestyleChoiceSection
        label="가족 구성"
        options={familyOptions}
        selectedValue={familyType}
        onSelect={onFamilyTypeChange}
      />

      <LifestyleChoiceSection
        label="다른 반려동물"
        options={petOptions}
        selectedValue={hasPet}
        onSelect={onHasPetChange}
      />

      <div className="flex w-full justify-end">
        <Button rightIcon={<ArrowRight className="size-4" aria-hidden />} onClick={onNext}>
          다음
        </Button>
      </div>
    </>
  );
}
