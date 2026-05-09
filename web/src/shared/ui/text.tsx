import { cva, type VariantProps } from "class-variance-authority";
import { createElement, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

const textVariants = cva("leading-normal tracking-normal", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      base: "text-base",
      lg: "text-lg",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      foreground: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      danger: "text-destructive",
      success: "text-success",
      warning: "text-warning",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
    color: "foreground",
  },
});

type TextElement = "p" | "span" | "div" | "label";

type TextProps = {
  as?: TextElement;
  children: ReactNode;
  className?: string;
  htmlFor?: string;
} & VariantProps<typeof textVariants> &
  Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "color">;

export function Text({
  as,
  size,
  weight,
  color,
  className,
  children,
  ...props
}: TextProps) {
  const Component = as ?? "p";

  return createElement(
    Component,
    {
      className: cn(textVariants({ size, weight, color }), className),
      ...props,
    },
    children
  );
}
