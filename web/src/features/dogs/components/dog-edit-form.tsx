"use client";

import { Plus, X } from "lucide-react";

import { DogBooleanChoiceRow } from "@/features/dogs/components/dog-boolean-choice-row";
import { DogChoiceSection } from "@/features/dogs/components/dog-choice-section";
import {
  barkingLevelOptions,
  dogTraitOptions,
  genderOptions,
  separationAnxietyOptions,
  toiletTrainingOptions,
  walkAmountOptions,
} from "@/features/dogs/constants/dog-register-options";
import type { BarkingLevel, WalkAmount } from "@/features/dogs/types/dog";
import type { DogRegisterFormValues } from "@/features/dogs/types/dog-register-form";
import { useDogEditForm } from "@/features/dogs/hooks/use-dog-edit-form";
import { sidoOptions } from "@/shared/constants/region-options";
import {
  Button,
  Heading,
  IconButton,
  Input,
  PhotoTile,
  RadioGroup,
  Select,
  EmptyState,
  Spinner,
  Text,
  Textarea,
} from "@/shared/ui";

type DogEditFormProps = {
  dogId: number;
};

export function DogEditForm({ dogId }: DogEditFormProps) {
  const {
    dog,
    values,
    fieldErrors,
    sigunguOptions,
    isLoading,
    isError,
    isSubmitting,
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
  } = useDogEditForm(dogId);

  if (isLoading) {
    return (
      <section className="flex min-h-80 w-full max-w-[560px] flex-col items-center justify-center gap-md">
        <Spinner size="lg" />
        <Text weight="medium">강아지 정보를 불러오고 있어요</Text>
      </section>
    );
  }

  if (isError || !dog) {
    return (
      <EmptyState
        title="강아지 정보를 불러오지 못했어요"
        description="잠시 후 다시 시도해주세요."
        className="max-w-[560px]"
      />
    );
  }

  const imageUrls = values.imageUrls ?? [];

  return (
    <form className="flex w-full max-w-[560px] flex-col gap-[28px]" onSubmit={handleSubmitDogEdit}>
      <Heading as="h1" size="lg">
        {dog.name} 정보 수정
      </Heading>

      <section className="flex w-full flex-col gap-[10px]">
        <Text size="md" weight="semibold">
          사진
        </Text>
        <div className="grid grid-cols-3 gap-sm sm:flex sm:flex-wrap">
          {imageUrls.map((imageUrl) => (
            <div key={imageUrl} className="relative size-[120px]">
              <PhotoTile src={imageUrl} alt="강아지 사진" aspect="square" />
              <IconButton
                aria-label="사진 삭제"
                size="sm"
                variant="outline"
                className="absolute right-1 top-1 bg-card"
                onClick={() => handleRemoveImage(imageUrl)}
              >
                <X className="size-4" aria-hidden />
              </IconButton>
            </div>
          ))}
          {imageUrls.length < 3 ? (
            <button
              type="button"
              className="flex size-[120px] items-center justify-center rounded-m border border-border bg-muted text-muted-foreground"
              onClick={handleAddImage}
            >
              <Plus className="size-5" aria-hidden />
            </button>
          ) : null}
        </div>
        {fieldErrors.imageUrls ? (
          <Text size="sm" color="danger">
            {fieldErrors.imageUrls}
          </Text>
        ) : null}
      </section>

      <Input
        label="이름"
        placeholder="예: 콩이"
        value={values.name ?? ""}
        error={fieldErrors.name}
        onChange={(event) => updateField("name", event.target.value)}
      />
      <Input
        label="몸무게(kg)"
        type="number"
        inputMode="decimal"
        placeholder="예: 5.2"
        value={values.weight ? String(values.weight) : ""}
        error={fieldErrors.weight}
        onChange={(event) => updateField("weight", Number(event.target.value))}
      />
      <RadioGroup
        label="성별"
        options={genderOptions}
        value={values.gender}
        onValueChange={(value) => updateField("gender", value as DogRegisterFormValues["gender"])}
      />
      <Input
        label="품종"
        placeholder="예: 믹스"
        value={values.breed ?? ""}
        error={fieldErrors.breed}
        onChange={(event) => updateField("breed", event.target.value)}
      />

      <section className="flex w-full flex-col gap-[10px]">
        <Text size="md" weight="semibold">
          지역
        </Text>
        <div className="grid w-full grid-cols-1 gap-sm sm:grid-cols-2">
          <Select
            placeholder="시/도 선택"
            options={sidoOptions}
            value={values.regionSido}
            error={fieldErrors.regionSido}
            onValueChange={handleRegionSidoChange}
          />
          <Select
            placeholder="구/군 선택"
            options={sigunguOptions}
            value={values.regionSigungu}
            error={fieldErrors.regionSigungu}
            disabled={!values.regionSido}
            onValueChange={handleRegionSigunguChange}
          />
        </div>
      </section>

      <DogChoiceSection
        label="성격 태그"
        options={dogTraitOptions}
        selectedValues={values.traits}
        onSelect={handleTraitToggle}
      />
      {fieldErrors.traits ? (
        <Text size="sm" color="danger">
          {fieldErrors.traits}
        </Text>
      ) : null}

      <section className="flex w-full flex-col gap-md">
        <Text size="md" weight="semibold">
          생활 패턴
        </Text>
        <DogChoiceSection
          label="산책량"
          options={walkAmountOptions}
          selectedValue={values.walkAmount}
          onSelect={(value: WalkAmount) => updateField("walkAmount", value)}
        />
        <RadioGroup
          label="분리불안"
          options={separationAnxietyOptions}
          value={String(values.isSeparationAnxiety)}
          onValueChange={(value) => updateField("isSeparationAnxiety", value === "true")}
        />
        <RadioGroup
          label="배변훈련"
          options={toiletTrainingOptions}
          value={String(values.isToiletTrained)}
          onValueChange={(value) => updateField("isToiletTrained", value === "true")}
        />
        <DogChoiceSection
          label="짖음"
          options={barkingLevelOptions}
          selectedValue={values.barkingLevel}
          onSelect={(value: BarkingLevel) => updateField("barkingLevel", value)}
        />
      </section>

      <section className="flex w-full flex-col gap-3">
        <Text size="md" weight="semibold">
          환경
        </Text>
        <DogBooleanChoiceRow
          label="아파트 가능"
          value={values.canLiveInApartment}
          onChange={(value) => updateField("canLiveInApartment", value)}
        />
        <DogBooleanChoiceRow
          label="아이와 생활"
          value={values.canLiveWithChild}
          onChange={(value) => updateField("canLiveWithChild", value)}
        />
        <DogBooleanChoiceRow
          label="다른 개"
          value={values.canLiveWithDog}
          onChange={(value) => updateField("canLiveWithDog", value)}
        />
        <DogBooleanChoiceRow
          label="고양이"
          value={values.canLiveWithCat}
          onChange={(value) => updateField("canLiveWithCat", value)}
        />
      </section>

      <Textarea
        label="한마디"
        placeholder="강아지의 성격이나 입양자에게 전하고 싶은 말을 적어주세요."
        value={values.fosterNote ?? ""}
        onChange={(event) => updateField("fosterNote", event.target.value)}
      />

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
          {isSubmitting ? "수정 중" : "수정 완료"}
        </Button>
      </div>
    </form>
  );
}
