"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch, type Path, type PathValue } from "react-hook-form";

import { useUpdateMyProfileMutation } from "@/features/auth/queries";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  profileEditSchema,
  type ProfileEditFormValues,
} from "@/features/auth/types/profile-edit-form";
import type { PreferredTrait } from "@/features/auth/types/auth";
import { sigunguOptionsBySido } from "@/shared/constants/region-options";

const defaultValues: ProfileEditFormValues = {
  nickname: "",
  regionSido: "",
  regionSigungu: "",
  housingType: "APARTMENT",
  familyType: "SINGLE",
  hasPet: "NONE",
  dailyOutTime: "UNDER_4H",
  preferredTraits: ["ACTIVE"],
  preferredSize: "ANY",
};

export function useProfileEditForm() {
  const router = useRouter();
  const { user, status } = useSession();
  const updateMyProfileMutation = useUpdateMyProfileMutation();
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  const form = useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditSchema),
    defaultValues,
    mode: "onChange",
  });
  useEffect(() => {
    if (!user) {
      return;
    }

    form.reset({
      nickname: user.nickname,
      regionSido: user.regionSido ?? "",
      regionSigungu: user.regionSigungu ?? "",
      housingType: user.lifestyle?.housingType ?? "APARTMENT",
      familyType: user.lifestyle?.familyType ?? "SINGLE",
      hasPet: user.lifestyle?.hasPet ?? "NONE",
      dailyOutTime: user.lifestyle?.dailyOutTime ?? "UNDER_4H",
      preferredTraits: user.lifestyle?.preferredTraits ?? ["ACTIVE"],
      preferredSize: user.lifestyle?.preferredSize ?? "ANY",
    });
  }, [form, user]);

  const values = useWatch({ control: form.control });
  const regionSido = values.regionSido ?? "";
  const preferredTraits = values.preferredTraits ?? [];

  const sigunguOptions = useMemo(
    () => sigunguOptionsBySido[regionSido as keyof typeof sigunguOptionsBySido] ?? [],
    [regionSido]
  );

  const updateField = <TKey extends Path<ProfileEditFormValues>>(
    field: TKey,
    value: PathValue<ProfileEditFormValues, TKey>
  ) => {
    setSubmitErrorMessage(null);
    form.setValue(field, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleNicknameChange = (value: string) => {
    updateField("nickname", value);
  };

  const handleRegionSidoChange = (value: string) => {
    if (!value) return;
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
    if (!value) return;
    updateField("regionSigungu", value);
  };

  const handlePreferredTraitToggle = (trait: PreferredTrait) => {
    setSubmitErrorMessage(null);
    const nextTraits = preferredTraits.includes(trait)
      ? preferredTraits.filter((selectedTrait) => selectedTrait !== trait)
      : [...preferredTraits, trait];

    form.setValue("preferredTraits", nextTraits, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  const handleSubmitProfileEdit = form.handleSubmit(async (formValues) => {
    try {
      setSubmitErrorMessage(null);
      await updateMyProfileMutation.mutateAsync({
        nickname: formValues.nickname,
        regionSido: formValues.regionSido,
        regionSigungu: formValues.regionSigungu,
        lifestyle: {
          housingType: formValues.housingType,
          familyType: formValues.familyType,
          hasPet: formValues.hasPet,
          dailyOutTime: formValues.dailyOutTime,
          preferredTraits: formValues.preferredTraits,
          preferredSize: formValues.preferredSize,
        },
      });
      router.push("/profile");
    } catch {
      setSubmitErrorMessage("정보를 저장하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  });

  return {
    form,
    values,
    sigunguOptions,
    isLoading: status === "loading",
    isError: status === "unauthenticated",
    isSubmitting: updateMyProfileMutation.isPending,
    submitErrorMessage,
    canSubmit: form.formState.isValid && !updateMyProfileMutation.isPending,
    updateField,
    handleNicknameChange,
    handleRegionSidoChange,
    handleRegionSigunguChange,
    handlePreferredTraitToggle,
    handleCancel,
    handleSubmitProfileEdit,
  };
}
