"use client";

import { Dog } from "lucide-react";

import type { AdoptionApplicationFormValues } from "@/features/adoptions/types/adoption-application-form";
import { useAdoptionApplicationForm } from "@/features/adoptions/hooks/use-adoption-application-form";
import { Button, Dialog, Text, Textarea } from "@/shared/ui";

type AdoptionApplicationFormModalProps = {
  open: boolean;
  mode: "create" | "edit";
  dogName: string;
  defaultIntroduction?: string;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (values: AdoptionApplicationFormValues) => Promise<void>;
};

const modalCopy = {
  create: {
    title: "입양 신청",
    submitLabel: "신청",
  },
  edit: {
    title: "신청 수정",
    submitLabel: "저장",
  },
};

export function AdoptionApplicationFormModal({
  open,
  mode,
  dogName,
  defaultIntroduction,
  isSubmitting = false,
  onClose,
  onSubmit,
}: AdoptionApplicationFormModalProps) {
  const copy = modalCopy[mode];
  const form = useAdoptionApplicationForm({
    open,
    defaultIntroduction,
    onSubmit,
  });

  return (
    <Dialog
      open={open}
      title={copy.title}
      hideHeader
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
      className="max-w-[500px] rounded-xl border border-border p-md shadow-lg"
    >
      <form
        id="adoption-application-form"
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmitApplication}
      >
        <div className="flex w-full items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-pill bg-muted">
            <Dog className="size-[22px] text-muted-foreground" aria-hidden />
          </div>
          <Text size="sm" weight="semibold">
            {mode === "create"
              ? `${dogName}에게 자기소개를 남겨주세요`
              : `${dogName}에게 남긴 자기소개를 수정해주세요`}
          </Text>
        </div>

        <div className="flex w-full items-center justify-between px-4">
          <Text as="label" htmlFor="adoption-introduction" size="sm" weight="semibold">
            자기소개
          </Text>
          <div className="flex items-center gap-0.5">
            <Text as="span" size="xs" color="muted">
              {form.values.introduction?.length ?? 0}
            </Text>
            <Text as="span" size="xs" color="muted">
              {" / 200"}
            </Text>
          </div>
        </div>

        <Textarea
          id="adoption-introduction"
          placeholder="내용을 입력하세요"
          rows={4}
          className="min-h-[90px]"
          error={form.form.formState.errors.introduction?.message}
          {...form.form.register("introduction")}
        />

        {form.submitErrorMessage ? (
          <Text size="sm" color="danger">
            {form.submitErrorMessage}
          </Text>
        ) : null}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            취소
          </Button>
          <Button type="submit" disabled={!form.canSubmit || isSubmitting}>
            {copy.submitLabel}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
