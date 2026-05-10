"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { LifestyleChoiceSection } from "@/features/auth/components/lifestyle-choice-section";
import type {
  DailyOutTime,
  PreferredDogSize,
  PreferredTrait,
} from "@/features/auth/types/auth";
import type { ChoiceOption } from "@/features/auth/types/lifestyle-onboarding-form";
import { Button, Heading, Text } from "@/shared/ui";

const dailyOutTimeOptions: ChoiceOption<DailyOutTime>[] = [
  { value: "UNDER_4H", label: "4시간 이하" },
  { value: "4_TO_8H", label: "4~8시간" },
  { value: "OVER_8H", label: "8시간 이상" },
];

const preferredTraitOptions: ChoiceOption<PreferredTrait>[] = [
  { value: "ACTIVE", label: "활발함" },
  { value: "AFFECTIONATE", label: "애교많음" },
  { value: "CALM", label: "얌전함" },
  { value: "INDEPENDENT", label: "독립적" },
  { value: "FRIENDLY_TO_STRANGERS", label: "낯선사람 친화적" },
  { value: "PLAYFUL", label: "장난기많음" },
  { value: "TIMID", label: "겁쟁이" },
];

const preferredSizeOptions: ChoiceOption<PreferredDogSize>[] = [
  { value: "SMALL", label: "소형" },
  { value: "MEDIUM", label: "중형" },
  { value: "LARGE", label: "대형" },
  { value: "ANY", label: "상관없음" },
];

type LifestyleStepTwoProps = {
  dailyOutTime: DailyOutTime;
  preferredTraits: PreferredTrait[];
  preferredSize: PreferredDogSize;
  canSubmit: boolean;
  isSubmitting: boolean;
  submitErrorMessage: string | null;
  onDailyOutTimeChange: (value: DailyOutTime) => void;
  onPreferredTraitToggle: (value: PreferredTrait) => void;
  onPreferredSizeChange: (value: PreferredDogSize) => void;
  onPrevious: () => void;
  onSubmit: () => void;
};

export function LifestyleStepTwo({
  dailyOutTime,
  preferredTraits,
  preferredSize,
  canSubmit,
  isSubmitting,
  submitErrorMessage,
  onDailyOutTimeChange,
  onPreferredTraitToggle,
  onPreferredSizeChange,
  onPrevious,
  onSubmit,
}: LifestyleStepTwoProps) {
  return (
    <>
      <Heading as="h1" size="lg">
        어떤 강아지를 원하세요?
      </Heading>

      <LifestyleChoiceSection
        label="하루 외출 시간"
        options={dailyOutTimeOptions}
        selectedValue={dailyOutTime}
        onSelect={onDailyOutTimeChange}
      />

      <LifestyleChoiceSection
        label="선호하는 성향 (다중선택)"
        options={preferredTraitOptions}
        selectedValues={preferredTraits}
        onSelect={onPreferredTraitToggle}
      />

      <LifestyleChoiceSection
        label="선호 크기"
        options={preferredSizeOptions}
        selectedValue={preferredSize}
        onSelect={onPreferredSizeChange}
      />

      <div className="relative flex w-full justify-between">
        {submitErrorMessage ? (
          <Text
            size="sm"
            color="danger"
            className="absolute bottom-full right-0 mb-2 whitespace-nowrap"
          >
            {submitErrorMessage}
          </Text>
        ) : null}
        <Button
          variant="outline"
          leftIcon={<ArrowLeft className="size-4" aria-hidden />}
          onClick={onPrevious}
        >
          이전
        </Button>
        <Button
          disabled={!canSubmit}
          rightIcon={<ArrowRight className="size-4" aria-hidden />}
          onClick={onSubmit}
        >
          {isSubmitting ? "저장 중" : "매칭하기"}
        </Button>
      </div>
    </>
  );
}
