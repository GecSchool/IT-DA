"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-pill transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        ghost: "bg-transparent text-muted-foreground hover:bg-muted",
        outline: "border border-border bg-card text-foreground hover:bg-muted",
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
      },
      size: {
        sm: "size-9",
        md: "size-10",
        lg: "size-12",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
);

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButtonVariants>;

export function IconButton({ variant, size, className, type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
