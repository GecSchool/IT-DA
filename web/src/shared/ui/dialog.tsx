"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { Heading } from "@/shared/ui/heading";
import { IconButton } from "@/shared/ui/icon-button";
import { Text } from "@/shared/ui/text";

type DialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  hideHeader?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
};

export function Dialog({
  open,
  title,
  description,
  children,
  footer,
  className,
  hideHeader = false,
  onClose,
  onOpenChange,
}: DialogProps) {
  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange?.(nextOpen);

    if (!nextOpen) {
      onClose?.();
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card p-lg shadow-lg outline-none",
            className
          )}
        >
          {hideHeader && title ? (
            <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          ) : null}
          {!hideHeader && (title || description || onClose) && (
            <header className="mb-md flex items-start justify-between gap-md">
              <div className="min-w-0">
                {title ? (
                  <DialogPrimitive.Title asChild>
                    <Heading size="lg">{title}</Heading>
                  </DialogPrimitive.Title>
                ) : null}
                {description ? (
                  <DialogPrimitive.Description asChild>
                    <Text className="mt-xs" color="muted">
                      {description}
                    </Text>
                  </DialogPrimitive.Description>
                ) : null}
              </div>
              {onClose ? (
                <DialogPrimitive.Close asChild>
                  <IconButton aria-label="닫기" variant="ghost" size="sm">
                    <X className="size-5" />
                  </IconButton>
                </DialogPrimitive.Close>
              ) : null}
            </header>
          )}
          <div>{children}</div>
          {footer ? <footer className="mt-lg flex justify-end gap-sm">{footer}</footer> : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
