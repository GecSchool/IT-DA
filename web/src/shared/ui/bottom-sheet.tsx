"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { Heading } from "@/shared/ui/heading";

type BottomSheetProps = {
  open: boolean;
  title?: string;
  children: ReactNode;
  className?: string;
  onOpenChange: (open: boolean) => void;
};

export function BottomSheet({ open, title, children, className, onOpenChange }: BottomSheetProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 rounded-t-xl bg-card p-md shadow-lg outline-none",
            className
          )}
        >
          <div className="mx-auto mb-md h-1 w-10 rounded-pill bg-border" />
          {title ? (
            <DialogPrimitive.Title asChild>
              <Heading as="h2" size="sm" className="mb-md">
                {title}
              </Heading>
            </DialogPrimitive.Title>
          ) : null}
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

type BottomSheetItemProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "default" | "danger";
};

export function BottomSheetItem({
  variant = "default",
  className,
  type = "button",
  ...props
}: BottomSheetItemProps) {
  return (
    <button
      type={type}
      className={cn(
        "flex h-12 w-full items-center justify-between rounded-m px-md text-left text-base font-medium transition-colors hover:bg-muted",
        variant === "default" && "text-foreground",
        variant === "danger" && "text-destructive hover:bg-error-bg",
        className
      )}
      {...props}
    />
  );
}
