"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  useCurrentSessionQuery,
  useUpdateMyProfileMutation,
} from "@/features/auth/queries";
import type { PreferredTrait } from "@/features/auth/types/auth";
import type { LifestyleOnboardingFormValues } from "@/features/auth/types/lifestyle-onboarding-form";

const initialLifestyleOnboardingValues: LifestyleOnboardingFormValues = {
  housingType: "APARTMENT",
  familyType: "SINGLE",
  hasPet: "NONE",
  dailyOutTime: "UNDER_4H",
  preferredTraits: ["ACTIVE", "AFFECTIONATE"],
  preferredSize: "ANY",
};

export function useLifestyleOnboardingForm() {
  const router = useRouter();
  const [values, setValues] = useState(initialLifestyleOnboardingValues);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);
  const currentSessionQuery = useCurrentSessionQuery();
  const updateMyProfileMutation = useUpdateMyProfileMutation();

  const updateField = <TKey extends keyof LifestyleOnboardingFormValues>(
    field: TKey,
    value: LifestyleOnboardingFormValues[TKey]
  ) => {
    setSubmitErrorMessage(null);
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handlePreferredTraitToggle = (trait: PreferredTrait) => {
    setSubmitErrorMessage(null);
    setValues((currentValues) => ({
      ...currentValues,
      preferredTraits: currentValues.preferredTraits.includes(trait)
        ? currentValues.preferredTraits.filter((selectedTrait) => selectedTrait !== trait)
        : [...currentValues.preferredTraits, trait],
    }));
  };

  const canSubmit =
    Boolean(currentSessionQuery.data?.nickname) &&
    Boolean(currentSessionQuery.data?.regionSido) &&
    Boolean(currentSessionQuery.data?.regionSigungu) &&
    values.preferredTraits.length > 0 &&
    !updateMyProfileMutation.isPending;

  const handleSubmitLifestyleOnboarding = async () => {
    if (
      !currentSessionQuery.data?.nickname ||
      !currentSessionQuery.data.regionSido ||
      !currentSessionQuery.data.regionSigungu
    ) {
      setSubmitErrorMessage("사용자 정보를 불러오지 못했어요. 다시 로그인해주세요.");
      return;
    }

    if (!canSubmit) {
      setSubmitErrorMessage("필수 정보를 모두 선택해주세요.");
      return;
    }

    try {
      setSubmitErrorMessage(null);
      await updateMyProfileMutation.mutateAsync({
        nickname: currentSessionQuery.data.nickname,
        regionSido: currentSessionQuery.data.regionSido,
        regionSigungu: currentSessionQuery.data.regionSigungu,
        lifestyle: {
          housingType: values.housingType,
          familyType: values.familyType,
          hasPet: values.hasPet,
          dailyOutTime: values.dailyOutTime,
          preferredTraits: values.preferredTraits,
          preferredSize: values.preferredSize,
        },
      });
      router.push("/match");
    } catch {
      setSubmitErrorMessage("라이프스타일 정보를 저장하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return {
    values,
    canSubmit,
    isSubmitting: updateMyProfileMutation.isPending,
    submitErrorMessage,
    updateField,
    handlePreferredTraitToggle,
    handleSubmitLifestyleOnboarding,
  };
}
