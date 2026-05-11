import type { DailyOutTime, FamilyType, HousingType } from "@/features/auth/types/auth";
import type { DogStatus } from "@/features/dogs/types/dog";

export type AdoptionStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETE";
export type AdoptionStatusUpdate = "ACCEPTED" | "REJECTED" | "COMPLETE";

export type AdoptionApplicant = {
  adoptionId: number;
  dogId: number;
  dogName: string;
  applicant: {
    userId: number;
    nickname: string;
    housingType: HousingType;
    familyType: FamilyType;
    dailyOutTime: DailyOutTime;
  };
  matchScore: number;
  introduction: string;
  status: AdoptionStatus;
  contactInfo?: {
    email: string;
  };
  appliedAt: string;
};

export type MyAdoption = {
  adoptionId: number;
  dog: {
    dogId: number;
    name: string;
    thumbnailUrl: string;
    status?: DogStatus;
  };
  status: AdoptionStatus;
  introduction: string;
  contactInfo?: {
    email: string;
  };
  appliedAt: string;
};
