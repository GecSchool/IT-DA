"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/text";

type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  label?: string;
  description?: string;
};

export function Switch({ label, description, className, id, ...props }: SwitchProps) {
  return (
    <div className="flex items-center gap-md">
      <SwitchPrimitive.Root
        id={id}
        className={cn(
          "relative h-[22px] w-10 shrink-0 rounded-pill bg-muted outline-none transition-colors data-[state=checked]:bg-primary disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb className="block size-[18px] translate-x-0.5 rounded-pill bg-primary-foreground transition-transform data-[state=checked]:translate-x-5" />
      </SwitchPrimitive.Root>
      {(label || description) && (
        <label htmlFor={id} className="min-w-0 cursor-pointer">
          {label ? (
            <Text as="span" size="md" weight="medium">
              {label}
            </Text>
          ) : null}
          {description ? (
            <Text size="sm" color="muted">
              {description}
            </Text>
          ) : null}
        </label>
      )}
    </div>
  );
}
