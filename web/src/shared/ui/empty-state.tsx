import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-48 w-full flex-col items-center justify-center rounded-m border border-dashed border-border bg-card px-lg py-xl text-center",
        className
      )}
    >
      {icon ? <div className="mb-md text-muted-foreground">{icon}</div> : null}
      <Heading as="h3" size="sm" weight="semibold">
        {title}
      </Heading>
      {description ? (
        <Text className="mt-xs w-full min-w-0 break-keep" color="muted">
          {description}
        </Text>
      ) : null}
      {action ? <div className="mt-lg">{action}</div> : null}
    </div>
  );
}
