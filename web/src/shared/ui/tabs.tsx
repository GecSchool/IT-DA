"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

export type TabItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

type TabsProps = {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
};

export function Tabs({ items, value, onValueChange, className }: TabsProps) {
  return (
    <TabsPrimitive.Root value={value} onValueChange={onValueChange}>
      <TabsPrimitive.List className={cn("flex flex-wrap items-center gap-sm", className)}>
        {items.map((item) => (
          <TabsPrimitive.Trigger key={item.value} value={item.value} disabled={item.disabled} asChild>
            <TabButton active={item.value === value}>{item.label}</TabButton>
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}

type TabButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  active?: boolean;
  children: ReactNode;
};

export function TabButton({ active, className, type = "button", children, ...props }: TabButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-pill px-md text-md transition-colors disabled:pointer-events-none disabled:opacity-50",
        active
          ? "bg-primary font-semibold text-primary-foreground"
          : "bg-transparent font-medium text-muted-foreground hover:bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
