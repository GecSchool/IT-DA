"use client";

import { ChevronRight, Dog } from "lucide-react";

import { useRecentMatchPanel } from "@/features/match/hooks/use-recent-match-panel";
import { cn } from "@/shared/lib/cn";
import { Logo, PhotoTile, Spinner, Text } from "@/shared/ui";

type RecentMatchPanelProps = {
  className?: string;
};

export function RecentMatchPanel({ className }: RecentMatchPanelProps) {
  const { recentMatchLogs, isLoading, isError, handleGoAdopt, handleViewDog } =
    useRecentMatchPanel();

  return (
    <aside
      className={cn(
        "flex w-full max-w-[696px] items-center justify-between md:justify-end xl:w-[280px] xl:flex-col xl:items-stretch xl:justify-start xl:gap-lg",
        className
      )}
    >
      <div className="md:hidden">
        <Logo size={32} priority />
      </div>
      <button
        type="button"
        className="inline-flex h-9 items-center gap-1.5 rounded-pill px-sm text-sm font-semibold text-primary transition-colors hover:bg-secondary"
        onClick={handleGoAdopt}
      >
        입양하러 가기
        <ChevronRight className="size-4" aria-hidden />
      </button>

      <section className="hidden min-w-0 items-center gap-md xl:flex xl:flex-col xl:items-stretch xl:gap-sm">
        <Text size="xs" weight="semibold" color="muted">
          최근 매칭한 강아지
        </Text>

        {isLoading ? (
          <div className="flex h-[72px] items-center justify-center xl:h-24">
            <Spinner size="sm" />
          </div>
        ) : null}

        {isError ? (
          <Text size="xs" color="muted">
            최근 매칭 기록을 불러오지 못했어요.
          </Text>
        ) : null}

        {!isLoading && !isError ? (
          <div className="flex flex-col items-stretch gap-sm">
            {recentMatchLogs.map((log) => (
              <button
                key={`${log.dogId}-${log.viewedAt}`}
                type="button"
                className="flex w-full items-center gap-sm rounded-m text-left transition-colors hover:bg-muted"
                onClick={() => handleViewDog(log.dogId)}
              >
                <div className="size-11 shrink-0 overflow-hidden rounded-pill bg-muted">
                  <PhotoTile
                    src={log.thumbnailUrl}
                    alt={`${log.name} 사진`}
                    aspect="square"
                    className="rounded-pill"
                    overlay={
                      !log.thumbnailUrl ? (
                        <div className="flex size-full items-center justify-center text-muted-foreground">
                          <Dog className="size-5" aria-hidden />
                        </div>
                      ) : null
                    }
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Text size="sm" weight="semibold" className="truncate">
                    {log.name}
                  </Text>
                  <Text size="xs" color="muted" className="truncate">
                    {log.matchScore}% · {log.breed}
                  </Text>
                </div>
              </button>
            ))}
          </div>
        ) : null}
      </section>
    </aside>
  );
}
