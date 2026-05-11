import type { AdoptionRepository } from "./adoption-repository";
import type { AdoptionApplicant, MyAdoption } from "../types/adoption";

let nextAdoptionId = 5;

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
    introduction: "매일 산책할 수 있고 조용한 환경에서 천천히 적응시킬 수 있어요.",
    appliedAt: "2026-05-08T12:00:00.000Z",
  },
  {
    adoptionId: 2,
    dog: {
      dogId: 3,
      name: "보리",
      thumbnailUrl: "/mock/dogs/bori-1.jpg",
      status: "AVAILABLE",
    },
    status: "PENDING",
    introduction: "강아지와 생활한 경험이 있고 주말마다 긴 산책을 할 수 있어요.",
    appliedAt: "2026-05-06T15:20:00.000Z",
  },
  {
    adoptionId: 3,
    dog: {
      dogId: 5,
      name: "밤비",
      thumbnailUrl: "/mock/dogs/bambi-1.jpg",
      status: "AVAILABLE",
    },
    status: "ACCEPTED",
    introduction: "재택근무를 하고 있어서 적응 기간 동안 오래 곁에 있을 수 있어요.",
    contactInfo: {
      email: "foster@example.com",
    },
    appliedAt: "2026-05-04T10:00:00.000Z",
  },
  {
    adoptionId: 4,
    dog: {
      dogId: 6,
      name: "모카",
      thumbnailUrl: "/mock/dogs/moca-1.jpg",
      status: "AVAILABLE",
    },
    status: "REJECTED",
    introduction: "가족 모두 입양에 동의했고 꾸준히 케어할 준비가 되어 있어요.",
    appliedAt: "2026-05-03T09:30:00.000Z",
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
          introduction: payload.introduction,
          appliedAt: new Date().toISOString(),
        },
        ...mockMyAdoptions,
      ];

      return { adoptionId };
    },

    async updateAdoption(adoptionId, payload) {
      mockMyAdoptions = mockMyAdoptions.map((adoption) =>
        adoption.adoptionId === adoptionId
          ? {
              ...adoption,
              introduction: payload.introduction,
            }
          : adoption
      );
    },

    async deleteAdoption(adoptionId) {
      mockMyAdoptions = mockMyAdoptions.filter((adoption) => adoption.adoptionId !== adoptionId);
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
