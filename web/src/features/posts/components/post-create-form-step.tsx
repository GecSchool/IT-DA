"use client";

import type { UseFormReturn } from "react-hook-form";

import type { PostCreateFormValues } from "@/features/posts/types/post-create-form";
import { Button, Select, Text, Textarea } from "@/shared/ui";

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type PostCreateFormStepProps = {
  form: UseFormReturn<PostCreateFormValues, unknown, PostCreateFormValues>;
  values: Partial<PostCreateFormValues>;
  fieldErrors: {
    dogId?: string;
    caption?: string;
  };
  dogOptions: SelectOption[];
  isDogsLoading: boolean;
  isDogsError: boolean;
  submitErrorMessage: string | null;
  onDogChange: (value: string) => void;
  onSubmit: () => void;
};

export function PostCreateFormStep({
  form,
  values,
  fieldErrors,
  dogOptions,
  isDogsLoading,
  isDogsError,
  submitErrorMessage,
  onDogChange,
  onSubmit,
}: PostCreateFormStepProps) {
  return (
    <form className="flex flex-col gap-lg px-lg pb-lg pt-md" onSubmit={onSubmit}>
      <div className="flex flex-col gap-sm">
        <div className="flex items-center gap-1">
          <Text as="label" size="sm" weight="semibold">
            강아지 태그
          </Text>
          <Text size="xs" className="text-primary">
            필수
          </Text>
        </div>
        <Select
          placeholder={isDogsLoading ? "불러오는 중" : "강아지를 선택하세요"}
          options={dogOptions}
          value={values.dogId ? String(values.dogId) : undefined}
          disabled={isDogsLoading || isDogsError}
          error={fieldErrors.dogId}
          onValueChange={onDogChange}
        />
      </div>

      <div className="flex flex-col gap-sm">
        <div className="flex items-center gap-1">
          <Text as="label" htmlFor="post-caption" size="sm" weight="semibold">
            캡션
          </Text>
          <Text size="xs" color="muted">
            선택
          </Text>
        </div>
        <Textarea
          id="post-caption"
          placeholder="캡션을 입력하세요"
          rows={5}
          error={fieldErrors.caption}
          {...form.register("caption")}
        />
      </div>

      {isDogsError ? (
        <Text size="sm" color="danger">
          강아지 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
        </Text>
      ) : null}
      {submitErrorMessage ? (
        <Text size="sm" color="danger">
          {submitErrorMessage}
        </Text>
      ) : null}

      <Button type="submit" className="sr-only">
        작성
      </Button>
    </form>
  );
}
