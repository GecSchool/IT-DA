import type { SessionUser, UserProfile } from "../types/auth";
import type { UserOnboardingPayload, UserProfileUpdatePayload } from "../types/auth-payload";

export interface AuthRepository {
  getCurrentSession(): Promise<SessionUser>;
  checkNickname(nickname: string): Promise<{ isDuplicate: boolean }>;
  completeOnboarding(payload: UserOnboardingPayload): Promise<void>;
  getMyProfile(): Promise<UserProfile>;
  updateMyProfile(payload: UserProfileUpdatePayload): Promise<void>;
  logout(): Promise<void>;
  deleteAccount(): Promise<void>;
}
