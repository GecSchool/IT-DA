import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

type ProgressBarProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
  max?: number;
};

export function ProgressBar({ value, max = 100, className, ...props }: ProgressBarProps) {
  const normalizedValue = Math.min(Math.max(value, 0), max);
  const percentage = max > 0 ? (normalizedValue / max) * 100 : 0;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={normalizedValue}
      className={cn("h-1.5 w-full overflow-hidden rounded-pill bg-muted", className)}
      {...props}
    >
      <div
        className="h-full rounded-pill bg-primary transition-[width]"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
