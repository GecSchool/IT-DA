"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  adoptionApplicationSchema,
  type AdoptionApplicationFormValues,
} from "@/features/adoptions/types/adoption-application-form";

type UseAdoptionApplicationFormParams = {
  open: boolean;
  defaultIntroduction?: string;
  onSubmit: (values: AdoptionApplicationFormValues) => Promise<void>;
};

export function useAdoptionApplicationForm({
  open,
  defaultIntroduction = "",
  onSubmit,
}: UseAdoptionApplicationFormParams) {
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);
  const form = useForm<AdoptionApplicationFormValues>({
    resolver: zodResolver(adoptionApplicationSchema),
    defaultValues: {
      introduction: defaultIntroduction,
    },
    mode: "onChange",
  });
  const values = useWatch({ control: form.control });
  const introduction = values.introduction ?? "";
  const fieldErrors = {
    introduction: form.formState.errors.introduction?.message,
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    form.reset({
      introduction: defaultIntroduction,
    });
  }, [defaultIntroduction, form, open]);

  const handleSubmitApplication = form.handleSubmit(async (formValues) => {
    try {
      setSubmitErrorMessage(null);
      await onSubmit(formValues);
    } catch {
      setSubmitErrorMessage("신청 내용을 저장하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  });

  return {
    form,
    values,
    fieldErrors,
    introductionLength: introduction.length,
    maxIntroductionLength: 200,
    submitErrorMessage: form.formState.submitCount > 0 ? submitErrorMessage : null,
    canSubmit: form.formState.isValid && form.formState.isDirty,
    handleSubmitApplication,
  };
}
