import type {
  BarkingLevel,
  DogTrait,
  Gender,
  WalkAmount,
} from "@/features/dogs/types/dog";

export type DogChoiceOption<TValue extends string = string> = {
  value: TValue;
  label: string;
};

export const genderOptions = [
  { value: "MALE", label: "수컷" },
  { value: "FEMALE", label: "암컷" },
] satisfies DogChoiceOption<Gender>[];

export const dogTraitOptions = [
  { value: "ACTIVE", label: "활발함" },
  { value: "CALM", label: "얌전함" },
  { value: "AFFECTIONATE", label: "애교많음" },
  { value: "INDEPENDENT", label: "독립적" },
  { value: "SEPARATION_ANXIETY", label: "분리불안" },
  { value: "FRIENDLY_TO_STRANGERS", label: "낯선사람친화" },
  { value: "TIMID", label: "겁쟁이" },
  { value: "PLAYFUL", label: "장난기많음" },
] satisfies DogChoiceOption<DogTrait>[];

export const walkAmountOptions = [
  { value: "UNDER_30M", label: "30분 이하" },
  { value: "1H", label: "1시간" },
  { value: "OVER_2H", label: "2시간+" },
] satisfies DogChoiceOption<WalkAmount>[];

export const barkingLevelOptions = [
  { value: "LOW", label: "적음" },
  { value: "MEDIUM", label: "보통" },
  { value: "HIGH", label: "많음" },
] satisfies DogChoiceOption<BarkingLevel>[];

export const booleanOptions = [
  { value: "true", label: "가능" },
  { value: "false", label: "불가" },
] satisfies DogChoiceOption<"true" | "false">[];

export const separationAnxietyOptions = [
  { value: "true", label: "있음" },
  { value: "false", label: "없음" },
] satisfies DogChoiceOption<"true" | "false">[];

export const toiletTrainingOptions = [
  { value: "true", label: "완료" },
  { value: "false", label: "미완료" },
] satisfies DogChoiceOption<"true" | "false">[];
