"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/text";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  error?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  variant?: "default" | "ghost";
  containerClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    leftSlot,
    rightSlot,
    variant = "default",
    containerClassName,
    className,
    id,
    disabled,
    ...props
  },
  ref
) {
  const invalid = Boolean(error);

  return (
    <div className="relative flex w-full flex-col gap-1.5">
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
          disabled && "border-border bg-muted opacity-60",
          containerClassName
        )}
      >
        {leftSlot}
        <input
          ref={ref}
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
        <Text size="sm" color="danger" className="absolute left-0 top-full mt-1.5 whitespace-nowrap">
          {error}
        </Text>
      ) : null}
    </div>
  );
});
