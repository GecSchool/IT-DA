import type {
  DailyOutTime,
  FamilyType,
  HasPet,
  HousingType,
  PreferredDogSize,
  PreferredTrait,
} from "@/features/auth/types/auth";

export type ChoiceOption<TValue extends string = string> = {
  value: TValue;
  label: string;
};

export type LifestyleOnboardingFormValues = {
  housingType: HousingType;
  familyType: FamilyType;
  hasPet: HasPet;
  dailyOutTime: DailyOutTime;
  preferredTraits: PreferredTrait[];
  preferredSize: PreferredDogSize;
};
