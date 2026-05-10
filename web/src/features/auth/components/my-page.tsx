"use client";

import { useMyPage } from "@/features/auth/hooks/use-my-page";
import { Button, Divider, Heading, Spinner, Text } from "@/shared/ui";

type InfoRow = {
  label: string;
  value: string;
};

export function MyPage() {
  const {
    isLoading,
    isError,
    isLoggingOut,
    logoutErrorMessage,
    profileRows,
    lifestyleRows,
    handleEditProfile,
    handleLogout,
  } = useMyPage();

  if (isLoading) {
    return (
      <section className="flex w-full max-w-[560px] flex-col items-center gap-md py-2xl text-center">
        <Spinner size="lg" />
        <Text size="base" weight="medium">
          내 정보를 불러오고 있어요
        </Text>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex w-full max-w-[560px] flex-col gap-md py-2xl">
        <Heading as="h1" size="lg">
          마이페이지
        </Heading>
        <Text color="danger">내 정보를 불러오지 못했어요.</Text>
      </section>
    );
  }

  return (
    <section className="flex w-full max-w-[560px] flex-col gap-[28px]">
      <header className="flex w-full items-center justify-between gap-md">
        <Heading as="h1" size="lg">
          마이페이지
        </Heading>
        <Button variant="outline" onClick={handleEditProfile}>
          수정하기
        </Button>
      </header>

      <InfoSection title="프로필" rows={profileRows} />
      <InfoSection title="라이프스타일 설정" rows={lifestyleRows} />

      <div className="relative flex w-full justify-end">
        {logoutErrorMessage ? (
          <Text
            size="sm"
            color="danger"
            className="absolute bottom-full right-0 mb-2 whitespace-nowrap"
          >
            {logoutErrorMessage}
          </Text>
        ) : null}
        <Button variant="danger" disabled={isLoggingOut} onClick={handleLogout}>
          {isLoggingOut ? "로그아웃 중" : "로그아웃"}
        </Button>
      </div>
    </section>
  );
}

type InfoSectionProps = {
  title: string;
  rows: InfoRow[];
};

function InfoSection({ title, rows }: InfoSectionProps) {
  return (
    <section className="flex w-full flex-col gap-xs">
      <Text size="md" weight="semibold">
        {title}
      </Text>
      <div className="flex w-full flex-col">
        {rows.map((row) => (
          <InfoItem key={row.label} row={row} showDivider={false} />
        ))}
      </div>
    </section>
  );
}

type InfoItemProps = {
  row: InfoRow;
  showDivider: boolean;
};

function InfoItem({ row, showDivider }: InfoItemProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex min-h-11 w-full items-center justify-between gap-md py-3">
        <Text color="muted">{row.label}</Text>
        <Text weight="medium" className="min-w-0 text-right">
          {row.value}
        </Text>
      </div>
      {showDivider ? <Divider /> : null}
    </div>
  );
}
