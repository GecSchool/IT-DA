"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm, useWatch, type Path, type PathValue } from "react-hook-form";

import { useCreateDogMutation } from "@/features/dogs/queries/dog-mutations";
import type { DogTrait } from "@/features/dogs/types/dog";
import {
  dogRegisterSchema,
  dogRegisterStepFields,
  dogRegisterStepSchemas,
  type DogRegisterFormValues,
  type DogRegisterStep,
} from "@/features/dogs/types/dog-register-form";
import { sigunguOptionsBySido } from "@/shared/constants/region-options";

const defaultValues: DogRegisterFormValues = {
  imageUrls: [],
  name: "",
  gender: "MALE",
  breed: "",
  regionSido: "",
  regionSigungu: "",
  weight: 0,
  traits: ["ACTIVE"],
  walkAmount: "1H",
  isSeparationAnxiety: false,
  isToiletTrained: true,
  barkingLevel: "MEDIUM",
  canLiveInApartment: true,
  canLiveWithChild: false,
  canLiveWithDog: false,
  canLiveWithCat: false,
  fosterNote: "",
};

const mockImageUrls = [
  "/mock/dogs/register-1.jpg",
  "/mock/dogs/register-2.jpg",
  "/mock/dogs/register-3.jpg",
];

export function useDogRegisterForm() {
  const router = useRouter();
  const createDogMutation = useCreateDogMutation();
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  const form = useForm<DogRegisterFormValues>({
    resolver: zodResolver(dogRegisterSchema),
    defaultValues,
    mode: "onChange",
  });

  const values = useWatch({ control: form.control });
  const regionSido = values.regionSido ?? "";
  const traits = values.traits ?? [];
  const imageUrls = values.imageUrls ?? [];

  const sigunguOptions = useMemo(
    () => sigunguOptionsBySido[regionSido as keyof typeof sigunguOptionsBySido] ?? [],
    [regionSido]
  );
  const canProceedByStep = useMemo(
    () => ({
      1: dogRegisterStepSchemas[1].safeParse(values).success,
      2: dogRegisterStepSchemas[2].safeParse(values).success,
      3: dogRegisterStepSchemas[3].safeParse(values).success,
    }),
    [values]
  );
  const canSubmit = dogRegisterSchema.safeParse(values).success && !createDogMutation.isPending;

  const updateField = <TKey extends Path<DogRegisterFormValues>>(
    field: TKey,
    value: PathValue<DogRegisterFormValues, TKey>
  ) => {
    setSubmitErrorMessage(null);
    form.setValue(field, value, {
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

  const handleTraitToggle = (trait: DogTrait) => {
    const nextTraits = traits.includes(trait)
      ? traits.filter((selectedTrait) => selectedTrait !== trait)
      : [...traits, trait];

    updateField("traits", nextTraits);
  };

  const handleAddImage = () => {
    const nextImageUrl = mockImageUrls[imageUrls.length] ?? `/mock/dogs/register-${imageUrls.length + 1}.jpg`;

    updateField("imageUrls", [...imageUrls, nextImageUrl]);
  };

  const handleRemoveImage = (imageUrl: string) => {
    updateField(
      "imageUrls",
      imageUrls.filter((currentImageUrl) => currentImageUrl !== imageUrl)
    );
  };

  const validateStep = (step: DogRegisterStep) => {
    return form.trigger(dogRegisterStepFields[step]);
  };

  const handleSubmitDogRegister = form.handleSubmit(async (formValues) => {
    try {
      setSubmitErrorMessage(null);
      const { dogId } = await createDogMutation.mutateAsync({
        name: formValues.name,
        gender: formValues.gender,
        breed: formValues.breed,
        regionSido: formValues.regionSido,
        regionSigungu: formValues.regionSigungu,
        weight: formValues.weight,
        traits: formValues.traits,
        walkAmount: formValues.walkAmount,
        isToiletTrained: formValues.isToiletTrained,
        barkingLevel: formValues.barkingLevel,
        isSeparationAnxiety: formValues.isSeparationAnxiety,
        canLiveInApartment: formValues.canLiveInApartment,
        canLiveWithChild: formValues.canLiveWithChild,
        canLiveWithDog: formValues.canLiveWithDog,
        canLiveWithCat: formValues.canLiveWithCat,
        isNeutered: false,
        isVaccinated: false,
        hasDisease: false,
        diseaseDescription: null,
        fosterNote: formValues.fosterNote ?? "",
        imageUrls: formValues.imageUrls,
      });

      router.push(`/dogs/${dogId}`);
    } catch {
      setSubmitErrorMessage("강아지 공고를 등록하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  });

  return {
    form,
    values,
    sigunguOptions,
    isSubmitting: createDogMutation.isPending,
    submitErrorMessage,
    canProceedByStep,
    canSubmit,
    updateField,
    validateStep,
    handleRegionSidoChange,
    handleTraitToggle,
    handleAddImage,
    handleRemoveImage,
    handleSubmitDogRegister,
  };
}
