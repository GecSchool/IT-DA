import type {
  DailyOutTime,
  FamilyType,
  HasPet,
  HousingType,
  PreferredDogSize,
  PreferredTrait,
} from "@/features/auth/types/auth";
import type { ChoiceOption } from "@/features/auth/types/lifestyle-onboarding-form";

export const housingOptions = [
  { value: "APARTMENT", label: "아파트" },
  { value: "VILLA", label: "빌라" },
  { value: "HOUSE", label: "단독주택" },
] satisfies ChoiceOption<HousingType>[];

export const familyOptions = [
  { value: "SINGLE", label: "1인 가구" },
  { value: "COUPLE", label: "부부" },
  { value: "WITH_CHILD", label: "아이 있음" },
] satisfies ChoiceOption<FamilyType>[];

export const petOptions = [
  { value: "NONE", label: "없음" },
  { value: "DOG", label: "개 있음" },
  { value: "CAT", label: "고양이" },
] satisfies ChoiceOption<HasPet>[];

export const dailyOutTimeOptions = [
  { value: "UNDER_4H", label: "4시간 이하" },
  { value: "4_TO_8H", label: "4~8시간" },
  { value: "OVER_8H", label: "8시간 이상" },
] satisfies ChoiceOption<DailyOutTime>[];

export const preferredTraitOptions = [
  { value: "ACTIVE", label: "활발함" },
  { value: "AFFECTIONATE", label: "애교많음" },
  { value: "CALM", label: "얌전함" },
  { value: "INDEPENDENT", label: "독립적" },
  { value: "FRIENDLY_TO_STRANGERS", label: "낯선사람 친화적" },
  { value: "PLAYFUL", label: "장난기많음" },
  { value: "TIMID", label: "겁쟁이" },
] satisfies ChoiceOption<PreferredTrait>[];

export const preferredSizeOptions = [
  { value: "SMALL", label: "소형" },
  { value: "MEDIUM", label: "중형" },
  { value: "LARGE", label: "대형" },
  { value: "ANY", label: "상관없음" },
] satisfies ChoiceOption<PreferredDogSize>[];

export const housingTypeLabels = createLabelMap(housingOptions);
export const familyTypeLabels = createLabelMap(familyOptions);
export const hasPetLabels = createLabelMap(petOptions);
export const dailyOutTimeLabels = createLabelMap(dailyOutTimeOptions);
export const preferredTraitLabels = createLabelMap(preferredTraitOptions);
export const preferredDogSizeLabels = createLabelMap(preferredSizeOptions);

function createLabelMap<TValue extends string>(
  options: ChoiceOption<TValue>[]
): Record<TValue, string> {
  return options.reduce(
    (labelMap, option) => ({
      ...labelMap,
      [option.value]: option.label,
    }),
    {} as Record<TValue, string>
  );
}
