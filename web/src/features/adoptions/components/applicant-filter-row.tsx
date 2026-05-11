"use client";

import { Chip } from "@/shared/ui";

export type ApplicantFilterOption<TValue extends string = string> = {
  value: TValue;
  label: string;
};

type ApplicantFilterRowProps = {
  selectedValue: string;
  options: ApplicantFilterOption[];
  onSelect: (value: string) => void;
};

export function ApplicantFilterRow({ selectedValue, options, onSelect }: ApplicantFilterRowProps) {
  return (
    <div className="flex w-full gap-sm overflow-x-auto pb-xs">
      {options.map((option) => (
        <Chip
          key={option.value}
          selected={selectedValue === option.value}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  );
}
