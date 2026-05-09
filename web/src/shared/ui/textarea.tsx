"use client";

import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/text";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function Textarea({
  label,
  error,
  className,
  id,
  disabled,
  ...props
}: TextareaProps) {
  const invalid = Boolean(error);

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <Text as="label" htmlFor={id} size="sm" weight="medium">
          {label}
        </Text>
      ) : null}
      <textarea
        id={id}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          "min-h-[90px] w-full resize-none rounded-m border border-border bg-input-bg px-[14px] py-[10px] text-md text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
          invalid && "border-destructive focus:border-destructive",
          className
        )}
        {...props}
      />
      {error ? (
        <Text size="sm" color="danger">
          {error}
        </Text>
      ) : null}
    </div>
  );
}
