import type { AdoptionRepository } from "./adoption-repository";
import type { AdoptionApplicant, MyAdoption } from "../types/adoption";

let nextAdoptionId = 3;

let mockApplicants: AdoptionApplicant[] = [
  {
    adoptionId: 1,
    dogId: 1,
    dogName: "초코",
    applicant: {
      userId: 3,
      nickname: "산책러버",
      housingType: "APARTMENT",
      familyType: "SINGLE",
      dailyOutTime: "4_TO_8H",
    },
    matchScore: 87,
    introduction: "매일 산책할 수 있고 재택근무라 함께 있는 시간이 많아요.",
    status: "PENDING",
    appliedAt: "2026-05-08T12:00:00.000Z",
  },
  {
    adoptionId: 2,
    dogId: 2,
    dogName: "두부",
    applicant: {
      userId: 4,
      nickname: "따뜻한집",
      housingType: "HOUSE",
      familyType: "COUPLE",
      dailyOutTime: "UNDER_4H",
    },
    matchScore: 74,
    introduction: "조용한 환경에서 오래 함께 지낼 가족을 찾고 있어요.",
    status: "ACCEPTED",
    contactInfo: {
      email: "adopter@example.com",
    },
    appliedAt: "2026-05-07T16:20:00.000Z",
  },
];

let mockMyAdoptions: MyAdoption[] = [
  {
    adoptionId: 1,
    dog: {
      dogId: 1,
      name: "초코",
      thumbnailUrl: "/mock/dogs/choco-1.jpg",
      status: "AVAILABLE",
    },
    status: "PENDING",
    appliedAt: "2026-05-08T12:00:00.000Z",
  },
];

export function createMockAdoptionRepository(): AdoptionRepository {
  return {
    async createAdoption(payload) {
      const adoptionId = nextAdoptionId;
      nextAdoptionId += 1;

      mockMyAdoptions = [
        {
          adoptionId,
          dog: {
            dogId: payload.dogId,
            name: "초코",
            thumbnailUrl: "/mock/dogs/choco-1.jpg",
            status: "AVAILABLE",
          },
          status: "PENDING",
          appliedAt: new Date().toISOString(),
        },
        ...mockMyAdoptions,
      ];

      return { adoptionId };
    },

    async getApplicants() {
      return mockApplicants;
    },

    async updateAdoptionStatus(adoptionId, status) {
      mockApplicants = mockApplicants.map((adoption) =>
        adoption.adoptionId === adoptionId
          ? {
              ...adoption,
              status,
              contactInfo:
                status === "ACCEPTED" ? { email: "adopter@example.com" } : adoption.contactInfo,
            }
          : adoption
      );
    },

    async getMyAdoptions() {
      return mockMyAdoptions;
    },
  };
}
