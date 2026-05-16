"use client";

import { booleanOptions } from "@/features/dogs/constants/dog-register-options";
import { Chip, Text } from "@/shared/ui";

type DogBooleanChoiceRowProps = {
  label: string;
  value?: boolean;
  onChange: (value: boolean) => void;
};

export function DogBooleanChoiceRow({ label, value = false, onChange }: DogBooleanChoiceRowProps) {
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
