"use client";

import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/text";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  error?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  variant?: "default" | "ghost";
};

export function Input({
  label,
  error,
  leftSlot,
  rightSlot,
  variant = "default",
  className,
  id,
  disabled,
  ...props
}: InputProps) {
  const invalid = Boolean(error);

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <Text as="label" htmlFor={id} size="sm" weight="medium">
          {label}
        </Text>
      ) : null}
      <div
        className={cn(
          "flex min-h-10 w-full items-center gap-sm rounded-m px-[14px] py-[10px] transition-colors",
          variant === "default" && "border border-border bg-input-bg",
          variant === "ghost" && "bg-background",
          "focus-within:border-primary",
          invalid && "border-destructive focus-within:border-destructive",
          disabled && "border-border bg-muted opacity-60"
        )}
      >
        {leftSlot}
        <input
          id={id}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-md text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {rightSlot}
      </div>
      {error ? (
        <Text size="sm" color="danger">
          {error}
        </Text>
      ) : null}
    </div>
  );
}
