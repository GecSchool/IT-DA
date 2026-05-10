"use client";

import { ArrowRight, CircleCheck } from "lucide-react";

import { useProfileSetupForm } from "@/features/auth/hooks/use-profile-setup-form";
import { Button, Input, Select, Text } from "@/shared/ui";

export function ProfileSetupForm() {
  const {
    form,
    nickname,
    regionSido,
    regionSigungu,
    isNicknameChecked,
    nicknameErrorMessage,
    isCheckingNickname,
    sidoOptions,
    sigunguOptions,
    canSubmit,
    isSubmitting,
    submitErrorMessage,
    handleNicknameChange,
    handleRegionSidoChange,
    handleRegionSigunguChange,
    handleSubmitProfileSetup,
  } = useProfileSetupForm();

  return (
    <form className="flex w-full flex-col gap-xl" onSubmit={handleSubmitProfileSetup}>
      <div className="relative flex w-full flex-col gap-1.5">
        <Text as="label" htmlFor="nickname" size="sm" weight="medium">
          닉네임
        </Text>
        <Input
          id="nickname"
          value={nickname}
          placeholder="닉네임 입력"
          error={nicknameErrorMessage}
          onChange={(event) => handleNicknameChange(event.target.value)}
        />
        {isCheckingNickname ? (
          <Text
            size="sm"
            color="muted"
            className="absolute left-0 top-full mt-1.5 whitespace-nowrap"
          >
            닉네임 확인 중이에요
          </Text>
        ) : null}
        {isNicknameChecked ? (
          <div className="absolute left-0 top-full mt-1.5 flex items-center gap-1.5 whitespace-nowrap text-success">
            <CircleCheck className="size-3.5" aria-hidden />
            <Text size="sm" color="success">
              사용 가능한 닉네임이에요
            </Text>
          </div>
        ) : null}
      </div>

      <div className="grid w-full grid-cols-1 gap-sm sm:grid-cols-2">
        <Select
          label="시/도 선택"
          placeholder="선택하세요"
          options={sidoOptions}
          value={regionSido}
          error={form.formState.errors.regionSido?.message}
          onValueChange={handleRegionSidoChange}
        />
        <Select
          label="시/군/구 선택"
          placeholder="선택하세요"
          options={sigunguOptions}
          value={regionSigungu}
          error={form.formState.errors.regionSigungu?.message}
          disabled={!regionSido}
          onValueChange={handleRegionSigunguChange}
        />
      </div>

      <div className="relative flex w-full justify-end">
        {submitErrorMessage ? (
          <Text
            size="sm"
            color="danger"
            className="absolute bottom-full right-0 mb-2 whitespace-nowrap"
          >
            {submitErrorMessage}
          </Text>
        ) : null}
        <Button type="submit" disabled={!canSubmit} rightIcon={<ArrowRight className="size-4" aria-hidden />}>
          {isSubmitting ? "저장 중" : "다음"}
        </Button>
      </div>
    </form>
  );
}
