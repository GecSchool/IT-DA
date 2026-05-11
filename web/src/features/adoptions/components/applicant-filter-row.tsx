"use client";

import type { ApplicantFilterValue } from "@/features/adoptions/hooks/use-applicant-filter";
import { Chip } from "@/shared/ui";

type ApplicantFilterRowProps = {
  allFilterValue: ApplicantFilterValue;
  selectedDogName: ApplicantFilterValue;
  dogNames: string[];
  onSelect: (dogName: ApplicantFilterValue) => void;
};

export function ApplicantFilterRow({
  allFilterValue,
  selectedDogName,
  dogNames,
  onSelect,
}: ApplicantFilterRowProps) {
  return (
    <div className="flex w-full gap-sm overflow-x-auto pb-xs">
      <Chip selected={selectedDogName === allFilterValue} onClick={() => onSelect(allFilterValue)}>
        전체
      </Chip>
      {dogNames.map((dogName) => (
        <Chip
          key={dogName}
          selected={selectedDogName === dogName}
          onClick={() => onSelect(dogName)}
        >
          {dogName}
        </Chip>
      ))}
    </div>
  );
}
