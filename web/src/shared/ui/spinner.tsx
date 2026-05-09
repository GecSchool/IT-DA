import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
};

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="로딩 중"
      className={cn(
        "animate-spin rounded-pill border-2 border-muted border-t-primary",
        size === "sm" && "size-4",
        size === "md" && "size-5",
        size === "lg" && "size-7",
        className
      )}
      {...props}
    />
  );
}
