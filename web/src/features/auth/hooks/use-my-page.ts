"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  dailyOutTimeLabels,
  familyTypeLabels,
  hasPetLabels,
  housingTypeLabels,
  preferredDogSizeLabels,
  preferredTraitLabels,
} from "@/features/auth/constants/lifestyle-options";
import { useLogoutMutation, useMyProfileQuery } from "@/features/auth/queries";

export function useMyPage() {
  const router = useRouter();
  const [logoutErrorMessage, setLogoutErrorMessage] = useState<string | null>(null);
  const profileQuery = useMyProfileQuery();
  const logoutMutation = useLogoutMutation();
  const profile = profileQuery.data;

  const profileRows = profile
    ? [
        { label: "닉네임", value: profile.nickname },
        { label: "연락 수단", value: "오픈카톡" },
      ]
    : [];

  const lifestyleRows = profile
    ? [
        { label: "주거 형태", value: housingTypeLabels[profile.lifestyle.housingType] },
        { label: "거주 지역", value: `${profile.regionSido} ${profile.regionSigungu}` },
        { label: "하루 외출", value: dailyOutTimeLabels[profile.lifestyle.dailyOutTime] },
        { label: "가족 구성", value: familyTypeLabels[profile.lifestyle.familyType] },
        { label: "반려동물", value: hasPetLabels[profile.lifestyle.hasPet] },
        {
          label: "선호 성향",
          value: profile.lifestyle.preferredTraits
            .map((trait) => preferredTraitLabels[trait])
            .join(", "),
        },
        {
          label: "선호 크기",
          value: preferredDogSizeLabels[profile.lifestyle.preferredSize],
        },
      ]
    : [];

  const handleEditProfile = () => {
    setLogoutErrorMessage(null);
    router.push("/profile/edit");
  };

  const handleLogout = async () => {
    try {
      setLogoutErrorMessage(null);
      await logoutMutation.mutateAsync();
      router.replace("/login");
    } catch {
      setLogoutErrorMessage("로그아웃하지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return {
    isLoading: profileQuery.isPending,
    isError: profileQuery.isError,
    isLoggingOut: logoutMutation.isPending,
    logoutErrorMessage,
    profileRows,
    lifestyleRows,
    handleEditProfile,
    handleLogout,
  };
}
