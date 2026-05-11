import { Check, Clock, Home, ShieldCheck, Volume2, X } from "lucide-react";
import type { ReactNode } from "react";

import {
  barkingLevelOptions,
  dogTraitOptions,
  walkAmountOptions,
} from "@/features/dogs/constants/dog-register-options";
import type { DogDetail } from "@/features/dogs/types/dog";
import { Badge, Divider, Text } from "@/shared/ui";

const barkingLevelLabels = createLabelMap(barkingLevelOptions);
const dogTraitLabels = createLabelMap(dogTraitOptions);
const walkAmountLabels = createLabelMap(walkAmountOptions);

type DogInfoSectionProps = {
  dog: DogDetail;
};

export function DogInfoSection({ dog }: DogInfoSectionProps) {
  return (
    <section className="grid w-full grid-cols-1 overflow-hidden rounded-lg bg-card md:grid-cols-[1fr_auto_1fr_auto_1fr]">
      <InfoColumn title="성격">
        <div className="flex flex-wrap gap-sm">
          {dog.traits.map((trait) => (
            <Badge key={trait} variant="adopted" showDot={false}>
              {dogTraitLabels[trait]}
            </Badge>
          ))}
        </div>
      </InfoColumn>

      <Divider className="hidden md:block" orientation="vertical" />
      <Divider className="md:hidden" />

      <InfoColumn title="생활 패턴">
        <InfoLine
          icon={<Clock className="size-4" aria-hidden />}
          label={`산책 ${walkAmountLabels[dog.walkAmount]}`}
        />
        <InfoLine
          icon={<Home className="size-4" aria-hidden />}
          label={dog.isSeparationAnxiety ? "분리불안 있음" : "분리불안 없음"}
        />
        <InfoLine
          icon={<ShieldCheck className="size-4" aria-hidden />}
          label={dog.isToiletTrained ? "배변 훈련 완료" : "배변 훈련 필요"}
        />
        <InfoLine
          icon={<Volume2 className="size-4" aria-hidden />}
          label={`짖음 ${barkingLevelLabels[dog.barkingLevel]}`}
        />
      </InfoColumn>

      <Divider className="hidden md:block" orientation="vertical" />
      <Divider className="md:hidden" />

      <InfoColumn title="가능 환경">
        <EnvironmentLine label="아파트" enabled={dog.canLiveInApartment} />
        <EnvironmentLine label="아이와 생활" enabled={dog.canLiveWithChild} />
        <EnvironmentLine label="다른 개" enabled={dog.canLiveWithDog} />
        <EnvironmentLine label="고양이" enabled={dog.canLiveWithCat} />
      </InfoColumn>
    </section>
  );
}

type InfoColumnProps = {
  title: string;
  children: ReactNode;
};

function InfoColumn({ title, children }: InfoColumnProps) {
  return (
    <div className="flex min-h-36 flex-col gap-sm p-md">
      <Text size="sm" weight="semibold">
        {title}
      </Text>
      {children}
    </div>
  );
}

type InfoLineProps = {
  icon: ReactNode;
  label: string;
};

function InfoLine({ icon, label }: InfoLineProps) {
  return (
    <div className="flex items-center gap-sm text-muted-foreground">
      {icon}
      <Text size="sm" color="foreground">
        {label}
      </Text>
    </div>
  );
}

type EnvironmentLineProps = {
  label: string;
  enabled: boolean;
};

function EnvironmentLine({ label, enabled }: EnvironmentLineProps) {
  const Icon = enabled ? Check : X;

  return (
    <div className="flex items-center gap-sm">
      <Text size="sm">{label}</Text>
      <Icon className={enabled ? "size-4 text-success" : "size-4 text-destructive"} aria-hidden />
    </div>
  );
}

function createLabelMap<TValue extends string>(
  options: { value: TValue; label: string }[]
): Record<TValue, string> {
  return options.reduce(
    (labelMap, option) => ({
      ...labelMap,
      [option.value]: option.label,
    }),
    {} as Record<TValue, string>
  );
}
