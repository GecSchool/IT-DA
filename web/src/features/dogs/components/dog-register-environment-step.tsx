"use client";

import { ArrowLeft } from "lucide-react";
import type { Path, PathValue } from "react-hook-form";

import { booleanOptions } from "@/features/dogs/constants/dog-register-options";
import type { DogRegisterFormValues } from "@/features/dogs/types/dog-register-form";
import { Button, Chip, Heading, Text, Textarea } from "@/shared/ui";

type DogRegisterEnvironmentStepProps = {
  values: Partial<DogRegisterFormValues>;
  submitErrorMessage: string | null;
  isSubmitting: boolean;
  canSubmit: boolean;
  onFieldChange: <TKey extends Path<DogRegisterFormValues>>(
    field: TKey,
    value: PathValue<DogRegisterFormValues, TKey>
  ) => void;
  onPrevious: () => void;
};

export function DogRegisterEnvironmentStep({
  values,
  submitErrorMessage,
  isSubmitting,
  canSubmit,
  onFieldChange,
  onPrevious,
}: DogRegisterEnvironmentStepProps) {
  return (
    <>
      <Heading as="h1" size="lg">
        환경과 한마디를 알려주세요
      </Heading>

      <section className="flex w-full flex-col gap-3">
        <Text size="md" weight="semibold">
          함께할 수 있는 환경
        </Text>
        <BooleanChoiceRow
          label="아파트 가능"
          value={values.canLiveInApartment}
          onChange={(value) => onFieldChange("canLiveInApartment", value)}
        />
        <BooleanChoiceRow
          label="아이와 생활"
          value={values.canLiveWithChild}
          onChange={(value) => onFieldChange("canLiveWithChild", value)}
        />
        <BooleanChoiceRow
          label="다른 개"
          value={values.canLiveWithDog}
          onChange={(value) => onFieldChange("canLiveWithDog", value)}
        />
        <BooleanChoiceRow
          label="고양이"
          value={values.canLiveWithCat}
          onChange={(value) => onFieldChange("canLiveWithCat", value)}
        />
      </section>

      <Textarea
        label="한마디 (선택)"
        placeholder="강아지의 성격이나 입양자에게 전하고 싶은 말을 적어주세요."
        value={values.fosterNote ?? ""}
        onChange={(event) => onFieldChange("fosterNote", event.target.value)}
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
        <Button type="submit" disabled={!canSubmit}>
          {isSubmitting ? "등록 중" : "등록 완료"}
        </Button>
      </div>
    </>
  );
}

type BooleanChoiceRowProps = {
  label: string;
  value?: boolean;
  onChange: (value: boolean) => void;
};

function BooleanChoiceRow({ label, value = false, onChange }: BooleanChoiceRowProps) {
  return (
    <div className="flex w-full items-center justify-between gap-md">
      <Text>{label}</Text>
      <div className="flex shrink-0 gap-sm">
        {booleanOptions.map((option) => (
          <Chip
            key={option.value}
            selected={String(value) === option.value}
            onClick={() => onChange(option.value === "true")}
          >
            {option.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
