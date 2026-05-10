"use client";

import type { DogChoiceOption } from "@/features/dogs/constants/dog-register-options";
import { Chip, Text } from "@/shared/ui";

type DogChoiceSectionProps<TValue extends string> = {
  label: string;
  options: DogChoiceOption<TValue>[];
  selectedValue?: TValue;
  selectedValues?: TValue[];
  onSelect: (value: TValue) => void;
};

export function DogChoiceSection<TValue extends string>({
  label,
  options,
  selectedValue,
  selectedValues,
  onSelect,
}: DogChoiceSectionProps<TValue>) {
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
            <Chip key={option.value} selected={selected} onClick={() => onSelect(option.value)}>
              {option.label}
            </Chip>
          );
        })}
      </div>
    </section>
  );
}
