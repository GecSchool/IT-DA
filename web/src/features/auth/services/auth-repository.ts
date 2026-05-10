import type { SessionUser } from "../types/auth";
import type { UserOnboardingPayload, UserProfileUpdatePayload } from "../types/auth-payload";

export interface AuthRepository {
  getCurrentSession(): Promise<SessionUser>;
  refreshAccessToken(): Promise<{ accessToken: string }>;
  checkNickname(nickname: string): Promise<{ isDuplicate: boolean }>;
  completeOnboarding(payload: UserOnboardingPayload): Promise<void>;
  updateMyProfile(payload: UserProfileUpdatePayload): Promise<void>;
  logout(): Promise<void>;
  deleteAccount(): Promise<void>;
}
