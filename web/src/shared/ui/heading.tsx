import { cva, type VariantProps } from "class-variance-authority";
import { createElement, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

const headingVariants = cva("leading-tight tracking-normal text-foreground", {
  variants: {
    size: {
      sm: "text-lg",
      md: "text-xl",
      lg: "text-2xl",
      xl: "text-3xl",
      "2xl": "text-4xl",
    },
    weight: {
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "lg",
    weight: "bold",
  },
});

type HeadingElement = "h1" | "h2" | "h3" | "h4";

type HeadingProps = {
  as?: HeadingElement;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof headingVariants> &
  Omit<HTMLAttributes<HTMLHeadingElement>, "children" | "className" | "color">;

export function Heading({
  as,
  size,
  weight,
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = as ?? "h2";

  return createElement(
    Component,
    {
      className: cn(headingVariants({ size, weight }), className),
      ...props,
    },
    children
  );
}
