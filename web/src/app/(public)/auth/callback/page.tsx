"use client";

import { useAuthCallbackPage } from "@/features/auth/hooks/use-auth-callback-page";
import { Button, Spinner, Text } from "@/shared/ui";

export default function AuthCallbackPage() {
  const { errorMessage, isProcessing } = useAuthCallbackPage();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-md py-2xl">
      <section className="flex w-full max-w-[320px] flex-col items-center gap-md text-center">
        {isProcessing ? <Spinner size="lg" /> : null}
        <Text size="base" weight="medium">
          로그인 정보를 확인하고 있어요
        </Text>
        {errorMessage ? (
          <>
            <Text size="sm" color="danger">
              {errorMessage}
            </Text>
            <Button onClick={() => window.location.assign("/login")}>로그인으로 돌아가기</Button>
          </>
        ) : null}
      </section>
    </main>
  );
}
