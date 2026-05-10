"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  useCheckNicknameQuery,
  useCompleteOnboardingMutation,
} from "@/features/auth/queries";
import {
  profileSetupSchema,
  type ProfileSetupFormValues,
} from "@/features/auth/types/profile-setup-form";
import { sidoOptions, sigunguOptionsBySido } from "@/shared/constants/region-options";

export function useProfileSetupForm() {
  const [debouncedNickname, setDebouncedNickname] = useState("");
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);
  const completeOnboardingMutation = useCompleteOnboardingMutation();

  const form = useForm<ProfileSetupFormValues>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      nickname: "",
      regionSido: "",
      regionSigungu: "",
    },
    mode: "onChange",
  });

  const nickname = useWatch({ control: form.control, name: "nickname" });
  const regionSido = useWatch({ control: form.control, name: "regionSido" });
  const regionSigungu = useWatch({ control: form.control, name: "regionSigungu" });
  const normalizedNickname = nickname.trim();
  const debouncedNicknameValidation = profileSetupSchema.shape.nickname.safeParse(debouncedNickname);
  const isNicknameValid = debouncedNicknameValidation.success;
  const shouldShowNicknameValidationError =
    form.formState.dirtyFields.nickname &&
    debouncedNickname.length > 0 &&
    debouncedNickname === normalizedNickname &&
    !debouncedNicknameValidation.success;
  const shouldCheckNickname =
    isNicknameValid &&
    debouncedNickname.length > 0 &&
    debouncedNickname === normalizedNickname;
  const nicknameCheckQuery = useCheckNicknameQuery(debouncedNickname, shouldCheckNickname);
  const isNicknameDuplicate = shouldCheckNickname && nicknameCheckQuery.data?.isDuplicate;
  const isNicknameChecked =
    shouldCheckNickname &&
    nicknameCheckQuery.isSuccess &&
    nicknameCheckQuery.data.isDuplicate === false;
  const nicknameErrorMessage =
    (shouldShowNicknameValidationError ? debouncedNicknameValidation.error.issues[0]?.message : undefined) ??
    (isNicknameDuplicate ? "이미 사용 중인 닉네임이에요." : undefined) ??
    (shouldCheckNickname && nicknameCheckQuery.isError
      ? "닉네임 중복 확인에 실패했어요. 잠시 후 다시 입력해주세요."
      : undefined);

  const sigunguOptions = useMemo(
    () => sigunguOptionsBySido[regionSido as keyof typeof sigunguOptionsBySido] ?? [],
    [regionSido]
  );

  const canSubmit =
    form.formState.isValid &&
    isNicknameChecked &&
    !nicknameCheckQuery.isFetching &&
    !completeOnboardingMutation.isPending;

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setDebouncedNickname(normalizedNickname);
    }, 500);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [normalizedNickname]);

  const handleNicknameChange = (value: string) => {
    setSubmitErrorMessage(null);
    form.setValue("nickname", value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleRegionSidoChange = (value: string) => {
    setSubmitErrorMessage(null);
    form.setValue("regionSido", value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue("regionSigungu", "", {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleRegionSigunguChange = (value: string) => {
    setSubmitErrorMessage(null);
    form.setValue("regionSigungu", value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleSubmitProfileSetup = form.handleSubmit(async (values) => {
    try {
      setSubmitErrorMessage(null);
      await completeOnboardingMutation.mutateAsync(values);
    } catch {
      setSubmitErrorMessage("기본 정보를 저장하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  });

  return {
    form,
    nickname,
    regionSido,
    regionSigungu,
    isNicknameChecked,
    nicknameErrorMessage,
    isCheckingNickname: shouldCheckNickname && nicknameCheckQuery.isFetching,
    sidoOptions,
    sigunguOptions,
    canSubmit,
    isSubmitting: completeOnboardingMutation.isPending,
    submitErrorMessage,
    handleNicknameChange,
    handleRegionSidoChange,
    handleRegionSigunguChange,
    handleSubmitProfileSetup,
  };
}
