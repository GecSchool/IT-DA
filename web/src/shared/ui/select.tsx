"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/text";

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = {
  label?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  onValueChange?: (value: string) => void;
};

export function Select({
  label,
  error,
  placeholder = "선택하세요",
  options,
  value,
  defaultValue,
  disabled,
  className,
  id,
  name,
  onValueChange,
}: SelectProps) {
  const invalid = Boolean(error);

  return (
    <div className="relative flex w-full flex-col gap-1.5">
      {label ? (
        <Text as="label" htmlFor={id} size="sm" weight="medium">
          {label}
        </Text>
      ) : null}
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        onValueChange={onValueChange}
      >
        <SelectPrimitive.Trigger
          id={id}
          aria-invalid={invalid || undefined}
          className={cn(
            "flex min-h-10 w-full items-center justify-between gap-sm rounded-m border border-border bg-input-bg px-[14px] py-[10px] text-left text-md text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
            invalid && "border-destructive focus:border-destructive",
            className
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className={cn("size-4 text-muted-foreground", invalid && "text-destructive")} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={6}
            className="z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-m border border-border bg-card p-xs shadow-md"
          >
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error ? (
        <Text size="sm" color="danger" className="absolute left-0 top-full mt-1.5 whitespace-nowrap">
          {error}
        </Text>
      ) : null}
    </div>
  );
}

type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
  children: ReactNode;
};

function SelectItem({ children, className, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex min-h-9 cursor-pointer select-none items-center rounded-sm py-sm pl-9 pr-sm text-md text-foreground outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-secondary data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="absolute left-sm flex size-4 items-center justify-center text-primary">
        <Check className="size-4" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
