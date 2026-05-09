import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

const badgeVariants = cva(
  "inline-flex shrink-0 items-center gap-[5px] rounded-pill px-[10px] py-1 text-sm font-semibold leading-normal",
  {
    variants: {
      variant: {
        matching: "bg-success-bg text-success",
        adopted: "bg-muted text-muted-foreground",
        high: "bg-success-bg text-success",
        mid: "bg-warning-bg text-warning",
        pending: "bg-[#EEF2FF] text-[#6366F1]",
        danger: "bg-error-bg text-error",
      },
      size: {
        sm: "px-[10px] py-1 text-sm",
        md: "px-3 py-[5px] text-[13px]",
      },
    },
    defaultVariants: {
      variant: "matching",
      size: "sm",
    },
  }
);

const dotVariants = cva("rounded-pill", {
  variants: {
    variant: {
      matching: "bg-match-high",
      adopted: "bg-muted-foreground",
      high: "bg-match-high",
      mid: "bg-match-mid",
      pending: "bg-[#6366F1]",
      danger: "bg-error",
    },
    size: {
      sm: "size-[7px]",
      md: "size-2",
    },
  },
  defaultVariants: {
    variant: "matching",
    size: "sm",
  },
});

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    showDot?: boolean;
    children: ReactNode;
  };

export function Badge({ variant, size, showDot = true, className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {showDot ? <span aria-hidden="true" className={dotVariants({ variant, size })} /> : null}
      {children}
    </span>
  );
}
