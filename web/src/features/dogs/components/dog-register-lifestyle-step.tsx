"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Path, PathValue } from "react-hook-form";

import {
  barkingLevelOptions,
  separationAnxietyOptions,
  toiletTrainingOptions,
  walkAmountOptions,
  dogTraitOptions,
} from "@/features/dogs/constants/dog-register-options";
import { DogChoiceSection } from "@/features/dogs/components/dog-choice-section";
import type { BarkingLevel, DogTrait, WalkAmount } from "@/features/dogs/types/dog";
import type { DogRegisterFormValues } from "@/features/dogs/types/dog-register-form";
import { Button, Heading, RadioGroup, Text } from "@/shared/ui";

type DogRegisterLifestyleStepProps = {
  values: Partial<DogRegisterFormValues>;
  traitsError?: string;
  onFieldChange: <TKey extends Path<DogRegisterFormValues>>(
    field: TKey,
    value: PathValue<DogRegisterFormValues, TKey>
  ) => void;
  onTraitToggle: (trait: DogTrait) => void;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function DogRegisterLifestyleStep({
  values,
  traitsError,
  onFieldChange,
  onTraitToggle,
  canGoNext,
  onPrevious,
  onNext,
}: DogRegisterLifestyleStepProps) {
  return (
    <>
      <Heading as="h1" size="lg">
        성격과 생활 패턴을 알려주세요
      </Heading>

      <DogChoiceSection
        label="성격 태그 (다중선택)"
        options={dogTraitOptions}
        selectedValues={values.traits}
        onSelect={onTraitToggle}
      />
      {traitsError ? (
        <Text size="sm" color="danger">
          {traitsError}
        </Text>
      ) : null}

      <DogChoiceSection
        label="산책량"
        options={walkAmountOptions}
        selectedValue={values.walkAmount}
        onSelect={(value: WalkAmount) => onFieldChange("walkAmount", value)}
      />

      <RadioGroup
        label="분리불안"
        options={separationAnxietyOptions}
        value={String(values.isSeparationAnxiety)}
        onValueChange={(value) => onFieldChange("isSeparationAnxiety", value === "true")}
      />

      <RadioGroup
        label="배변훈련"
        options={toiletTrainingOptions}
        value={String(values.isToiletTrained)}
        onValueChange={(value) => onFieldChange("isToiletTrained", value === "true")}
      />

      <DogChoiceSection
        label="짖음"
        options={barkingLevelOptions}
        selectedValue={values.barkingLevel}
        onSelect={(value: BarkingLevel) => onFieldChange("barkingLevel", value)}
      />

      <div className="flex w-full justify-between">
        <Button
          variant="outline"
          leftIcon={<ArrowLeft className="size-4" aria-hidden />}
          onClick={onPrevious}
        >
          이전
        </Button>
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
