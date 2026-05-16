"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch, type Path, type PathValue } from "react-hook-form";

import { useDogDetailQuery, useUpdateDogMutation } from "@/features/dogs/queries";
import type { DogDetail, DogTrait } from "@/features/dogs/types/dog";
import {
  dogRegisterSchema,
  type DogRegisterFormValues,
} from "@/features/dogs/types/dog-register-form";
import { sigunguOptionsBySido } from "@/shared/constants/region-options";

const mockImageUrls = [
  "/mock/dogs/register-1.jpg",
  "/mock/dogs/register-2.jpg",
  "/mock/dogs/register-3.jpg",
];

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

const createDefaultValues = (dog: DogDetail): DogRegisterFormValues => ({
  imageUrls: dog.imageUrls,
  name: dog.name,
  gender: dog.gender,
  breed: dog.breed,
  regionSido: dog.regionSido,
  regionSigungu: dog.regionSigungu,
  weight: dog.weight,
  traits: dog.traits,
  walkAmount: dog.walkAmount,
  isSeparationAnxiety: dog.isSeparationAnxiety,
  isToiletTrained: dog.isToiletTrained,
  barkingLevel: dog.barkingLevel,
  canLiveInApartment: dog.canLiveInApartment,
  canLiveWithChild: dog.canLiveWithChild,
  canLiveWithDog: dog.canLiveWithDog,
  canLiveWithCat: dog.canLiveWithCat,
  fosterNote: dog.fosterNote,
});

export function useDogEditForm(dogId: number) {
  const router = useRouter();
  const dogDetailQuery = useDogDetailQuery(dogId);
  const updateDogMutation = useUpdateDogMutation();
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);
  const dog = dogDetailQuery.data;

  const form = useForm<DogRegisterFormValues>({
    resolver: zodResolver(dogRegisterSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (!dog) {
      return;
    }

    form.reset(createDefaultValues(dog));
  }, [dog, form]);

  const values = useWatch({ control: form.control });
  const regionSido = values.regionSido ?? "";
  const traits = values.traits ?? [];
  const imageUrls = values.imageUrls ?? [];

  const sigunguOptions = useMemo(
    () => sigunguOptionsBySido[regionSido as keyof typeof sigunguOptionsBySido] ?? [],
    [regionSido]
  );

  const canSubmit = dogRegisterSchema.safeParse(values).success && !updateDogMutation.isPending;
  const fieldErrors = {
    imageUrls: form.formState.errors.imageUrls?.message,
    name: form.formState.errors.name?.message,
    breed: form.formState.errors.breed?.message,
    regionSido: form.formState.errors.regionSido?.message,
    regionSigungu: form.formState.errors.regionSigungu?.message,
    weight: form.formState.errors.weight?.message,
    traits: form.formState.errors.traits?.message,
  };

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

  const handleTraitToggle = (trait: DogTrait) => {
    const nextTraits = traits.includes(trait)
      ? traits.filter((selectedTrait) => selectedTrait !== trait)
      : [...traits, trait];

    updateField("traits", nextTraits);
  };

  const handleAddImage = () => {
    if (imageUrls.length >= 3) {
      return;
    }

    const nextImageUrl =
      mockImageUrls[imageUrls.length] ?? `/mock/dogs/register-${imageUrls.length + 1}.jpg`;

    updateField("imageUrls", [...imageUrls, nextImageUrl]);
  };

  const handleRemoveImage = (imageUrl: string) => {
    updateField(
      "imageUrls",
      imageUrls.filter((currentImageUrl) => currentImageUrl !== imageUrl)
    );
  };

  const handleCancel = () => {
    router.push(`/dogs/${dogId}`);
  };

  const handleSubmitDogEdit = form.handleSubmit(async (formValues) => {
    if (!dog) {
      setSubmitErrorMessage("강아지 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    try {
      setSubmitErrorMessage(null);
      await updateDogMutation.mutateAsync({
        dogId,
        payload: {
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
          isNeutered: dog.isNeutered,
          isVaccinated: dog.isVaccinated,
          hasDisease: dog.hasDisease,
          diseaseDescription: dog.diseaseDescription,
          fosterNote: formValues.fosterNote ?? "",
          imageUrls: formValues.imageUrls,
        },
      });

      router.push(`/dogs/${dogId}`);
    } catch {
      setSubmitErrorMessage("강아지 정보를 수정하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  });

  return {
    dog,
    form,
    values,
    fieldErrors,
    sigunguOptions,
    isLoading: dogDetailQuery.isLoading,
    isError: dogDetailQuery.isError,
    isSubmitting: updateDogMutation.isPending,
    submitErrorMessage,
    canSubmit,
    updateField,
    handleRegionSidoChange,
    handleRegionSigunguChange,
    handleTraitToggle,
    handleAddImage,
    handleRemoveImage,
    handleCancel,
    handleSubmitDogEdit,
  };
}
