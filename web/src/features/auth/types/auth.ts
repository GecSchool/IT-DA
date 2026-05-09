export type HousingType = "APARTMENT" | "VILLA" | "HOUSE";
export type FamilyType = "SINGLE" | "COUPLE" | "WITH_CHILD";
export type HasPet = "NONE" | "DOG" | "CAT";
export type DailyOutTime = "UNDER_4H" | "4_TO_8H" | "OVER_8H";
export type PreferredDogSize = "SMALL" | "MEDIUM" | "LARGE" | "ANY";
export type PreferredTrait = "ACTIVE" | "AFFECTIONATE" | "CALM";

export type SessionUser = {
  userId: number;
  nickname: string;
};

export type Lifestyle = {
  housingType: HousingType;
  familyType: FamilyType;
  hasPet: HasPet;
  dailyOutTime: DailyOutTime;
  preferredTraits: PreferredTrait[];
  preferredSize: PreferredDogSize;
};

export type UserProfile = {
  userId: number;
  nickname: string;
  email: string;
  regionSido: string;
  regionSigungu: string;
  lifestyle: Lifestyle;
};
