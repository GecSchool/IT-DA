import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

type DividerProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
};

export function Divider({ orientation = "horizontal", className, ...props }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" && "h-px w-full",
        orientation === "vertical" && "h-full w-px",
        className
      )}
      {...props}
    />
  );
}
