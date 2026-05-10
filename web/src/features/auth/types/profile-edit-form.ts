import { z } from "zod";

export const profileEditSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(2, "닉네임은 2자 이상 입력해주세요.")
    .max(10, "닉네임은 10자 이하로 입력해주세요.")
    .regex(/^[가-힣]+$/, "닉네임은 한글만 입력해주세요."),
  regionSido: z.string().min(1, "시/도를 선택해주세요."),
  regionSigungu: z.string().min(1, "시/군/구를 선택해주세요."),
  housingType: z.enum(["APARTMENT", "VILLA", "HOUSE"]),
  familyType: z.enum(["SINGLE", "COUPLE", "WITH_CHILD"]),
  hasPet: z.enum(["NONE", "DOG", "CAT"]),
  dailyOutTime: z.enum(["UNDER_4H", "4_TO_8H", "OVER_8H"]),
  preferredTraits: z
    .array(
      z.enum([
        "ACTIVE",
        "AFFECTIONATE",
        "CALM",
        "INDEPENDENT",
        "FRIENDLY_TO_STRANGERS",
        "PLAYFUL",
        "TIMID",
      ])
    )
    .min(1, "선호 성향을 하나 이상 선택해주세요."),
  preferredSize: z.enum(["SMALL", "MEDIUM", "LARGE", "ANY"]),
});

export type ProfileEditFormValues = z.infer<typeof profileEditSchema>;
