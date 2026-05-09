"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

const chipVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-pill border px-[14px] py-[7px] text-[13px] leading-normal transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      selected: {
        true: "border-primary bg-secondary font-semibold text-primary",
        false: "border-border bg-card font-medium text-foreground hover:bg-muted",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof chipVariants>;

export function Chip({ selected, className, type = "button", ...props }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={Boolean(selected)}
      className={cn(chipVariants({ selected }), className)}
      {...props}
    />
  );
}
