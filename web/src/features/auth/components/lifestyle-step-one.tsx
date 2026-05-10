"use client";

import { ArrowRight } from "lucide-react";

import { LifestyleChoiceSection } from "@/features/auth/components/lifestyle-choice-section";
import type { FamilyType, HasPet, HousingType } from "@/features/auth/types/auth";
import type { ChoiceOption } from "@/features/auth/types/lifestyle-onboarding-form";
import { Button, Heading } from "@/shared/ui";

const housingOptions: ChoiceOption<HousingType>[] = [
  { value: "APARTMENT", label: "아파트" },
  { value: "VILLA", label: "빌라" },
  { value: "HOUSE", label: "단독주택" },
];

const familyOptions: ChoiceOption<FamilyType>[] = [
  { value: "SINGLE", label: "1인" },
  { value: "COUPLE", label: "부부" },
  { value: "WITH_CHILD", label: "아이 있음" },
];

const petOptions: ChoiceOption<HasPet>[] = [
  { value: "NONE", label: "없음" },
  { value: "DOG", label: "개 있음" },
  { value: "CAT", label: "고양이" },
];

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
