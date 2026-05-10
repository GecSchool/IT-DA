"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useSession } from "@/features/auth/hooks/use-session";

export type SocialLoginProvider = "google" | "naver" | "kakao";

const socialLoginPaths = {
  google: "/auth/google",
  naver: "/auth/naver",
  kakao: "/auth/kakao",
} satisfies Record<SocialLoginProvider, string>;

const getSocialLoginUrl = (provider: SocialLoginProvider) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

  return `${apiBaseUrl}${socialLoginPaths[provider]}`;
};

export function useLoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const [pendingProvider, setPendingProvider] = useState<SocialLoginProvider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [router, status]);

  const handleSocialLogin = (provider: SocialLoginProvider) => {
    try {
      setErrorMessage(null);
      setPendingProvider(provider);
      window.location.assign(getSocialLoginUrl(provider));
    } catch {
      setPendingProvider(null);
      setErrorMessage("로그인을 시작하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return {
    status,
    isCheckingSession: status === "loading",
    pendingProvider,
    errorMessage,
    handleSocialLogin,
  };
}
