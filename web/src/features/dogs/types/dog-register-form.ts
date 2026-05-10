import { z } from "zod";

export type DogRegisterStep = 1 | 2 | 3;

const dogTraitSchema = z.enum([
  "ACTIVE",
  "CALM",
  "AFFECTIONATE",
  "INDEPENDENT",
  "SEPARATION_ANXIETY",
  "FRIENDLY_TO_STRANGERS",
  "TIMID",
  "PLAYFUL",
]);

export const dogRegisterSchema = z.object({
  imageUrls: z.array(z.string().min(1)).min(1, "사진을 1장 이상 추가해주세요."),
  name: z.string().trim().min(1, "이름을 입력해주세요."),
  gender: z.enum(["MALE", "FEMALE"]),
  breed: z.string().trim().min(1, "품종을 입력해주세요."),
  regionSido: z.string().min(1, "시/도를 선택해주세요."),
  regionSigungu: z.string().min(1, "시/군/구를 선택해주세요."),
  weight: z.number().positive("몸무게를 입력해주세요."),
  traits: z.array(dogTraitSchema).min(1, "성격 태그를 하나 이상 선택해주세요."),
  walkAmount: z.enum(["UNDER_30M", "1H", "OVER_2H"]),
  isSeparationAnxiety: z.boolean(),
  isToiletTrained: z.boolean(),
  barkingLevel: z.enum(["LOW", "MEDIUM", "HIGH"]),
  canLiveInApartment: z.boolean(),
  canLiveWithChild: z.boolean(),
  canLiveWithDog: z.boolean(),
  canLiveWithCat: z.boolean(),
  fosterNote: z.string().trim().optional(),
});

export type DogRegisterFormValues = z.infer<typeof dogRegisterSchema>;

export const dogRegisterStepFields = {
  1: ["imageUrls", "name", "gender", "breed", "regionSido", "regionSigungu", "weight"],
  2: ["traits", "walkAmount", "isSeparationAnxiety", "isToiletTrained", "barkingLevel"],
  3: [
    "canLiveInApartment",
    "canLiveWithChild",
    "canLiveWithDog",
    "canLiveWithCat",
    "fosterNote",
  ],
} satisfies Record<DogRegisterStep, Array<keyof DogRegisterFormValues>>;

export const dogRegisterStepSchemas = {
  1: dogRegisterSchema.pick({
    imageUrls: true,
    name: true,
    gender: true,
    breed: true,
    regionSido: true,
    regionSigungu: true,
    weight: true,
  }),
  2: dogRegisterSchema.pick({
    traits: true,
    walkAmount: true,
    isSeparationAnxiety: true,
    isToiletTrained: true,
    barkingLevel: true,
  }),
  3: dogRegisterSchema.pick({
    canLiveInApartment: true,
    canLiveWithChild: true,
    canLiveWithDog: true,
    canLiveWithCat: true,
    fosterNote: true,
  }),
} satisfies Record<DogRegisterStep, z.ZodType>;
