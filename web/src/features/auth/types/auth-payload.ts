import type { Lifestyle } from "./auth";

export type UserOnboardingPayload = {
  nickname: string;
  regionSido: string;
  regionSigungu: string;
};

export type UserProfileUpdatePayload = {
  nickname: string;
  regionSido: string;
  regionSigungu: string;
  lifestyle: Lifestyle;
};
