"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/text";

type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type RadioGroupProps = Omit<ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, "children"> & {
  options: RadioOption[];
  label?: string;
  error?: string;
};

export function RadioGroup({ options, label, error, className, ...props }: RadioGroupProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <Text size="sm" weight="medium">
          {label}
        </Text>
      ) : null}
      <RadioGroupPrimitive.Root className={cn("flex flex-wrap gap-md", className)} {...props}>
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer items-center gap-sm text-md text-foreground",
              option.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <RadioGroupPrimitive.Item
              value={option.value}
              disabled={option.disabled}
              className="flex size-[18px] items-center justify-center rounded-pill border-2 border-border bg-card outline-none transition-colors data-[state=checked]:border-primary disabled:cursor-not-allowed"
            >
              <RadioGroupPrimitive.Indicator className="size-2 rounded-pill bg-primary" />
            </RadioGroupPrimitive.Item>
            <span>{option.label}</span>
          </label>
        ))}
      </RadioGroupPrimitive.Root>
      {error ? (
        <Text size="sm" color="danger">
          {error}
        </Text>
      ) : null}
    </div>
  );
}
