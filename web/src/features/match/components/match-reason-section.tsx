import { CircleCheck, TriangleAlert } from "lucide-react";

import { Text } from "@/shared/ui";

type MatchReasonSectionProps = {
  matchReasons: string[];
  cautionReasons: string[];
};

export function MatchReasonSection({
  matchReasons,
  cautionReasons,
}: MatchReasonSectionProps) {
  const hasReasons = matchReasons.length > 0 || cautionReasons.length > 0;

  if (!hasReasons) {
    return null;
  }

  return (
    <section className="flex w-full flex-col gap-sm">
      <Text size="xs" weight="semibold" color="muted">
        우리가 맞는 이유
      </Text>
      <div className="flex flex-col gap-xs">
        {matchReasons.map((reason) => (
          <ReasonLine key={reason} variant="positive" label={reason} />
        ))}
        {cautionReasons.map((reason) => (
          <ReasonLine key={reason} variant="caution" label={reason} />
        ))}
      </div>
    </section>
  );
}

type ReasonLineProps = {
  variant: "positive" | "caution";
  label: string;
};

function ReasonLine({ variant, label }: ReasonLineProps) {
  const Icon = variant === "positive" ? CircleCheck : TriangleAlert;

  return (
    <div className="flex items-center gap-xs">
      <Icon
        className={variant === "positive" ? "size-3.5 text-success" : "size-3.5 text-warning"}
        aria-hidden
      />
      <Text size="sm" color={variant === "positive" ? "foreground" : "muted"}>
        {label}
      </Text>
    </div>
  );
}
