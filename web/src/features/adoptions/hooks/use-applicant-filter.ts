"use client";

import { useState } from "react";

const ALL_APPLICANTS_FILTER = "ALL";

export type ApplicantFilterValue = typeof ALL_APPLICANTS_FILTER | string;

export function useApplicantFilter() {
  const [selectedDogName, setSelectedDogName] =
    useState<ApplicantFilterValue>(ALL_APPLICANTS_FILTER);

  const selectDogName = (dogName: ApplicantFilterValue) => {
    setSelectedDogName(dogName);
  };

  return {
    allFilterValue: ALL_APPLICANTS_FILTER,
    selectedDogName,
    selectDogName,
  };
}
