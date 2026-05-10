import type { AuthRepository } from "./auth-repository";
import type { UserProfile } from "../types/auth";

let mockProfile: UserProfile = {
  userId: 1,
  nickname: "초코임보자",
  email: "foster@example.com",
  regionSido: "서울특별시",
  regionSigungu: "마포구",
  lifestyle: {
    housingType: "APARTMENT",
    familyType: "SINGLE",
    hasPet: "NONE",
    dailyOutTime: "4_TO_8H",
    preferredTraits: ["ACTIVE", "AFFECTIONATE"],
    preferredSize: "MEDIUM",
  },
};

let isMockAuthenticated = false;

const duplicateNicknames = new Set(["관리자", "테스트", "초코임보자"]);

export function createMockAuthRepository(): AuthRepository {
  return {
    async getCurrentSession() {
      if (!isMockAuthenticated) {
        throw new Error("Unauthenticated");
      }

      return {
        userId: mockProfile.userId,
        email: mockProfile.email,
        nickname: mockProfile.nickname,
        profileStatus: "COMPLETE",
        regionSido: mockProfile.regionSido,
        regionSigungu: mockProfile.regionSigungu,
        lifestyle: mockProfile.lifestyle,
      };
    },

    async refreshAccessToken() {
      isMockAuthenticated = true;

      return {
        accessToken: "mock-access-token",
      };
    },

    async checkNickname(nickname) {
      return {
        isDuplicate: duplicateNicknames.has(nickname.trim()),
      };
    },

    async completeOnboarding(payload) {
      mockProfile = {
        ...mockProfile,
        nickname: payload.nickname,
        regionSido: payload.regionSido,
        regionSigungu: payload.regionSigungu,
      };
    },

    async getMyProfile() {
      return mockProfile;
    },

    async updateMyProfile(payload) {
      mockProfile = {
        ...mockProfile,
        ...payload,
      };
    },

    async logout() {
      isMockAuthenticated = false;
    },

    async deleteAccount() {
      isMockAuthenticated = false;
    },
  };
}
