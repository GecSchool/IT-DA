"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useSession } from "@/features/auth/hooks/use-session";
import { useRefreshAccessTokenMutation } from "@/features/auth/queries";

export function useAuthCallbackPage() {
  const router = useRouter();
  const { refreshSession } = useSession();
  const refreshAccessTokenMutation = useRefreshAccessTokenMutation();
  const hasStarted = useRef(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (hasStarted.current) {
      return;
    }

    hasStarted.current = true;

    const processCallback = async () => {
      try {
        setErrorMessage(null);
        await refreshAccessTokenMutation.mutateAsync();

        const sessionResult = await refreshSession();
        const user = sessionResult.data;

        if (!user) {
          throw new Error("Session not found");
        }

        const nextPath = user.profileStatus === "INCOMPLETE" ? "/profile-setup" : "/";

        router.replace(nextPath);
      } catch {
        setErrorMessage("로그인을 완료하지 못했어요. 다시 로그인해주세요.");
      }
    };

    void processCallback();
  }, [refreshAccessTokenMutation, refreshSession, router]);

  return {
    isProcessing: refreshAccessTokenMutation.isPending && !errorMessage,
    errorMessage,
  };
}
