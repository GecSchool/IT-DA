"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { useSession } from "@/features/auth/hooks/use-session";
import { useRefreshAccessTokenMutation } from "@/features/auth/queries";
import { Spinner, Text } from "@/shared/ui";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { status, refreshSession } = useSession();
  const refreshAccessTokenMutation = useRefreshAccessTokenMutation();
  const hasTriedRefresh = useRef(false);
  const [hasFinishedRefreshAttempt, setHasFinishedRefreshAttempt] = useState(false);
  const [isRecoveringSession, setIsRecoveringSession] = useState(false);

  useEffect(() => {
    if (status !== "unauthenticated" || hasTriedRefresh.current) {
      return;
    }

    hasTriedRefresh.current = true;

    const recoverSession = async () => {
      try {
        setIsRecoveringSession(true);
        setHasFinishedRefreshAttempt(false);
        await refreshAccessTokenMutation.mutateAsync();

        const sessionResult = await refreshSession();

        if (!sessionResult.data) {
          throw new Error("Session not found");
        }
      } catch {
        router.replace("/login");
      } finally {
        setHasFinishedRefreshAttempt(true);
        setIsRecoveringSession(false);
      }
    };

    void recoverSession();
  }, [refreshAccessTokenMutation, refreshSession, router, status]);

  if (status === "authenticated") {
    return children;
  }

  if (status === "unauthenticated" && hasFinishedRefreshAttempt && !isRecoveringSession) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-md py-2xl">
      <section className="flex flex-col items-center gap-md text-center">
        <Spinner size="lg" />
        <Text size="base" weight="medium">
          로그인 정보를 확인하고 있어요
        </Text>
      </section>
    </main>
  );
}
