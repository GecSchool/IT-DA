"use client";

import {
  dailyOutTimeOptions,
  familyOptions,
  housingOptions,
  petOptions,
  preferredSizeOptions,
  preferredTraitOptions,
} from "@/features/auth/constants/lifestyle-options";
import { LifestyleChoiceSection } from "@/features/auth/components/lifestyle-choice-section";
import { useProfileEditForm } from "@/features/auth/hooks/use-profile-edit-form";
import type {
  DailyOutTime,
  FamilyType,
  HasPet,
  HousingType,
  PreferredDogSize,
} from "@/features/auth/types/auth";
import { sidoOptions } from "@/shared/constants/region-options";
import { Button, Heading, Input, Select, Spinner, Text } from "@/shared/ui";

export function ProfileEditForm() {
  const {
    form,
    values,
    sigunguOptions,
    isLoading,
    isError,
    isSubmitting,
    submitErrorMessage,
    canSubmit,
    updateField,
    handleNicknameChange,
    handleRegionSidoChange,
    handleRegionSigunguChange,
    handlePreferredTraitToggle,
    handleCancel,
    handleSubmitProfileEdit,
  } = useProfileEditForm();

  if (isLoading) {
    return (
      <section className="flex w-full max-w-[560px] flex-col items-center gap-md py-2xl text-center">
        <Spinner size="lg" />
        <Text size="base" weight="medium">
          수정할 정보를 불러오고 있어요
        </Text>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex w-full max-w-[560px] flex-col gap-md py-2xl">
        <Heading as="h1" size="lg">
          정보 수정
        </Heading>
        <Text color="danger">수정할 정보를 불러오지 못했어요.</Text>
      </section>
    );
  }
  return (
    <form
      className="flex w-full max-w-[560px] flex-col gap-[28px]"
      onSubmit={handleSubmitProfileEdit}
    >
      <Heading as="h1" size="lg">
        정보 수정
      </Heading>

      <section className="flex w-full flex-col gap-[10px]">
        <Text size="md" weight="semibold">
          프로필
        </Text>
        <Input
          label="닉네임"
          value={values.nickname ?? ""}
          error={form.formState.errors.nickname?.message}
          onChange={(event) => handleNicknameChange(event.target.value)}
        />
        <div className="grid w-full grid-cols-1 gap-sm sm:grid-cols-2">
          <Select
            label="시/도"
            placeholder="선택하세요"
            options={sidoOptions}
            value={values.regionSido}
            error={form.formState.errors.regionSido?.message}
            onValueChange={handleRegionSidoChange}
          />
          <Select
            label="시/군/구"
            placeholder="선택하세요"
            options={sigunguOptions}
            value={values.regionSigungu}
            error={form.formState.errors.regionSigungu?.message}
            disabled={!values.regionSido}
            onValueChange={handleRegionSigunguChange}
          />
        </div>
      </section>

      <section className="flex w-full flex-col gap-[28px]">
        <Text size="md" weight="semibold">
          라이프스타일 설정
        </Text>

        <LifestyleChoiceSection
          label="주거 형태"
          options={housingOptions}
          selectedValue={values.housingType}
          onSelect={(value: HousingType) => updateField("housingType", value)}
        />
        <LifestyleChoiceSection
          label="가족 구성"
          options={familyOptions}
          selectedValue={values.familyType}
          onSelect={(value: FamilyType) => updateField("familyType", value)}
        />
        <LifestyleChoiceSection
          label="반려동물"
          options={petOptions}
          selectedValue={values.hasPet}
          onSelect={(value: HasPet) => updateField("hasPet", value)}
        />
        <LifestyleChoiceSection
          label="하루 외출"
          options={dailyOutTimeOptions}
          selectedValue={values.dailyOutTime}
          onSelect={(value: DailyOutTime) => updateField("dailyOutTime", value)}
        />
        <LifestyleChoiceSection
          label="선호 성향"
          options={preferredTraitOptions}
          selectedValues={values.preferredTraits}
          onSelect={handlePreferredTraitToggle}
        />
        {form.formState.errors.preferredTraits?.message ? (
          <Text size="sm" color="danger">
            {form.formState.errors.preferredTraits.message}
          </Text>
        ) : null}
        <LifestyleChoiceSection
          label="선호 크기"
          options={preferredSizeOptions}
          selectedValue={values.preferredSize}
          onSelect={(value: PreferredDogSize) => updateField("preferredSize", value)}
        />
      </section>

      <div className="relative flex w-full justify-between">
        {submitErrorMessage ? (
          <Text
            size="sm"
            color="danger"
            className="absolute bottom-full right-0 mb-2 whitespace-nowrap"
          >
            {submitErrorMessage}
          </Text>
        ) : null}
        <Button variant="outline" onClick={handleCancel}>
          취소
        </Button>
        <Button type="submit" disabled={!canSubmit}>
          {isSubmitting ? "저장 중" : "저장"}
        </Button>
      </div>
    </form>
  );
}
