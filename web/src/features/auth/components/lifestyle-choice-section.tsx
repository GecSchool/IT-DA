"use client";

import type { ChoiceOption } from "@/features/auth/types/lifestyle-onboarding-form";
import { Chip, Text } from "@/shared/ui";

type LifestyleChoiceSectionProps<TValue extends string> = {
  label: string;
  options: ChoiceOption<TValue>[];
  selectedValue?: TValue;
  selectedValues?: TValue[];
  onSelect: (value: TValue) => void;
};

export function LifestyleChoiceSection<TValue extends string>({
  label,
  options,
  selectedValue,
  selectedValues,
  onSelect,
}: LifestyleChoiceSectionProps<TValue>) {
  return (
    <section className="flex w-full flex-col gap-[10px]">
      <Text size="md" weight="semibold">
        {label}
      </Text>
      <div className="flex flex-wrap gap-sm">
        {options.map((option) => {
          const selected = selectedValues
            ? selectedValues.includes(option.value)
            : selectedValue === option.value;

          return (
            <Chip
              key={option.value}
              selected={selected}
              onClick={() => onSelect(option.value)}
            >
              {option.label}
            </Chip>
          );
        })}
      </div>
    </section>
  );
}
